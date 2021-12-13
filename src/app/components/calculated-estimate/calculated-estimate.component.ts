import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';
import { Report } from '../../clases/report'
import { MonthlyFlow } from 'src/app/models/interfaces';
import { Cuota } from 'src/app/clases/credit';
@Component({
  selector: 'app-calculated-estimate',
  templateUrl: './calculated-estimate.component.html',
  styleUrls: ['./calculated-estimate.component.scss'],
})
export class CalculatedEstimateComponent implements OnInit {
  public reporte: Report;
  //@Input() id:number;
  @Input() title: string;
  @Input() van: number;
  @Input() tir: string;
  @Input() idEstim: string;
  @Input() mub: string;

  public cuotas = [];
  public costoVenta = [];
  public venta = [];
  public planPagosVariado = new Cuota();
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
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() { }

  navigateTo(path: string) {
    this.router.navigate([path, this.idEstim, this.title]);
    localStorage.setItem('idEstim', this.idEstim);
    localStorage.setItem('title', this.title);
    localStorage.setItem('mub', this.mub)

  }

  generar(){

    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/`).subscribe((data)=>{
      /*let object = data['flujo-anual'];
      let flowYear = [];
      for (const key in object) {
        let year = [];
        for (const dato in object[key]) {
          year.push(object[key][dato].toFixed(2));
        }
        flowYear.push(year);
      }
      //this.previousMonthFlow.saldoInicial = data['resumen-presupuesto'].planInversion;
      if (data['dato-credito'].tipoCuota == null) {
        console.log("selcione un tipo de credito");
      } else {
        //recuperacion de la cuotas aun arreglo
        this.cuotas = []

        if (data['dato-credito'].tipoCuota == "Cuota Fija") {
          this.planPagosVariado.calPlanPagosFijo(data['dato-credito'].montoFinanciar, data['dato-credito'].tasaInteres, data['dato-credito'].plazo, data['dato-credito'].poliza);
          this.cuotas = this.planPagosVariado.cuotasF
        }
        if (data['dato-credito'].tipoCuota == "Cuota Variable") {
          this.planPagosVariado.calPlanPagosVariado(data.montoFinanciar, data.tasaInteres, data.plazo, data.poliza);
          this.cuotas = this.planPagosVariado.cuotasV
          //console.log(this.cuotas)
        }
      }

      this.currentMonthlyFlow.ingresos = data['comportamientoVentas'].enero.venta;
      this.currentMonthlyFlow.costoProduccion = Math.round(data['comportamientoVentas'].enero.costoVenta);
      this.currentMonthlyFlow.utilidadBruta = Math.round(this.currentMonthlyFlow.ingresos - data['comportamientoVentas'].enero.costoVenta)//this.currentMonthlyFlow.costoProduccion;
      let utilBruta = this.currentMonthlyFlow.ingresos - data['comportamientoVentas'].enero.costoVenta
      this.currentMonthlyFlow.costosFijos = data['costos-operativos'].totalCostosOperativos == undefined ? 0 : data['costos-operativos'].totalCostosOperativos;
      this.currentMonthlyFlow.utilidadNeta = Math.round(utilBruta - this.currentMonthlyFlow.costosFijos);
      let utilNeta = utilBruta - this.currentMonthlyFlow.costosFijos;
      this.currentMonthlyFlow.cuota = Math.round(this.cuotas[0]);
      this.currentMonthlyFlow.flujoAcumulado = Math.round(utilNeta + this.currentMonthlyFlow.saldoInicial - this.currentMonthlyFlow.cuota);

      this.currentMonthlyFlow.saldoInicial= 0;
      this.currentMonthlyFlow.ingresos= 0;
      this.currentMonthlyFlow.costoProduccion= 0;
      this.currentMonthlyFlow.utilidadBruta= 0;
      this.currentMonthlyFlow.costosFijos= 0;
      this.currentMonthlyFlow.utilidadNeta= 0;
      this.currentMonthlyFlow.cuota= 0;
      this.currentMonthlyFlow.flujoAcumulado= 0;

      console.log(this.currentMonthlyFlow)
      let monthlyFlow = this.getMonthlyFlowNormal(data['costos-operativos'].totalCostosOperativos)

      
      console.log(monthlyFlow)*/

      //this.reporte = new Report(data.presupuesto,data['capital-operativo'],data['capital-de-inversion'],data['resumen-presupuesto'],data.comportamientoVentas,data.rangoVentas,data['costos-operativos'],data['dato-credito'],data.resultado,flowYear);
      
      
      //this.reporte.generarPdf();
      
    });
  }

  getMonthlyFlowNormal(totalOperatingCosts: number){
    let cont: number = 0;
    let resMonthlyFlow = [];
    //this.initialState();
    //this.saveFlowCurrentMonth(this.currentMonthlyFlow, this.initialMonthFlow);
    while (cont < 12) {
      this.saveFlowCurrentMonth(this.previousMonthFlow, this.currentMonthlyFlow);
      let aux = this.calculateNextMonthlyFlow(cont,totalOperatingCosts);
      resMonthlyFlow.push(aux);
      cont++;
    }
    return resMonthlyFlow;
  }

  calculateNextMonthlyFlow(month: number,totalOperatingCosts: number) {
    let res = [];
    let salIni = this.previousMonthFlow.flujoAcumulado
    this.currentMonthlyFlow.saldoInicial = Math.round(salIni);
    this.currentMonthlyFlow.ingresos = this.venta[month];
    this.currentMonthlyFlow.costoProduccion = this.costoVenta[month];
    this.currentMonthlyFlow.utilidadBruta = this.currentMonthlyFlow.ingresos - this.currentMonthlyFlow.costoProduccion;
    this.currentMonthlyFlow.costosFijos = totalOperatingCosts;
    this.currentMonthlyFlow.utilidadNeta = this.currentMonthlyFlow.utilidadBruta - this.currentMonthlyFlow.costosFijos;
    this.currentMonthlyFlow.cuota = Math.round(this.cuotas[month]);
    let flujoAcu = this.currentMonthlyFlow.utilidadNeta + salIni - this.cuotas[month];
    this.currentMonthlyFlow.flujoAcumulado = Math.round(flujoAcu);
    res = [this.currentMonthlyFlow.saldoInicial,this.currentMonthlyFlow.ingresos,this.currentMonthlyFlow.costoProduccion,this.currentMonthlyFlow.utilidadBruta,this.currentMonthlyFlow.costoProduccion,this.currentMonthlyFlow.utilidadBruta,this.currentMonthlyFlow.costosFijos,this.currentMonthlyFlow.utilidadNeta,this.currentMonthlyFlow.cuota,this.currentMonthlyFlow.flujoAcumulado]
    return res;
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
}
