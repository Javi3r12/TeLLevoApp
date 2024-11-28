import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje.model';

@Component({
  selector: 'app-dirrecion-viaje',
  templateUrl: './dirrecion-viaje.component.html',
  styleUrls: ['./dirrecion-viaje.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class DirrecionViajeComponent implements OnInit {

  @Input() nuevoViaje!: Viaje;
  @Input() info: string = '';
  loading: boolean = true;
  
  constructor(private router: Router ) {

  }

  ngOnInit() {

  }

  navigateToMap() {
    if (this.nuevoViaje?.cord && this.nuevoViaje?.id && this.info) {

      this.router.navigate(['/map-dirreccion-viaje'], {
        queryParams: {
          lat: this.nuevoViaje.cord.lat,
          lng: this.nuevoViaje.cord.lng,
          idViaje: this.nuevoViaje.id,
          info: this.info
        }
      });
    } else {

      this.router.navigate(['/map-dirreccion-viaje'], {
        queryParams: {
          info: this.info
        }
      });
    }
  }

}

