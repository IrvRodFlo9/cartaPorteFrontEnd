export interface DriversResponse {
  success: boolean;
  drivers: Driver[];
}

export interface Driver {
  idSAT_Driver: number;
  TipoFigura: string;
  RFCFigura: string;
  NumLicencia: string;
  NombreFigura: string;
  Estado: Estado;
  Pais: 'México';
  CodigoPostal: number;
}

export enum Estado {
  Hidalgo = 'Hidalgo',
}
