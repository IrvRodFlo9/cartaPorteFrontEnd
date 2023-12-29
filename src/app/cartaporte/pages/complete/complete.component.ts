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
import { LocalStorageService } from '../../services/localStorage.service';

import { ControlErrorsPipe } from './../../../shared/pipes/control-errors.pipe';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit, OnDestroy {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private routeSubscription!: Subscription;
  private controlErrors: ControlErrorsPipe = new ControlErrorsPipe();

  public key: string = '';

  public form: FormGroup = this.fb.group({
    permission: ['TPAF01', [Validators.required]],
    numberPermission: ['NumPermisoSCT1', [Validators.required]],
    vehicularConfig: ['VL', [Validators.required]],
    weight: ['5', [Validators.required]],
    plate: ['plac892', [Validators.required]],
    model: ['2020', [Validators.required]],
    insurance: ['Qualitas', [Validators.required]],
    insurancePolicy: ['123456789', [Validators.required]],
    name: ['NombreFigura1', [Validators.required]],
    rfc: ['EKU9003173C9', [Validators.required]],
    licence: ['NumLicencia1', [Validators.required]],
    street: ['1', [Validators.required]],
    extNumber: ['', [Validators.required]],
    intNumber: [''],
    postalCode: [
      '43650',
      [Validators.required, Validators.pattern('^[0-9]{5}$')],
    ],
    neighborhood: ['', [Validators.required]],
    locality: ['', [Validators.required]],
    municipality: ['', [Validators.required]],
    state: ['HID', [Validators.required]],
    country: ['MEX', [Validators.required]],
    reference: [''],
  });

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.key = params['key'];
      this.localStorageService.organizeHistory(this.key);
    });
    this.form.controls['municipality'].disable();
    this.form.controls['locality'].disable();
    this.form.controls['neighborhood'].disable();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

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

  public onSubmit(): void {
    const autotransportJSON = this.buildAutotransport();
    const transportFigureJSON = [this.buildTransportFigure()];

    console.log(JSON.stringify(autotransportJSON));
    console.log(JSON.stringify(transportFigureJSON));

    this.localStorageService.deleteKeyFromHistory(this.key);

    this.router.navigateByUrl('list');
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

  private buildAutotransport() {
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

    const autotransport = {
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

  private buildTransportFigure() {
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

    const transportFigure = {
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
