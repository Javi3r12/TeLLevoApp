import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';

const apiKey = environment.firebase.apiKey;

@Component({
  selector: 'app-map-dirreccion-viaje',
  templateUrl: './map-dirreccion-viaje.component.html',
  styleUrls: ['./map-dirreccion-viaje.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class MapDirreccionViajeComponent  implements OnInit {
  
  newMap!: GoogleMap;


  constructor(private menuController: MenuController) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
   this.menuController.enable(false, 'main');
   this.initMap()
  
  }

  ionViewDidLeave(){
    this.menuController.enable(true, 'main');
   
  }

  async initMap() {
    const mapRef = document.getElementById('map');
    if (mapRef) { 
      this.newMap = await GoogleMap.create({
        id: 'my-map',
        element: mapRef,
        apiKey: apiKey,
        config: {
          center: {
            lat: -36.79525,
            lng: -73.06216,
          },
          zoom: 16,
        },
      });
    } else {
      console.error('Map element not found!');
    }
  }
  
}
