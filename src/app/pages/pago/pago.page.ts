import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  viaje: Viaje | null = null;

  constructor(private viajerService: ViajeService) { }

  ngOnInit() {
    this.viaje = this.viajerService.obtenerViajeActual();
  }

}
