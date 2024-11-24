import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ViajesIns } from 'src/app/interfaces/viajeIns';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';
import { sesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  viajes: Viaje[] = [];
  viajesIns: Viaje[] = [];
  userId: any;
  vehiculos: Vehiculo[] = [];
  loaded = false;
  isOnline = false;

  constructor(
    private firebase: FirebaseService,
    private sesion: sesionService,
    private router: Router,private connectivityService: ConnectivityService,
    private localStorageService: LocalStorageService
  ) { 
    this.userId = this.sesion.getUser()?.id;
  }

  async ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline);
      this.isOnline = true;
    });
    this.isOnline = this.connectivityService.isBrowserOnline();
  
    if (this.isOnline) {
      await this.cargarVehiculos();
      console.log('userid =>', this.userId);
      await this.cargarviajes();
      if (this.viajes.length > 0) {
        await this.guardarViajesInsEnLocal(this.viajesIns);
      }
    } else {
      console.log('userid =>', this.userId);

      await this.cargarVehiculosDeLocal();
      await this.cargarViajesInsDeLocal();
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
  
  async cargarViajesInsDeLocal() {
    const viajesGuardados = await this.localStorageService.getData('viajesIns');
    if (viajesGuardados) {
      this.viajes = viajesGuardados
      console.log('Viajes cargados de local:', this.viajes);
    } else {
      console.log('No se encontraron viajes en local.');
    }
  }

  async guardarViajesInsEnLocal(viajesIns: Viaje[]) {
    if (viajesIns && viajesIns.length > 0) {
      await this.localStorageService.saveData('viajesIns', viajesIns);
      console.log('Viajes almacenados en local:', viajesIns);
    } else {
      console.log('No hay viajes para guardar o los datos están vacíos.');
    }
  }
  
  
  //normal
  
  


  async cargarviajes() {
    return new Promise<void>((resolve, reject) => {
      this.firebase.getCollectionChanges<{ usuario: string, viaje: string }>('viajesIns')
        .subscribe(viajeIns => {
          console.log('Datos de viajesIns:', viajeIns);
          if (viajeIns) {
            const viajesUsuario = viajeIns.filter(v => v.usuario === this.userId);
            console.log('Viajes del usuario:', viajesUsuario);
            const viajeIds = viajesUsuario.map(v => v.viaje);
  
            this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data => {
              console.log('Datos de viajes:', data);
              if (data) {
                this.viajes = data.filter(viaje => viajeIds.includes(viaje.id));
                this.viajesIns = this.viajes;
                this.loaded = true;
                resolve(); 
              } else {
                this.loaded = true;
                resolve();
              }
            }, reject);
          }
        }, reject);
    });
  }
  obtenerModeloVehiculo(idVehiculo: string): string {
    const vehiculo = this.vehiculos.find(v => v.id === idVehiculo); 
    if (vehiculo) {
      return `${vehiculo.modelo} (${vehiculo.tipo})`; 
    }
    return 'Desconocido';
  }

  async cargarVehiculos() {
    this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data => {
      if (data) {
        this.vehiculos = data; 
      }
    });
  }

  irADetalle(viaje: Viaje) {
    console.log(viaje)
    this.router.navigate(['/detalle-viaje', viaje.id ]);
  }

}
