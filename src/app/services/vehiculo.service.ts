import { Injectable } from '@angular/core';
import { Vehiculo } from '../interfaces/vehiculo.model'; 
@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private vehiculos: Vehiculo[] = [];
  private vehiculoActual: Vehiculo | null = null;

  constructor() {}

  agregarVehiculo(vehiculo: Vehiculo) {
    
    this.vehiculos.push(vehiculo);
  }

  obtenerVehiculo(): Vehiculo[] {
    return this.vehiculos;
  }

  obtenerVehiculoPorPatente(patente: string): Vehiculo | undefined {
    return this.vehiculos.find(vehiculo => vehiculo.patente === patente);
  }

  agregarEj() {
    this.vehiculos.push(
      { patente: '123456', tipo: 'automovil', modelo: 'yaris', color: '' },
      { patente: '654321' , tipo: 'motocicleta', modelo: 'kawasaki', color: '' }
    );
  }


  
  setVehiculo(vehiculo: Vehiculo) {
    this.vehiculoActual = vehiculo; // Store the current viaje
  }

  obtenerVehiculoActual(): Vehiculo | null {
    return this.vehiculoActual; // Retrieve the current viaje
  }
}
