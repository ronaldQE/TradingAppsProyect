import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimateHistoryPageRoutingModule } from './estimate-history-routing.module';

import { EstimateHistoryPage } from './estimate-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimateHistoryPageRoutingModule
  ],
  declarations: [EstimateHistoryPage]
})
export class EstimateHistoryPageModule {}
