import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartaPorteService } from '../../services/cartaporte.service';
import {
  Neighborhood,
  State,
  Municipality,
  Locality,
} from '../../interfaces/catalog-interface';
import { codeState } from 'src/assets/states-postal-codes';

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

  constructor(
    private route: ActivatedRoute,
    private cartaPorteService: CartaPorteService
  ) {}

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    this.cartaPorteService
      .getNeighborhoodsByPostalCode('43624')
      .subscribe((neighborhoods) => (this.neighborhoods = neighborhoods));

    console.log(this.setState('42365'));

    this.cartaPorteService
      .getMexicanStates()
      .subscribe((states) => (this.states = states));

    this.cartaPorteService
      .getMunicipalitiesByState('HID')
      .subscribe((municipalities) => (this.municipalities = municipalities));

    this.cartaPorteService
      .getLocalitiesByState('HID')
      .subscribe((localities) => (this.localities = localities));

    this.cartaPorteService
      .getUbicationByPostalCode('43600')
      .subscribe((ubication) => console.log(ubication));
  }

  private setState(postalCode: string) {
    const idState: string = postalCode.substring(0, 2);
    const state = codeState.find((item) =>
      item.range.some((rango) => rango === idState)
    );

    return state?.stateCode;
  }
}
