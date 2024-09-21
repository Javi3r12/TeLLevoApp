import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje.model';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: Viaje[] = [];

  constructor(private viajeService: ViajeService, private router: Router) {}

  ngOnInit() {
    this.viajeService.agregarEj();
    this.viajes = this.viajeService.obtenerViajes();
  }
  irADetalle(id: number) {
    this.router.navigate(['/detalle-viaje', id ]);
  }
}
