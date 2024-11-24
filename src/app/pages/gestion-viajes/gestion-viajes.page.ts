import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sesionService } from 'src/app/services/sesion.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';

@Component({
  selector: 'app-gestion-viajes',
  templateUrl: './gestion-viajes.page.html',
  styleUrls: ['./gestion-viajes.page.scss'],
})
export class GestionViajesPage implements OnInit {
  userId: any;
  viajes : Viaje[] = [];
  loaded = false;
  isOnline  = false;

  constructor(private router: Router, private firebase: FirebaseService, 
    private alertctrl: AlertController, private sesion: sesionService,
    private connectivityService: ConnectivityService, private localStorageService: LocalStorageService) 
    {
      this.userId = this.sesion.getUser()?.id;
     }

  ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline)
      isOnline = true;
    });

    this.isOnline = this.connectivityService.isBrowserOnline()
    if (this.isOnline){
      this.cargarviajes()
    } else {
      this.cargarViajesDeLocal()
    }
  }

  // sin conexion

  async cargarViajesDeLocal() {
    const vehiculosGuardados = await this.localStorageService.getData('viajes');
    if (vehiculosGuardados) {
      this.viajes = vehiculosGuardados.filter((viaje: Viaje) => viaje.id_user === this.userId);
      console.log('Viajes cargados de local:', this.viajes);
    } else {
      console.log('No se encontraron viajes en local.');
    }
  }

  // normal
  
  editarViaje(viaje: Viaje){
    console.log('edit =>', viaje)
    this.router.navigate(['/editar-viaje', viaje.id ]);

  }

  iniciarViaje(viaje: Viaje){
    if(viaje){
      console.log(viaje)
      this.alertaInicio(viaje);
    }
  }

  eliminarViaje(viaje: Viaje){
    console.log('eliminar =>', viaje)
    this.alerta(viaje)
    // this.firebase.deleteDocument('viajes', viaje.id)
  }

  cargarviajes() {
    this.firebase.getCollectionChanges<{ id_user: string, id: string }>('viajes')
      .subscribe(viajeIns => {
        if (viajeIns) {
          console.log('viajesIns =>',viajeIns)

          const viajesUsuario = viajeIns.filter(v => v.id_user === this.userId);
          console.log('viajesUsuario', viajesUsuario)

          const viajeIds = viajesUsuario.map(v => v.id);
          console.log('viajesIds =>',viajeIds)

          this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data => {
            if (data) {
              console.log('data =>',data)
              this.viajes = data.filter(viaje => viajeIds.includes(viaje.id));

              console.log('viaje =>', viajeIds)
              console.log('viajes =>', this.viajes)
              this.loaded = true;
              console.log(this.loaded)
            }
          });
        }
      });
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
  
  async alertaInicio(viaje: Viaje){
    const alert = await this.alertctrl.create({
      header: 'Confirmacion',
      message: 'Seguro que desea eliminar este vehiculo,',
      buttons: [{ text: 'aceptar',
                  cssClass: 'color-aceptar', 
                  handler: ()=> {viaje.activo = false;
                    this.firebase.createDocumentID(viaje, 'viajes', viaje.id).then(() => {
                    console.log("Viaje actualizado exitosamente");
                  })} },
                {text: 'cancelar'}]
    })
    await alert.present();
    
  }
}
