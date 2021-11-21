import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../../services/services-database';
import { Router } from '@angular/router';

import { BudgetSummary, DataCredit } from '../../models/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  public budgetSummary: BudgetSummary={
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0
  }
  public dataCredit: DataCredit={
    montoFinanciar:0,
    tasaInteres:0,
    plazo:0,
    tipoCuota: "",
  }

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast:ToastController
  ) { }

  ngOnInit(){
    this.getBudgetSummary();
    this.getDataCredit();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudgetSummary(){
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe( (data)=>{
      this.budgetSummary = data;
      this.dataCredit.montoFinanciar=data.montoFinanciar

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getDataCredit(){
    this.db.getCollection<DataCredit>('/Estimaciones/estimicion-1/dato-credito').subscribe( (data)=>{
      this.dataCredit = data;
      this.dataCredit.montoFinanciar=this.budgetSummary.montoFinanciar
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  send(){

    const data = this.dataCredit;
    if(this.dataCredit.tipoCuota==""){
      this.presentToast();
    }else{

      this.db.actualizarDatos<DataCredit>(data,'/Estimaciones/estimicion-1','dato-credito');
      this.navigateTo('business-plan');
    }
  }

  selectTipeCouta(event:CustomEvent|any){
      this.dataCredit.tipoCuota = event.detail.value;

  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Debe seleccionar Tipo de Cuota',
      duration: 5000
    });
    toast.present(); //
  }
}
