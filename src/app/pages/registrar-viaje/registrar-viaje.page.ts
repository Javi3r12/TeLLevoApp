import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ViajeService } from 'src/app/services/viaje.service';
import { VehiculoService } from 'src/app/services/vehiculo.service'; 
import { Vehiculo } from '../../interfaces/vehiculo.model';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
})

export class RegistrarViajePage implements OnInit {
  
  nuevoViaje: Viaje = {
    id: this.viajeService.getNextId() ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0
  };

  vehiculos: Vehiculo[] = [];

  viajes: Viaje[] = [];

  constructor(private viajeService: ViajeService, private vehiculosServise: VehiculoService) {}

  ngOnInit() {
    this.vehiculos = this.vehiculosServise.obtenerVehiculo();
  }

  agregarViaje(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoViaje)
      this.viajeService.agregarViaje({ ...this.nuevoViaje });
      form.resetForm(); // Resetea el formulario
    }
  }

}
