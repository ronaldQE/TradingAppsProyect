import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimateHistoryPage } from './estimate-history.page';

const routes: Routes = [
  {
    path: '',
    component: EstimateHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimateHistoryPageRoutingModule {}
