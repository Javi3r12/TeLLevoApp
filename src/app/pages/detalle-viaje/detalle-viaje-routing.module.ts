import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleViajePage } from './detalle-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleViajePageRoutingModule {}
