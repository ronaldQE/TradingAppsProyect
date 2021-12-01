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

  // public estimacioness = [
  //   {
  //     title: "estimacion-1",
  //     van: 1000,
  //     tir: 122
  //   },
  //   {
  //     title: "estimacion-2",
  //     van: 2500,
  //     tir: 102
  //   },
  //   {
  //     title: "estimacion-3",
  //     van: 900,
  //     tir: 82
  //   },
  //   {
  //     title: "estimacion-4",
  //     van: 5630,
  //     tir: 185
  //   },

  // ];
  public estimaciones:HistoryData[]=[];
  public dataHistory: HistoryData ={
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
    this.getEstimaciones();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  //metodos carga de historial DE hisrotia
  getEstimaciones() {

    for(let i=0; i<10; i++ ){
      let num = (i+1).toString();
      this.db.getCollection(`/Estimaciones/estimacion-${num}`).subscribe((data) => {

        if (data == null) {
          return;

        } else {



          this.db.getCollection<OutCome>(`/Estimaciones/estimacion-${num}/resultado`).subscribe((data) => {
            let dataHistory={
              title:"Estimación-" + num,
              van:data.van,
              tir:data.tir
            }

            this.estimaciones [i] = dataHistory;


          },
            (error: any) => {
              console.log(`Error: ${error}`);

            }
          )

        }

      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )


    }




  }
}
