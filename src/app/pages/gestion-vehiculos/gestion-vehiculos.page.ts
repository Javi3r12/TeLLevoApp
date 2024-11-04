import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.page.html',
  styleUrls: ['./gestion-vehiculos.page.scss'],
})
export class GestionVehiculosPage implements OnInit {
  userId: any;
  vehiculos : Vehiculo[] = [];

  constructor(private firebase: FirebaseService, private router: Router,
    private alertctrl: AlertController, private sesion: sesionService) 
    { 
      this.userId = this.sesion.getUser()?.id;
    }

  ngOnInit() {
    this.cargarVehiculos()
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

  cargarVehiculos() {
    this.firebase.getCollectionChanges<{ id_user: string, id: string }>('vehiculos')
      .subscribe(viajeIns => {
        if (viajeIns) {
          console.log('viajesIns =>',viajeIns)

          const viajesUsuario = viajeIns.filter(v => v.id_user === this.userId);
          console.log('viajesUsuario', viajesUsuario)

          const viajeIds = viajesUsuario.map(v => v.id);
          console.log('viajesIds =>',viajeIds)

          this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data => {
            if (data) {
              console.log(data)
              this.vehiculos = data.filter(vehiculo => viajeIds.includes(vehiculo.id));
              console.log(this.vehiculos)
            }
          })
        }
      });
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
