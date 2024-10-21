import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  viaje: Viaje | null = null;

  constructor(private alertctrl:AlertController, private router: Router, private viajerService: ViajeService) { }

  ngOnInit() {
    this.viaje = this.viajerService.obtenerViajeActual();

    if (!this.viaje) {
      this.router.navigate(['/home']); 
    }
  }

  cancelarPago(){
    this.alerta()
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
          console.log(event);
        }
      }],
    });

    await alert.present();
  }

}
