import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionViajesPage } from './gestion-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: GestionViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionViajesPageRoutingModule {}
