import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  newBudget: Budget = {
    efectivo: null,
    banco: null,
    otros: null
  }
  constructor(public db: serviceDataBase) { }
  
  ngOnInit() {
  }
  send(){
    const data = this.newBudget;
    this.db.actualizarDatos<Budget>(data,'/Estimaciones/estimicion-1','presupuesto')
  }
}
