import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/interfaces';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.page.html',
  styleUrls: ['./budget-summary.page.scss'],
})
export class BudgetSummaryPage implements OnInit {
  public budget: Budget = {
    efectivo: 0,
    banco: 0,
    otros: 0
  }
  constructor() { }

  ngOnInit() {
  }

}
