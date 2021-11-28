import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, DataCredit, FlujoAnual, MonthlyCostFull } from '../../models/interfaces';
import { ToastController } from '@ionic/angular';
import { Cuota } from '../../clases/credit'

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  public budgetSummary: BudgetSummary = {
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0
  }
  public dataCredit: DataCredit = {
    montoFinanciar: 0,
    tasaInteres: 0,
    plazo: 0,
    poliza: 0,
    tipoCuota: ""
  }
  public planPagosVariado = new Cuota();
  public cuotas = [];
  public flujoAnual: FlujoAnual = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijo: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }
  public monthlyCostFull: MonthlyCostFull;

  //VALORES TOTALES DE INGRESOS Y COSTOS
  public ingresosT = 387000;
  public costoProducionT = 11434;

  public costoFijoT = 0;

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,


  ) { }

  ngOnInit() {
    this.getBudgetSummary();
    this.getDataCredit();
    this.getCostosOperativosTotal();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudgetSummary() {
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe((data) => {
      this.budgetSummary = data;
      this.budgetSummary.montoFinanciar = data.montoFinanciar

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }
  getDataCredit() {
    this.db.getCollection<DataCredit>('/Estimaciones/estimicion-1/dato-credito').subscribe((data) => {
      this.dataCredit = data;
      this.dataCredit.montoFinanciar = this.budgetSummary.montoFinanciar
    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  upCredit() {

    if (this.dataCredit.plazo == null || this.dataCredit.poliza == null || this.dataCredit.tasaInteres == null) {
      this.presentToast("Exiten campos sin completar");
    } else {
      if (!(this.dataCredit.plazo > 0 && this.dataCredit.poliza >= 0 && this.dataCredit.tasaInteres > 0)) {
        this.presentToast("Los datos son incorrectos, intente nuevamente");
      } else {
        const data = this.dataCredit;
        if (this.dataCredit.tipoCuota == null) {
          this.presentToast("selcione un tipo de credito");
        } else {
          //recuperacion de la cuotas aun arreglo
          this.cuotas = []

          if (this.dataCredit.tipoCuota == "Cuota Fija") {

            this.planPagosVariado.calPlanPagosFijo(this.dataCredit.montoFinanciar, this.dataCredit.tasaInteres, this.dataCredit.plazo, this.dataCredit.poliza);
            this.cuotas = this.planPagosVariado.cuotasF
            console.log(this.cuotas)
          }
          if (this.dataCredit.tipoCuota == "Cuota Variable") {
            this.planPagosVariado.calPlanPagosVariado(this.dataCredit.montoFinanciar, this.dataCredit.tasaInteres, this.dataCredit.plazo, this.dataCredit.poliza);
            this.cuotas = this.planPagosVariado.cuotasV
            console.log(this.cuotas)

          }
          //CArgado de datos de credito a la base de datos
          this.db.actualizarDatos<DataCredit>(data, '/Estimaciones/estimicion-1', 'dato-credito');
          //console.log("total cuotas: "+this.calCuotaTotal(this.cuotas,12));

          this.addFlujoGestion(2021, this.dataCredit.plazo);
        }
      }
    }

  }

  selectTipeCouta(event: CustomEvent | any) {
    this.dataCredit.tipoCuota = event.detail.value;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000
    });
    toast.present(); //
  }

  //METODOS PRA GUARDAR LOS TOTALES DE FUJO ANUAL
  getCostosOperativosTotal() {
    this.db.getCollection<MonthlyCostFull>('/Estimaciones/estimicion-1/costos-operativos').subscribe((data) => {
      this.costoFijoT = data.totalCostosOperativos * 12;

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  calUtilidadBrutaTotal(totalIngeso: number, totalCostoProduccion: number): number {
    return totalIngeso - totalCostoProduccion;
  }
  calUtilidadNetaTotal(totalUtiliadBruta: number, totalCostoFijo: number): number {
    return totalUtiliadBruta - totalCostoFijo;
  }
  calFlujoAcumuladoTotal(saldoInicial:number, totalUtilidadNeta: number, totalCuota: number): number {
    return totalUtilidadNeta + saldoInicial - totalCuota;
  }

  setFlujoAnual(totalIngreso: number, totalCostoProduccion: number, saldoIncial: number, totalCuota: number) {

    this.flujoAnual.saldoInicial = saldoIncial;
    this.flujoAnual.ingresos = totalIngreso;
    this.flujoAnual.costoProduccion = totalCostoProduccion;
    this.flujoAnual.utilidadBruta = this.calUtilidadBrutaTotal(totalIngreso, totalCostoProduccion);
    this.flujoAnual.costosFijo = this.costoFijoT;
    this.flujoAnual.utilidadNeta = this.calUtilidadNetaTotal(this.flujoAnual.utilidadBruta, this.flujoAnual.costosFijo);
    this.flujoAnual.cuota = totalCuota;
    this.flujoAnual.flujoAcumulado = this.calFlujoAcumuladoTotal(this.flujoAnual.saldoInicial, this.flujoAnual.utilidadNeta, totalCuota);

  }

  calCuotaTotal(cuotas: any[], indexInicio: number) {
    let totalCuotaAnual = 0;
    let cont = 0
    for (let i = indexInicio; (cont < 12 && i < cuotas.length); i++) {
      totalCuotaAnual = totalCuotaAnual + cuotas[i]
      cont = cont + 1
    }
    return totalCuotaAnual
  }


  addFlujoGestion(anio: number, numMeses: number) {
    let numGestiones = numMeses / 12;
    let saldoInicial = 0;
    let indexCuotas = 0;
    this.db.replaceData({}, '/Estimaciones/estimicion-1', 'flujo-anual')
    for (let i = 0; i < numGestiones; i++) {
      if (i == 0) {

        this.setFlujoAnual(this.ingresosT, this.costoProducionT, saldoInicial, this.calCuotaTotal(this.cuotas, indexCuotas));
        //console.log("total Cuota: "+this.calCuotaTotal(this.cuotas, indexCuotas))
        this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', anio.toString())
      } else {
        indexCuotas = indexCuotas + 12;
        anio = anio + 1;
        saldoInicial=this.flujoAnual.flujoAcumulado;
        this.setFlujoAnual(this.ingresosT, this.costoProducionT, saldoInicial, this.calCuotaTotal(this.cuotas, indexCuotas));
        this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', anio.toString())
      }

    }
  }


}
