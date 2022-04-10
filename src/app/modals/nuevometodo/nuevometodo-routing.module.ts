import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevometodoPage } from './nuevometodo.page';

const routes: Routes = [
  {
    path: '',
    component: NuevometodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevometodoPageRoutingModule {}
