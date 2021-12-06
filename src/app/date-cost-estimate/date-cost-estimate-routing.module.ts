import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateCostEstimatePage } from './date-cost-estimate.page';

const routes: Routes = [
  {
    path: '',
    component: DateCostEstimatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateCostEstimatePageRoutingModule {}
