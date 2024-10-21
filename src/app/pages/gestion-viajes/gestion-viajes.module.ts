import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionViajesPageRoutingModule } from './gestion-viajes-routing.module';

import { GestionViajesPage } from './gestion-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionViajesPageRoutingModule
  ],
  declarations: [GestionViajesPage]
})
export class GestionViajesPageModule {}
