import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';
import { Ubicacion } from 'src/app/interfaces/viaje.model';

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
  transparency: boolean = false;
  myLocation!: Ubicacion;

  constructor(private menuController: MenuController, private modalController: ModalController) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
   this.menuController.enable(false, 'main');
   this.transparency = true;
   this.initMap()
  
  }

  ionViewDidLeave(){
    this.menuController.enable(true, 'main');
    this.transparency = false;
    this.newMap?.destroy();
  }

  async initMap() {
    const mapRef = document.getElementById('map');
    if (mapRef) { 
      this.newMap = await GoogleMap.create({
        id: 'my-map',
        element: mapRef,
        apiKey: apiKey,
        language: 'es',
        config: {
          center: {
            lat: -36.79525,
            lng: -73.06216,
          },
          zoom: 16,
        },
      });

      this.newMap.enableCurrentLocation(true)

      this.setMyLocation()

      this.newMap.setOnMapClickListener( res => {
        console.log('setOnMapClickListener => ', res)
      })

    } else {
      console.error('Map element not found!');
    }
  }
  

  setMyLocation(){
    this.newMap.setOnMapClickListener( async (res)=> {
      console.log('MapClickListener =>', res );
      this.setMarkerMyposition(res.latitude , res.longitude)
    })
  }

  async setMarkerMyposition(latitude: number, longitude: number){
    if (this.myLocation?.id) {
      try {
        await this.newMap.removeMarker(this.myLocation.id);
      } catch (error) {
        console.error('Error removing previous marker:', error);
      }
    }
    this.myLocation = { 
      name: 'Destino',
      descripcion: 'Esta es la ubicacion del destino',
      marker: {
        title: 'Destino',
        draggable: false,
        coordinate: {
          lat: latitude,
          lng: longitude,
        }
      }
    }
    const id = await this.newMap.addMarker(this.myLocation.marker);
    this.myLocation.id = id;

    this.centerMarkerWithBounds(this.myLocation.marker)
  }

  centerMarkerWithBounds(marker: Marker) {
    this.newMap.setCamera({
      coordinate: {
        lat: marker.coordinate.lat,
        lng: marker.coordinate.lng,
      },
      animate: true,
      // zoom: 16, 
    });
  }

  
  
}
