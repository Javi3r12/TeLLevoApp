import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url:  '/home' , icon: 'home' },
    { title: 'Registrar Vehiculo', url: '/registrar-vehiculo', icon: 'car' },
    { title: 'Registrar Viaje', url: '/registrar-viaje', icon: 'paper-plane' },
    { title: 'Usuario', url: '/inicio', icon: 'person' },
  ];
  constructor() {} 
}
