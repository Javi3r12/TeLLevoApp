import { Component, OnInit } from '@angular/core';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { Viaje, ViajeExtendido } from 'src/app/interfaces/viaje.model';
import { ViajesIns } from 'src/app/interfaces/viajeIns';
import { ConnectivityService } from 'src/app/services/connectivity.service';
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
  isOnline = false;

  constructor(
    private firebase: FirebaseService,
    private sesion: sesionService,
    private connectivityService: ConnectivityService,

  ) { 
    this.userId = this.sesion.getUser()?.id;
  }

  ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline);
      this.isOnline = isOnline;
    });
    this.isOnline = this.connectivityService.isBrowserOnline();

    if (this.isOnline) {
      console.log('userid =>',this.userId)
      this.cargarviajes();
    } else {
      this.cargarDatosLocales();
    }
  }


  // sin conexion
  cargarDatosLocales() {
    const viajesGuardados = localStorage.getItem('viajesNoti');
    const notificacionesGuardadas = localStorage.getItem('notificacionesNoVistas');
    
    if (viajesGuardados && notificacionesGuardadas) {
      this.viajes = JSON.parse(viajesGuardados);
      this.notificacionesNoVistas = parseInt(notificacionesGuardadas, 10);
      this.loaded = true;
      console.log('Datos cargados desde localStorage');
    } else {
      console.log('No hay datos locales disponibles');
      this.loaded = true;
    }
  }
  // normal

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

                localStorage.setItem('viajesNoti', JSON.stringify(this.viajes));
                localStorage.setItem('notificacionesNoVistas', this.notificacionesNoVistas.toString());
              }
            });
          } else {
            this.loaded = true;
            this.obtenerNotificacionesNoVistas();  
            localStorage.setItem('notificacionesNoVistas', this.notificacionesNoVistas.toString());

          }
        });
      } else {
        this.loaded = true;
        this.obtenerNotificacionesNoVistas();  
        localStorage.setItem('notificacionesNoVistas', this.notificacionesNoVistas.toString());

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
