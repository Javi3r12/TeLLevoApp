import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: Viaje[] = [];
  results: Viaje[] = [];
  query: string = '';

  constructor( private router: Router, private firebase: FirebaseService) {}

  ngOnInit() {
    this.cargarviajes()
    this.results = [...this.viajes]
  }
  irADetalle(id: string) {
    this.router.navigate(['/detalle-viaje', id ]);
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

  handleInput(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.query = query;

    if (query === ''){
      this.results = [];
    } else {
      this.results = this.viajes.filter((viaje)=> 
        viaje.destino.toLowerCase().includes(this.query));
    }
   
  }


}
