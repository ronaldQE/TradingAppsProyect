import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleMonthPage } from './sale-month.page';

const routes: Routes = [
  {
    path: '',
    component: SaleMonthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleMonthPageRoutingModule {}
