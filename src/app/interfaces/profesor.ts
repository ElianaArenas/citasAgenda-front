import { RolI } from './authInterface';

export interface ProfesorI {
  rol: RolI[];
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
  color: string;
}
