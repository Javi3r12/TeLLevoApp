import { Component, OnInit } from '@angular/core';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { Viaje, ViajeExtendido } from 'src/app/interfaces/viaje.model';
import { ViajesIns } from 'src/app/interfaces/viajeIns';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.page.html',
  styleUrls: ['./noti.page.scss'],
})
export class NotiPage implements OnInit {

  viajes: ViajeExtendido[] = [];
  userId: any;
  usuarios: usuarioLog[] = [];
  loaded = false;
  notificacionesNoVistas: number = 0;


  constructor(
    private firebase: FirebaseService,
    private sesion: sesionService,

  ) { 
    this.userId = this.sesion.getUser()?.id;
  }

  ngOnInit() {
    console.log('userid =>',this.userId)
    this.cargarviajes();
  }

  cargarviajes() {
    this.firebase.getCollectionChanges<Viaje>('viajes').subscribe(viajes => {
      if (viajes) {
        const viajesUsuario = viajes.filter(v => v.id_user === this.userId);
        const viajeIds = viajesUsuario.map(v => v.id);
        this.firebase.getCollectionChanges<ViajesIns>('viajesIns').subscribe(viajesIns => {
          if (viajesIns) {
            const inscripciones = viajesIns.filter(ins => viajeIds.includes(ins.viaje));
            this.firebase.getCollectionChanges<usuarioLog>('usuario').subscribe(usuarios => {
              if (usuarios) {
                const usuariosMap = new Map(usuarios.map(u => [u.id, u.username]));
                this.viajes = viajesUsuario.map(viaje => {
                  const usuariosInscritos = inscripciones
                    .filter(ins => ins.viaje === viaje.id)
                    .map(ins => ({
                      username: usuariosMap.get(ins.usuario) || 'Usuario desconocido',
                      idInscripcion: ins.id,
                      visto: ins.visto,
                    }));
                  return { ...viaje, usuariosInscritos: usuariosInscritos || [] };
                });
                this.loaded = true;
                this.obtenerNotificacionesNoVistas(); 
              }
            });
          } else {
            this.loaded = true;
            this.obtenerNotificacionesNoVistas();  
          }
        });
      } else {
        this.loaded = true;
        this.obtenerNotificacionesNoVistas();  
      }
    });
  }

  
  obtenerNotificacionesNoVistas() {
    this.notificacionesNoVistas = this.viajes.reduce((acc, viaje) => {
      return acc + (viaje.usuariosInscritos?.filter(u => !u.visto).length || 0);
    }, 0);
    console.log(`Notificaciones no vistas: ${this.notificacionesNoVistas}`);
  }
  
  
  
  marcarComoVista(inscripcionId: string) {
  this.firebase.updateVistoEstado(inscripcionId, true).then(() => {
    const viaje = this.viajes.find(v => v.usuariosInscritos?.some(u => u.idInscripcion === inscripcionId));
    if (viaje) {
      const inscripcion = viaje.usuariosInscritos?.find(u => u.idInscripcion === inscripcionId);
      if (inscripcion) {
        inscripcion.visto = true;  
        this.obtenerNotificacionesNoVistas(); 
      }
    }
  }).catch(error => {
    console.error('Error al marcar como vista:', error);
  });
}

  
  
  
  
  obtenerUsernameUsuario(idUsuario: string): string {
    const usuario = this.usuarios.find(u => u.id === idUsuario);
    if (usuario) {
      return usuario.username.toUpperCase(); // Devuelvo el username en mayúsculas
    }
    return 'Usuario desconocido';
  }
  

}
