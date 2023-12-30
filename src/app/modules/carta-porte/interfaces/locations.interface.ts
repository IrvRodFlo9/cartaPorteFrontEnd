export interface LocationsResponse {
  success: boolean;
  locations: Location[];
}

export interface Location {
  idSAT_locations: number;
  TipoUbicacion: TipoUbicacion;
  IDUbicacion: string;
  DistanciaRecorrida: string; //
  RFCRemitenteDestinatario: string; //
  Pais: 'México'; //
  CodigoPostal: string; //
  Estado: string; //
  subsidiary_id: number; //Unidad
}

export type TipoUbicacion = 'Destino' | 'Origen';

export const originLocation: Location = {
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
