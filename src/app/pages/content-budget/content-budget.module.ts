import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentBudgetPageRoutingModule } from './content-budget-routing.module';

import { ContentBudgetPage } from './content-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentBudgetPageRoutingModule
  ],
  declarations: [ContentBudgetPage]
})
export class ContentBudgetPageModule {}
