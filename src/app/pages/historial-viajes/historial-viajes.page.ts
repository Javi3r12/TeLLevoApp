import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  viajes: Viaje[] = [];
  userId: any;
  vehiculos: Vehiculo[] = [];


  constructor(
    private firebase: FirebaseService,
    private sesion: sesionService
  ) { 
    // Obtener el ID del usuario logueado
    this.userId = this.sesion.getUser()?.id;
  }

  ngOnInit() {
    this.cargarVehiculos()
    console.log('userid =>',this.userId)
    this.cargarviajes();
  }

  cargarviajes() {
    this.firebase.getCollectionChanges<{ usuario: string, viaje: string }>('viajesIns')
      .subscribe(viajeIns => {
        if (viajeIns) {
          console.log('viajesIns =>',viajeIns)

          const viajesUsuario = viajeIns.filter(v => v.usuario === this.userId);
          console.log('viajesUsuario', viajesUsuario)

          const viajeIds = viajesUsuario.map(v => v.viaje);
          console.log('viajesIds =>',viajeIds)

          this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data => {
            if (data) {
              console.log('data =>',data)
              this.viajes = data.filter(viaje => viajeIds.includes(viaje.id));
              console.log('viaje =>', viajeIds)
              console.log('viajes =>', this.viajes)
            }
          });
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

  cargarVehiculos() {
    this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data => {
      if (data) {
        this.vehiculos = data; 
      }
    });
  }
}
