import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model'; 
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from '../../services/sesion.service';

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
    id: this.firebase.createId(),
    id_user: this.sesion.getUser()?.id
  };

  constructor( private firebase: FirebaseService, private sesion: sesionService) { }

  ngOnInit() {
    this.test()
  }

  test(){
  this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data =>{
    console.log(data)});
  }

  agregarVehiculo(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoVehiculo)
      this.firebase.createDocumentID(this.nuevoVehiculo, 'vehiculos', this.nuevoVehiculo.id)
      form.resetForm(); 
    }

  }
}
