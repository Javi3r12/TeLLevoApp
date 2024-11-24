import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { sesionService } from 'src/app/services/sesion.service';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';

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
  Online = false;
  nuevoVehiculo: Vehiculo = {
    patente: '',
    tipo: '',
    modelo: '',
    color: '',
    id: this.firebase.createId(),
    id_user: this.sesion.getUser()?.id
  }

  constructor( private router: Router, private firebase: FirebaseService,
    public sesion: sesionService, private connectivityService: ConnectivityService,
    private localStorageService: LocalStorageService) {}

    async ngOnInit() {
      this.connectivityService.isOnline().then(isOnline => {
        console.log('¿Está en línea?', isOnline);
        this.Online = true;
      });
      this.Online = this.connectivityService.isBrowserOnline();
    
      if (this.Online) {
        // Espera a que los viajes y vehículos se carguen
        await this.cargarVehiculos();
        await this.cargarviajes();
    
        console.log('online');
        if (this.viajes.length > 1 && this.vehiculos.length > 1) {
          await this.guardarViajesEnLocal(this.viajes);
          await this.guardarVehiculosEnLocal(this.vehiculos);
        }
        console.log('almacenado local');
      } else {
        await this.cargarViajesDeLocal();
        await this.cargarVehiculosDeLocal();
      }
    }
    
    
  
  // sin conexion
  async guardarViajesEnLocal(viajes: Viaje[]) {
    if (viajes && viajes.length > 0) {
      await this.localStorageService.saveData('viajes', viajes);
      console.log('Viajes almacenados en local:', viajes);
    } else {
      console.log('No hay viajes para guardar.');
    }
  }
  
  async guardarVehiculosEnLocal(vehiculos: Vehiculo[]) {
    if (vehiculos && vehiculos.length > 0) {
      await this.localStorageService.saveData('vehiculos', vehiculos);
      console.log('Vehículos almacenados en local:', vehiculos);
    } else {
      console.log('No hay vehículos para guardar.');
    }
  }

  async cargarViajesDeLocal() {
    const viajesGuardados = await this.localStorageService.getData('viajes');
    if (viajesGuardados) {
      this.viajes = viajesGuardados;
      console.log('Viajes cargados de local:', this.viajes);
    } else {
      console.log('No se encontraron viajes en local.');
    }
  }
  
  async cargarVehiculosDeLocal() {
    const vehiculosGuardados = await this.localStorageService.getData('vehiculos');
    if (vehiculosGuardados) {
      this.vehiculos = vehiculosGuardados;
      console.log('Vehículos cargados de local:', this.vehiculos);
    } else {
      console.log('No se encontraron vehículos en local.');
    }
  }

  // normal

  irADetalle(viaje: Viaje) {
    console.log(viaje)
    this.router.navigate(['/detalle-viaje', viaje.id ]);
  }
  

  async cargarviajes() {
    return new Promise<void>((resolve) => {
      this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data => {
        console.log('Viajes obtenidos desde Firebase:', data); 
        if (data && data.length > 0) {
          this.viajes = data;
          this.results = data;
          console.log('Viajes asignados:', this.viajes);
        }
        resolve();
      });
    });
  }

  async cargarVehiculos() {
    return new Promise<void>((resolve) => {
      this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data => {
        console.log('Vehículos obtenidos desde Firebase:', data);
        if (data && data.length > 0) {
          this.vehiculos = data;
          console.log('Vehículos asignados:', this.vehiculos);
        }
        resolve();
      });
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
      viaje.destino.toLowerCase().includes(this.query) && 
      viaje.asientos > 0 && 
      viaje.id_user !== this.sesion.getUser()?.id && 
      viaje.activo
    );
  }
  



}
