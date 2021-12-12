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
  porsentajeCosto: number = 1 - parseFloat(localStorage.getItem('mub'));

  public comportamientoVentas: ComportamientoVentas = {
    rango: "",
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
  public idEstim: string
  public meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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
  public selectEne: string = ""
  public selectFeb: string = ""
  public selectMar: string = ""
  public selectAbr: string = ""
  public selectMay: string = ""
  public selectJun: string = ""
  public selectJul: string = ""
  public selectAgo: string = ""
  public selectSep: string = ""
  public selectOct: string = ""
  public selectNov: string = ""
  public selectDic: string = ""
  public selectedRango: string = ""

  constructor(private router: Router,
    public db: serviceDataBase) { }

  ngOnInit() {

    this.idEstim = localStorage.getItem('idEstim')
    this.getRangoVentas();
    this.getValueRangoMes();
    //this.updataSaleMonth();
    //this.getTotalSuma();
    //this.getTotalVentaCosto();

  }

  selectEneroRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('enero', this.comportamientoVentas);

  }


  selectFebreroRango(event: CustomEvent | any) {

    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }

    this.updataComportamientoVentas('febrero', this.comportamientoVentas);
  }

  selectMarzoRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }

    this.updataComportamientoVentas('marzo', this.comportamientoVentas);
  }

  selectAbrilRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('abril', this.comportamientoVentas);
  }

  selectMayoRango(event: CustomEvent | any) {

    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('mayo', this.comportamientoVentas);
  }

  selectJunioRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('junio', this.comportamientoVentas);
  }

  selectJulioRango(event: CustomEvent | any) {

    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('julio', this.comportamientoVentas);
  }

  selectAgostoRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('agosto', this.comportamientoVentas);
  }

  selectSeptiembreRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('septiembre', this.comportamientoVentas);
  }

  selectOctubreRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }

    this.updataComportamientoVentas('octubre', this.comportamientoVentas);
  }

  selectNoviembreRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
    }
    this.updataComportamientoVentas('noviembre', this.comportamientoVentas);
  }

  selectDiciembreRango(event: CustomEvent | any) {
    this.comportamientoVentas.rango = event.detail.value
    if ('Alta' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaAlta;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaAlta * this.porsentajeCosto;
    }
    if ('Media' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaMedia;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaMedia * this.porsentajeCosto;
    }
    if ('Baja' == this.comportamientoVentas.rango) {
      this.comportamientoVentas.venta = this.saleMonth.ventaBaja;
      this.comportamientoVentas.costoVenta = this.saleMonth.ventaBaja * this.porsentajeCosto;
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
    this.totalCostos = 0;
    this.totalVentas = 0;

    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>(`/Estimaciones/${this.idEstim}/comportamientoVentas/` + this.meses[i]).subscribe((data) => {
        if (data !== null) {
          this.totalCostos = this.totalCostos + data.costoVenta;
          this.totalVentas = this.totalVentas + data.venta;
        }
        if (i == 11) {
          let dataTotal = {
            totalVenta: this.totalVentas,
            totalCostoVenta: this.totalCostos
          }
          this.db.updateData(dataTotal, `/Estimaciones/${this.idEstim}/comportamientoVentas`, 'totales');
          // console.log(this.totalVentas)
          // console.log(this.totalCostos)
        }
      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )
    }

  }
  navigateTo(path: string) {
    this.router.navigate([path, this.idEstim, localStorage.getItem('title')]);
  }
  save() {
    this.updataSaleMonth();
    this.navigateTo('business-plan')
    this.getTotalSuma();
  }

  getValueRangoMes() {
    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>(`/Estimaciones/${this.idEstim}/comportamientoVentas/${this.meses[i]}`).subscribe((data) => {
        //console.log("mes: "+this.meses[i])
        if (data !== null) {

          this.selectedRango = data.rango

          this.setValueMeses(this.meses[i], this.selectedRango)
        }
      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )
    }
  }
  setValueMeses(mes: string, rango: string) {
    if (mes == 'enero') { this.selectEne = rango }
    if (mes == 'febrero') { this.selectFeb = rango }
    if (mes == 'marzo') { this.selectMar = rango }
    if (mes == 'abril') { this.selectAbr = rango }
    if (mes == 'mayo') { this.selectMay = rango }
    if (mes == 'junio') { this.selectJun = rango }
    if (mes == 'julio') { this.selectJul = rango }
    if (mes == 'agosto') { this.selectAgo = rango }
    if (mes == 'septiembre') { this.selectSep = rango }
    if (mes == 'octubre') { this.selectOct = rango }
    if (mes == 'noviembre') { this.selectNov = rango }
    if (mes == 'diciembre') { this.selectDic = rango }
  }

}
