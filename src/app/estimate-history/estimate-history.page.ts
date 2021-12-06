import { Component, OnInit, Input } from '@angular/core';
import { serviceDataBase } from '../services/services-database';

import { HistoryData, OutCome } from '../models/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estimate-history',
  templateUrl: './estimate-history.page.html',
  styleUrls: ['./estimate-history.page.scss'],
})
export class EstimateHistoryPage implements OnInit {

  public estimacionTitle:string="Estimación"
  public estimacionVan:number=0
  public estimacionTir:string="-"
  public estimacionId:string=""

  public estimaciones:HistoryData[]=[];
  public estimacionArray:any[]=[];
  public dataHistory: HistoryData ={
    id:0,
    title:"",
    van: 0,
    tir:""
  };
  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    this.getEstimacionesList();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  setValueEstimacion(numTitle:number, van:number, tir:string, id:string){
    this.estimacionTitle= `Estimación-${numTitle+1}`
    this.estimacionVan=van;
    this.estimacionTir=tir
    this.estimacionId=id

  }
  //metodos carga de historial DE hisrotia
  getEstimacionesList() {
    this.db.getEstimacionesList().subscribe((data) => {
      console.log("Estimacion: ", data)
      this.estimacionArray = data

    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
}
