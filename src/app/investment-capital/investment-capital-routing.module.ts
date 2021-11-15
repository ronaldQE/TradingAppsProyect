import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentCapitalPage } from './investment-capital.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentCapitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentCapitalPageRoutingModule {}
