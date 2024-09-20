import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.model';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajes: Viaje[] = [];

  constructor() {}

  agregarViaje(viaje: Viaje) {
    this.viajes.push(viaje);
  }

  obtenerViajes(): Viaje[] {
    return this.viajes;
  }

  obtenerViajePorId(index: number): Viaje {
    return this.viajes[index];
  }
  agregarEj() {
    this.viajes.push(
      { destino: 'San Pedro', asientos: 3, vehiculo: 'automóvil', descripcion: 'Vamos hacia xxx en San Pedro, por la calle xxx hasta xxx.', precio: 3000 },
      { destino: 'Hualpen', asientos: 1, vehiculo: 'motocicleta', descripcion: 'Voy hasta la zona xxx de Hualpen por la ruta xxxx', precio: 2500 }
    );
  }
}
