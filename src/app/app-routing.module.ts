import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },

  {
    path: 'business-plan/:idEstim',
    loadChildren: () => import('./business-plan/business-plan.module').then( m => m.BusinessPlanPageModule)
  },
  {
    path: 'budget/:idEstim',
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
    path: 'investment-capital/:idEstim',
    loadChildren: () => import('./investment-capital/investment-capital.module').then( m => m.InvestmentCapitalPageModule)
  },
  {
    path: 'operating-capital/:idEstim',
    loadChildren: () => import('./operating-capital/operating-capital.module').then( m => m.OperatingCapitalPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./pages/credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'monthly-costs',
    loadChildren: () => import('./monthly-costs/monthly-costs.module').then( m => m.MonthlyCostsPageModule)
  },
  {
    path: 'sale-month',
    loadChildren: () => import('./sale-month/sale-month.module').then( m => m.SaleMonthPageModule)
  },
  {
    path: 'product-month',
    loadChildren: () => import('./product-month/product-month.module').then( m => m.ProductMonthPageModule)
  },
  {
    path: 'supplies',
    loadChildren: () => import('./supplies/supplies.module').then( m => m.SuppliesPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'annual-flow-graphs',
    loadChildren: () => import('./annual-flow-graphs/annual-flow-graphs.module').then( m => m.AnnualFlowGraphsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
