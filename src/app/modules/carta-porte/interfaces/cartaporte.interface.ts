export interface CartaPorteListResponse {
  success: boolean;
  vehicle: CartaPorte[];
}

export interface CartaPorte {
  idsat_carta_porte: number;
  order_number: string;
  subsidiary_requisition_id: number;
  fecha_hora_llegada: string | null;
  fecha_hora_salida: string | null;
  idsat_driver: number | null;
  idsat_locations_destino: number;
  idsat_locations_origen: number;
  idsat_vehicle: number | null;
  idfacturama: null | string;
  pdf: null | string;
  status: number;
  updated_at: null | string;
  xml: null | string;
}

export interface PostCartaPorteResponse {
  success: boolean;
  id_complemento: string;
  message: string;
}

export interface PostCartaPorte {
  idsat_carta_porte: number;
  idsat_vehicle: number;
  idsat_driver: number;
  fecha_hora_salida: string;
  fecha_hora_llegada: string;
}

export interface PostDates {
  exitDate: string;
  arriveDate: string;
}
