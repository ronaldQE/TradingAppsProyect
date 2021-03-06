import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ContentBudgetComponent } from './content-budget/content-budget.component';
import { ContentCreditComponent } from './content-credit/content-credit.component';
import { ContentCostsComponent } from './content-costs/content-costs.component';
import { ContentFlowComponent } from './content-flow/content-flow.component';
import { MonthlyFlowComponent } from './monthly-flow/monthly-flow.component';
import { CollectionToArrayPipe } from '../common/collection-to-array.pipe';
import { CalculatedEstimateComponent } from './calculated-estimate/calculated-estimate.component';
import { InsumoComponent } from './insumo/insumo.component';
//import { ModalEditPage } from '../pages/modal-edit/modal-edit.page';
import { SaleRankComponent } from './sale-rank/sale-rank.component';
import { SaleSimulationComponent } from './sale-simulation/sale-simulation.component';



@NgModule({
  declarations: [
    MenuComponent,
    InsumoComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent,
    MonthlyFlowComponent,
    CollectionToArrayPipe,
    CalculatedEstimateComponent,
    SaleRankComponent,
    SaleSimulationComponent


  ],
  exports: [
    MenuComponent,
    InsumoComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent,
    MonthlyFlowComponent,
    CalculatedEstimateComponent,
    CollectionToArrayPipe,
    SaleRankComponent,
    SaleSimulationComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,

  ],
  providers: [
    CollectionToArrayPipe
  ],
})
export class ComponentsModule { }
