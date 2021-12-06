import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateCostEstimatePageRoutingModule } from './date-cost-estimate-routing.module';

import { DateCostEstimatePage } from './date-cost-estimate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateCostEstimatePageRoutingModule
  ],
  declarations: [DateCostEstimatePage]
})
export class DateCostEstimatePageModule {}
