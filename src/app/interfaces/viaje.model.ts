import { Marker } from './../../../node_modules/@capacitor/google-maps/dist/typings/definitions.d';
export interface Viaje {
    id: string;
    destino: string;
    asientos: number;
    vehiculo: string;
    descripcion: string
    precio: number;
    activo: boolean;
    id_user: any;
    cord: Cords;
}

export interface Cords {
  lat: Number;
  lng: Number;
}

export interface Ubicacion {
  id?: string,
  name: string,
  descripcion: string,
  marker: Marker | null,
}