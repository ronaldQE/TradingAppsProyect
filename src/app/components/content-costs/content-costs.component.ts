import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';
import { MonthlyCost } from 'src/app/models/interfaces';

@Component({
  selector: 'app-content-costs',
  templateUrl: './content-costs.component.html',
  styleUrls: ['./content-costs.component.scss'],
})
export class ContentCostsComponent implements OnInit {

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

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {
    this.getMonthlyCost();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
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
}
