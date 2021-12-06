import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditPageRoutingModule } from './modal-edit-routing.module';

import { ModalEditPage } from './modal-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditPageRoutingModule
  ],
  //declarations: [ModalEditPage]
})
export class ModalEditPageModule {}
