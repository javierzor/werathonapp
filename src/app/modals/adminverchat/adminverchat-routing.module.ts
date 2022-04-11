import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminverchatPage } from './adminverchat.page';

const routes: Routes = [
  {
    path: '',
    component: AdminverchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminverchatPageRoutingModule {}
