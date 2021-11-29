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



@NgModule({
  declarations: [
    MenuComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent,
    MonthlyFlowComponent,
    CollectionToArrayPipe,
  ],
  exports: [
    MenuComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent,
    MonthlyFlowComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  providers: [
    CollectionToArrayPipe
  ]
})
export class ComponentsModule { }
