export interface Autotransport {
  PermSCT: string;
  NumPermisoSCT: string;
  IdentificacionVehicular: IdentificacionVehicular;
  Seguros: Seguros;
}

export interface IdentificacionVehicular {
  ConfigVehicular: string;
  PesoBrutoVehicular: string;
  PlacaVM: string;
  AnioModeloVM: string;
}

export interface Seguros {
  AseguraRespCivil: string;
  PolizaRespCivil: string;
}
