import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.page.html',
  styleUrls: ['./gestion-viajes.page.scss'],
})
export class GestionViajesPage implements OnInit {

  viajes : Viaje[] = [];

  constructor(private router: Router, private firebase: FirebaseService, private alertctrl: AlertController) { }

  ngOnInit() {
    this.cargarviajes()
  }

  editarViaje(viaje: Viaje){
    console.log('edit =>', viaje)
    this.router.navigate(['/editar-viaje', viaje.id ]);

  }

  eliminarViaje(viaje: Viaje){
    console.log('eliminar =>', viaje)
    this.alerta(viaje)
    // this.firebase.deleteDocument('viajes', viaje.id)
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

  async alerta(viaje: Viaje) {
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Confirmacion',
      message: 'Seguro que desea eliminar este vehiculo,',
      buttons: [{
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler: () => {
          this.firebase.deleteDocument('viajes', viaje.id)
        }
      },{
        text: 'Cancelar'
      }],
    });

    await alert.present();
  }
  
}
