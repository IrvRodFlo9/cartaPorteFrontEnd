export interface LocationsResponse {
  success: boolean;
  locations: Location[];
}

export interface Location {
  idSAT_locations: number;
  TipoUbicacion: TipoUbicacion;
  IDUbicacion: string;
  DistanciaRecorrida: string;
  RFCRemitenteDestinatario: string;
  Pais: 'México';
  CodigoPostal: string;
  Estado: string;
  subsidiary_id: number;
}

export enum TipoUbicacion {
  Destino = 'Destino',
  Origen = 'Origen',
}
