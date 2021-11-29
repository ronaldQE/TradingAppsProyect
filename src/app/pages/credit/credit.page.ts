import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, DataCredit, FlujoAnual, MonthlyCostFull, OutCome } from '../../models/interfaces';
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
    montoFinanciar: 0,//Solo prueba
    totalProyecto: 0
  }
  public dataCredit: DataCredit = {
    montoFinanciar: 0,
    tasaInteres: 0,
    plazo: 0, //Solo prueba
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
    flujoAcumulado:0 //Solo Prueba
  }
  public monthlyCostFull: MonthlyCostFull;

  //VALORES TOTALES DE INGRESOS Y COSTOS
  public ingresosT = 384000;
  public costoProducionT = 11345;

  public costoFijoT = 0;
  public outCome: OutCome = {
    van: 0,
    tir: "",
    conclusion: "No Factible"
  }
  public tirCal=0;

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
  calFlujoAcumuladoTotal(saldoInicial: number, totalUtilidadNeta: number, totalCuota: number): number {
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
        this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', anio.toString());
        //calcular el van como el excel
        this.outCome.van = this.calVanForFCctte(this.dataCredit.montoFinanciar, this.flujoAnual.flujoAcumulado, this.dataCredit.tasaInteres, this.dataCredit.plazo);
        console.log(this.outCome.van)
        if (this.outCome.van > 0) { this.outCome.conclusion = 'Es Factible' }

        //calcular TIR
        this.testTirCal(this.dataCredit.montoFinanciar,this.flujoAnual.flujoAcumulado,this.dataCredit.plazo);
        this.outCome.tir=this.tirCal.toFixed(2)
        //carga de datos Reusltado
        this.db.updateData<OutCome>(this.outCome, '/Estimaciones/estimicion-1', 'resultado');

      } else {
        indexCuotas = indexCuotas + 12;
        anio = anio + 1;
        saldoInicial = this.flujoAnual.flujoAcumulado;
        this.setFlujoAnual(this.ingresosT, this.costoProducionT, saldoInicial, this.calCuotaTotal(this.cuotas, indexCuotas));
        this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', anio.toString())
      }

    }
  }

  //METODOS PARA EL CALCULLO DE VAN (tipo excel)

  calVanForFCctte(inversion: number, fc: number, interes: number, periodo: number): number {

    let expr = Math.pow((1 + (interes / 12) / 100), (-periodo))
    let res = Math.round((fc / 12) * ((1 - expr) / ((interes / 12) / 100)) - inversion)
    return res;
  }


  //METODOS PARA EL CALCULLO DE TIR
  testTir(k1: number, k2: number, montoFinanciar:number, flujoAcumulado:number, plazo:number): number {

    let van1Posi = false;
    let van2Posi = false;

    let van1 = this.calVanForFCctte(montoFinanciar, flujoAcumulado, k1, plazo);
    let van2 = this.calVanForFCctte(montoFinanciar, flujoAcumulado, k2, plazo);
    console.log("----------------------------------------------");
    console.log("VAN1: " + van1 + " VAN2: " + van2)

    console.log("El mas sercano a cero es TIR: " + this.proximoAcero(k1, k2, van1, van2));
    this.tirCal= (this.proximoAcero(k1, k2, van1, van2));

    if (van1 > 0) {
      van1Posi = true;
    }
    if (van2 > 0) {
      van2Posi = true;
    }

    if (van1Posi == true && van2Posi == false || van2Posi == true && van1Posi == false) {
      let tir = this.interpolar(k1, k2, van1, van2)
      let vanNew = this.calVanForFCctte(montoFinanciar, flujoAcumulado, tir, plazo);

      console.log("nuevo TIR:" + tir + " nuevo VAN: " + vanNew)


      if (vanNew > 0.0001 && vanNew < 0.9999 || vanNew==0) {

        return tir;
      } else {
        console.log("K1: " + (k1 - 1) + " K2: " + (k2 + 1))
        if (this.proximoAcero(k1, k2, van1, van2) === k1) {

         // console.log("Nuevo TIR posi:" +this.nuevoTir(k2, tir, van2, vanNew) )
          this.testTir(k1 - 1, this.nuevoTir(k2, tir, van2, vanNew, montoFinanciar, flujoAcumulado, plazo), montoFinanciar, flujoAcumulado, plazo);
        } else {
          this.testTir(k1 - 1, this.nuevoTir(k1, tir, van1, vanNew, montoFinanciar, flujoAcumulado, plazo), montoFinanciar, flujoAcumulado, plazo);
        }
        //this.testTir(k1 - 1, k2 + 1);

      }

    } else {
      return 0.000002
    }//

  }

  private interpolar(k1: number, k2: number, van1: number, van2: number) {
    return k1 + (k2 - k1) * (van1 / (van1 - van2))
  }
  private proximoAcero(k1: number, k2: number, van1: number, van2: number): number {
    let van1Compare = van1
    let van2Compare = van2

    if (van1 < 0) {
      van1Compare = van1 * (-1)
    }
    if (van2 < 0) {
      van2Compare = van2 * (-1)
    }
    console.log("n1: " + van1Compare)
    console.log("n2: " + van2Compare)

    if (van1Compare < van2Compare) {
      return k1
    } else {
      return k2
    }
  }

  private nuevoTir(kMay: number, kcal: number, vanMayor: number, vanCal: number, montoFinanciar:number, flujoAcumulado:number, plazo:number): number {
    if (kcal == this.proximoAcero(kcal, kMay, vanCal, vanMayor)) {
      if (vanCal < 0) {

        while (vanCal < 0) {
          //let tir = this.interpolar(k1, k2, van1, van2)

          vanCal = this.calVanForFCctte(montoFinanciar, flujoAcumulado, kcal = kcal - 1, plazo);
        }
        console.log("VAN a positivo: "+ vanCal)
        return kcal

      } else {
        return kcal;
      }
    } else {
      return kMay
    }

  }

  testTirCal( montoFinanciar:number, flujoAcumulado:number, plazo:number) {
    this.testTir(500, 1,montoFinanciar, flujoAcumulado, plazo);
    console.log("Este es el tir: " + this.tirCal.toFixed(2));
  }
}
