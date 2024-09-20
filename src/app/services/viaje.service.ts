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
}
