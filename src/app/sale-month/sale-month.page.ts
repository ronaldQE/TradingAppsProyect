import { SaleMonth, DataCredit, ComportamientoVentas} from './../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { serviceDataBase } from '../services/services-database';
import { Router } from '@angular/router';

interface User {
  id: number;
  rank: string;
}

@Component({
  selector: 'app-sale-month',
  templateUrl: './sale-month.page.html',
  styleUrls: ['./../budget/budget.page.scss','./sale-month.page.scss'],
})

export class SaleMonthPage implements OnInit {

  totalVentas = 0;
  totalCostos = 0;

 public comportamientoVentas: ComportamientoVentas = {
   venta: 0,
   costoVenta: 0,
 }
  public saleMonth: SaleMonth = {
    ventaAlta: 0,
    ventaMedia: 0,
    ventaBaja: 0,
 }

 meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

  users: User[] = [
    {
      id: 1,
      rank: 'Alta'
    },
    {
      id: 2,
      rank: 'Media',
    },
    {
      id: 3,
      rank: 'Baja',
    }
  ];

  compareWith(o1: User, o2: User | User[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: User) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }


  constructor( private router: Router,
               public db: serviceDataBase) { }

  ngOnInit() {
    this.getRangoVentas();
    //this.updataSaleMonth();

  }

  selectEneroRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('enero',this.comportamientoVentas);
   }

   
  selectFebreroRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('febrero',this.comportamientoVentas);
   }

  selectMarzoRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('marzo',this.comportamientoVentas);
   }
   
  selectAbrilRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('abril',this.comportamientoVentas);
   }

   selectMayoRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('mayo',this.comportamientoVentas);
   }

   selectJunioRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('junio',this.comportamientoVentas);
   }

   selectJulioRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('julio',this.comportamientoVentas);
   }

   selectAgostoRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('agosto',this.comportamientoVentas);
   }

   selectSeptiembreRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('septiembre',this.comportamientoVentas);
   }

   selectOctubreRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('octubre',this.comportamientoVentas);
   }

   selectNoviembreRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('noviembre',this.comportamientoVentas);
   }

   selectDiciembreRango(event: CustomEvent | any) {
    if('Alta' == event.detail.value.rank){
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * 0.0295;
    }
      if('Media' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * 0.0295;
      }
      if('Baja' == event.detail.value.rank){
        this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
        this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * 0.0295;
      }
      this.updataComportamientoVentas('diciembre',this.comportamientoVentas);
   }

  getRangoVentas() {
    this.db.getCollection<SaleMonth>('/Estimaciones/estimicion-1/rangoVentas').subscribe((data) => {
      this.saleMonth = data;
    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  updataSaleMonth(){
    this.db.updateData<SaleMonth>(this.saleMonth,'/Estimaciones/estimicion-1', 'rangoVentas');
  }

  updataComportamientoVentas(mes: string, dataMes: ComportamientoVentas){
    this.db.updateData<ComportamientoVentas>(dataMes,'/Estimaciones/estimicion-1/comportamientoVentas', mes);
  }

  getTotal(){
    for(let i = 0; i< this.meses.length; i++ ){
      this.db.getCollection<ComportamientoVentas>('/Estimaciones/estimicion-1/comportamientoVentas/'+ this.meses[i]).subscribe((data) => {
        this.totalCostos = this.totalCostos + data.costoVenta;
        this.totalVentas = this.totalVentas + data.venta;
      },
        (error: any) => {
          console.log(`Error: ${error}`);
  
        }
      )
    }
    let dataTotal = {
      totalVenta: this.totalVentas,
      totalCostoVenta: this.totalCostos,
    }
    this.db.updateData(dataTotal,'/Estimaciones/estimicion-1', 'comportamientoVentas');

  }

  save(){
    this.updataSaleMonth();
    // for(let i = 0; i< this.meses.length; i++){
    //   let dataMes: comportamientoVentas = {}
    //   this.updataComportamientoVentas('enero');
    // }
  }

  send(){
    const data = this.saleMonth;
    this.db.actualizarDatos<SaleMonth>(data,'/Estimaciones/estimicion-1','valoresMes');
  }
}
