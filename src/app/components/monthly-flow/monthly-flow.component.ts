import { Component, OnInit } from '@angular/core';
import { MonthlyFlow,BudgetSummary} from 'src/app/models/interfaces';
import { serviceDataBase } from '../../services/services-database';
import { Cuota } from '../../clases/credit'
@Component({
  selector: 'app-monthly-flow',
  templateUrl: './monthly-flow.component.html',
  styleUrls: ['./monthly-flow.component.scss'],
})
export class MonthlyFlowComponent implements OnInit {

  public newOptionSelect: number;
  public totalOperatingCosts: number;
  public valueSelected:number = 0;
  public initialBalance:number = 0;
  public planPagosVariado = new Cuota();
  public cuotas = [];
  constructor(public db: serviceDataBase) { }

  ngOnInit() {
    this.calculateDues();
    this.getTotalOperatingCosts();
    this.getBudgetSummary();
    this.calculateJunuary();
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
        this.previousMonthFlow.saldoInicial = data.planInversion;
        this.initialMonthFlow.saldoInicial = data.planInversion;
        this.initialBalance = data.planInversion;
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

  calculateNextMonthlyFlow(month){
    this.currentMonthlyFlow.saldoInicial = this.previousMonthFlow.flujoAcumulado;
    this.currentMonthlyFlow.ingresos = 46000;
    this.currentMonthlyFlow.costoProduccion = 1359;
    this.currentMonthlyFlow.utilidadBruta = this.currentMonthlyFlow.ingresos-this.currentMonthlyFlow.costoProduccion;
    this.currentMonthlyFlow.costosFijos = this.totalOperatingCosts;
    this.currentMonthlyFlow.utilidadNeta = this.currentMonthlyFlow.utilidadBruta-this.currentMonthlyFlow.costosFijos;
    this.currentMonthlyFlow.cuota = this.cuotas[month];
    this.currentMonthlyFlow.flujoAcumulado = this.currentMonthlyFlow.utilidadNeta+this.currentMonthlyFlow.saldoInicial-this.currentMonthlyFlow.cuota;
  }

  calculateJunuary(){
    //this.saveFlowCurrentMonth(this.previousMonthFlow,this.initialMonthFlow);
    this.currentMonthlyFlow.saldoInicial = this.previousMonthFlow.flujoAcumulado;
    this.currentMonthlyFlow.ingresos = 46000;
    this.currentMonthlyFlow.costoProduccion = 1359;
    this.currentMonthlyFlow.utilidadBruta = this.currentMonthlyFlow.ingresos-this.currentMonthlyFlow.costoProduccion;
    console.log(this.totalOperatingCosts)
    this.db.getCollection<any>('/Estimaciones/estimicion-1/costos-operativos').subscribe( (data)=>{
      this.currentMonthlyFlow.costosFijos = data.totalCostosOperativos == undefined?0:data.totalCostosOperativos;
      this.currentMonthlyFlow.utilidadNeta = this.currentMonthlyFlow.utilidadBruta-this.currentMonthlyFlow.costosFijos;
      this.currentMonthlyFlow.cuota = this.cuotas[0];
      this.currentMonthlyFlow.flujoAcumulado = this.currentMonthlyFlow.utilidadNeta+this.currentMonthlyFlow.saldoInicial-this.currentMonthlyFlow.cuota;
    });
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

  }

  async initialState(){
    await this.getTotalOperatingCosts();
    await this.getBudgetSummary();
  }
  

  calculateMonthlyFlow(numberMonth: number){
    let cont:number = 0;
    //this.initialState();
    this.saveFlowCurrentMonth(this.currentMonthlyFlow,this.initialMonthFlow);
    while(cont<numberMonth){
      this.saveFlowCurrentMonth(this.previousMonthFlow,this.currentMonthlyFlow);
      this.calculateNextMonthlyFlow(cont);
      cont ++;
    }
  }

  calculateDues(){

    this.db.getCollection<any>('/Estimaciones/estimicion-1/dato-credito').subscribe((data) => {
      if (data.tipoCuota == null) {
        console.log("selcione un tipo de credito");
      } else {
        //recuperacion de la cuotas aun arreglo
        this.cuotas = []
  
        if (data.tipoCuota == "Cuota Fija") {
  
          this.planPagosVariado.calPlanPagosFijo(data.montoFinanciar, data.tasaInteres, data.plazo, data.poliza);
          this.cuotas = this.planPagosVariado.cuotasF
          console.log(this.cuotas)
        }
        if (data.tipoCuota == "Cuota Variable") {
          this.planPagosVariado.calPlanPagosVariado(data.montoFinanciar, data.tasaInteres, data.plazo, data.poliza);
          this.cuotas = this.planPagosVariado.cuotasV
          console.log(this.cuotas)
        }
      }
    })
  }
}
