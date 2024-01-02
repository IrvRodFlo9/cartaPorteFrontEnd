import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  CartaPorte,
  CartaPorteListResponse,
  PostCartaPorte,
  PostCartaPorteResponse,
} from '../interfaces/cartaporte.interface';

import { ErrorsService } from '../../core/services/errors.service';

@Injectable({ providedIn: 'root' })
export class CartaPorteService {
  private http: HttpClient = inject(HttpClient);
  private errorService: ErrorsService = inject(ErrorsService);

  private baseURL: string = `${environment.api.baseURL}/api/CartaPorte`;

  public getList(): Observable<CartaPorte[]> {
    const url: string = `${this.baseURL}/list`;
    return this.http.get<CartaPorteListResponse>(url).pipe(
      map((response) => {
        if (response.success) return response.vehicle;

        this.errorService.notificationError('Error al obtener listado de cartas porte');
        return [];
      })
    );
  }

  public postCartaPorte(cartaPorte: PostCartaPorte): Observable<boolean> {
    const url: string = `${this.baseURL}/new`;

    return this.http.post<PostCartaPorteResponse>(url, cartaPorte).pipe(
      catchError(() => {
        this.errorService.notificationError('Error al generar carta porte');
        return of({ success: false });
      }),
      map((ans) => ans.success)
    );
  }
}
