import { Component, OnInit, Input} from '@angular/core';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';
import { Ubicacion } from 'src/app/interfaces/viaje.model';
import { PlaceDetailComponentComponent } from '../place-detail-component/place-detail-component.component';

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
   schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
})
export class MapDirreccionViajeComponent  implements OnInit {
  
  initialCoordinates?: { lat: number, lng: number };
  newMap!: GoogleMap;
  transparency: boolean = false;
  myLocation!: Ubicacion;
  private isListenerAttached = false;
  idviaje: string = '';
  private modalOpen = false;
  editar = false;

  constructor(private menuController: MenuController, private modalController: ModalController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Gestión de parámetros iniciales
    this.route.queryParams.subscribe(params => {
      if (params['lat'] && params['lng'] && params['idViaje']) {
        this.initialCoordinates = {
          lat: parseFloat(params['lat']),
          lng: parseFloat(params['lng'])
        };
        this.idviaje = params['idViaje'];
        if (this.initialCoordinates) {
          this.editar = true;
          if (!this.newMap) {
            this.initMap();
          }
        }
      } else {
        console.error("No coordinates found in query params");
      }
    });
  }

  ngAfterViewInit() {
    if (!this.newMap) {
      this.initMap();
    }
  }

  ionViewDidEnter() {
    this.menuController.enable(false, 'main');
    if (!this.newMap) {
      this.initMap(); 
    }
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'main');
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
          center: this.initialCoordinates || { lat: -36.79525, lng: -73.06216 },
          zoom: 16,
        },
      });

      if (this.initialCoordinates) {
        this.setMarkerMyposition(this.initialCoordinates.lat, this.initialCoordinates.lng);
      }

      if (!this.editar) {
        this.newMap.enableCurrentLocation(true);
      }

      this.setMyLocation();
    } else {
      console.error('Map element not found!');
    }
  }

  async setMyLocation() {
    if (this.isListenerAttached) {
      return; // Evita adjuntar el listener más de una vez
    }
  
    this.newMap.setOnMapClickListener(async (res) => {
      console.log('MapClickListener =>', res);
  
      if (this.modalOpen) {
        console.log('El modal ya está abierto.');
        return; // Evita la apertura del modal si ya está abierto
      }
  
      // Añadir marcador en la posición clickeada
      await this.setMarkerMyposition(res.latitude, res.longitude);
  
      // Mostrar el modal
      this.showDetailMarker(this.myLocation, this.editar, this.idviaje);
    });
  
    this.isListenerAttached = true; // Marca el listener como activo
  }

  async setMarkerMyposition(latitude: number, longitude: number) {
    if (!this.newMap) {
      console.error('El mapa no está inicializado.');
      return;
    }
  
    if (!this.myLocation) {
      this.myLocation = {
        name: 'Destino',
        descripcion: 'Esta es la ubicacion del destino',
        marker: null, // Inicialmente null
      };
    }
  
    // Eliminar marcador anterior si ya existe
    if (this.myLocation.marker && this.myLocation.id) {
      console.log("Eliminando marcador con ID:", this.myLocation.id);
      try {
        await this.removePreviousMarker();
      } catch (error) {
        console.error('Error al eliminar marcador anterior:', error);
      }
    }
  
    const newMarker: Marker = {
      title: 'Destino',
      draggable: false,
      coordinate: { lat: latitude, lng: longitude },
    };
  
    this.myLocation.marker = newMarker;
  
    try {
      const id = await this.newMap.addMarker(this.myLocation.marker);
      this.myLocation.id = id; // Asignar nuevo ID al marcador
      this.centerMarkerWithBounds(this.myLocation.marker);
    } catch (error) {
      console.error('Error al agregar marcador:', error);
    }
  }

  centerMarkerWithBounds(marker: Marker) {
    this.newMap.setCamera({
      coordinate: {
        lat: marker.coordinate.lat,
        lng: marker.coordinate.lng,
      },
      animate: true,
    });
  }

  async showDetailMarker(ubicacion: Ubicacion, markNew: boolean, IdViaje: string) {
    if (this.modalOpen) {
      console.log('Modal ya está abierto');
      return; // Evitar que se cree un modal si ya está abierto
    }
  
    this.modalOpen = true; // Marca el modal como abierto
  
    const modal = await this.modalController.create({
      component: PlaceDetailComponentComponent,
      componentProps: { ubicacion, markNew, IdViaje },
      initialBreakpoint: 0.45,
      breakpoints: [0, 0.45, 0.55],
    });
  
    modal.onDidDismiss().then((data) => {
      this.modalOpen = false; // Cambiar el estado cuando el modal se cierra
  
      if (data.data) {
        const { lat, lng } = data.data;
        console.log('Coordenadas recibidas del modal:', lat, lng);
  
        // Actualizar marcador con las nuevas coordenadas
        if (this.myLocation && this.myLocation.marker) {
          this.myLocation.marker.coordinate.lat = lat;
          this.myLocation.marker.coordinate.lng = lng;
          this.updateMarkerInMap();
        }
      }
    });
  
    await modal.present();
  }
  

  async removePreviousMarker() {
    if (this.newMap && this.myLocation && this.myLocation.id) {
      try {
        console.log("Eliminando marcador con ID:", this.myLocation.id);
        await this.newMap.removeMarker(this.myLocation.id);
        this.myLocation.marker = null;
        this.myLocation.id = undefined;
      } catch (error) {
        console.error('Error al eliminar marcador:', error);
      }
    } else {
      console.warn('El mapa o el marcador no están inicializados correctamente.');
    }
  }
  
  
  

  async updateMarkerInMap() {
    try {
      if (this.myLocation && this.myLocation.marker) {
        // Guardar las coordenadas antes de asignar null al marcador
        const { coordinate } = this.myLocation.marker;
  
        // Verificar si `coordinate` es accesible antes de usarlo
        if (coordinate) {
          // Descartar el marcador anterior sin intentar removerlo
          this.myLocation.marker = null;
          this.myLocation.id = undefined;
  
          // Agregar un nuevo marcador solo si `coordinate` no es null
          const newMarker: Marker = {
            title: 'Destino',
            draggable: false,
            coordinate: {
              lat: coordinate.lat,
              lng: coordinate.lng,
            },
          };
  
          const newMarkerId = await this.newMap.addMarker(newMarker);
          this.myLocation.id = newMarkerId;
          this.centerMarkerWithBounds(newMarker);
        } else {
          console.error('El marcador no tiene coordenadas válidas.');
        }
      }
    } catch (error) {
      console.error('Error al actualizar el marcador:', error);
    }
  }
  
  
  
}
