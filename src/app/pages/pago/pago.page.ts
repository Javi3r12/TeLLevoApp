import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import {  NgForm } from '@angular/forms';
import { ViajesIns } from 'src/app/interfaces/viajeIns';
import { sesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  viaje: Viaje = {
    id: '' ,
    destino: '',
    asientos: 0,
    vehiculo: '',
    descripcion: '',
    precio: 0,
    activo: true, 
    id_user: '',
    cord: {
      lat: 0, 
      lng: 0, 
    },
  };

  viajesIns : ViajesIns = {
    id: '',
    usuario: '',
    viaje: '',
    visto: false
  };

  asientos: number | undefined ;
  uno = 1; 
  pago: string | undefined ; 

  constructor(private alertctrl:AlertController, private router: Router, private route: ActivatedRoute ,
    private firebase: FirebaseService, public sesion: sesionService ) { }

  ngOnInit() {
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
    } else {
      this.router.navigate(['/home']); 
    }
  }

  cancelarPago(form: NgForm){
    if(form.valid && this.viaje.asientos > 0 ){
      this.asientos = this.viaje.asientos;
      this.asientos = (this.asientos - 1) ;
      this.viaje.asientos = this.asientos;
      this.firebase.createDocumentID(this.viaje, 'viajes', this.viaje.id).then(() => {
        console.log("Viaje actualizado exitosamente");

        this.viajesIns.id = this.firebase.createId();
        this.viajesIns.usuario = this.sesion.getUser()?.id;
        this.viajesIns.viaje = this.viaje.id;
        this.viajesIns.visto = false;

        this.firebase.createDocumentID(this.viajesIns, 'viajesIns', this.viajesIns.id ).then(() => {
          console.log("Viaje actualizado exitosamente");
          this.alerta()
        })
        // this.alerta()
      })
      // this.alerta()
    } if(form.invalid) {
      console.log('error de pago')
      this.alertaPago()
    }
  }

  cargarViaje(id: string) {
    this.firebase.getDocument<Viaje>('viajes', id).subscribe(viaje => {
      if (viaje) {
        this.viaje = viaje;
      }
    });
  }

  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Metodo confirmado',
      subHeader: 'Pago realizado',
      message: 'Se confirmo correctamente el pago',
      buttons: [{
        id:'aceptar del alert controller',
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler:()=>{
          this.router.navigate(['/home']);
        }
      }],
    });

    await alert.present();
  }

  async alertaPago(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Debe seleccionar un metodo',
      message: 'Debe completar el metodo de pago para continuar con el pago',
      buttons: [
        {text: 'aceptar'}
      ],
    });

    await alert.present();
  }
}
