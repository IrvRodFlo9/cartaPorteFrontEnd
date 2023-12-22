import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartaPorteService } from '../../services/cartaporte.service';
import {
  Locality,
  Municipality,
  Neighborhood,
  State,
} from '../../interfaces/catalog-interface';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { Autotransport } from '../../interfaces/autotransport-interface';
import { TransportFigure } from '../../interfaces/transport-figure-interface';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  public key?: string;

  public states: State[] = [];
  public municipalities: Municipality[] = [];
  public neighborhoods: Neighborhood[] = [];
  public localities: Locality[] = [];

  public form: FormGroup = this.fb.group({
    permission: ['1', [Validators.required]],
    numberPermission: ['1', [Validators.required]],
    vehicularConfig: ['1', [Validators.required]],
    weight: ['1', [Validators.required]],
    plate: ['1', [Validators.required]],
    model: ['1', [Validators.required]],
    insurance: ['1', [Validators.required]],
    insurancePolicy: ['1', [Validators.required]],
    name: ['1', [Validators.required]],
    rfc: ['1', [Validators.required]],
    licence: ['1', [Validators.required]],
    street: ['1', [Validators.required]],
    extNumber: ['', [Validators.required]],
    intNumber: [''],
    postalCode: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    locality: ['', [Validators.required]],
    municipality: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['MEX', [Validators.required]],
    reference: [''],
  });

  constructor(
    private cartaPorteService: CartaPorteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    this.form.controls['municipality'].disable();
    this.form.controls['locality'].disable();
    this.form.controls['neighborhood'].disable();

    this.cartaPorteService
      .getMexicanStates()
      .subscribe((states) => (this.states = states));
  }

  public getInformationByPostalCode(): void {
    const postalCode = this.form.get('postalCode')?.value as string;

    if (postalCode.length === 0) {
      this.toggleControls([
        this.form.controls['municipality'] as FormControl,
        this.form.controls['locality'] as FormControl,
        this.form.controls['state'] as FormControl,
      ]);
    }

    if (postalCode.length !== 5) {
      this.form.controls['neighborhood'].disable();
      return;
    }

    this.cartaPorteService
      .getNeighborhoodsByPostalCode(postalCode)
      .pipe(
        tap(() => this.form.controls['neighborhood'].reset('')),
        tap(() => this.form.controls['neighborhood'].enable())
      )
      .subscribe((neighborhoods) => (this.neighborhoods = neighborhoods));

    this.cartaPorteService
      .getUbicationByPostalCode(postalCode)
      .subscribe(({ StateCode, MunicipalityCode, LocationCode }) =>
        this.getAndSetUbication(
          StateCode,
          MunicipalityCode || '',
          LocationCode || ''
        )
      );
  }

  public getLocalitiesAndMunicipalities(): void {
    const state = this.form.controls['state'].value;
    console.log(state);

    this.toggleControls([
      this.form.controls['municipality'] as FormControl,
      this.form.controls['locality'] as FormControl,
    ]);

    this.cartaPorteService
      .getMunicipalitiesByState(state)
      .subscribe((municipalities) => (this.municipalities = municipalities));

    this.cartaPorteService
      .getLocalitiesByState(state)
      .subscribe((localities) => (this.localities = localities));

    this.form.controls['municipality'].reset('');
    this.form.controls['locality'].reset('');
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const autotransportJSON = this.buildAutotransport();
    const transportFigureJSON = [this.buildTransportFigure()];

    console.log(JSON.stringify(autotransportJSON));
    console.log(JSON.stringify(transportFigureJSON));

    this.router.navigateByUrl('list');
  }

  private getAndSetUbication(
    state: string,
    municipality: string,
    locality: string
  ): void {
    const stateControl: FormControl = this.form.controls[
      'state'
    ] as FormControl;

    const municipalityControl: FormControl = this.form.controls[
      'municipality'
    ] as FormControl;

    const localityControl: FormControl = this.form.controls[
      'locality'
    ] as FormControl;

    const controls: FormControl[] = [
      stateControl,
      municipalityControl,
      localityControl,
    ];

    this.toggleControls(controls);

    this.cartaPorteService
      .getMunicipalitiesByState(state)
      .subscribe((municipalities) => (this.municipalities = municipalities));

    this.cartaPorteService
      .getLocalitiesByState(state)
      .subscribe((localities) => (this.localities = localities));

    stateControl.setValue(state);
    municipalityControl.setValue(municipality);
    localityControl.setValue(locality);

    this.toggleControls(controls);
  }

  private toggleControls(controls: FormControl[]): void {
    controls.forEach((control) => {
      if (control.valid) {
        control.disable();
      } else {
        control.enable();
        control.reset('');
      }
    });
  }

  private buildAutotransport(): Autotransport {
    const {
      permission,
      numberPermission,
      vehicularConfig,
      weight,
      plate,
      model,
      insurance,
      insurancePolicy,
    } = this.form.value;

    const autotransport: Autotransport = {
      PermSCT: permission,
      NumPermisoSCT: numberPermission,
      IdentificacionVehicular: {
        ConfigVehicular: vehicularConfig,
        PesoBrutoVehicular: weight,
        PlacaVM: plate,
        AnioModeloVM: model,
      },
      Seguros: {
        AseguraRespCivil: insurance,
        PolizaRespCivil: insurancePolicy,
      },
    };

    return autotransport;
  }

  private buildTransportFigure(): TransportFigure {
    const {
      name,
      rfc,
      licence,
      street,
      extNumber,
      intNumber,
      postalCode,
      neighborhood,
      locality,
      municipality,
      state,
      country,
      reference,
    } = this.form.value;

    const transportFigure: TransportFigure = {
      TipoFigura: '01',
      RFCFigura: rfc,
      NumLicencia: licence,
      NombreFigura: name,
      Domicilio: {
        Calle: street,
        NumeroExterior: extNumber,
        NumeroInterior: intNumber,
        Colonia: neighborhood,
        Localidad: locality,
        Referencia: reference,
        Municipio: municipality,
        Estado: state,
        Pais: country,
        CodigoPostal: postalCode,
      },
    };

    return transportFigure;
  }
}
