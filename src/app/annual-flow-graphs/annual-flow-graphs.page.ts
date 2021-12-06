import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { serviceDataBase } from '../services/services-database';
import { FlujoAnual } from '../models/interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-annual-flow-graphs',
  templateUrl: './annual-flow-graphs.page.html',
  styleUrls: ['./annual-flow-graphs.page.scss'],
})
export class AnnualFlowGraphsPage implements OnInit {
  private chart: Chart;
  private flowsPerYear: FlujoAnual[] = [];
  private saldoInicial: number[] = [];
  private ingresos: number[] = [];
  private costoProduccion: number[] = [];
  private utilidadBruta: number[] = [];
  private costosFijo: number[] = [];
  private utilidadNeta: number[] = [];
  private cuota: number[] = [];
  private flujoAcumulado: number[] = [];
  private flowsKeyPearYear: String[] = [];

  public idEstim: string

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')
    this.getAnnualFlow();
    this.generateChartsFlowsPerYear();
  }

  getAnnualFlow() {
    this.db.getCollection<FlujoAnual>(`/Estimaciones/${this.idEstim}/flujo-anual`).subscribe((data) => {
      for (const key in data) {
        this.flowsKeyPearYear.push(key);
        let year = data[key];
        this.saldoInicial.push(year.saldoInicial || 0);
        this.ingresos.push(year.ingresos || 0);
        this.costoProduccion.push(year.costoProduccion || 0);
        this.utilidadBruta.push(year.utilidadBruta || 0);
        this.costosFijo.push(year.costosFijo || 0);
        this.utilidadNeta.push(year.utilidadNeta || 0);
        this.cuota.push(year.cuota || 0);
        this.flujoAcumulado.push(year.flujoAcumulado || 0);

        /*let aux:FlujoAnual = {
          saldoInicial:year.saldoInicial || 0,
          ingresos:year.ingresos || 0,
          costoProduccion:year.costoProduccion || 0,
          utilidadBruta:year.utilidadBruta || 0,
          costosFijo:year.costosFijo || 0,
          utilidadNeta:year.utilidadNeta || 0,
          cuota:year.cuota || 0,
          flujoAcumulado:year.flujoAcumulado || 0
        };*/
        this.flowsPerYear.push(<FlujoAnual>data[key]);
      }
      console.log(this.saldoInicial, this.ingresos, this.costoProduccion, this.utilidadBruta, this.costosFijo, this.utilidadNeta, this.cuota, this.flujoAcumulado);
      this.generateCharts('table-chart-1', this.flowsKeyPearYear, this.saldoInicial, 'Saldo Inicial');
      this.generateCharts('table-chart-2', this.flowsKeyPearYear, this.ingresos, 'Ingresos');
      this.generateCharts('table-chart-3', this.flowsKeyPearYear, this.costoProduccion, 'Costo de Produccion');
      this.generateCharts('table-chart-4', this.flowsKeyPearYear, this.utilidadBruta, 'Utilidad Bruta');
      this.generateCharts('table-chart-5', this.flowsKeyPearYear, this.costosFijo, 'Costos Fijos');
      this.generateCharts('table-chart-6', this.flowsKeyPearYear, this.utilidadNeta, 'Utilidad Neta');
      this.generateCharts('table-chart-7', this.flowsKeyPearYear, this.cuota, 'Cuota');
      this.generateCharts('table-chart-8', this.flowsKeyPearYear, this.flujoAcumulado, 'Flujo Acumulado');
    })
  }

  generateChartsFlowsPerYear() {
    console.log(this.flowsKeyPearYear.length)
    for (let i = 0; i < this.flowsKeyPearYear.length; i++) {
      console.log("su año es: " + this.flowsKeyPearYear[i]);
      console.log("sus datos son ", this.flowsPerYear[i]);
    }
    //console.log(this.flowsKeyPearYear);
    //console.log(this.flowsPerYear);
  }

  generateCharts(id: string, years: String[], dataflow: number[], labelG: string) {
    const ctx = document.getElementById(id);
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: labelG,
            data: dataflow,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  goBack() {
    this.navigateTo('business-plan');
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
    //para navegacion
  }
}
