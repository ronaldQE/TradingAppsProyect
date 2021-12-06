import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

import { Budget, BudgetSummary, InvestmentCapital, OperatingCapital } from '../../models/interfaces';

@Component({
  selector: 'app-content-budget',
  templateUrl: './content-budget.component.html',
  styleUrls: ['./content-budget.component.scss'],
})
export class ContentBudgetComponent implements OnInit {
  @Input() idEstim:string;
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
  public dataUp:any
  public cOperativo:number=0;
  public cInversion:number=0;
  public efectivoTotal:number=0;

  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    
    this.getBudget();
    this.getOperatingCapital();
    this.getInvestmentCapital();
    

    console.log(this.idEstim)
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudget(){
    try {
      this.db.getCollection<Budget>(`/Estimaciones/${this.idEstim}/presupuesto`).subscribe( (data)=>{
        if(data !== null){
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
          //this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
          this.efectivoTotal = this.budget.efectivo + this.budget.banco+ this.budget.otros
          this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
    
          this.dataUp = {
            aportePropio:this.budgetSummary.aportePropio,
            //planInversion:this.budgetSummary.planInversion,
            montoFinanciar:this.budgetSummary.montoFinanciar,
            totalProyecto:this.budgetSummary.totalProyecto
          }
          this.dataUpdate(this.dataUp);
    
        }else{
          console.log("no se encontro la ruta");
        }
      },
      (error:any) => {
        //console.log(`Error: ${error}`);
      }
      )
    } catch (error) {
      console.log("aqui esta el error")
    }
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>(`/Estimaciones/${this.idEstim}/capital-operativo`).subscribe( (data)=>{
      
      if(data !== null){
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
        let totalGastosOperativos = this.operatingCapital.alquiler+this.operatingCapital.manoObra+this.operatingCapital.serviciosBasicos
        this.cOperativo = totalGastosOperativos + this.operatingCapital.promociones
        this.budgetSummary.planInversion=this.cOperativo+this.cInversion
        this.budgetSummary.totalProyecto=this.budgetSummary.planInversion+this.budgetSummary.aportePropio-this.efectivoTotal
        this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
  
        this.dataUp = {
          aportePropio:this.budgetSummary.aportePropio,
          planInversion:this.budgetSummary.planInversion,
          montoFinanciar:this.budgetSummary.montoFinanciar,
          totalProyecto:this.budgetSummary.totalProyecto
        }
        this.dataUpdate(this.dataUp);
      }
    },
    (error:any) => {
      //console.log(`Error: ${error}`);
      console.log("no se encontro la ruta");
    }
    )
  }

  getInvestmentCapital(){
    this.db.getCollection<InvestmentCapital>(`/Estimaciones/${this.idEstim}/capital-de-inversion`).subscribe( (data)=>{
      if(data !== null){
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
        //this.budgetSummary.montoFinanciar=this.budgetSummary.totalProyecto-this.budgetSummary.aportePropio
        this.dataUp = {
          planInversion:this.budgetSummary.planInversion,
          montoFinanciar:this.budgetSummary.montoFinanciar,
          totalProyecto:this.budgetSummary.totalProyecto
        }
        this.dataUpdate(this.dataUp);
      }
      
    },
    (error:any) => {
      //console.log(`Error: ${error}`);
      console.log("no se encontro la ruta");
    }
    )
  }

  dataUpdate(data:any){
    this.db.updateData(data,`/Estimaciones/${this.idEstim}`,'resumen-presupuesto')
  }
  getBudgetSummary(){
    this.db.getCollection<BudgetSummary>(`/Estimaciones/${this.idEstim}/resumen-presupuesto`).subscribe( (data)=>{
      if(data !== null){
        this.budgetSummary = data;
      }

    },
    (error:any) => {
      //console.log(`Error: ${error}`);
      console.log("no se encontro la ruta");
    }
    )
  }

}
