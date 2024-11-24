import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { sesionService } from 'src/app/services/sesion.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirrecionViajeComponent } from '../../components/dirrecion-viaje/dirrecion-viaje.component';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DirrecionViajeComponent,
    
  ],
})
export class DetalleViajePage implements OnInit {

  viajee!: Viaje;
  vehiculo!: Vehiculo ;
  userId: any;
  viajes: Viaje[] = [];
  viajeEnHistorial: boolean = false;
  info = 'detalle';
  isOnline = false;

  constructor(private firebase: FirebaseService, private route: ActivatedRoute, private alertctrl:AlertController,
     private router: Router, private sesion: sesionService, private connectivityService: ConnectivityService, 
     private localStorageService: LocalStorageService ) {}

  ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline)
      isOnline = true;
    });

    this.isOnline = this.connectivityService.isBrowserOnline()
    const viajeId = this.route.snapshot.paramMap.get('id');
    
      if (viajeId) {
        if (this.isOnline) {

          this.cargarViaje(viajeId);
          console.log(this.viajee)
          console.log(this.vehiculo)
          this.cargarHistorial();
        } else {
          alert('Sin conexión a internet. Esta acción no está disponible.');
          this.cargarViajeDesdeLocal(viajeId);

        }
      } else {
        this.router.navigate(['/home'])

      }
  }

  // Funciones para trabajar en local
  async cargarViajeDesdeLocal(id: string) {
    try {
      const viajes: Viaje[] = await this.localStorageService.getData('viajes');
      if (viajes) {
        const viaje = viajes.find(v => v.id === id);
        if (viaje) {
          this.viajee = viaje;
          // Intentar cargar el vehículo desde el almacenamiento local
          this.cargarVehiculoDesdeLocal(viaje.vehiculo);
        } else {
          console.error('No se encontró el viaje en el almacenamiento local.');
          alert('No se encontró el viaje. Asegúrate de sincronizar los datos antes de usar esta función sin conexión.');
        }
      } else {
        console.error('No hay viajes almacenados localmente.');
        alert('No hay datos locales disponibles.');
      }
    } catch (error) {
      console.error('Error al cargar viajes desde el almacenamiento local:', error);
    }
  }
  
  async cargarVehiculoDesdeLocal(id: string) {
    try {
      const vehiculos: Vehiculo[] = await this.localStorageService.getData('vehiculos');
      if (vehiculos) {
        const vehiculo = vehiculos.find(v => v.id === id);
        if (vehiculo) {
          this.vehiculo = vehiculo;
        } else {
          console.error('No se encontró el vehículo en el almacenamiento local.');
        }
      } else {
        console.error('No hay vehículos almacenados localmente.');
      }
    } catch (error) {
      console.error('Error al cargar vehículos desde el almacenamiento local:', error);
    }
  }
  

  // Funciones normales con conexion

  cargarViaje(id: string) {
    this.firebase.getDocument<Viaje>('viajes', id).subscribe(viaje => {
      if (viaje) {
        this.viajee = viaje; 
        if (viaje.vehiculo) { 
          this.cargarVehiculo(viaje.vehiculo);
        } else {
          console.error('El viaje no tiene un vehículo asignado.');
        }
      }
    });
  }

  cargarVehiculo(id: string) {
    this.firebase.getDocument<Vehiculo>('vehiculos', id).subscribe(vehiculo => {
      if (vehiculo) {
        this.vehiculo = vehiculo;
      } else {
        console.error('No se encontró el vehículo.');
      
      }});
  }



  irAPago() {
    this.router.navigate(['/pago', this.viajee.id]); 
  }

  cargarHistorial() {
    this.userId = this.sesion.getUser()?.id;

    this.firebase.getCollectionChanges<{ usuario: string, viaje: string }>('viajesIns')
      .subscribe(viajeIns => {
        if (viajeIns) {
          const viajesUsuario = viajeIns.filter(v => v.usuario === this.userId);
          const viajeIds = viajesUsuario.map(v => v.viaje);
          this.viajeEnHistorial = viajeIds.includes(this.viajee.id);
        }
    });
  }
};
  

