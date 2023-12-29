export interface CartaPorteListResponse {
  success: boolean;
  vehicle: CartaPorte[];
}

export interface CartaPorte {
  idSAT_CartaPorte: number;
  OrderNumber: string;
  idSAT_locationsOrigen: number;
  idSAT_locationsDestino: number;
  idSAT_vehicle: number;
  idSAT_Driver: number;
  FechaHoraSalida: string;
  FechaHoraLlegada: string;
  Status: number;
  Idfacturama: string;
  xml: string;
  pdf: string;
  updated_at: string;
}

export interface PostCartaPorteResponse {
  success: boolean;
  id_complemento: string;
  message: string;
}

export interface PostCartaPorte {
  idSAT_CartaPorte: number;
  idSAT_vehicle: number;
  idSAT_Driver: number;
  FechaHoraSalida: string;
  FechaHoraLlegada: string;
}
