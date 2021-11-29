import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppliesPage } from './supplies.page';

const routes: Routes = [
  {
    path: '',
    component: SuppliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppliesPageRoutingModule {}
