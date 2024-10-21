import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  constructor(private viajeService: ViajeService) { }

  viajes: Viaje[] = [];

  ngOnInit() {
    this.viajes = this.viajeService.obtenerViajes();

  }

}
