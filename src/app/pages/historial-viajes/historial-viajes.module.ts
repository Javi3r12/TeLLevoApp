import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialViajesPageRoutingModule } from './historial-viajes-routing.module';

import { HistorialViajesPage } from './historial-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialViajesPageRoutingModule
  ],
  declarations: [HistorialViajesPage]
})
export class HistorialViajesPageModule {}
