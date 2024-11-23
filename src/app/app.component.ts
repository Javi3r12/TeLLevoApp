import { Component, ChangeDetectorRef } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { sesionService } from './services/sesion.service';
import { ViajesIns } from './interfaces/viajeIns';
import { Viaje } from './interfaces/viaje.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Viajes Disponibles', url: '/home', icon: 'home' },
    { title: 'Usuario', url: '/inicio', icon: 'person' },
    { title: 'Registrar Viaje', url: '/registrar-viaje', icon: 'paper-plane' },
    { title: 'Gestion Viajes', url: '/gestion-viajes', icon: 'map' },
    { title: 'Historial Viajes', url: '/historial-viajes', icon: 'time' },
    { title: 'Registrar Vehiculo', url: '/registrar-vehiculo', icon: 'car' },
    { title: 'Gestion Vehiculos', url: '/gestion-vehiculos', icon: 'build' },
    { title: 'Notificaciones', url: '/noti', icon: 'notifications' },
  ];

  newNotificationsCount = 0; 
  userId: any;

  constructor(
    private firebaseService: FirebaseService,
    private sesionService: sesionService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userId = this.sesionService.getUser()?.id;
   
  }

  actualizarNotificaciones() {
    this.userId = this.sesionService.getUser()?.id;
    if (!this.userId) {
      this.newNotificationsCount = 0;
      return;
    }
  
    // Obtener los viajes creados por el usuario
    this.firebaseService.getCollectionChanges<Viaje>('viajes').subscribe((viajes: Viaje[]) => {
      if (viajes) {
        const viajesCreadosPorUsuario = viajes.filter(v => v.id_user === this.userId);
        const viajeIds = viajesCreadosPorUsuario.map(v => v.id);
  
        // Obtener inscripciones asociadas a esos viajes
        this.firebaseService.getCollectionChanges<ViajesIns>('viajesIns').subscribe((inscripciones: ViajesIns[]) => {
          if (inscripciones) {
            // Filtrar inscripciones no vistas
            const nuevasNotificaciones = inscripciones.filter(ins => 
              viajeIds.includes(ins.viaje) && 
              ins.visto === false && 
              ins.usuario !== this.userId
            );
  
            // Actualizar contador
            this.newNotificationsCount = nuevasNotificaciones.length;
            this.cdr.detectChanges();
            console.log(`Nuevo contador de notificaciones: ${this.newNotificationsCount}`);
          }
        });
      }
    });
  }
  
  
}
