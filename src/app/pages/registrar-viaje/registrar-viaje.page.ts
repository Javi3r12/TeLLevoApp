import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
})

export class RegistrarViajePage implements OnInit {
  
  nuevoViaje: Viaje = {
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0
  };

  viajes: Viaje[] = [];

  constructor(private viajeService: ViajeService) {}

  ngOnInit() {
  }

  agregarViaje(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoViaje)
      this.viajeService.agregarViaje({ ...this.nuevoViaje });
      form.resetForm(); // Resetea el formulario
    }
  }

}
