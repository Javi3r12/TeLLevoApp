import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Viaje2 } from 'src/app/interfaces/viaje.model copy'; 

@Component({
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.page.html',
  styleUrls: ['./gestion-viajes.page.scss'],
})
export class GestionViajesPage implements OnInit {

  viajes : Viaje2[] = [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.cargarviajes()
  }

  cargarviajes(){
    this.firebase.getCollectionChanges<Viaje2>('viajes').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.viajes)
        this.viajes = data
      }
    })
  }

}
