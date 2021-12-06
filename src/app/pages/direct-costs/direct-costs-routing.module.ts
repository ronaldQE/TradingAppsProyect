import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectCostsPage } from './direct-costs.page';

const routes: Routes = [
  {
    path: '',
    component: DirectCostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectCostsPageRoutingModule {}
