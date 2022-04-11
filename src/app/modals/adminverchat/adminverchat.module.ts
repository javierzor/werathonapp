import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminverchatPageRoutingModule } from './adminverchat-routing.module';

import { AdminverchatPage } from './adminverchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminverchatPageRoutingModule
  ],
  declarations: [AdminverchatPage]
})
export class AdminverchatPageModule {}
