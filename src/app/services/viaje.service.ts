import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje.model';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajes: Viaje[] = [];
  private nextId: number = 1;
  private viajeActual: Viaje | null = null;

  constructor() {}

  agregarViaje(viaje: Omit<Viaje, 'id'>) {
    const newViaje: Viaje = { id: this.nextId++, ...viaje }; // Assign an ID and spread the rest
    this.viajes.push(newViaje);
  }

  obtenerViajes(): Viaje[] {
    return this.viajes;
  }

  obtenerViajePorId(id: number): Viaje | undefined {
    return this.viajes.find(viaje => viaje.id === id);
  }

  agregarEj() {
    this.viajes.push(
      { id: this.nextId++, destino: 'San Pedro', asientos: 3, vehiculo: 'automóvil', descripcion: 'Vamos hacia xxx en San Pedro, por la calle xxx hasta xxx.', precio: 3000 },
      { id: this.nextId++, destino: 'Hualpen', asientos: 1, vehiculo: 'motocicleta', descripcion: 'Voy hasta la zona xxx de Hualpen por la ruta xxxx', precio: 2500 }
    );
  }

  getNextId(): number {
    return this.nextId++;
  }
  
  setViaje(viaje: Viaje) {
    this.viajeActual = viaje; // Store the current viaje
  }

  obtenerViajeActual(): Viaje | null {
    return this.viajeActual; // Retrieve the current viaje
  }
}
