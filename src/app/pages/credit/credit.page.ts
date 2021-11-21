import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, DataCredit } from '../../models/interfaces';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

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

  ngOnInit(){
    this.getBudgetSummary();
    this.getDataCredit();
  }
  getBudgetSummary(){
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe( (data)=>{
      this.budgetSummary = data;
      this.dataCredit.montoFinanciar=data.montoFinanciar

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
