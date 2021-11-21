import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

import { Budget, BudgetSummary, DataCredit, InvestmentCapital, OperatingCapital } from '../../models/interfaces';

@Component({
  selector: 'app-content-credit',
  templateUrl: './content-credit.component.html',
  styleUrls: ['./content-credit.component.scss'],
})
export class ContentCreditComponent implements OnInit {

  public budgetSummary: BudgetSummary={
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0
  }
  public dataCredit: DataCredit={
    montoFinanciar:0,
    tasaInteres:0,
    plazo:0,
    tipoCuota: "",
  }
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {
    this.getBudgetSummary();
    this.getDataCredit();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudgetSummary(){
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe( (data)=>{
      this.budgetSummary = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getDataCredit(){
    this.db.getCollection<DataCredit>('/Estimaciones/estimicion-1/dato-credito').subscribe( (data)=>{
      this.dataCredit = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
}
