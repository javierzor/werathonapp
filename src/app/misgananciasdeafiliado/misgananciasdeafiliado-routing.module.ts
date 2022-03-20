import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisgananciasdeafiliadoPage } from './misgananciasdeafiliado.page';

const routes: Routes = [
  {
    path: '',
    component: MisgananciasdeafiliadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisgananciasdeafiliadoPageRoutingModule {}
