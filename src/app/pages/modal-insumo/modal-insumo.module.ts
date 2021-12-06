import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInsumoPageRoutingModule } from './modal-insumo-routing.module';

import { ModalInsumoPage } from './modal-insumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInsumoPageRoutingModule
  ],
  //declarations: [ModalInsumoPage]
})
export class ModalInsumoPageModule {}
