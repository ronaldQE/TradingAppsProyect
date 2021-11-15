import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestmentCapitalPageRoutingModule } from './investment-capital-routing.module';

import { InvestmentCapitalPage } from './investment-capital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestmentCapitalPageRoutingModule
  ],
  declarations: [InvestmentCapitalPage]
})
export class InvestmentCapitalPageModule {}
