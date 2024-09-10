import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPage } from './pago.page';

const routes: Routes = [
  {
    path: '',
    component: PagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPageRoutingModule {}
