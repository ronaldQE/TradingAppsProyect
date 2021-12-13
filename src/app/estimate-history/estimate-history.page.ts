import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../services/services-database';

import { HistoryData } from '../models/interfaces';
import { Router } from '@angular/router';
import { getDatabase, ref, child, get } from "firebase/database";



@Component({
  selector: 'app-estimate-history',
  templateUrl: './estimate-history.page.html',
  styleUrls: ['./estimate-history.page.scss'],
})
export class EstimateHistoryPage implements OnInit {

  public estimacionTitle: string = "Estimación"
  public estimacionVan: number = 0
  public estimacionTir: string = "-"
  public estimacionId: string = ""
  public estimacionGenerado: string = ""

  public mub: string;
  public estimaciones: HistoryData[] = [];
   public estimacionArray: any
  public dataHistory: HistoryData = {
    id: 0,
    title: "",
    van: 0,
    tir: ""
  };
  constructor(
    private router: Router,
    public db: serviceDataBase

  ) {

  }

  ngOnInit() {
    //this.recuperaEstimation();
    this.getEstimations();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  setValueEstimacion(numTitle: number, van: number, tir: string, id: string, mub: number, generado:string) {
    this.estimacionTitle = `Estimación-${numTitle + 1}`
    this.estimacionVan = van;
    this.estimacionTir = tir
    this.estimacionId = id
    this.estimacionGenerado = generado
    this.mub = mub.toString();

  }

  //Metodo que Para ejecutar solo una vez
  recuperaEstimation() {

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Estimaciones`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.estimacionArray = Object.values(snapshot.val())
        console.log(this.estimacionArray);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  getEstimations(){
    this.db.getEstimacionesLists().subscribe((data) => {
      this.estimacionArray = data;

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }


}
