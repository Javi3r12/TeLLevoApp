import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viaje!: Viaje;

  constructor(private route: ActivatedRoute, private viajeService: ViajeService) {}

  ngOnInit() {
    const index = +this.route.snapshot.paramMap.get('id')!; // Obtén el índice del viaje
    this.viaje = this.viajeService.obtenerViajePorId(index); // Obtén el viaje
  }

}
