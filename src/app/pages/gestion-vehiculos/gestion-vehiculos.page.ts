import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.page.html',
  styleUrls: ['./gestion-vehiculos.page.scss'],
})
export class GestionVehiculosPage implements OnInit {
  
  vehiculos : Vehiculo[] = [];

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.cargarvehiculos()
  }

  editarVehiculo(vehiculo: Vehiculo){
    console.log('edit =>', vehiculo)
    this.router.navigate(['/editar-vehiculo', vehiculo.id ]);

  }

  eliminarVehiculo(vehiculo: Vehiculo){
    console.log('eliminar =>', vehiculo)
    this.firebase.deleteDocument('vehiculos', vehiculo.id)
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
