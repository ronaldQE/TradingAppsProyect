import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, ComportamientoVentas, ComportamientoVentasTotales, DataCredit, FlujoAnual, MonthlyCostFull, OutCome } from '../../models/interfaces';
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
    totalProyecto: 0,
    totalEfectivo:0
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
    flujoAcumulado: 0 //Solo Prueba
  }
  public monthlyCostFull: MonthlyCostFull;

  //VALORES TOTALES DE INGRESOS Y COSTOS
  //public ingresosT = 384000;
  //public costoProducionT = 11345;
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  totalCostos = 0;
  totalVentas = 0;
  public idEstim:string
  public costoFijoT = 0;
  public outCome: OutCome = {
    van: 0,
    tir: "",
    conclusion: "No Factible"
  }
  public tirCal = 0;

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,


  ) { }

  ngOnInit() {
    this.idEstim=localStorage.getItem('idEstim')
    this.getBudgetSummary();
    this.getDataCredit();

  }
  navigateTo(path: String) {
    this.router.navigate([path, this.idEstim, localStorage.getItem('title')]);
  }
  getBudgetSummary() {
    this.db.getCollection<BudgetSummary>(`/Estimaciones/${this.idEstim}/resumen-presupuesto`).subscribe((data) => {
      this.budgetSummary = data;

        this.budgetSummary.montoFinanciar = data.montoFinanciar


    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }
  getDataCredit() {
    this.db.getCollection<DataCredit>(`/Estimaciones/${this.idEstim}/dato-credito`).subscribe((data) => {
      this.dataCredit = data;
      this.dataCredit.montoFinanciar = this.budgetSummary.montoFinanciar
    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  //METODO DE GUARDADO DE DATOS DE CREDITO
  upDataCredit(){
    if (this.dataCredit.plazo == null || this.dataCredit.poliza == null || this.dataCredit.tasaInteres == null) {
      this.presentToast("Exiten campos sin completar");
    } else {
      if (!(this.dataCredit.plazo > 0 && this.dataCredit.poliza >= 0 && this.dataCredit.tasaInteres > 0 && this.dataCredit.montoFinanciar<=0)) {
        this.presentToast("Los datos son incorrectos, intente nuevamente");
      } else {
        const data = this.dataCredit;
        if (this.dataCredit.tipoCuota == null) {
          this.presentToast("selcione un tipo de credito");
        } else {

          //Cargado de datos de credito a la base de datos
          this.db.actualizarDatos<DataCredit>(data, `/Estimaciones/${this.idEstim}`, 'dato-credito');
          this.navigateTo('/business-plan');
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
      duration: 3000
    });
    toast.present(); //
  }
//********************************************************************/

}
