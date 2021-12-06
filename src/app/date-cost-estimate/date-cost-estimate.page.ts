import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Budget, BudgetSummary, ComportamientoVentasTotales, DataCredit, InvestmentCapital, MonthlyCost, OperatingCapital } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/pdfmake';
import { NavController } from '@ionic/angular';
pdfMake.vfs = pdfFonts.vfs;


@Component({
  selector: 'app-date-cost-estimate',
  templateUrl: './date-cost-estimate.page.html',
  styleUrls: ['./date-cost-estimate.page.scss'],
})
export class DateCostEstimatePage implements OnInit {
  @Input() van:string;

  public budget: Budget = {
    efectivo: 0,
    banco: 0,
    otros: 0
  }
  public investmentCapital: InvestmentCapital ={
    consultoria: 0,
    equipamientoOficina: 0,
    equipoComputo: 0
  }
  public operatingCapital: OperatingCapital={
    alquiler: 0,
    manoObra: 0,
    manoObraEmprendedor: 0,
    promociones: 0,
    serviciosBasicos:0
  }
  
  //COSTOS
  public comportamientoVentasTotales: ComportamientoVentasTotales = {
    totalVenta: 0,
    totalCostoVenta: 0,
  }
  meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  public monthlyCost: MonthlyCost = {
    servicioLuz: 0,
    servicioAgua: 0,
    servicioTelefono: 0,
    servicioInternet: 0,
    alquiler: 0,
    materialEscritorio: 0,
    pagosEmpleados: 0,
    promocion: 0,
    serviciosCloud: 0,
    mantenimientoOtros: 0,
    vestimenta: 0,
    salud: 0,
    complementariosOtros: 0
  };
  public totalCostosOperativosMensuales: number = 0;
  products: Observable<any>;

  //CREDITO
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
    poliza:0,
    tipoCuota: "",
  }

  pdfObj: any;
  
  constructor(private router: Router,
              public db: serviceDataBase,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.getBudget();
    this.getOperatingCapital();
    this.getInvestmentCapital();

    this.getMonthlyCost();
    this.products = this.db.getCollection<any>('Estimaciones/estimicion-1/productos');
    this.getComportamientoVentas();

    this.getBudgetSummary();
    this.getDataCredit();
  }

  getBudget(){
    this.db.getCollection<Budget>('/Estimaciones/estimicion-1/presupuesto').subscribe( (data)=>{
      this.budget = data;
      if (data.otros == undefined){
        this.budget.otros = 0;
      }
      if (data.efectivo == undefined){
        this.budget.efectivo = 0;
      }
      if (data.banco == undefined){
        this.budget.banco = 0;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>('/Estimaciones/estimicion-1/capital-operativo').subscribe( (data)=>{
      this.operatingCapital = data;
      if(data.alquiler == undefined){
        this.operatingCapital.alquiler=0;
      }
      if(data.manoObra == undefined){
        this.operatingCapital.manoObra=0;
      }
      if(data.manoObraEmprendedor == undefined){
        this.operatingCapital.manoObraEmprendedor=0;
      }
      if(data.promociones == undefined){
        this.operatingCapital.promociones=0;
      }
      if(data.serviciosBasicos == undefined){
        this.operatingCapital.serviciosBasicos=0;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  getInvestmentCapital(){
    this.db.getCollection<InvestmentCapital>('/Estimaciones/estimicion-1/capital-de-inversion').subscribe( (data)=>{
      this.investmentCapital = data;
      if(data.consultoria == undefined){
        this.investmentCapital.consultoria=0;
      }
      if(data.equipamientoOficina == undefined){
        this.investmentCapital.equipamientoOficina=0;
      }
      if(data.equipoComputo == undefined){
        this.investmentCapital.equipoComputo=0;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getComportamientoVentas(){
    this.db.getCollection<ComportamientoVentasTotales>('/Estimaciones/estimicion-1/comportamientoVentas/totales').subscribe((data) =>{
      this.comportamientoVentasTotales.totalCostoVenta = data.totalCostoVenta;
      this.comportamientoVentasTotales.totalVenta = data.totalVenta;
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
  getMonthlyCost(){
    this.db.getCollection<MonthlyCost>('/Estimaciones/estimicion-1/costos-operativos').subscribe( (data)=>{
      this.monthlyCost = data;
      if (data.servicioLuz == undefined){
        this.monthlyCost.servicioLuz = 0;
      }
      if (data.servicioAgua == undefined){
        this.monthlyCost.servicioAgua = 0;
      }
      if (data.servicioTelefono == undefined){
        this.monthlyCost.servicioTelefono = 0;
      }
      if (data.servicioInternet == undefined){
        this.monthlyCost.servicioInternet = 0;
      }
      if (data.alquiler == undefined){
        this.monthlyCost.alquiler = 0;
      }
      if (data.materialEscritorio == undefined){
        this.monthlyCost.materialEscritorio = 0;
      }
      if (data.pagosEmpleados == undefined){
        this.monthlyCost.pagosEmpleados = 0;
      }
      if (data.promocion == undefined){
        this.monthlyCost.promocion = 0;
      }
      if (data.serviciosCloud == undefined){
        this.monthlyCost.serviciosCloud = 0;
      }
      if (data.mantenimientoOtros == undefined){
        this.monthlyCost.mantenimientoOtros = 0;
      }
      if (data.vestimenta == undefined){
        this.monthlyCost.vestimenta = 0;
      }
      if (data.salud == undefined){
        this.monthlyCost.salud = 0;
      }
      if (data.complementariosOtros == undefined){
        this.monthlyCost.complementariosOtros = 0;
      }
      this.totalCostosOperativosMensuales = this.monthlyCost.servicioLuz + this.monthlyCost.servicioAgua + this.monthlyCost.servicioTelefono + this.monthlyCost.servicioInternet + this.monthlyCost.alquiler + this.monthlyCost.materialEscritorio + this.monthlyCost.pagosEmpleados + this.monthlyCost.promocion + this.monthlyCost.serviciosCloud + this.monthlyCost.mantenimientoOtros + this.monthlyCost.vestimenta + this.monthlyCost.salud + this.monthlyCost.complementariosOtros;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  getBudgetSummary(){
    this.db.getCollection<BudgetSummary>('/Estimaciones/estimicion-1/resumen-presupuesto').subscribe( (data)=>{
      this.budgetSummary = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
  getDataCredit(){
    this.db.getCollection<DataCredit>('/Estimaciones/estimicion-1/dato-credito').subscribe( (data)=>{
      this.dataCredit = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }

  generatePDF(){
    alert('generando Pdf');
    let docDefinition = {
      content:[
        { text: this.getBudgetSummary },
        
      ]
      
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObj.dowload();
  }

}
