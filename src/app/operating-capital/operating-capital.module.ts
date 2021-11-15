import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatingCapitalPageRoutingModule } from './operating-capital-routing.module';

import { OperatingCapitalPage } from './operating-capital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatingCapitalPageRoutingModule
  ],
  declarations: [OperatingCapitalPage]
})
export class OperatingCapitalPageModule {}
