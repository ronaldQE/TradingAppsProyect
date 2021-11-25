import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, DataCredit } from '../../models/interfaces';
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
  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,

  ) { }

  ngOnInit() {
    this.getBudgetSummary();
    this.getDataCredit();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudgetSummary() {
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe((data) => {
      this.budgetSummary = data;
      this.dataCredit.montoFinanciar = data.montoFinanciar

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
      duration: 5000
    });
    toast.present(); //
  }


}
