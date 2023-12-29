import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {
  CartaPorte,
  CartaPorteListResponse,
} from '../interfaces/cartaporte.interface';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartaPorteService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.api.baseURL}/api/CartaPorte`;

  public getList(): Observable<CartaPorte[]> {
    const url: string = `${this.baseURL}/list`;
    return this.http
      .get<CartaPorteListResponse>(url)
      .pipe(map((response) => (response.success ? response.vehicle : [])));
  }
}
