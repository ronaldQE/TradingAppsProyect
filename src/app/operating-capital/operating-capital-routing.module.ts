import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatingCapitalPage } from './operating-capital.page';

const routes: Routes = [
  {
    path: '',
    component: OperatingCapitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatingCapitalPageRoutingModule {}
