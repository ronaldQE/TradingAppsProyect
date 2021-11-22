import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMonthPage } from './product-month.page';

const routes: Routes = [
  {
    path: '',
    component: ProductMonthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductMonthPageRoutingModule {}
