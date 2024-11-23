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
    if (this.userId) {
      this.monitorNotificaciones();
    }
  }

  monitorNotificaciones() {
    if (!this.userId) {
      this.newNotificationsCount = 0;
      return;
    }
      this.firebaseService.getCollectionChanges<Viaje>('viajes').subscribe((viajes: Viaje[]) => {
      if (viajes) {
        const viajesCreadosPorUsuario = viajes.filter(v => v.id_user === this.userId);
        const viajeIds = viajesCreadosPorUsuario.map(v => v.id);
        this.firebaseService.getCollectionChanges<ViajesIns>('viajesIns').subscribe((inscripciones: ViajesIns[]) => {
          if (inscripciones) {
            const inscripcionesDeViajes = inscripciones.filter(ins => viajeIds.includes(ins.viaje));
            const nuevasNotificaciones = inscripcionesDeViajes.filter(ins => 
              ins.visto === false && ins.usuario !== this.userId
            );
            
            this.newNotificationsCount = nuevasNotificaciones.length;
            // Forzar la detección de cambios en Angular
            this.cdr.detectChanges();
  
            console.log(`Nuevo contador de notificaciones: ${this.newNotificationsCount}`);
          }
        });
      }
    });
  }
  
  
}
