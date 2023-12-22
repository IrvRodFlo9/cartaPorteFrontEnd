export interface TransportFigure {
  TipoFigura: string;
  RFCFigura: string;
  NumLicencia: string;
  NombreFigura: string;
  Domicilio: Domicilio;
}

export interface Domicilio {
  Calle: string;
  NumeroExterior: string;
  NumeroInterior: string;
  Colonia: string;
  Localidad: string;
  Referencia: string;
  Municipio: string;
  Estado: string;
  Pais: string;
  CodigoPostal: string;
}
