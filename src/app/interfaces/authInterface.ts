export interface LoginI {
  token: string;
  userFound: UserFoundI;
}

export interface UserFoundI {
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
}

export interface RolI {
  id: string;
  name: string;
}

export interface RegisterI {
  nombre?: string;
  celular?: number;
  contra: number;
  email: string;
  imagen?: string;
  codigo: number;
  documento: number;
  idFamiliar?: null;
  telefono2?: null;
  direccion?: string;
  rol: string;
  color?: null;
  fechaNacimiento?: null;
  estatura?: null;
  genero?: string;
  barrio?: string;
  peso?: number;
  categoria?: null;
  torneos?: null;
  brazoDominante?: null;
}

export interface RegisterResponseI {
  token: string;
  savedUser: SavedUserI;
}

export interface SavedUserI {
  rol: string[];
  id: string;
  nombre: string;
  celular: string;
  contra: string;
  email: string;
  imagen: string;
  codigo: string;
  documento: string;
  activo: boolean;
  idFamiliar: null;
  telefono2: null;
  direccion: string;
  color: null;
  fechaNacimiento: null;
  estatura: null;
  genero: string;
  barrio: string;
  peso: string;
  categoria: null;
  torneos: null;
  brazoDominante: null;
}
