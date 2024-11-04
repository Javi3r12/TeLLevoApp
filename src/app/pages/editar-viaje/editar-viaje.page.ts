import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.page.html',
  styleUrls: ['./editar-viaje.page.scss'],
})
export class EditarViajePage implements OnInit {
  
  nuevoViaje: Viaje = {
    id: this.firebase.createId() ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0,
    activo: true,
    id_user: this.sesion.getUser()?.id
  };
  
  vehiculos: Vehiculo[] = [];

  constructor(private firebase: FirebaseService, private route: ActivatedRoute, 
    private alertctrl:AlertController, private router: Router, private sesion: sesionService ) { }


  ngOnInit() {
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
      }
    });
  }

  cargarvehiculos(){
    this.firebase.getCollectionChanges<Vehiculo>('vehiculos').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.vehiculos)
        this.vehiculos = data
      }
    })
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
