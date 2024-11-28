import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; 
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sesionService } from 'src/app/services/sesion.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.page.html',
  styleUrls: ['./gestion-vehiculos.page.scss'],
})
export class GestionVehiculosPage implements OnInit {
  userId: any;
  vehiculos : Vehiculo[] = [];
  loaded = false; 
  isOnline = false;

  constructor(private firebase: FirebaseService, private router: Router,
    private alertctrl: AlertController, private sesion: sesionService,
    private connectivityService: ConnectivityService, private localStorageService: LocalStorageService) 
    { 
      this.userId = this.sesion.getUser()?.id;
    }

    async ngOnInit() {
      this.connectivityService.isOnline().then(isOnline => {
        console.log('¿Está en línea?', isOnline);
        this.isOnline = isOnline;
      });
      this.isOnline = this.connectivityService.isBrowserOnline();
  
      if (this.isOnline) {
        await this.cargarVehiculos();
        console.log('online');
        
      } else {
        await this.cargarVehiculosDeLocal();
      }
    }
  

  // sin conexion

  async cargarVehiculosDeLocal() {
    const vehiculosGuardados = await this.localStorageService.getData('vehiculos');
    if (vehiculosGuardados) {
      this.vehiculos = vehiculosGuardados.filter((vehiculo: Vehiculo) => vehiculo.id_user === this.userId);
      console.log('Vehículos cargados de local:', this.vehiculos);
    } else {
      console.log('No se encontraron vehículos en local.');
    }
  }

  // normal

  editarVehiculo(vehiculo: Vehiculo){
    console.log('edit =>', vehiculo)
    this.router.navigate(['/editar-vehiculo', vehiculo.id ]);

  }

  eliminarVehiculo(vehiculo: Vehiculo){
    console.log('eliminar =>', vehiculo)
    this.alerta(vehiculo)
    // this.firebase.deleteDocument('vehiculos', vehiculo.id)
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
              this.loaded = true;
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
