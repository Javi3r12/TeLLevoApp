import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  viajes: Viaje[] = [];

  ngOnInit() {
    this.cargarviajes()
  }
  cargarviajes(){
    this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.viajes)
        this.viajes = data;
        
      }
    })
  }
}
