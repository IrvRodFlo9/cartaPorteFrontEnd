import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, map, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CartaPorteService } from '../../services/cartaporte.service';
import { CatalogsService } from '../../services/catalogs.service';
import { ErrorsService } from 'src/app/modules/core/services/errors.service';
import { LocalStorageService } from '../../services/localStorage.service';

import {
  Driver,
  Location,
  originLocation,
  Vehicle,
  PostCartaPorte,
  PostDates,
} from '../../interfaces';
import { LoadingDialogComponent } from '../../components/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private catalogsService: CatalogsService = inject(CatalogsService);
  private errorsService: ErrorsService = inject(ErrorsService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialog: MatDialog = inject(MatDialog);

  private routeSubscription!: Subscription;
  private cartaPorteID?: number;
  private dates?: PostDates;

  public orderNumber: string = '';
  public originLocation: Location = originLocation;
  public destinyLocation?: Location;
  public locationLoading: boolean = true;
  public currentDate: Date = new Date();

  public currentVehicle?: Vehicle;
  public currentDriver?: Driver;

  public drivers: Driver[] = [];
  public vehicles: Vehicle[] = [];

  public form: FormGroup = this.fb.group({
    vehicle: ['', [Validators.required]],
    driver: ['', [Validators.required]],
    exitDate: ['', [Validators.required]],
    exitHour: ['', [Validators.required]],
    arriveDate: ['', [Validators.required]],
    arriveHour: ['', [Validators.required]],
  });

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.orderNumber = params['orderNumber'];
    });
  }

  ngAfterViewInit(): void {
    this.form.get('vehicle')?.disable();
    this.form.get('driver')?.disable();
    this.form.get('arriveHour')?.disable();
    this.form.get('arriveDate')?.disable();

    this.setLocation();
    this.getVehicles();
    this.getDrivers();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  public getControlErrors(controlName: string, controlLabel: string = 'Campo'): string[] {
    if (!this.form.get(controlName)) return [];

    const errors = this.errorsService.getFormControlErrors(
      this.form.get(controlName),
      controlLabel
    );
    return errors;
  }

  public setDates(): void {
    const exitDate: Date = this.form.get('exitDate')?.value;
    const hour = this.form.get('exitHour')?.value;

    if (!exitDate || !hour) return;

    const arriveDate: Date = this.getThreeWorkDaysAfter(exitDate);

    const formatExitDate: string = this.formatDate(exitDate, hour);
    const formatArriveDate: string = this.formatDate(arriveDate, hour);

    this.dates = {
      exitDate: formatExitDate,
      arriveDate: formatArriveDate,
    };
  }

  public setDay(): void {
    const exitDate: Date = this.form.get('exitDate')?.value;
    if (!exitDate) return;

    const arriveDate: Date = this.getThreeWorkDaysAfter(exitDate);
    const plainArriveDate: string = `${arriveDate.getDate()}/${
      arriveDate.getMonth() + 1
    }/${arriveDate.getFullYear()}`;

    this.form.get('arriveDate')?.setValue(plainArriveDate);

    this.setDates();
  }

  public setHour(): void {
    const exitHour = this.form.get('exitHour')?.value;
    if (!exitHour) return;

    this.form.get('arriveHour')?.setValue(exitHour);

    this.setDates();
  }

  public setVehicle(): void {
    const selectedVehicle: number = this.form.get('vehicle')?.value;
    if (!selectedVehicle || !this.vehicles) return;

    this.currentVehicle = this.vehicles
      .filter((vehicle: Vehicle) => vehicle.idSAT_vehicle === selectedVehicle)
      .shift();
  }

  public setDriver(): void {
    const selectedDriver: number = this.form.get('driver')?.value;
    if (!selectedDriver || !this.drivers) return;

    this.currentDriver = this.drivers
      .filter((driver: Driver) => driver.idSAT_Driver === selectedDriver)
      .shift();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorSnakBar('Faltan campos por llenar', 1000);
      return;
    }

    const cartaPorte = this.buildCartaPorte();
    if (!cartaPorte) return;

    const loadingDialog = this.loadingDialog();
    this.cartaPorteService.postCartaPorte(cartaPorte).subscribe((result) => {
      loadingDialog.close();
      if (result === true) {
        this.localStorageService.deleteKeyFromHistory(this.orderNumber);
        this.successSnackBar();
        this.router.navigateByUrl('list');
        return;
      }

      this.errorSnakBar(`Error al generar Carta Porte ${this.orderNumber}`);
    });
  }

  private setLocation(): void {
    this.cartaPorteService
      .getList()
      .pipe(
        map((cartasPorte) =>
          cartasPorte.filter(
            (cartasPorte) => cartasPorte.OrderNumber === this.orderNumber
          )
        ),
        map((filteredCartasPorte) => filteredCartasPorte[0]),
        tap((cartaPorte) => {
          this.cartaPorteID = cartaPorte.idSAT_CartaPorte;
        }),
        map((cartaPorte) => cartaPorte.idSAT_locationsDestino),
        catchError(() => {
          this.errorSnakBar('Número de orden inválido');
          this.router.navigateByUrl('list');
          throw new Error("Carta Porte didn't found");
        })
      )
      .subscribe((locationID) => {
        this.getLocation(locationID);
      });
  }

  private getLocation(locationID: number): void {
    this.catalogsService
      .getLocations()
      .pipe(
        map((locations) =>
          locations.filter((location) => location.idSAT_locations === locationID)
        ),
        map((locations) => locations[0])
      )
      .subscribe((location) => {
        this.locationLoading = false;
        this.localStorageService.organizeHistory(this.orderNumber);
        this.destinyLocation = location;
        this.cdr.detectChanges();
      });
  }

  private getVehicles(): void {
    this.catalogsService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      if (vehicles.length === 0) {
        this.errorSnakBar('Error al obtener vehículos');
        throw new Error('Error getting the vehicles');
      }
      this.form.get('vehicle')?.enable();
    });
  }

  private getDrivers(): void {
    this.catalogsService.getDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      if (drivers.length === 0) {
        this.errorSnakBar('Error al obtener conductores');
        throw new Error('Error getting the conductores');
      }
      this.form.get('driver')?.enable();
    });
  }

  private successSnackBar(): void {
    this.snackBar.open('Carta porte generada con éxito', 'Cerrar', {
      panelClass: ['success'],
    });
  }

  private errorSnakBar(
    message: string = 'Error',
    time: number | undefined = undefined
  ): void {
    const config = {
      panelClass: ['error'],
      duration: time,
    };
    const btnLabel: string = time ? '' : 'Cerrar';

    this.snackBar.open(message, btnLabel, config);
  }

  private formatDate(date: Date, hour: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}T${hour}:00`;
  }

  private getThreeWorkDaysAfter(date: Date): Date {
    let afterDate: number | Date = new Date().setDate(date.getDate() + 3);
    afterDate = new Date(afterDate);

    if (afterDate.getDay() === 0) {
      afterDate = afterDate.setDate(afterDate.getDate() + 1);
      afterDate = new Date(afterDate);
    }

    return afterDate;
  }

  private buildCartaPorte(): PostCartaPorte | undefined {
    if (!this.currentDriver || !this.currentVehicle || !this.cartaPorteID || !this.dates)
      return;

    const cartaPorte: PostCartaPorte = {
      idSAT_CartaPorte: this.cartaPorteID,
      idSAT_Driver: this.currentDriver.idSAT_Driver,
      idSAT_vehicle: this.currentVehicle.idSAT_vehicle,
      FechaHoraSalida: this.dates.exitDate,
      FechaHoraLlegada: this.dates.arriveDate,
    };

    return cartaPorte;
  }

  private loadingDialog(): MatDialogRef<LoadingDialogComponent> {
    return this.dialog.open(LoadingDialogComponent, {
      data: this.orderNumber,
      disableClose: true,
    });
  }
}
