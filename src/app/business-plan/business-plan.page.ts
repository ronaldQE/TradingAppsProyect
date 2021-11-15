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

  public budget: Budget = {
    efectivo: 0,
    banco: 0,
    otros: 0
  }
  public investmentCapital: InvestmentCapital ={
    consultoria: 0,
    equipamientoOficina: 0,
    equipoComputo: 0
  }
  public operatingCapital: OperatingCapital={
    alquiler: 0,
    manoObra: 0,
    manoObraEmprendedor: 0,
    promociones: 0,
    serviciosBasicos:0
  }
  public budgetSummary: BudgetSummary={
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0
  }


  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    this.getBudget();
    this.getOperatingCapital();
    this.getInvestmentCapital();
;    console.log(this.budget);
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudget(){
    this.db.getCollection<Budget>('/Estimaciones/estimicion-1/presupuesto').subscribe( (data)=>{
      this.budget = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>('/Estimaciones/estimicion-1/capital-operativo').subscribe( (data)=>{
      this.operatingCapital = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  getInvestmentCapital(){
    this.db.getCollection<InvestmentCapital>('/Estimaciones/estimicion-1/capital-de-inversion').subscribe( (data)=>{
      this.investmentCapital = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
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

}
