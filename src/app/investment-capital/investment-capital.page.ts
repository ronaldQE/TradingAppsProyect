import { Component, OnInit } from '@angular/core';
import { InvestmentCapital } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-investment-capital',
  templateUrl: './investment-capital.page.html',
  styleUrls: ['./investment-capital.page.scss'],
})
export class InvestmentCapitalPage implements OnInit {

  newInvestmentCapital: InvestmentCapital ={
    consultoria: null,
    equipamientoOficina: null,
    equipoComputo: null
  }
  constructor(private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {
  }

  send(){
    const data = this.newInvestmentCapital;
    this.db.actualizarDatos<InvestmentCapital>(data,'/Estimaciones/estimicion-1','capital-de-inversion');
    this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
