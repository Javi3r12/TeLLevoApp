import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viaje!: Viaje;

  constructor(private router: Router, private route: ActivatedRoute, private viajeService: ViajeService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!; 
    //const viaje = this.viajeService.obtenerViajePorId(id);
    
    //if (viaje) {
    //  this.viaje = viaje; 
    //} else {
    //  console.error('Viaje not found with id:', id);
    // this.router.navigate(['/home']);
    //}

  }

  irAPago() {
    this.viajeService.setViaje(this.viaje)
    this.router.navigate(['/pago', this.viaje.id]); 
   }
}
