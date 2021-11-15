import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetSummaryPageRoutingModule } from './budget-summary-routing.module';

import { BudgetSummaryPage } from './budget-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetSummaryPageRoutingModule
  ],
  declarations: [BudgetSummaryPage]
})
export class BudgetSummaryPageModule {}
