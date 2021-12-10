import { Component, OnInit } from '@angular/core';
import { MonthlyFlow, BudgetSummary } from 'src/app/models/interfaces';
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
  public valueSelected: number = 0;
  public initialBalance: number = 0;
  public planPagosVariado = new Cuota();
  public cuotas = [];
  public costoVenta = [];
  public venta = [];
  public idEstim: string

  constructor(public db: serviceDataBase) { }

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')
    this.calculateCostOfSale();
    this.calculateDues();
    this.getTotalOperatingCosts();
    this.getBudgetSummary();
    this.calculateJunuary();
  }

  public initialMonthFlow: MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public previousMonthFlow: MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public currentMonthlyFlow: MonthlyFlow = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijos: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }

  public budgetSummary: BudgetSummary = {
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0,
    totalEfectivo: 0

  }

  async getBudgetSummary() {
    this.db.getCollection<BudgetSummary>(`/Estimaciones/${this.idEstim}/resumen-presupuesto`).subscribe((data) => {
      this.budgetSummary.aportePropio = data.aportePropio == undefined ? 0 : data.aportePropio;
      if (data.planInversion == undefined) {
        this.budgetSummary.planInversion = 0;
      } else {
        this.budgetSummary.planInversion = data.planInversion;
        this.previousMonthFlow.saldoInicial = data.planInversion;
        this.initialMonthFlow.saldoInicial = data.planInversion;
        this.initialBalance = data.planInversion;
      }
      this.budgetSummary.montoFinanciar = data.montoFinanciar == undefined ? 0 : data.montoFinanciar;
      this.budgetSummary.totalProyecto = data.totalProyecto == undefined ? 0 : data.totalProyecto;
    })
  }

  async getTotalOperatingCosts() {
    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/costos-operativos`).subscribe((data) => {
      this.totalOperatingCosts = data.totalCostosOperativos == undefined ? 0 : data.totalCostosOperativos;
    });
  }

  calculateNextMonthlyFlow(month: number) {
    let salIni= this.previousMonthFlow.flujoAcumulado
    this.currentMonthlyFlow.saldoInicial = Math.round(salIni) ;
    this.currentMonthlyFlow.ingresos = this.venta[month];
    this.currentMonthlyFlow.costoProduccion = this.costoVenta[month];
    this.currentMonthlyFlow.utilidadBruta = this.currentMonthlyFlow.ingresos - this.currentMonthlyFlow.costoProduccion;
    this.currentMonthlyFlow.costosFijos = this.totalOperatingCosts;
    this.currentMonthlyFlow.utilidadNeta = this.currentMonthlyFlow.utilidadBruta - this.currentMonthlyFlow.costosFijos;
    this.currentMonthlyFlow.cuota = Math.round(this.cuotas[month]);
    let flujoAcu = this.currentMonthlyFlow.utilidadNeta + salIni - this.cuotas[month];
    this.currentMonthlyFlow.flujoAcumulado = Math.round(flujoAcu);
  }

  calculateJunuary() {
    //this.saveFlowCurrentMonth(this.previousMonthFlow,this.initialMonthFlow);
    this.currentMonthlyFlow.saldoInicial = this.previousMonthFlow.flujoAcumulado;
    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/comportamientoVentas`).subscribe((data) => {
      this.currentMonthlyFlow.ingresos = data.enero.venta;
      this.currentMonthlyFlow.costoProduccion = Math.round(data.enero.costoVenta);
      this.currentMonthlyFlow.utilidadBruta = Math.round(this.currentMonthlyFlow.ingresos - data.enero.costoVenta)//this.currentMonthlyFlow.costoProduccion;
      let utilBruta = this.currentMonthlyFlow.ingresos - data.enero.costoVenta

      this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/costos-operativos`).subscribe((data) => {
        this.currentMonthlyFlow.costosFijos = data.totalCostosOperativos == undefined ? 0 : data.totalCostosOperativos;
        this.currentMonthlyFlow.utilidadNeta = Math.round(utilBruta - this.currentMonthlyFlow.costosFijos);
        let utilNeta = utilBruta - this.currentMonthlyFlow.costosFijos;
        this.currentMonthlyFlow.cuota = Math.round(this.cuotas[0]);
        this.currentMonthlyFlow.flujoAcumulado = Math.round(utilNeta + this.currentMonthlyFlow.saldoInicial - this.currentMonthlyFlow.cuota);
      });
    })
  }

  saveFlowCurrentMonth(auxFlowMont: MonthlyFlow, currentFlowMont: MonthlyFlow) {
    auxFlowMont.saldoInicial = currentFlowMont.saldoInicial;
    auxFlowMont.ingresos = currentFlowMont.ingresos;
    auxFlowMont.costoProduccion = currentFlowMont.costoProduccion;
    auxFlowMont.utilidadBruta = currentFlowMont.utilidadBruta;
    auxFlowMont.costosFijos = currentFlowMont.costosFijos;
    auxFlowMont.utilidadNeta = currentFlowMont.utilidadNeta;
    auxFlowMont.cuota = currentFlowMont.cuota;
    auxFlowMont.flujoAcumulado = currentFlowMont.flujoAcumulado;
  }

  recuperar(event: CustomEvent) {
    this.newOptionSelect = event.detail.value;
    this.calculateMonthlyFlow(parseInt(this.newOptionSelect + ""));
    /*console.log(this.newOptionSelect+" "+this.previousOptionSelect);
    console.log(this.initialMonthFlow);
    if(this.newOptionSelect == (this.previousOptionSelect+1)){
      this.saveFlowCurrentMonth(this.previousMonthFlow,this.currentMonthlyFlow);
      this.calculateNextMonthlyFlow();
    }else{

    }*/

  }

  async initialState() {
    await this.getTotalOperatingCosts();
    await this.getBudgetSummary();
  }


  calculateMonthlyFlow(numberMonth: number) {
    let cont: number = 0;
    //this.initialState();
    this.saveFlowCurrentMonth(this.currentMonthlyFlow, this.initialMonthFlow);
    while (cont < numberMonth) {
      this.saveFlowCurrentMonth(this.previousMonthFlow, this.currentMonthlyFlow);
      this.calculateNextMonthlyFlow(cont);
      cont++;
    }
  }

  calculateDues() {

    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/dato-credito`).subscribe((data) => {
      if (data.tipoCuota == null) {
        console.log("selcione un tipo de credito");
      } else {
        //recuperacion de la cuotas aun arreglo
        this.cuotas = []

        if (data.tipoCuota == "Cuota Fija") {

          this.planPagosVariado.calPlanPagosFijo(data.montoFinanciar, data.tasaInteres, data.plazo, data.poliza);
          this.cuotas = this.planPagosVariado.cuotasF
        }
        if (data.tipoCuota == "Cuota Variable") {
          this.planPagosVariado.calPlanPagosVariado(data.montoFinanciar, data.tasaInteres, data.plazo, data.poliza);
          this.cuotas = this.planPagosVariado.cuotasV
          //console.log(this.cuotas)
        }
      }
    })
  }
  calculateCostOfSale() {
    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/comportamientoVentas`).subscribe((data) => {
      this.costoVenta[0] = Math.round(data.enero.costoVenta);
      this.venta[0] = data.enero.venta;
      this.costoVenta[1] = Math.round(data.febrero.costoVenta);
      this.venta[1] = data.febrero.venta;
      this.costoVenta[2] = Math.round(data.marzo.costoVenta);
      this.venta[2] = data.marzo.venta;
      this.costoVenta[3] = Math.round(data.abril.costoVenta);
      this.venta[3] = data.abril.venta;
      this.costoVenta[4] = Math.round(data.mayo.costoVenta);
      this.venta[4] = data.mayo.venta;
      this.costoVenta[5] = Math.round(data.junio.costoVenta);
      this.venta[5] = data.junio.venta;
      this.costoVenta[6] = Math.round(data.julio.costoVenta);
      this.venta[6] = data.julio.venta;
      this.costoVenta[7] = Math.round(data.agosto.costoVenta);
      this.venta[7] = data.agosto.venta;
      this.costoVenta[8] = Math.round(data.septiembre.costoVenta);
      this.venta[8] = data.septiembre.venta;
      this.costoVenta[9] = Math.round(data.octubre.costoVenta);
      this.venta[9] = data.octubre.venta;
      this.costoVenta[10] = Math.round(data.noviembre.costoVenta);
      this.venta[10] = data.noviembre.venta;
      this.costoVenta[11] = Math.round(data.diciembre.costoVenta);
      this.venta[11] = data.diciembre.venta;
    })

  }

}
