import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Vehiculo } from '../../interfaces/vehiculo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from '../../services/sesion.service';
import { DirrecionViajeComponent } from '../../components/dirrecion-viaje/dirrecion-viaje.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectivityService } from 'src/app/services/connectivity.service';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DirrecionViajeComponent,
    
  ],
  
})

export class RegistrarViajePage implements OnInit {
  
  nuevoViaje: Viaje = {
    id: this.firebase.createId() ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0,
    activo: true,
    id_user: this.sesion.getUser()?.id ,
    cord: {
      lat: 0, 
      lng: 0, 
    },

  };

  info = 'registrar';
  vehiculos: Vehiculo[] = [];

  viajes: Viaje[] = [];
  
  cargando: boolean | undefined;

  userId = this.sesion.getUser()?.id;
  isOnline = false;

  constructor(private firebase: FirebaseService, private sesion: sesionService,
    private route: ActivatedRoute,private connectivityService: ConnectivityService,
  ) {}

  ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline);
      this.isOnline = isOnline;
    });
    this.isOnline = this.connectivityService.isBrowserOnline();

    if (this.isOnline) {
      this.route.queryParams.subscribe(params => {
        if (params['lat'] && params['lng']) {
          this.nuevoViaje.cord.lat = +params['lat'];
          this.nuevoViaje.cord.lng = +params['lng'];
          console.log('Received coordinates:', this.nuevoViaje.cord.lat ,this.nuevoViaje.cord.lng );
        }
      });

      this.cargarvehiculos()
    } else {
      
    }
  }

  cargarvehiculos() {
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
            }
          })
        }
      });
  }

  agregarViaje(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoViaje)
      this.cargando = true;
      this.firebase.createDocumentID(this.nuevoViaje, 'viajes', this.nuevoViaje.id)
      this.cargando = false;
      form.resetForm(); 
    }
  }

}
