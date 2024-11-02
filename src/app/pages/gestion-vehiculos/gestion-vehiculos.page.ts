import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.page.html',
  styleUrls: ['./gestion-vehiculos.page.scss'],
})
export class GestionVehiculosPage implements OnInit {
  
  vehiculos : Vehiculo[] = [];

  constructor(private firebase: FirebaseService, private router: Router, private alertctrl: AlertController) { }

  ngOnInit() {
    this.cargarvehiculos()
  }

  editarVehiculo(vehiculo: Vehiculo){
    console.log('edit =>', vehiculo)
    this.router.navigate(['/editar-vehiculo', vehiculo.id ]);

  }

  eliminarVehiculo(vehiculo: Vehiculo){
    console.log('eliminar =>', vehiculo)
    this.alerta(vehiculo)
    // this.firebase.deleteDocument('vehiculos', vehiculo.id)
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

  async alerta(vehiculo: Vehiculo){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Confirmacion',
      message: 'Seguro que desea eliminar este vehiculo,',
      buttons: [{
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler: () => {
          this.firebase.deleteDocument('vehiculos', vehiculo.id);
        }
      },{
        text: 'Cancelar'
      }],
    });

    await alert.present();
  }

}
