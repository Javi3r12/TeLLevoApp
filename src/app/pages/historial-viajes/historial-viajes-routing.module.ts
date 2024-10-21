import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialViajesPage } from './historial-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialViajesPageRoutingModule {}
