import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loaded = false;

  constructor(
    private firebase: FirebaseService,
    private sesion: sesionService,
    private router: Router,
  ) { 
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

          const viajesUsuario = viajeIns.filter(v => v.usuario === this.userId);
          const viajeIds = viajesUsuario.map(v => v.viaje);

          this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(data => {
            if (data) {
              this.viajes = data.filter(viaje => viajeIds.includes(viaje.id));
              this.loaded = true;
            } else {
              this.loaded = true;
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

  irADetalle(viaje: Viaje) {
    console.log(viaje)
    this.router.navigate(['/detalle-viaje', viaje.id ]);
  }

}
