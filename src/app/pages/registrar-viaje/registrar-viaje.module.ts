import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarViajePageRoutingModule } from './registrar-viaje-routing.module';

import { RegistrarViajePage } from './registrar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarViajePageRoutingModule
  ],
  declarations: [RegistrarViajePage]
})
export class RegistrarViajePageModule {}
