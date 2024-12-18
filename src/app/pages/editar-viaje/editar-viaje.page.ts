import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from 'src/app/services/sesion.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirrecionViajeComponent } from '../../components/dirrecion-viaje/dirrecion-viaje.component';


@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.page.html',
  styleUrls: ['./editar-viaje.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DirrecionViajeComponent,
    
  ],
})
export class EditarViajePage implements OnInit {
  
  info = 'editar';

  nuevoViaje: Viaje = {
    id: this.firebase.createId() ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0,
    activo: true,
    id_user: this.sesion.getUser()?.id,
    cord: {
      lat: 0, 
      lng: 0, 
    },
  };
  userId = this.sesion.getUser()?.id;
  vehiculos: Vehiculo[] = [];
  loaded = false;

  constructor(private firebase: FirebaseService, private route: ActivatedRoute, 
    private alertctrl:AlertController, private router: Router, private sesion: sesionService ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['lat'] && params['lng']) {
        this.nuevoViaje.cord.lat = params['lat'];
        this.nuevoViaje.cord.lng = params['lng'];
        console.log('Received coordinates:', this.nuevoViaje.cord.lat ,this.nuevoViaje.cord.lng );
      }
    });

    this.cargarvehiculos();
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
    }
  }

  editarViaje(form: NgForm) {
    if (form.valid) {
      this.firebase.createDocumentID(this.nuevoViaje, 'viajes', this.nuevoViaje.id).then(() => {
        console.log("Viaje actualizado exitosamente");
        this.alerta()
      });
    } 
  }

  cargarViaje(id: string) {
    this.firebase.getDocument<Viaje>('viajes', id).subscribe(viaje => {
      if (viaje) {
        this.nuevoViaje = viaje;

        console.log("Cargando coordenadas:", this.nuevoViaje.cord);
      
      }
    });
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
              this.loaded = true;
            }
          })
        }
      });
  }

  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Viaje editado',
      message: 'Se edito el viaje correctamente,',
      buttons: [{
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }],
    });

    await alert.present();
  }
}
