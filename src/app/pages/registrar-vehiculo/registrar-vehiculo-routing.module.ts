import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarVehiculoPage } from './registrar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarVehiculoPageRoutingModule {}
