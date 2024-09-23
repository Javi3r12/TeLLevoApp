import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarVehiculoPageRoutingModule } from './registrar-vehiculo-routing.module';

import { RegistrarVehiculoPage } from './registrar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarVehiculoPageRoutingModule
  ],
  declarations: [RegistrarVehiculoPage]
})
export class RegistrarVehiculoPageModule {}
