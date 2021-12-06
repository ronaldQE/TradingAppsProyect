import { SaleMonth, DataCredit, ComportamientoVentas, ComportamientoVentasTotales } from './../models/interfaces';
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
  styleUrls: ['./../budget/budget.page.scss', './sale-month.page.scss'],
})

export class SaleMonthPage implements OnInit {

  totalVentas = 0;
  totalCostos = 0;
  porsentajeCosto:number = 1-parseFloat( localStorage.getItem('mub'));

  public comportamientoVentas: ComportamientoVentas = {
    venta: 0,
    costoVenta: 0,
  }
  public comportamientoVentasTotales: ComportamientoVentasTotales = {
    totalVenta: 0,
    totalCostoVenta: 0,
  }
  public saleMonth: SaleMonth = {
    ventaAlta: 0,
    ventaMedia: 0,
    ventaBaja: 0,
  }
  public idEstim:string
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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


  constructor(private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {

    this.idEstim = localStorage.getItem('idEstim')
    this.getRangoVentas();
    //this.updataSaleMonth();
    this.getTotalSuma();
    //this.getTotalVentaCosto();

  }

  selectEneroRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('enero', this.comportamientoVentas);

    //this.getTotalSuma();
  }


  selectFebreroRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('febrero', this.comportamientoVentas);
  }

  selectMarzoRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('marzo', this.comportamientoVentas);
  }

  selectAbrilRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('abril', this.comportamientoVentas);
  }

  selectMayoRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('mayo', this.comportamientoVentas);
  }

  selectJunioRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('junio', this.comportamientoVentas);
  }

  selectJulioRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('julio', this.comportamientoVentas);
  }

  selectAgostoRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('agosto', this.comportamientoVentas);
  }

  selectSeptiembreRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('septiembre', this.comportamientoVentas);
  }

  selectOctubreRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('octubre', this.comportamientoVentas);
  }

  selectNoviembreRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('noviembre', this.comportamientoVentas);
  }

  selectDiciembreRango(event: CustomEvent | any) {
    if ('Alta' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaAlta * this.porsentajeCosto);
    }
    if ('Media' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaMedia * this.porsentajeCosto);
    }
    if ('Baja' == event.detail.value.rank) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = Math.round(this.saleMonth.ventaBaja * this.porsentajeCosto);
    }
    this.updataComportamientoVentas('diciembre', this.comportamientoVentas);
  }

  getRangoVentas() {
    this.db.getCollection<SaleMonth>(`/Estimaciones/${this.idEstim}/rangoVentas`).subscribe((data) => {
      this.saleMonth = data;
    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  updataSaleMonth() {
    this.db.updateData<SaleMonth>(this.saleMonth, `/Estimaciones/${this.idEstim}`, 'rangoVentas');
  }

  updataComportamientoVentas(mes: string, dataMes: ComportamientoVentas) {
    this.db.updateData<ComportamientoVentas>(dataMes, `/Estimaciones/${this.idEstim}/comportamientoVentas`, mes);
  }

  getTotalSuma() {
    this.totalCostos=0;
    this.totalVentas=0;

    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>(`/Estimaciones/${this.idEstim}/comportamientoVentas/` + this.meses[i]).subscribe((data) => {
        if (data !== null) {
          this.totalCostos = this.totalCostos + data.costoVenta;
          this.totalVentas = this.totalVentas + data.venta;
        }
        if (i == 11) {
          let dataTotal = {
            totalVenta: this.totalVentas,
            totalCostoVenta: this.totalCostos,
          }
          this.db.updateData(dataTotal, `/Estimaciones/${this.idEstim}/comportamientoVentas`, 'totales');          console.log("----------------------------------------")
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

  save() {
    this.updataSaleMonth();

  }

  send() {
    const data = this.saleMonth;
    this.db.actualizarDatos<SaleMonth>(data, `/Estimaciones/${this.idEstim}`, 'valoresMes');
  }
}
