import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyCostsPage } from './monthly-costs.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyCostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyCostsPageRoutingModule {}
