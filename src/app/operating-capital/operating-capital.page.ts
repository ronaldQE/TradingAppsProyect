import { Component, OnInit } from '@angular/core';
import { OperatingCapital } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-operating-capital',
  templateUrl: './operating-capital.page.html',
  styleUrls: ['./operating-capital.page.scss'],
})
export class OperatingCapitalPage implements OnInit {

  newOperatingCapital: OperatingCapital={
    alquiler: null,
    manoObra: null,
    manoObraEmprendedor: null,
    promociones: null,
    serviciosBasicos: null
  }

  constructor(private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {
    this.getOperatingCapital();
  }

  send(){
    const data = this.newOperatingCapital;
    this.db.actualizarDatos<OperatingCapital>(data,'/Estimaciones/estimicion-1','capital-operativo');
    this.navigateTo('business-plan');
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getOperatingCapital(){
    this.db.getCollection<OperatingCapital>('/Estimaciones/estimicion-1/capital-operativo').subscribe( (data)=>{
      this.newOperatingCapital = data;
      this.newOperatingCapital.alquiler=data.alquiler == undefined?0:data.alquiler;
      this.newOperatingCapital.manoObra=data.manoObra == undefined?0:data.manoObra;
      this.newOperatingCapital.manoObraEmprendedor=data.manoObraEmprendedor == undefined?0:data.manoObraEmprendedor;
      this.newOperatingCapital.promociones=data.promociones == undefined?0:data.promociones;
      this.newOperatingCapital.serviciosBasicos=data.serviciosBasicos == undefined?0:data.serviciosBasicos;
    },
    (error:any) => {
      console.log(`Error: ${error}`);
    }
    )
  }
}
