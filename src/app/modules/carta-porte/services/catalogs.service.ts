import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  Driver,
  DriversResponse,
  Location,
  LocationsResponse,
  Vehicle,
  VehiclesResponse,
} from '../interfaces';

import { ErrorsService } from '../../core/services/errors.service';

@Injectable({ providedIn: 'root' })
export class CatalogsService {
  private http: HttpClient = inject(HttpClient);
  private errorService: ErrorsService = inject(ErrorsService);

  private baseURL: string = `${environment.api.baseURL}/api/resource`;

  public getLocations(): Observable<Location[]> {
    const url: string = `${this.baseURL}/list_locations`;
    return this.http.get<LocationsResponse>(url).pipe(
      map((response) => {
        if (response.success) return response.locations;

        this.errorService.notificationError('Error al obtener locaciones');
        return [];
      })
    );
  }

  public getVehicles(): Observable<Vehicle[]> {
    const url: string = `${this.baseURL}/list_vehicle`;
    return this.http.get<VehiclesResponse>(url).pipe(
      map((response) => {
        if (response.success) return response.vehicle;

        this.errorService.notificationError('Error al obtener vehículos');
        return [];
      })
    );
  }

  public getDrivers(): Observable<Driver[]> {
    const url: string = `${this.baseURL}/list_drivers`;
    return this.http.get<DriversResponse>(url).pipe(
      map((response) => {
        if (response.success) return response.drivers;

        this.errorService.notificationError('Error al obtener conductores');
        return [];
      })
    );
  }
}
