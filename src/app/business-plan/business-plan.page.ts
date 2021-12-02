import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';

import { Budget, BudgetSummary, InvestmentCapital, OperatingCapital } from '../models/interfaces';



@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.page.html',
  styleUrls: ['./business-plan.page.scss'],
})
export class BusinessPlanPage implements OnInit {
  public valueSelected:string = "p"

   constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {

  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  segmentChanged(event: CustomEvent |any) {
    this.valueSelected = event.detail.value;
    //console.log('Segment changed', event);
  }


}
