import { Component, OnInit } from '@angular/core';
import { Budget } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  public idEstim: any;
  newBudget: Budget = {
    efectivo: null,
    banco: null,
    otros: null,
  };
  constructor(
    private router: Router,
    public db: serviceDataBase,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')//this.activatedRoute.snapshot.paramMap.get('idEstim');
    console.log(this.idEstim);

    this.getBudget();
  }
  send() {
    const data = this.newBudget;
    console.log(this.newBudget);
    this.db.actualizarDatos<Budget>(
      data,
      `/Estimaciones/${this.idEstim}`,
      'presupuesto'
    );

    this.navigateTo(`business-plan`,this.idEstim);
  }
  navigateTo(path: String, idEstim: string) {
    this.router.navigate([path, idEstim]);
    //para navegacion
  }
  getBudget() {
    this.db
      .getCollection<Budget>(`/Estimaciones/${this.idEstim}/presupuesto`)
      .subscribe(
        (data) => {
          if (data !== null) {
            this.newBudget = data;
            if (data.otros == undefined) {
              this.newBudget.otros = 0;
            } else {
              this.newBudget.otros = data.otros;
            }
            if (data.efectivo == undefined) {
              this.newBudget.efectivo = 0;
            } else {
              this.newBudget.efectivo = data.efectivo;
            }
            if (data.banco == undefined) {
              this.newBudget.banco = 0;
            } else {
              this.newBudget.banco = data.banco;
            }
          }
        },
        (error: any) => {
          console.log(`Error: ${error}`);
        }
      );
  }
}
