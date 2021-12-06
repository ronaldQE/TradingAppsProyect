import { Component, OnInit } from '@angular/core';
import { InvestmentCapital } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-investment-capital',
  templateUrl: './investment-capital.page.html',
  styleUrls: ['./investment-capital.page.scss'],
})
export class InvestmentCapitalPage implements OnInit {
  public idEstim: any;
  newInvestmentCapital: InvestmentCapital ={
    consultoria: null,
    equipamientoOficina: null,
    equipoComputo: null
  }
  constructor(private router: Router,
    public db: serviceDataBase,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idEstim = this.activatedRoute.snapshot.paramMap.get("idEstim");
    console.log(this.idEstim)

    this.getInvestmentCapital();
  }

  send(){
    const data = this.newInvestmentCapital;
    this.db.actualizarDatos<InvestmentCapital>(data,`/Estimaciones/${this.idEstim}`,'capital-de-inversion');
    this.navigateTo('business-plan',this.idEstim);
  }
  navigateTo(path: String, idEstim: string) {
    this.router.navigate([path, idEstim]);
    //para navegacion
  }
  getInvestmentCapital(){
    this.db.getCollection<InvestmentCapital>(`/Estimaciones/${this.idEstim}/capital-de-inversion`).subscribe( (data)=>{
      if(data!==null){
        this.newInvestmentCapital = data;  
        this.newInvestmentCapital.consultoria=data.consultoria == undefined?0:data.consultoria;
        this.newInvestmentCapital.equipamientoOficina=data.equipamientoOficina == undefined?0:data.equipamientoOficina;
        this.newInvestmentCapital.equipoComputo=data.equipoComputo == undefined?0:data.equipoComputo;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);
    }
    )
  }
}
