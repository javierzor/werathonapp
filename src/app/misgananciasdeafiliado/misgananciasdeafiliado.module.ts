import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisgananciasdeafiliadoPageRoutingModule } from './misgananciasdeafiliado-routing.module';

import { MisgananciasdeafiliadoPage } from './misgananciasdeafiliado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisgananciasdeafiliadoPageRoutingModule
  ],
  declarations: [MisgananciasdeafiliadoPage]
})
export class MisgananciasdeafiliadoPageModule {}
