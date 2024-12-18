import { Component, Input, OnInit,  Output, EventEmitter } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Ubicacion } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-place-detail-component',
  templateUrl: './place-detail-component.component.html',
  styleUrls: ['./place-detail-component.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class PlaceDetailComponentComponent  implements OnInit {

  @Input() ubicacion: Ubicacion = {
    name: '',
    descripcion: '',
    marker: {
      title: '',
      draggable: false,
      coordinate: {
        lat: 0,
        lng: 0
      }
    }
  }; 
  @Input() markNew!: string;
  @Input() IdViaje!: string;

  @Output() coordinatesSelected = new EventEmitter<{ lat: number, lng: number }>();
  
  isModalOpen = false;

  constructor(private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ubicacion => ', this.ubicacion);
    console.log('Nuevo? => ', this.markNew);
    console.log('ID viaje => ', this.IdViaje);
  
    if (this.ubicacion && this.ubicacion.marker && this.ubicacion.marker.coordinate) {
      const cords = {
        lat: this.ubicacion.marker.coordinate.lat,
        lng: this.ubicacion.marker.coordinate.lng
      };
      console.log('Lat => ', cords.lat);
      console.log('Lng => ', cords.lng);
    } else {
      console.error('Ubicación o coordenadas no definidas');
    }
  }

  dismiss(){
    this.modalController.dismiss();
    this.isModalOpen = false;
  }
  

  selectDestination() {
    if (this.ubicacion.marker?.coordinate) { 
      const cords = {
        lat: this.ubicacion.marker.coordinate.lat,
        lng: this.ubicacion.marker.coordinate.lng
      };
      console.log('Lat => ', cords.lat);
      console.log('Lng => ', cords.lng);
  
      console.log('editar => ', this.markNew);
  
      // Si estamos en "modo registro" (markNew es falso), solo pasamos las coordenadas
      if (this.markNew === 'registrar') {
        console.log('Registrar');
        this.dismiss();
        this.router.navigate(['/registrar-viaje'], {
          queryParams: { lat: cords.lat, lng: cords.lng }
        });
  
      } if (this.markNew === 'editar') { // Si estamos en "modo edición" (markNew es verdadero)
        if (this.IdViaje) { // Aseguramos que el IdViaje esté presente antes de redirigir
          console.log('Editar');
          this.dismiss();
          this.router.navigate(['/editar-viaje', this.IdViaje], {
            queryParams: { lat: cords.lat, lng: cords.lng }
          });
        } else {
          console.error('ID de viaje no disponible para edición');
        }
      }
    } else {
      console.error('Coordenadas no disponibles para la selección.');
    }
  }
  
  
  
}
