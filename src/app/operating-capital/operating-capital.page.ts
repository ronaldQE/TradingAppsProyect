import { Component, OnInit } from '@angular/core';
import { OperatingCapital } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-operating-capital',
  templateUrl: './operating-capital.page.html',
  styleUrls: ['./operating-capital.page.scss'],
})
export class OperatingCapitalPage implements OnInit {
  public idEstim: any;

  newOperatingCapital: OperatingCapital={
    alquiler: null,
    manoObra: null,
    manoObraEmprendedor: null,
    promociones: null,
    serviciosBasicos: null
  }

  constructor(private router: Router,
    public db: serviceDataBase,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idEstim = this.activatedRoute.snapshot.paramMap.get("idEstim");
    console.log(this.idEstim)

    this.getOperatingCapital();
  }

  send(){
    const data = this.newOperatingCapital;
    this.db.actualizarDatos<OperatingCapital>(data,`/Estimaciones/${this.idEstim}`,'capital-operativo');
    this.navigateTo('business-plan',this.idEstim);
  }
  navigateTo(path: String,idEstim: string) {
    this.router.navigate([path,idEstim]);
    //para navegacion
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>(`/Estimaciones/${this.idEstim}/capital-operativo`).subscribe( (data)=>{
      if (data !== null) {
        this.newOperatingCapital = data;
        this.newOperatingCapital.alquiler=data.alquiler == undefined?0:data.alquiler;
        this.newOperatingCapital.manoObra=data.manoObra == undefined?0:data.manoObra;
        this.newOperatingCapital.manoObraEmprendedor=data.manoObraEmprendedor == undefined?0:data.manoObraEmprendedor;
        this.newOperatingCapital.promociones=data.promociones == undefined?0:data.promociones;
        this.newOperatingCapital.serviciosBasicos=data.serviciosBasicos == undefined?0:data.serviciosBasicos;
      }
    },
    (error:any) => {
      console.log(`Error: ${error}`);
    }
    )
  }
}
