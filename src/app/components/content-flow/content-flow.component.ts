import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlujoAnual } from 'src/app/models/interfaces';
import { serviceDataBase } from '../../services/services-database';


interface Gestions{
  id:number,
  rank:string
}
@Component({
  selector: 'app-content-flow',
  templateUrl: './content-flow.component.html',
  styleUrls: ['./content-flow.component.scss'],
})
export class ContentFlowComponent implements OnInit {

  public flujoAnual:FlujoAnual={
    saldoInicial:0,
    ingresos:0,
    costoProduccion:0,
    utilidadBruta:0,
    costosFijo:0,
    utilidadNeta:0,
    cuota:0,
    flujoAcumulado:0
  }
  public selectGestion:string
  public gestions:Gestions [] = [
    {
      id: 1,
      rank: '2021'
    },
    {
      id: 2,
      rank: '2022',
    },
    {
      id: 3,
      rank: '2023',
    },
    {
      id: 2,
      rank: '2024',
    },
    {
      id: 3,
      rank: '2025',
    }
  ];
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) {

  }

  ngOnInit() {

    this.getFlujoAnual("2021");
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  segmentChanged(event: CustomEvent |any) {
    this.selectGestion = event.detail.value;
    //console.log('la gestion es: '+ this.selectGestion);
    this.getFlujoAnual(this.selectGestion);
  }
  getFlujoAnual(gestion:string){
    this.db.getCollection<FlujoAnual>(`/Estimaciones/estimicion-1/flujo-anual/${gestion}`).subscribe( (data)=>{
      this.flujoAnual = data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);

    }
    )
  }
}
