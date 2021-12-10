import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';

import { Budget, BudgetSummary, InvestmentCapital, OperatingCapital } from '../../models/interfaces';

@Component({
  selector: 'app-content-budget',
  templateUrl: './content-budget.component.html',
  styleUrls: ['./content-budget.component.scss'],
})
export class ContentBudgetComponent implements OnInit {
  @Input() idEstim: string;

  public showSpinner: boolean

  public budget: Budget = {
    efectivo: 0,
    banco: 0,
    otros: 0
  }
  public investmentCapital: InvestmentCapital = {
    consultoria: 0,
    equipamientoOficina: 0,
    equipoComputo: 0
  }
  public operatingCapital: OperatingCapital = {
    alquiler: 0,
    manoObra: 0,
    manoObraEmprendedor: 0,
    promociones: 0,
    serviciosBasicos: 0
  }
  public budgetSummary: BudgetSummary = {
    aportePropio: 0,
    planInversion: 0,
    montoFinanciar: 0,
    totalProyecto: 0,
    totalEfectivo: 0
  }
  public dataUp: any
  public cOperativo: number = 0;
  public cInversion: number = 0;
  public efectivoTotal: number = 0;

  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {
    //this.efectivoTotal=this.efectivoTotal;
  }

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')
    this.showSpinner = true;
    this.getBudget();
    this.getOperatingCapital();
    this.getInvestmentCapital();
    this.getBudgetSummary();
    //console.log("monto a financiar2: " + this.efectivoTotal)

    console.log(this.idEstim)
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getBudget() {
    this.db.getCollection<Budget>(`/Estimaciones/${this.idEstim}/presupuesto`).subscribe((data) => {
      this.budget = data;
      if (data.otros == undefined) {
        this.budget.otros = 0;
      }
      if (data.efectivo == undefined) {
        this.budget.efectivo = 0;
      }
      if (data.banco == undefined) {
        this.budget.banco = 0;
      }
      this.db.getCollection<OperatingCapital>(`/Estimaciones/${this.idEstim}/capital-operativo`).subscribe((data) => {
        let emprededor = data.manoObraEmprendedor
        let aportePropiov = this.budget.banco + this.budget.efectivo + this.budget.otros + emprededor

        let dataUp = {
          aportePropio: aportePropiov,
          totalEfectivo: this.budget.banco + this.budget.efectivo + this.budget.otros
        }
        this.dataUpdate(dataUp);

      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }



  getOperatingCapital() {
    this.db.getCollection<OperatingCapital>(`/Estimaciones/${this.idEstim}/capital-operativo`).subscribe((data) => {
      this.operatingCapital = data;
      if (data.alquiler == undefined) {
        this.operatingCapital.alquiler = 0;
      }
      if (data.manoObra == undefined) {
        this.operatingCapital.manoObra = 0;
      }
      if (data.manoObraEmprendedor == undefined) {
        this.operatingCapital.manoObraEmprendedor = 0;
      }
      if (data.promociones == undefined) {
        this.operatingCapital.promociones = 0;
      }
      if (data.serviciosBasicos == undefined) {
        this.operatingCapital.serviciosBasicos = 0;
      }

      this.db.getCollection<InvestmentCapital>(`/Estimaciones/${this.idEstim}/capital-de-inversion`).subscribe((data) => {
        this.investmentCapital = data;
        if (data.consultoria == undefined) {
          this.investmentCapital.consultoria = 0;
        }
        if (data.equipamientoOficina == undefined) {
          this.investmentCapital.equipamientoOficina = 0;
        }
        if (data.equipoComputo == undefined) {
          this.investmentCapital.equipoComputo = 0;
        }
        this.db.getCollection<BudgetSummary>(`/Estimaciones/${this.idEstim}/resumen-presupuesto`).subscribe((data) => {
          this.budgetSummary = data;
          let gastosOperativos = this.operatingCapital.alquiler + this.operatingCapital.manoObra + this.operatingCapital.serviciosBasicos
          let maquinariaEquipos = this.investmentCapital.equipoComputo + this.investmentCapital.equipamientoOficina
          let planInversionCal = gastosOperativos + this.operatingCapital.promociones + maquinariaEquipos + this.investmentCapital.consultoria
          let totalProyectoCal = planInversionCal + this.budgetSummary.aportePropio - this.budgetSummary.totalEfectivo
          let montoFinanciarCal = planInversionCal - this.budgetSummary.totalEfectivo
          const dataUp = {
            planInversion: planInversionCal,
            totalProyecto: totalProyectoCal,
            montoFinanciar: montoFinanciarCal,
          }
          this.dataUpdate(dataUp);
          this.dataUpdateMontoCredit({ montoFinanciar: montoFinanciarCal })
        },
          (error: any) => {
            console.log(`Error: ${error}`);

          }
        )

      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )


    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  getInvestmentCapital() {
    this.db.getCollection<InvestmentCapital>(`/Estimaciones/${this.idEstim}/capital-de-inversion`).subscribe((data) => {
      this.investmentCapital = data;
      if (data.consultoria == undefined) {
        this.investmentCapital.consultoria = 0;
      }
      if (data.equipamientoOficina == undefined) {
        this.investmentCapital.equipamientoOficina = 0;
      }
      if (data.equipoComputo == undefined) {
        this.investmentCapital.equipoComputo = 0;
      }

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  dataUpdate(data: any) {
    this.db.updateData(data, `/Estimaciones/${this.idEstim}`, 'resumen-presupuesto')
  }
  dataUpdateMontoCredit(data: any) {
    this.db.updateData(data, `/Estimaciones/${this.idEstim}`, 'dato-credito')
  }
  getBudgetSummary() {
    this.db.getCollection<BudgetSummary>(`/Estimaciones/${this.idEstim}/resumen-presupuesto`).subscribe((data) => {
      this.budgetSummary = data;
      this.showSpinner = false;
    },
      (error: any) => {
        console.log(`Error: ${error}`);
        this.showSpinner = false;


      }
    )
  }

}
