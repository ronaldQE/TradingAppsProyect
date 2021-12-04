import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnualFlowGraphsPage } from './annual-flow-graphs.page';

const routes: Routes = [
  {
    path: '',
    component: AnnualFlowGraphsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnualFlowGraphsPageRoutingModule {}
