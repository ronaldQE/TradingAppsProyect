import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business-plan',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'business-plan',
    loadChildren: () => import('./business-plan/business-plan.module').then( m => m.BusinessPlanPageModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then( m => m.BudgetPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'estimate-history',
    loadChildren: () => import('./estimate-history/estimate-history.module').then( m => m.EstimateHistoryPageModule)
  },
  {
    path: 'budget-summary',
    loadChildren: () => import('./pages/budget-summary/budget-summary.module').then( m => m.BudgetSummaryPageModule)

  },
  {
    path: 'investment-capital',
    loadChildren: () => import('./investment-capital/investment-capital.module').then( m => m.InvestmentCapitalPageModule)
  },
  {
    path: 'operating-capital',
    loadChildren: () => import('./operating-capital/operating-capital.module').then( m => m.OperatingCapitalPageModule)
  },  {
    path: 'credit',
    loadChildren: () => import('./pages/credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'content-budget',
    loadChildren: () => import('./pages/content-budget/content-budget.module').then( m => m.ContentBudgetPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
