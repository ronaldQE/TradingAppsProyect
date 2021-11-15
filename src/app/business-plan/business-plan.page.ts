import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';

import { Budget, InvestmentCapital, OperatingCapital } from '../models/interfaces';



@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.page.html',
  styleUrls: ['./business-plan.page.scss'],
})
export class BusinessPlanPage implements OnInit {

  public budget: Budget = {
    efectivo: 0,
    banco: 0,
    otros: 0
  }
  public onvestmentCapital: InvestmentCapital ={
    consultoria: 0,
    equipamientoOficina: 0,
    equipoComputo: 0
  }
  public operatingCapital: OperatingCapital={
    alquiler: null,
    manoObra: null,
    manoObraEmprendedor: null,
    promociones: null,
    serviciosBasicos: null
  }
  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    this.getBudget();
    console.log(this.budget);
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudget(){
    this.db.getCollection<Budget>('/Estimaciones/estimicion-1/presupuesto').subscribe( (data)=>{
      this.budget = data;
      console.log(data)
      console.log(this.budget)
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }


}
