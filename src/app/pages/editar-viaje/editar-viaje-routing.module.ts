import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarViajePage } from './editar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: EditarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarViajePageRoutingModule {}
