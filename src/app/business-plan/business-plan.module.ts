import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPlanPageRoutingModule } from './business-plan-routing.module';

import { BusinessPlanPage } from './business-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPlanPageRoutingModule
  ],
  declarations: [BusinessPlanPage]
})
export class BusinessPlanPageModule {}
