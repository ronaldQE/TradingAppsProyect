import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleMonthPageRoutingModule } from './sale-month-routing.module';

import { SaleMonthPage } from './sale-month.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleMonthPageRoutingModule
  ],
  declarations: [SaleMonthPage]
})
export class SaleMonthPageModule {}
