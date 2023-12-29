import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Driver, DriversResponse } from '../interfaces/driver.interface';
import { LocationsResponse, Location } from '../interfaces/locations.interface';
import { Vehicle, VehiclesResponse } from '../interfaces/vehicle.interface';

@Injectable({ providedIn: 'root' })
export class CatalogsService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.api.baseURL}/api/resource`;

  public getVehicles(): Observable<Vehicle[]> {
    const url: string = `${this.baseURL}/list_vehicle`;
    return this.http
      .get<VehiclesResponse>(url)
      .pipe(map((response) => (response.success ? response.vehicle : [])));
  }

  public getLocations(): Observable<Location[]> {
    const url: string = `${this.baseURL}/list_locations`;
    return this.http
      .get<LocationsResponse>(url)
      .pipe(map((response) => (response.success ? response.locations : [])));
  }

  public getDrivers(): Observable<Driver[]> {
    const url: string = `${this.baseURL}/list_drivers`;
    return this.http
      .get<DriversResponse>(url)
      .pipe(map((response) => (response.success ? response.drivers : [])));
  }
}
