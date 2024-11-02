import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.page.html',
  styleUrls: ['./editar-vehiculo.page.scss'],
})
export class EditarVehiculoPage implements OnInit {

  nuevoVehiculo: Vehiculo = {
    patente: '',
    tipo: '',
    modelo: '',
    color: '',
    id: this.firebase.createId()
  };

  constructor( private alertctrl: AlertController, private firebase: FirebaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const VehiculoId = this.route.snapshot.paramMap.get('id');
    if (VehiculoId) {
      this.cargarVehiculo(VehiculoId);
    }
  }

  editarVehiculo(form: NgForm) {
    if (form.valid) {
      this.firebase.createDocumentID(this.nuevoVehiculo, 'vehiculos', this.nuevoVehiculo.id).then(() => {
        console.log("Viaje actualizado exitosamente");
        this.alerta()
      });
    } 
  }

  cargarVehiculo(id: string) {
    this.firebase.getDocument<Vehiculo>('vehiculos', id).subscribe(vehiculo => {
      if (vehiculo) {
        this.nuevoVehiculo = vehiculo;
      }
    });
  }

  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Vehiculo editado',
      message: 'Se edito el vehiculo correctamente,',
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
