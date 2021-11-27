import { Component, OnInit } from '@angular/core';
import { MonthlyCost } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-costs',
  templateUrl: './monthly-costs.page.html',
  styleUrls: ['./monthly-costs.page.scss'],
})
export class MonthlyCostsPage implements OnInit {

  newMonthlyCost: MonthlyCost = {
    servicioLuz: null,
    servicioAgua: null,
    servicioTelefono: null,
    servicioInternet: null,
    alquiler: null,
    materialEscritorio: null,
    pagosEmpleados: null,
    promocion: null,
    serviciosCloud: null,
    mantenimientoOtros: null,
    vestimenta: null,
    salud: null,
    complementariosOtros: null,
  };

  public totalCostosOperativosMensuales: number = 0;
  
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {
    this.getMonthlyCost();
  }

  send(){
    const data = this.newMonthlyCost;
    this.db.actualizarDatos<MonthlyCost>(data,'/Estimaciones/estimicion-1','costos-operativos');
    this.saveSumMonthlyCost();
    this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getMonthlyCost(){
    this.db.getCollection<MonthlyCost>('/Estimaciones/estimicion-1/costos-operativos').subscribe( (data)=>{
      this.newMonthlyCost = data;
      this.newMonthlyCost.servicioLuz = data.servicioLuz == undefined?0:data.servicioLuz;
      this.newMonthlyCost.servicioAgua = data.servicioAgua == undefined?0:data.servicioAgua;
      this.newMonthlyCost.servicioTelefono = data.servicioTelefono == undefined?0:data.servicioTelefono;
      this.newMonthlyCost.servicioInternet = data.servicioInternet == undefined?0:data.servicioInternet;
      this.newMonthlyCost.alquiler = data.alquiler == undefined?0:data.alquiler;
      this.newMonthlyCost.materialEscritorio = data.materialEscritorio == undefined?0:data.materialEscritorio;
      this.newMonthlyCost.pagosEmpleados = data.pagosEmpleados == undefined?0:data.pagosEmpleados;
      this.newMonthlyCost.promocion = data.promocion == undefined?0:data.promocion;
      this.newMonthlyCost.serviciosCloud = data.serviciosCloud == undefined?0:data.serviciosCloud;
      this.newMonthlyCost.mantenimientoOtros = data.mantenimientoOtros == undefined?0:data.mantenimientoOtros;
      this.newMonthlyCost.vestimenta = data.vestimenta == undefined?0:data.vestimenta;
      this.newMonthlyCost.salud = data.salud == undefined?0:data.salud;
      this.newMonthlyCost.complementariosOtros = data.complementariosOtros == undefined?0:data.complementariosOtros;
    },
    (error:any) => {
      console.log(`Error: ${error}`);
    })
  }

  saveSumMonthlyCost(){
    this.totalCostosOperativosMensuales = this.newMonthlyCost.servicioLuz + this.newMonthlyCost.servicioAgua + this.newMonthlyCost.servicioTelefono + this.newMonthlyCost.servicioInternet + this.newMonthlyCost.alquiler + this.newMonthlyCost.materialEscritorio + this.newMonthlyCost.pagosEmpleados + this.newMonthlyCost.promocion + this.newMonthlyCost.serviciosCloud + this.newMonthlyCost.mantenimientoOtros + this.newMonthlyCost.vestimenta + this.newMonthlyCost.salud + this.newMonthlyCost.complementariosOtros;
     
  const totalMonthlyCost = {
    servicioLuz: this.newMonthlyCost.servicioLuz,
    servicioAgua: this.newMonthlyCost.servicioAgua,
    servicioTelefono: this.newMonthlyCost.servicioTelefono,
    servicioInternet: this.newMonthlyCost.servicioInternet,
    alquiler: this.newMonthlyCost.alquiler,
    materialEscritorio: this.newMonthlyCost.materialEscritorio,
    pagosEmpleados: this.newMonthlyCost.pagosEmpleados,
    promocion: this.newMonthlyCost.promocion,
    serviciosCloud: this.newMonthlyCost.serviciosCloud,
    mantenimientoOtros: this.newMonthlyCost.mantenimientoOtros,
    vestimenta: this.newMonthlyCost.vestimenta,
    salud: this.newMonthlyCost.salud,
    complementariosOtros: this.newMonthlyCost.complementariosOtros,
    totalCostosOperativos: this.totalCostosOperativosMensuales
  };
    this.db.updateData<object>(totalMonthlyCost,'/Estimaciones/estimicion-1','costos-operativos');
  }
}
