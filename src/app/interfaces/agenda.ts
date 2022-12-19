export interface AgendaI {
  horario: HorarioI[];
  _id: string;
  activo: boolean;
  regenerar: boolean;
  lugar: string;
  mostrarTodo: boolean;
  fechaInicio: string;
  v: number;
}

export interface HorarioI {
  indice: number;
  franja: string;
  granDemanda: boolean;
  dia: Array<DiaClassI>;
}

export interface DiaClassI {
  dia: DiaEnumI;
  fecha: string;
  turno: string;
  autor1: null | string;
  codigoAutor1: null;
  autor2: null | string;
  autor3: null | string;
  autor4: null | string;
  horaSolicitud: null | string;
  solicita: null | string;
  asistio: boolean;
  profesor: null | string;
  canchero: null | string;
  idProfesor: null | string;
  idCanchero: null | string;
  colorProfesor: null | string;
  socio1?: string;
  socio2?: string;
  socio3?: string;
  socio4?: string;
  codigo?: null;
}

export enum DiaEnumI {
  Domingo = 'domingo',
  Jueves = 'jueves',
  Lunes = 'lunes',
  Martes = 'martes',
  Miercoles = 'miercoles',
  Sabado = 'sabado',
  Viernes = 'viernes',
}
