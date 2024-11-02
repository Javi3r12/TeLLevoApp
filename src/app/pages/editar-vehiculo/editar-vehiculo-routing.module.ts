import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarVehiculoPage } from './editar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarVehiculoPageRoutingModule {}
