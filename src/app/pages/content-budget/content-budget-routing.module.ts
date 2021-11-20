import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentBudgetPage } from './content-budget.page';

const routes: Routes = [
  {
    path: '',
    component: ContentBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentBudgetPageRoutingModule {}
