import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model'; 
import { VehiculoService } from '../../services/vehiculo.service';
@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {
  
  nuevoVehiculo: Vehiculo = {
    patente: '',
    tipo: '',
    modelo: '',
    color: '',
  };

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit() {
  }

  agregarVehiculo(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoVehiculo)
      this.vehiculoService.agregarVehiculo({...this.nuevoVehiculo})
      // this.VehiculoService. ({ ...this.nuevoViaje });
      form.resetForm(); // Resetea el formulario
    }
  }
}
