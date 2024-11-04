import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Vehiculo } from '../../interfaces/vehiculo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
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
  };

  vehiculos: Vehiculo[] = [];

  viajes: Viaje[] = [];
  
  cargando: boolean | undefined;

  userId = this.sesion.getUser()?.id;
  

  constructor(private firebase: FirebaseService, private sesion: sesionService) {}

  ngOnInit() {
    this.cargarvehiculos()
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
