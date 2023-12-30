export interface VehiclesResponse {
  success: boolean;
  vehicle: Vehicle[];
}

export interface Vehicle {
  idSAT_vehicle: number;
  PermSCT: PermSCT;
  NumPermisoSCT: string; //
  IdentificacionVehicular: string; //
  ConfigVehicular: ConfigVehicular;
  PesoBrutoVehicular: string;
  PlacaVM: string; //
  AnioModeloVM: string; //
  AseguraRespCivil: string; //
  PolizaRespCivil: string; //
  ControlGSM: number; //Número de vehiculo
  Vehiculo: string; //
}

export enum ConfigVehicular {
  Vl = 'VL',
}

export enum PermSCT {
  Tpaf02 = 'TPAF02',
}
