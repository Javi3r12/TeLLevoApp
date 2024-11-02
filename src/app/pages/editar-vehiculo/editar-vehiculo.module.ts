import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarVehiculoPageRoutingModule } from './editar-vehiculo-routing.module';

import { EditarVehiculoPage } from './editar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarVehiculoPageRoutingModule
  ],
  declarations: [EditarVehiculoPage]
})
export class EditarVehiculoPageModule {}
