import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductMonthPageRoutingModule } from './product-month-routing.module';

import { ProductMonthPage } from './product-month.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductMonthPageRoutingModule
  ],
  declarations: [ProductMonthPage]
})
export class ProductMonthPageModule {}
