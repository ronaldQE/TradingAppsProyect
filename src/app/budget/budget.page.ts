import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {
    //this.testUpdate()
  }
  send(){
    const data = this.newBudget;
    this.db.actualizarDatos<Budget>(data,'/Estimaciones/estimicion-1','presupuesto');

    this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  testUpdate(){
    const data = {montoFinanciar:45}
    this.db.updateData(data,'/Estimaciones/estimicion-1','resumen-presupuesto')
  }
}
