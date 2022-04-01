import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevacompraPageRoutingModule } from './nuevacompra-routing.module';

import { NuevacompraPage } from './nuevacompra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevacompraPageRoutingModule
  ],
  declarations: [NuevacompraPage]
})
export class NuevacompraPageModule {}
