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
  myLocation: Ubicacion | null = null;
  private isListenerAttached = false;
  idviaje: string = '';
  private modalOpen = false;
  editar = false;
  info: string= '';

  constructor(private menuController: MenuController, private modalController: ModalController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['lat'] && params['lng'] && params['idViaje'] || params['info']) {
        this.initialCoordinates = {
          lat: parseFloat(params['lat']),
          lng: parseFloat(params['lng'])
        };
        this.idviaje = params['idViaje'];
        this.info = params['info'];
        console.log('Info =>', this.info);
  
        // Configurar modo según el tipo de vista
        this.editar = this.info === 'editar' || this.info === 'registrar';
        if (!this.newMap) {
          this.initMap();
        }
      } else {
        console.error("No se encontraron parámetros en la URL");
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
    
    if (this.newMap) {
      this.resetMapState(); // Restablece el estado del mapa según el contexto
    } else {
      this.initMap();
    }
  }
  
  

  ionViewDidLeave() {
    this.menuController.enable(true, 'main');
  
    if (this.newMap) {
      this.newMap.setOnMapClickListener(undefined); // Limpia el listener
      this.newMap.destroy(); // Destruye el mapa
      this.newMap = null as unknown as GoogleMap; // Opcional: fuerza a limpiar con un cast si es necesario
    }
  
    this.isListenerAttached = false;
    this.myLocation = null; // Limpia la ubicación para evitar datos residuales
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
  
      // Agregar marcador inicial si hay coordenadas
      if (this.initialCoordinates) {
        this.setMarkerMyposition(this.initialCoordinates.lat, this.initialCoordinates.lng);
      }
  
      // Configurar modo según el estado (detalle, editar, registrar)
      if (!this.editar) {
        await this.setReadOnlyMode(); // Bloquear interacciones
      } else {
        await this.newMap.enableCurrentLocation(true);
        this.setMyLocation();
      }
    } else {
      console.error('¡Elemento del mapa no encontrado!');
    }
  }
  

  async setReadOnlyMode() {
    if (this.newMap) {
      await this.newMap.setCamera({
        animate: false,
        zoom: 16,
        coordinate: this.initialCoordinates || { lat: -36.79525, lng: -73.06216 },
      });
  
      // Limpia cualquier listener existente
      this.newMap.setOnMapClickListener(undefined);
      this.isListenerAttached = false; // Asegúrate de actualizar el estado del listener
  
      console.log('El mapa está en modo solo lectura.');
    } else {
      console.error('El mapa no está inicializado.');
    }
  }
  
  
  
  async disableGestures() {
    if (this.newMap) {
      await this.newMap.setCamera({
        animate: false,
        zoom: 16,
        coordinate: this.initialCoordinates || { lat: -36.79525, lng: -73.06216 },
      });
  
      console.log('Gestos deshabilitados para modo detalle.');
    }
  }
  
  async setMyLocation() {
    if (this.isListenerAttached || !this.editar) {
      return; // No adjuntar listeners si ya están adjuntos o en modo "detalle"
    }
  
    this.newMap.setOnMapClickListener(async (res) => {
      if (!this.editar) {
        console.log('Modo detalle: no se permiten interacciones.');
        return;
      }
  
      if (this.modalOpen) {
        console.log('El modal ya está abierto.');
        return;
      }
  
      // Añadir marcador en la posición clickeada
      await this.setMarkerMyposition(res.latitude, res.longitude);
  
      // Mostrar el modal
      if (this.myLocation) {
        this.showDetailMarker(this.myLocation, this.info, this.idviaje);
      } else {
        console.log('No se puede mostrar el detalle, ya que la ubicación es nula.');
      }    
    });
  
    this.isListenerAttached = true;
  }
  
  
  

  async setMarkerMyposition(latitude: number, longitude: number) {
    if (!this.newMap) {
      console.error('El mapa no está inicializado.');
      return;
    }
  
    // Si ya existe un marcador, lo eliminamos
    if (this.myLocation && this.myLocation.marker) {
      console.log('Eliminando marcador previo.');
      await this.removePreviousMarker();
    }
  
    // Crear un nuevo marcador
    const newMarker: Marker = {
      title: 'Destino',
      draggable: this.editar,  // Solo es arrastrable en modo "editar"
      coordinate: { lat: latitude, lng: longitude },
    };
  
    try {
      const id = await this.newMap.addMarker(newMarker);
      this.myLocation = {
        name: 'Destino',
        descripcion: 'Ubicación seleccionada',
        marker: newMarker,
        id: id,
      };
      this.centerMarkerWithBounds(newMarker);
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

  async showDetailMarker(ubicacion: Ubicacion, markNew: string, IdViaje: string) {
    if (!this.editar) {
      console.log('Modal deshabilitado en modo "detalle".');
      return; // No abrir modal en modo "detalle"
    }
  
    if (this.modalOpen) {
      console.log('Modal ya está abierto');
      return;
    }
  
    this.modalOpen = true;
  
    const modal = await this.modalController.create({
      component: PlaceDetailComponentComponent,
      componentProps: { ubicacion, markNew, IdViaje },
      initialBreakpoint: 0.45,
      breakpoints: [0, 0.45, 0.55],
    });
  
    modal.onDidDismiss().then((data) => {
      this.modalOpen = false;
  
      if (data.data) {
        const { lat, lng } = data.data;
        console.log('Coordenadas recibidas del modal:', lat, lng);
  
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
  
  
  async resetMapState() {
    if (!this.newMap) {
      console.error('El mapa no está inicializado.');
      return;
    }
  
    // Limpia cualquier listener existente
    this.newMap.setOnMapClickListener(undefined);
    this.isListenerAttached = false;
  
    // Configura el mapa según el tipo de vista
    if (this.editar) {
      await this.newMap.enableCurrentLocation(true); // Modo edición o registro
      this.setMyLocation();
    } else {
      await this.setReadOnlyMode(); // Modo detalle (solo lectura)
      if (this.initialCoordinates) {
        this.setMarkerMyposition(this.initialCoordinates.lat, this.initialCoordinates.lng); // Asegura el marcador inicial
      }
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
