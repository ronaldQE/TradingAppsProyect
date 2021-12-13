import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';
import { Report } from '../../clases/report'
import { MonthlyFlow } from 'src/app/models/interfaces';
import { Cuota } from 'src/app/clases/credit';
import { ToastController } from '@ionic/angular';

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
  @Input() generado: string;
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
    public db: serviceDataBase,
    public toast: ToastController,

  ) { }

  ngOnInit() {
    console.log("generado: ", this.generado)
   }

  navigateTo(path: string) {
    this.router.navigate([path, this.idEstim, this.title]);
    localStorage.setItem('idEstim', this.idEstim);
    localStorage.setItem('title', this.title);
    localStorage.setItem('mub', this.mub)

  }
  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000
    });
    toast.present(); //
  }

  //METODO PARA EJECURAR TOAST SI NO SE CALCULO LA ESTIMACION
  generatePdf(){
    if(this.generado == 'vacio'){
      this.presentToast('La Estimación es NUEVA requiere ser calculada')

    }else{

      //AQUI tu metodo para GGENERAR TU PDF
    }
  }

  generar(){

    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/`).subscribe((data)=>{
      let object = data['flujo-anual'];
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
        
        if (false) {
          this.costoVenta[0] = Math.round(data['comportamientoVentasSimuladas'].enero.costoVenta);
          this.venta[0] = data['comportamientoVentasSimuladas'].enero.venta;
          this.costoVenta[1] = Math.round(data['comportamientoVentasSimuladas'].febrero.costoVenta);
          this.venta[1] = data['comportamientoVentasSimuladas'].febrero.venta;
          this.costoVenta[2] = Math.round(data['comportamientoVentasSimuladas'].marzo.costoVenta);
          this.venta[2] = data['comportamientoVentasSimuladas'].marzo.venta;
          this.costoVenta[3] = Math.round(data['comportamientoVentasSimuladas'].abril.costoVenta);
          this.venta[3] = data['comportamientoVentasSimuladas'].abril.venta;
          this.costoVenta[4] = Math.round(data.mayo.costoVenta);
          this.venta[4] = data['comportamientoVentasSimuladas'].mayo.venta;
          this.costoVenta[5] = Math.round(data['comportamientoVentasSimuladas'].junio.costoVenta);
          this.venta[5] = data['comportamientoVentasSimuladas'].junio.venta;
          this.costoVenta[6] = Math.round(data['comportamientoVentasSimuladas'].julio.costoVenta);
          this.venta[6] = data['comportamientoVentasSimuladas'].julio.venta;
          this.costoVenta[7] = Math.round(data['comportamientoVentasSimuladas'].agosto.costoVenta);
          this.venta[7] = data['comportamientoVentasSimuladas'].agosto.venta;
          this.costoVenta[8] = Math.round(data['comportamientoVentasSimuladas'].septiembre.costoVenta);
          this.venta[8] = data['comportamientoVentasSimuladas'].septiembre.venta;
          this.costoVenta[9] = Math.round(data['comportamientoVentasSimuladas'].octubre.costoVenta);
          this.venta[9] = data['comportamientoVentasSimuladas'].octubre.venta;
          this.costoVenta[10] = Math.round(data['comportamientoVentasSimuladas'].noviembre.costoVenta);
          this.venta[10] = data['comportamientoVentasSimuladas'].noviembre.venta;
          this.costoVenta[11] = Math.round(data['comportamientoVentasSimuladas'].diciembre.costoVenta);
          this.venta[11] = data['comportamientoVentasSimuladas'].diciembre.venta;
        } else {
          this.costoVenta[0] = Math.round(data['comportamientoVentas'].enero.costoVenta);
          this.venta[0] = data['comportamientoVentas'].enero.venta;
          this.costoVenta[1] = Math.round(data['comportamientoVentas'].febrero.costoVenta);
          this.venta[1] = data['comportamientoVentas'].febrero.venta;
          this.costoVenta[2] = Math.round(data['comportamientoVentas'].marzo.costoVenta);
          this.venta[2] = data['comportamientoVentas'].marzo.venta;
          this.costoVenta[3] = Math.round(data['comportamientoVentas'].abril.costoVenta);
          this.venta[3] = data['comportamientoVentas'].abril.venta;
          this.costoVenta[4] = Math.round(data['comportamientoVentas'].mayo.costoVenta);
          this.venta[4] = data['comportamientoVentas'].mayo.venta;
          this.costoVenta[5] = Math.round(data['comportamientoVentas'].junio.costoVenta);
          this.venta[5] = data['comportamientoVentas'].junio.venta;
          this.costoVenta[6] = Math.round(data['comportamientoVentas'].julio.costoVenta);
          this.venta[6] = data['comportamientoVentas'].julio.venta;
          this.costoVenta[7] = Math.round(data['comportamientoVentas'].agosto.costoVenta);
          this.venta[7] = data['comportamientoVentas'].agosto.venta;
          this.costoVenta[8] = Math.round(data['comportamientoVentas'].septiembre.costoVenta);
          this.venta[8] = data['comportamientoVentas'].septiembre.venta;
          this.costoVenta[9] = Math.round(data['comportamientoVentas'].octubre.costoVenta);
          this.venta[9] = data['comportamientoVentas'].octubre.venta;
          this.costoVenta[10] = Math.round(data['comportamientoVentas'].noviembre.costoVenta);
          this.venta[10] = data['comportamientoVentas'].noviembre.venta;
          this.costoVenta[11] = Math.round(data['comportamientoVentas'].diciembre.costoVenta);
          this.venta[11] = data['comportamientoVentas'].diciembre.venta;
        }

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
      console.log(this.currentMonthlyFlow)
      let monthlyFlow = this.getMonthlyFlowNormal(data['costos-operativos'].totalCostosOperativos)

      this.reporte = new Report(data.presupuesto,data['capital-operativo'],data['capital-de-inversion'],data['resumen-presupuesto'],data.comportamientoVentas,data.rangoVentas,data['costos-operativos'],data['dato-credito'],data.resultado,flowYear,monthlyFlow,data.productos,data.productosCalMUB);
      
      
      this.reporte.generarPdf();
      
    });
  }

  getMonthlyFlowNormal(totalOperatingCosts: number){
    let cont: number = 0;
    let resMonthlyFlow = [];
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
    res = [this.currentMonthlyFlow.saldoInicial,this.currentMonthlyFlow.ingresos,this.currentMonthlyFlow.costoProduccion,this.currentMonthlyFlow.utilidadBruta,this.currentMonthlyFlow.costosFijos,this.currentMonthlyFlow.utilidadNeta,this.currentMonthlyFlow.cuota,this.currentMonthlyFlow.flujoAcumulado]
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
