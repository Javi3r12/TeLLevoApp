import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url:  '/home' , icon: 'home' },
    { title: 'Usuario', url: '/inicio', icon: 'person' },
    { title: 'Registrar Vehiculo', url: '/registrar-vehiculo', icon: 'car' },
    { title: 'Gestion Vehiculos', url: '/gestion-vehiculos', icon: 'build'},
    { title: 'Registrar Viaje', url: '/registrar-viaje', icon: 'paper-plane'},
    { title: 'Historial Viajes', url: '/historial-viajes', icon: 'time'},
    { title: 'Gestion Viajes', url: '/gestion-viajes', icon: 'map'},

  ];
  constructor() {} 
}
