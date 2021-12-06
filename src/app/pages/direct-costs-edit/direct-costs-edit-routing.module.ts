import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectCostsEditPage } from './direct-costs-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DirectCostsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectCostsEditPageRoutingModule {}
