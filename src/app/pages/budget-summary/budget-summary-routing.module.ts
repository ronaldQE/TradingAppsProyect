import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetSummaryPage } from './budget-summary.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetSummaryPageRoutingModule {}
