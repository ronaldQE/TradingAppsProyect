import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FlujoAnual, OutCome } from 'src/app/models/interfaces';
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
  public outCome: OutCome={
    van:0,
    tir:0,
    conclusion:"No Factible"
  }
  public valueSelected:string = "2021"
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
    public db: serviceDataBase,
    public toast: ToastController,

  ) {

  }

  ngOnInit() {

    this.getFlujoAnual("2021");
    this.getOutCome();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  segmentChanged(event: CustomEvent |any) {
    this.valueSelected = event.detail.value;
    //console.log('la gestion es: '+ this.selectGestion);
    this.getFlujoAnual(this.valueSelected);
  }
  getFlujoAnual(gestion:string){
    this.db.getCollection<FlujoAnual>(`/Estimaciones/estimicion-1/flujo-anual/${gestion}`).subscribe( (data)=>{
      if(data==null){
        this.presentToast("La gestion esta vacia");
        this.flujoAnual={
          saldoInicial:0,
          ingresos:0,
          costoProduccion:0,
          utilidadBruta:0,
          costosFijo:0,
          utilidadNeta:0,
          cuota:0,
          flujoAcumulado:0
        }
        //this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', '2022')

      }else{

        this.flujoAnual = data;
      }


    },
    (error:any) => {
      console.log(`Error: ${error}`);
    }
    )
  }
  getOutCome(){
    this.db.getCollection<OutCome>(`/Estimaciones/estimicion-1/resultado`).subscribe( (data)=>{
      this.outCome=data;

    },
    (error:any) => {
      console.log(`Error: ${error}`);
    }
    )
  }

  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000
    });
    toast.present(); //
  }
}
