import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectCostsPageRoutingModule } from './direct-costs-routing.module';

import { DirectCostsPage } from './direct-costs.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';
import { CollectionToArrayPipe } from 'src/app/common/collection-to-array.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DirectCostsPageRoutingModule
  ],
  declarations: [
    DirectCostsPage,
    ModalInsumoPage,
    ],
  entryComponents:[ModalInsumoPage],
  providers: [
    CollectionToArrayPipe
  ],
})
export class DirectCostsPageModule {}
