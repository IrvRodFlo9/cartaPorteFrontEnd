import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';

import { CartaPorteService } from '../../services/cartaporte.service';
import { CatalogsService } from '../../services/catalogs.service';
import { LocalStorageService } from '../../services/localStorage.service';

import { ControlErrorsPipe } from './../../../shared/pipes/control-errors.pipe';

import { Driver } from '../../interfaces/driver.interface';
import { Location } from '../../interfaces/locations.interface';
import { Vehicle } from '../../interfaces/vehicle.interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit, OnDestroy {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private catalogsService: CatalogsService = inject(CatalogsService);
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private routeSubscription!: Subscription;
  private controlErrors: ControlErrorsPipe = new ControlErrorsPipe();

  public key: string = '';
  public locations?: Location[];
  public drivers?: Driver[];
  public vehicles?: Vehicle[];
  public originLocation: Location = {
    idSAT_locations: 56,
    TipoUbicacion: 'Origen',
    IDUbicacion: 'OR564218',
    DistanciaRecorrida: '0',
    RFCRemitenteDestinatario: 'LAC040524110',
    Pais: 'México',
    CodigoPostal: '42184',
    Estado: 'Hidalgo',
    subsidiary_id: 56,
  };

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.key = params['key'];
      this.localStorageService.organizeHistory(this.key);
    });

    this.catalogsService
      .getVehicles()
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.catalogsService
      .getDrivers()
      .subscribe((drivers) => (this.drivers = drivers));
    this.catalogsService
      .getLocations()
      .subscribe((locations) => (this.locations = locations));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  /*
  public getControlErrors(
    controlName: string,
    controlLabel: string = 'Campo'
  ): string[] {
    if (!this.form.get(controlName)) return [];

    const errors = this.controlErrors.transform(
      this.form.get(controlName),
      controlLabel
    );
    return errors;
  }
  */

  public onSubmit(): void {
    this.localStorageService.deleteKeyFromHistory(this.key);

    this.router.navigateByUrl('list');
  }
}
