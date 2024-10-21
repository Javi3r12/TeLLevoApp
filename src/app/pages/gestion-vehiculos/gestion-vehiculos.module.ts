import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionVehiculosPageRoutingModule } from './gestion-vehiculos-routing.module';

import { GestionVehiculosPage } from './gestion-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionVehiculosPageRoutingModule
  ],
  declarations: [GestionVehiculosPage]
})
export class GestionVehiculosPageModule {}
