import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ContentBudgetComponent } from './content-budget/content-budget.component';
import { ContentCreditComponent } from './content-credit/content-credit.component';
import { ContentCostsComponent } from './content-costs/content-costs.component';
import { ContentFlowComponent } from './content-flow/content-flow.component';




@NgModule({
  declarations: [
    MenuComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent
  ],
  exports: [
    MenuComponent,
    ContentBudgetComponent,
    ContentCreditComponent,
    ContentCostsComponent,
    ContentFlowComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
