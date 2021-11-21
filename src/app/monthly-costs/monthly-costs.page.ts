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
    complementariosOtros: null
  };
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {
  }

  send(){
    const data = this.newMonthlyCost;
    this.db.actualizarDatos<MonthlyCost>(data,'/Estimaciones/estimicion-1','costos-operativos');
    //this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
