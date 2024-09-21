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
  results: Viaje[] = [];
  query: string = '';

  constructor(private viajeService: ViajeService, private router: Router) {}

  ngOnInit() {
    this.viajeService.agregarEj();
    this.viajes = this.viajeService.obtenerViajes();
    this.results = [...this.viajes]
  }
  irADetalle(id: number) {
    this.router.navigate(['/detalle-viaje', id ]);
  }



  handleInput(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.query = query;

    if (query === ''){
      this.results = [];
    } else {
      this.results = this.viajes.filter((viaje)=> 
        viaje.destino.toLowerCase().includes(this.query));
    }
   
  }


}
