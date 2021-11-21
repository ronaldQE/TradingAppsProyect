import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyCostsPageRoutingModule } from './monthly-costs-routing.module';

import { MonthlyCostsPage } from './monthly-costs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthlyCostsPageRoutingModule
  ],
  declarations: [MonthlyCostsPage]
})
export class MonthlyCostsPageModule {}
