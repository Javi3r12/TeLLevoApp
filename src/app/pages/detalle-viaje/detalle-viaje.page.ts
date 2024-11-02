import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo.model';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  viajee!: Viaje;
  vehiculo!: Vehiculo ;


  constructor(private firebase: FirebaseService, private route: ActivatedRoute, private alertctrl:AlertController, private router: Router ) {}

  ngOnInit() {
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.cargarViaje(viajeId);
      console.log(this.viajee)
      console.log(this.vehiculo)
    } else {
      this.router.navigate(['/home'])
    }


  }

  cargarViaje(id: string) {
    this.firebase.getDocument<Viaje>('viajes', id).subscribe(viaje => {
      if (viaje) {
        this.viajee = viaje; 
        if (viaje.vehiculo) { 
          this.cargarVehiculo(viaje.vehiculo);
        } else {
          console.error('El viaje no tiene un vehículo asignado.');
        }
      }
    });
  }

  cargarVehiculo(id: string) {
    this.firebase.getDocument<Vehiculo>('vehiculos', id).subscribe(vehiculo => {
      if (vehiculo) {
        this.vehiculo = vehiculo;
      } else {
        console.error('No se encontró el vehículo.');
      
      }});
  }



  irAPago() {
    this.router.navigate(['/pago', this.viajee.id]); 
   }
}
