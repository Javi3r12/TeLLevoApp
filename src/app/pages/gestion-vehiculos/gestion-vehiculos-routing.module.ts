import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionVehiculosPage } from './gestion-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionVehiculosPageRoutingModule {}
