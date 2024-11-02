import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.page.html',
  styleUrls: ['./gestion-vehiculos.page.scss'],
})
export class GestionVehiculosPage implements OnInit {
  
  vehiculos : Vehiculo[] = [];

  constructor(private firebase: FirebaseService) { }

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

}
