import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ViajeService } from 'src/app/services/viaje.service';
import { Vehiculo } from '../../interfaces/vehiculo.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
})

export class RegistrarViajePage implements OnInit {
  
  nuevoViaje: Viaje = {
    id: this.firebase.createId() ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0
  };

  vehiculos: Vehiculo[] = [];

  viajes: Viaje[] = [];

  constructor(private viajeService: ViajeService,  private firebase: FirebaseService) {}

  ngOnInit() {
    this.cargarvehiculos()
  }

  cargarvehiculos(){
    this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.vehiculos)
        this.vehiculos = data
      }
    })
  }

  agregarViaje(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoViaje)
      this.firebase.createDocumentID(this.nuevoViaje, 'viajes', this.nuevoViaje.id)
      form.resetForm(); 
    }
  }

}
