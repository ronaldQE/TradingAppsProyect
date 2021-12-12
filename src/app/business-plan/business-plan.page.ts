import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';

import { Budget, BudgetSummary, InvestmentCapital, OperatingCapital } from '../models/interfaces';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.page.html',
  styleUrls: ['./business-plan.page.scss'],
})
export class BusinessPlanPage implements OnInit {
  public valueSelected:string = "p"
  public idEstim: any;
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


  public cOperativo:number=0;
  public cInversion:number=0;
  public efectivoTotal:number=0;
  public title:string=""

  constructor(
    private router: Router,
    public db: serviceDataBase,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.title = localStorage.getItem('title')//this.activatedRoute.snapshot.paramMap.get("idEstim");
    this.idEstim = this.activatedRoute.snapshot.paramMap.get("idEstim");//localStorage.getItem('idEstim')this.activatedRoute.snapshot.paramMap.get("idEstim");
    //console.log(this.idEstim)
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  segmentChanged(event: CustomEvent |any) {
    this.valueSelected = event.detail.value;
    //console.log('Segment changed', event);
  }


}
