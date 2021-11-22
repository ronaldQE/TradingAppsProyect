import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  newBudget: Budget = {
    efectivo: null,
    banco: null,
    otros: null
  }
  constructor(
    private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {
    this.getBudget();
  }
  send(){
    const data = this.newBudget;
    this.db.actualizarDatos<Budget>(data,'/Estimaciones/estimicion-1','presupuesto');

    this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
    //para navegacion
  }
  getBudget(){
    this.db.getCollection<Budget>('/Estimaciones/estimicion-1/presupuesto').subscribe( (data)=>{
      this.newBudget = data;
      if (data.otros == undefined){
        this.newBudget.otros = 0;
      }else{
        this.newBudget.otros = data.otros;
      }
      if (data.efectivo == undefined){
        this.newBudget.efectivo = 0;
      }else{
        this.newBudget.efectivo = data.efectivo;
      }
      if (data.banco == undefined){
        this.newBudget.banco = 0;
      }else{
        this.newBudget.banco = data.banco;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
}
