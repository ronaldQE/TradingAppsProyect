import { Component, OnInit } from '@angular/core';
import { MonthlyFlow,BudgetSummary,OperatingCapital } from 'src/app/models/interfaces';
import { serviceDataBase } from '../../services/services-database';

@Component({
  selector: 'app-monthly-flow',
  templateUrl: './monthly-flow.component.html',
  styleUrls: ['./monthly-flow.component.scss'],
})
export class MonthlyFlowComponent implements OnInit {

  public previousOptionSelect = 0;
  public newOptionSelect: number;
  public totalOperatingCosts: number;

  constructor(public db: serviceDataBase) { }

  ngOnInit() {
    
    this.getTotalOperatingCosts();
    this.getBudgetSummary();
  }

  public initialMonthFlow : MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public previousMonthFlow : MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public currentMonthlyFlow : MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public budgetSummary: BudgetSummary={
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0
  }

  async getBudgetSummary(){
    this.db.getCollection<BudgetSummary>("/Estimaciones/estimicion-1/resumen-presupuesto").subscribe((data)=>{
      this.budgetSummary.aportePropio = data.aportePropio == undefined ? 0:data.aportePropio;
      if(data.planInversion == undefined){
        this.budgetSummary.planInversion = 0;
      }else{
        this.budgetSummary.planInversion = data.planInversion;
        this.currentMonthlyFlow.saldoInicial = data.planInversion;
        this.initialMonthFlow.saldoInicial = data.planInversion;
      }
      this.budgetSummary.montoFinanciar = data.montoFinanciar == undefined ? 0:data.montoFinanciar;
      this.budgetSummary.totalProyecto = data.totalProyecto == undefined ? 0:data.totalProyecto;
    })
  }

  async getTotalOperatingCosts(){
    this.db.getCollection<any>('/Estimaciones/estimicion-1/costos-operativos').subscribe( (data)=>{
      this.totalOperatingCosts = data.totalCostosOperativos == undefined?0:data.totalCostosOperativos;
    });
  }

  calculateNextMonthlyFlow(){
    this.currentMonthlyFlow.saldoInicial = this.previousMonthFlow.flujoAcumulado;
    this.currentMonthlyFlow.ingresos = 46000;
    this.currentMonthlyFlow.costoProduccion = 1359;
    this.currentMonthlyFlow.utilidadBruta = this.previousMonthFlow.ingresos-this.previousMonthFlow.costoProduccion;
    this.currentMonthlyFlow.costosFijos = this.totalOperatingCosts;
    this.currentMonthlyFlow.utilidadNeta = this.currentMonthlyFlow.utilidadBruta-this.currentMonthlyFlow.costosFijos;
    this.currentMonthlyFlow.cuota = 2068;
    this.currentMonthlyFlow.flujoAcumulado = this.currentMonthlyFlow.utilidadNeta+this.currentMonthlyFlow.saldoInicial-this.currentMonthlyFlow.cuota;
  }

  saveFlowCurrentMonth(auxFlowMont: MonthlyFlow, currentFlowMont: MonthlyFlow){
    auxFlowMont.saldoInicial = currentFlowMont.saldoInicial;
    auxFlowMont.ingresos = currentFlowMont.ingresos;
    auxFlowMont.costoProduccion = currentFlowMont.costoProduccion;
    auxFlowMont.utilidadBruta = currentFlowMont.utilidadBruta;
    auxFlowMont.costosFijos = currentFlowMont.costosFijos;
    auxFlowMont.utilidadNeta = currentFlowMont.utilidadNeta;
    auxFlowMont.cuota = currentFlowMont.cuota;
    auxFlowMont.flujoAcumulado = currentFlowMont.flujoAcumulado;
  }

  recuperar(event: CustomEvent){
    this.newOptionSelect = event.detail.value;
    this.calculateMonthlyFlow(parseInt(this.newOptionSelect+""));
    /*console.log(this.newOptionSelect+" "+this.previousOptionSelect);
    console.log(this.initialMonthFlow);
    if(this.newOptionSelect == (this.previousOptionSelect+1)){
      this.saveFlowCurrentMonth(this.previousMonthFlow,this.currentMonthlyFlow);
      this.calculateNextMonthlyFlow();
    }else{

    }*/
    
    this.previousOptionSelect = parseInt(this.newOptionSelect+"");

  }

  async initialState(){
    await this.getTotalOperatingCosts();
    await this.getBudgetSummary();
  }
  

  calculateMonthlyFlow(numberMonth: number){
    let cont:number = 0;
    //this.initialState();
    this.saveFlowCurrentMonth(this.currentMonthlyFlow,this.initialMonthFlow);
    console.log(cont+"  "+numberMonth)
    while(cont<numberMonth){
      this.saveFlowCurrentMonth(this.previousMonthFlow,this.currentMonthlyFlow);
      this.calculateNextMonthlyFlow();
      cont ++;
    }
  }
}
