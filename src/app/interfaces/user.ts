export interface IUser {
  message: IMessage;
}

export interface IMessage {
  rol: IRol[];
  id: string;
  nombre: string;
  codigo: string;
  documento: string;
  celular: string;
  activo: boolean;
  contra: string;
  email: string;
  telefono2: string;
  direccion: string;
  barrio: string;
  fechaNacimiento: string;
  genero: string;
  estatura: string;
  peso: string;
  categoria: string;
  torneos: string;
  brazoDominante: string;
  idFamiliar: string;
}

export interface IRol {
  id: string;
  name: string;
}
