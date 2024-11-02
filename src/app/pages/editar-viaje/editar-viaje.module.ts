import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarViajePageRoutingModule } from './editar-viaje-routing.module';

import { EditarViajePage } from './editar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarViajePageRoutingModule
  ],
  declarations: [EditarViajePage]
})
export class EditarViajePageModule {}
