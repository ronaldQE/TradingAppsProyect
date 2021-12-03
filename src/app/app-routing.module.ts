import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business-plan',
    pathMatch: 'full'
  },

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
    path: 'direct-costs',
    loadChildren: () => import('./pages/direct-costs/direct-costs.module').then( m => m.DirectCostsPageModule)
  },
  {
    path: 'modal-insumo',
    loadChildren: () => import('./pages/modal-insumo/modal-insumo.module').then( m => m.ModalInsumoPageModule)
  },
  {
    path: 'modal-edit',
    loadChildren: () => import('./pages/modal-edit/modal-edit.module').then( m => m.ModalEditPageModule)
  },
  {
    path: 'direct-costs-edit',
    loadChildren: () => import('./pages/direct-costs-edit/direct-costs-edit.module').then( m => m.DirectCostsEditPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
