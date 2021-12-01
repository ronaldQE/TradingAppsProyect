import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimateHistoryPageRoutingModule } from './estimate-history-routing.module';

import { EstimateHistoryPage } from './estimate-history.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimateHistoryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstimateHistoryPage]
})
export class EstimateHistoryPageModule {}
