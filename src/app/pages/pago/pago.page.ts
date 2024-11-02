import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  viaje: Viaje | null = null;

  constructor(private alertctrl:AlertController, private router: Router, private route: ActivatedRoute ,private firebase: FirebaseService ) { }

  ngOnInit() {
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
    } else {
      this.router.navigate(['/home']); 
    }
  }

  cancelarPago(){
    this.alerta()
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

}
