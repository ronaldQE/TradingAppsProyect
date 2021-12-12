import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';
import { Report } from '../../clases/report'
@Component({
  selector: 'app-calculated-estimate',
  templateUrl: './calculated-estimate.component.html',
  styleUrls: ['./calculated-estimate.component.scss'],
})
export class CalculatedEstimateComponent implements OnInit {
  public reporte: Report;
  //@Input() id:number;
  @Input() title: string;
  @Input() van: number;
  @Input() tir: string;
  @Input() idEstim: string;
  @Input() mub: string;

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) { }

  ngOnInit() { }

  navigateTo(path: string) {
    this.router.navigate([path, this.idEstim, this.title]);
    localStorage.setItem('idEstim', this.idEstim);
    localStorage.setItem('title', this.title);
    localStorage.setItem('mub', this.mub)

  }

  generar(){

    this.db.getCollection<any>(`/Estimaciones/${this.idEstim}/`).subscribe((data)=>{
      console.log(data);
      this.reporte = new Report(data.presupuesto,data['capital-operativo'],data['capital-de-inversion'],data['resumen-presupuesto'],data.comportamientoVentas,data.rangoVentas,data['costos-operativos'],data['dato-credito'],data.resultado);
      this.reporte.generarPdf();
    });
  }


}
