import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';

import { CartaPorteService } from '../../services/cartaporte.service';
import { CatalogsService } from '../../services/catalogs.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { Driver } from '../../interfaces/driver.interface';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { ControlErrorsPipe } from 'src/app/modules/shared/pipes/control-errors.pipe';
import { originLocation, Location } from '../../interfaces/locations.interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit, OnDestroy {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private catalogsService: CatalogsService = inject(CatalogsService);
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private routeSubscription!: Subscription;
  private controlErrors: ControlErrorsPipe = new ControlErrorsPipe();

  public key: string = '';
  public locationID = 1; //TODO: Implement reception of locationID
  public location?: Location;
  public drivers?: Driver[];
  public vehicles?: Vehicle[];
  public originLocation: Location = originLocation;
  public form: FormGroup = this.fb.group({
    vehicle: ['', [Validators.required]],
    driver: ['', [Validators.required]],
  });

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.key = params['key'];
      this.localStorageService.organizeHistory(this.key);
    });

    this.form.get('vehicle')?.disable();
    this.form.get('driver')?.disable();

    this.getLocation();
    this.getVehicles();
    this.getDrivers();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  public getControlErrors(controlName: string, controlLabel: string = 'Campo'): string[] {
    if (!this.form.get(controlName)) return [];

    const errors = this.controlErrors.transform(this.form.get(controlName), controlLabel);
    return errors;
  }

  public onSubmit(): void {
    this.localStorageService.deleteKeyFromHistory(this.key);

    this.router.navigateByUrl('list');
  }

  private getLocation(): void {
    this.catalogsService
      .getLocations()
      .pipe(
        map(
          (locations) =>
            locations.filter(
              (location) => location.idSAT_locations === this.locationID
            )[0]
        )
      )
      .subscribe((location) => {
        this.location = location;
      });
  }

  private getVehicles(): void {
    this.catalogsService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      if (vehicles.length === 0) throw new Error('Error getting the vehicles');
      this.form.get('vehicle')?.enable();
    });
  }

  private getDrivers(): void {
    this.catalogsService.getDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      if (drivers.length === 0) throw new Error('Error getting the drivers');
      this.form.get('driver')?.enable();
    });
  }
}
