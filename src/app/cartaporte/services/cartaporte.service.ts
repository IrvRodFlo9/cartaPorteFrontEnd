import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, fromEvent, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/envitonment';
import {
  Locality,
  Municipality,
  Neighborhood,
  State,
  Ubication,
} from '../interfaces/catalog-interface';

@Injectable({ providedIn: 'root' })
export class CartaPorteService {
  private authHeader: HttpHeaders = new HttpHeaders({
    Authorization: `Basic ${environment.facturama.auth}`,
  });
  private urlCatalogs: string = `${environment.facturama.baseURL}/catalogs`;

  public lastKey?: string;

  constructor(private http: HttpClient) {}

  public saveKeyInLocalStorage(key: string): void {
    localStorage.removeItem('key');
    localStorage.setItem('key', key);
    this.lastKey = key;
  }

  public getUbicationByPostalCode(postalCode: string): Observable<Ubication> {
    const headers = this.authHeader;
    const url: string = `${environment.facturama.baseURL}/Catalogs/PostalCodes?keyword=${postalCode}`;

    return this.http.get<Ubication[]>(url, { headers }).pipe(
      catchError(() => of()),
      map((ubications) => ubications[0])
    );
  }

  public getMexicanStates(): Observable<State[]> {
    const headers = this.authHeader;
    const url: string = `${this.urlCatalogs}/States?countryCode=MEX`;

    return this.http
      .get<State[]>(url, { headers })
      .pipe(catchError(() => of([])));
  }

  public getNeighborhoodsByPostalCode(
    postalCode: string
  ): Observable<Neighborhood[]> {
    const headers = this.authHeader;
    const url: string = `${this.urlCatalogs}/Neighborhoods?postalCode=${postalCode}`;

    return this.http
      .get<Neighborhood[]>(url, { headers })
      .pipe(catchError(() => of([])));
  }

  public getMunicipalitiesByState(
    stateCode: string
  ): Observable<Municipality[]> {
    const headers = this.authHeader;
    const url: string = `${this.urlCatalogs}/Municipalities?stateCode=${stateCode}`;

    return this.http
      .get<Municipality[]>(url, { headers })
      .pipe(catchError(() => of([])));
  }

  public getLocalitiesByState(stateCode: string): Observable<Locality[]> {
    const headers = this.authHeader;
    const url: string = `${this.urlCatalogs}/Localities?stateCode=${stateCode}`;

    return this.http
      .get<Locality[]>(url, { headers })
      .pipe(catchError(() => of([])));
  }
}
