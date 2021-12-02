import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from 'src/app/services/services-database';

import { Budget, BudgetSummary, InvestmentCapital, OperatingCapital } from '../../models/interfaces';


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
    totalProyecto: 0,
    totalEfectivo:0
  }

  public cOperativo:number=0;
  public cInversion:number=0;
  public efectivoTotal:number=0;
  public totalGastosOperativos:number=0;

  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    this.getBudget();
    this.getOperatingCapital();
    this.getInvestmentCapital();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudget(){
    this.db.getCollection<Budget>('/Estimaciones/estimicion-1/presupuesto').subscribe( (data)=>{
      this.budget = data;
      if (data.otros == undefined){
        this.budget.otros = 0;
      }
      if (data.efectivo == undefined){
        this.budget.efectivo = 0;
      }
      if (data.banco == undefined){
        this.budget.banco = 0;
      }
      this.budgetSummary.aportePropio = this.budget.efectivo + this.budget.banco+ this.budget.otros+this.operatingCapital.manoObraEmprendedor
      this.budgetSummary.totalProyecto=this.budgetSummary.planInversion+this.budgetSummary.aportePropio-this.budget.efectivo
      this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
      this.efectivoTotal = this.budget.efectivo + this.budget.banco+ this.budget.otros
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>('/Estimaciones/estimicion-1/capital-operativo').subscribe( (data)=>{
      this.operatingCapital = data;
      if(data.alquiler == undefined){
        this.operatingCapital.alquiler=0;
      }
      if(data.manoObra == undefined){
        this.operatingCapital.manoObra=0;
      }
      if(data.manoObraEmprendedor == undefined){
        this.operatingCapital.manoObraEmprendedor=0;
      }
      if(data.promociones == undefined){
        this.operatingCapital.promociones=0;
      }
      if(data.serviciosBasicos == undefined){
        this.operatingCapital.serviciosBasicos=0;
      }
      this.budgetSummary.aportePropio = this.budget.efectivo + this.budget.banco+ this.budget.otros+this.operatingCapital.manoObraEmprendedor
      this.totalGastosOperativos = this.operatingCapital.alquiler+this.operatingCapital.manoObra+this.operatingCapital.serviciosBasicos
      this.cOperativo = this.totalGastosOperativos + this.operatingCapital.promociones
      this.budgetSummary.planInversion=this.cOperativo+this.cInversion
      this.budgetSummary.totalProyecto=this.budgetSummary.planInversion+this.budgetSummary.aportePropio-this.efectivoTotal
      this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  getInvestmentCapital(){
    this.db.getCollection<InvestmentCapital>('/Estimaciones/estimicion-1/capital-de-inversion').subscribe( (data)=>{
      this.investmentCapital = data;
      if(data.consultoria == undefined){
        this.investmentCapital.consultoria=0;
      }
      if(data.equipamientoOficina == undefined){
        this.investmentCapital.equipamientoOficina=0;
      }
      if(data.equipoComputo == undefined){
        this.investmentCapital.equipoComputo=0;
      }
      this.cInversion = this.investmentCapital.consultoria+this.investmentCapital.equipamientoOficina+this.investmentCapital.equipoComputo
      this.budgetSummary.planInversion=this.cOperativo+this.cInversion
      this.budgetSummary.totalProyecto=this.budgetSummary.planInversion+this.budgetSummary.aportePropio-this.efectivoTotal
      this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
}
