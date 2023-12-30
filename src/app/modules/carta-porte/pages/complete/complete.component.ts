import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, catchError, map } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CartaPorteService } from '../../services/cartaporte.service';
import { CatalogsService } from '../../services/catalogs.service';
import { ErrorsService } from 'src/app/modules/core/services/errors.service';
import { LocalStorageService } from '../../services/localStorage.service';

import { Driver } from '../../interfaces/driver.interface';
import { originLocation, Location } from '../../interfaces/locations.interface';
import { Vehicle } from '../../interfaces/vehicle.interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit, OnDestroy {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private catalogsService: CatalogsService = inject(CatalogsService);
  private errorsService: ErrorsService = inject(ErrorsService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  private routeSubscription!: Subscription;

  public orderNumber: string = '';
  public originLocation: Location = originLocation;
  public locationID?: number;
  public location?: Location;
  public drivers?: Driver[];
  public vehicles?: Vehicle[];

  public form: FormGroup = this.fb.group({
    vehicle: ['', [Validators.required]],
    driver: ['', [Validators.required]],
  });

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.orderNumber = params['orderNumber'];
    });

    this.form.get('vehicle')?.disable();
    this.form.get('driver')?.disable();

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

  public onSubmit(): void {
    this.localStorageService.deleteKeyFromHistory(this.orderNumber);
    this.successSnackBar();
    this.router.navigateByUrl('list');
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
        map((filteredCartasPorte) => filteredCartasPorte[0].idSAT_locationsDestino),
        catchError(() => {
          this.errorSnakBar('Número de orden inválido');
          this.router.navigateByUrl('list');
          throw new Error("Carta Porte didn't found");
        })
      )
      .subscribe((locationID) => {
        this.locationID = locationID;
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
        this.localStorageService.organizeHistory(this.orderNumber);
        this.location = location;
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

  private errorSnakBar(message: string = 'Error'): void {
    this.snackBar.open(message, 'Cerrar', {
      panelClass: ['error'],
    });
  }
}
