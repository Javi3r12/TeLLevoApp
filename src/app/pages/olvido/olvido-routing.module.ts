import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidoPage } from './olvido.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidoPageRoutingModule {}
