import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ComportamientoVentas, FlujoAnual, OutCome } from 'src/app/models/interfaces';
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
    tir:"",
    conclusion:"No Factible"
  }
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  totalCostos = 0;
  totalVentas = 0;
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

  goToGraphics(){
    this.navigateTo('annual-flow-graphs');
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
  getTotalSuma() {
    this.totalCostos=0;
    this.totalVentas=0;

    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>('/Estimaciones/estimicion-1/comportamientoVentas/' + this.meses[i]).subscribe((data) => {
        if (data !== null) {
          this.totalCostos = this.totalCostos + data.costoVenta;
          this.totalVentas = this.totalVentas + data.venta;
        }
        if (i == 11) {
          let dataTotal = {
            totalVenta: this.totalVentas,
            totalCostoVenta: this.totalCostos,
          }
          this.db.updateData(dataTotal, '/Estimaciones/estimicion-1/comportamientoVentas', 'totales');
          console.log("----------------------------------------")
          console.log(this.totalVentas)
          console.log(this.totalCostos)
        }
      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )
    }

  }
}
