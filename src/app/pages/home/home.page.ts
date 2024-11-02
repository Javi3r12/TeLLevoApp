import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: Viaje[] = [];
  results: Viaje[] = [];
  query: string = '';
  vehiculos: Vehiculo[] = [];

  nuevoVehiculo: Vehiculo = {
    patente: '',
    tipo: '',
    modelo: '',
    color: '',
    id: this.firebase.createId()
  }

  constructor( private router: Router, private firebase: FirebaseService) {}

  ngOnInit() {
    this.cargarVehiculos()
    this.cargarviajes()
  }
  
  irADetalle(viaje: Viaje) {
    console.log(viaje)
    this.router.navigate(['/detalle-viaje', viaje.id ]);
  }
  

  cargarviajes(){
    this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.viajes)
        this.viajes = data;
        this.results = data;
        
      }
    })
  }

  cargarVehiculos() {
    this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data => {
      if (data) {
        this.vehiculos = data; 
      }
    });
  }

  obtenerModeloVehiculo(idVehiculo: string): string {
    const vehiculo = this.vehiculos.find(v => v.id === idVehiculo); 
    if (vehiculo) {
      return `${vehiculo.modelo} (${vehiculo.tipo})`; 
    }
    return 'Desconocido';
  }
  


  handleInput(event: any) {
    this.query = event.target.value.toLowerCase(); 
    this.results = this.viajes.filter(viaje => 
      viaje.destino.toLowerCase().includes(this.query) 
    );
  }



}
