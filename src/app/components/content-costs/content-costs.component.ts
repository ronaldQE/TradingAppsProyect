import { CollectionToArrayPipe } from './../../common/collection-to-array.pipe';
import { ComportamientoVentas, ComportamientoVentasTotales, ProductSer } from './../../models/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../../services/services-database';
import { MonthlyCost, ProductMonth, } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-costs',
  templateUrl: './content-costs.component.html',
  styleUrls: ['./content-costs.component.scss'],
})
export class ContentCostsComponent implements OnInit {

  @Input() idEstim:string;


  totalSumaVenta = 0;
  totalSumaCostos = 0;

  public comportamientoVentas: ComportamientoVentas = {
    venta: 0,
    costoVenta: 0,
  }
  public comportamientoVentasTotales: ComportamientoVentasTotales = {
    totalVenta: 0,
    totalCostoVenta: 0,
  }
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  public monthlyCost: MonthlyCost = {
    servicioLuz: 0,
    servicioAgua: 0,
    servicioTelefono: 0,
    servicioInternet: 0,
    alquiler: 0,
    materialEscritorio: 0,
    pagosEmpleados: 0,
    promocion: 0,
    serviciosCloud: 0,
    mantenimientoOtros: 0,
    vestimenta: 0,
    salud: 0,
    complementariosOtros: 0
  };

  public totalVenta: number = 0;
  public totalCostoVenta: number = 0;

  //public idEstim: string;
  public totalCostosOperativosMensuales: number = 0;
  //products: Observable<any>;
  public products:Observable<any>
  public productosArray: any[] = []

  constructor(
    private router: Router,
    public db: serviceDataBase
  ) {
  }

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')
    this.getMonthlyCost();
    //this.products = this.db.getListCollection()
     this.products = this.db.getProductList<ProductSer>(this.idEstim);

     //console.log("El arregol...",this.products)
      this.getComportamientoVentas();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  navigateToParm(path: String, idEstim:string, idProduct:string) {
    this.router.navigate([path,idEstim,idProduct]);
  }

  getComportamientoVentas() {
    this.db.getCollection<ComportamientoVentasTotales>(`/Estimaciones/${this.idEstim}/comportamientoVentas/totales`).subscribe((data) => {
      this.comportamientoVentasTotales.totalCostoVenta = data.totalCostoVenta;
      this.comportamientoVentasTotales.totalVenta = data.totalVenta;
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
  getTotalVenta() {
    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>(`/Estiamciones/${this.idEstim}/comportamientoVentas` + this.meses[i]).subscribe((data) => {
        this.totalSumaCostos = this.totalSumaCostos + data.costoVenta;
      },
        (error: any) => {
          console.log(`Error: ${error}`);
        }
      )
    }
  }
  getMonthlyCost() {
    this.db.getCollection<MonthlyCost>(`/Estimaciones/${this.idEstim}/costos-operativos`).subscribe((data) => {
      this.monthlyCost = data;
      if (data.servicioLuz == undefined) {
        this.monthlyCost.servicioLuz = 0;
      }
      if (data.servicioAgua == undefined) {
        this.monthlyCost.servicioAgua = 0;
      }
      if (data.servicioTelefono == undefined) {
        this.monthlyCost.servicioTelefono = 0;
      }
      if (data.servicioInternet == undefined) {
        this.monthlyCost.servicioInternet = 0;
      }
      if (data.alquiler == undefined) {
        this.monthlyCost.alquiler = 0;
      }
      if (data.materialEscritorio == undefined) {
        this.monthlyCost.materialEscritorio = 0;
      }
      if (data.pagosEmpleados == undefined) {
        this.monthlyCost.pagosEmpleados = 0;
      }
      if (data.promocion == undefined) {
        this.monthlyCost.promocion = 0;
      }
      if (data.serviciosCloud == undefined) {
        this.monthlyCost.serviciosCloud = 0;
      }
      if (data.mantenimientoOtros == undefined) {
        this.monthlyCost.mantenimientoOtros = 0;
      }
      if (data.vestimenta == undefined) {
        this.monthlyCost.vestimenta = 0;
      }
      if (data.salud == undefined) {
        this.monthlyCost.salud = 0;
      }
      if (data.complementariosOtros == undefined) {
        this.monthlyCost.complementariosOtros = 0;
      }
      this.totalCostosOperativosMensuales = this.monthlyCost.servicioLuz + this.monthlyCost.servicioAgua + this.monthlyCost.servicioTelefono + this.monthlyCost.servicioInternet + this.monthlyCost.alquiler + this.monthlyCost.materialEscritorio + this.monthlyCost.pagosEmpleados + this.monthlyCost.promocion + this.monthlyCost.serviciosCloud + this.monthlyCost.mantenimientoOtros + this.monthlyCost.vestimenta + this.monthlyCost.salud + this.monthlyCost.complementariosOtros;

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  //nuevos Metodos
  deleteProduct(idProduct:string){
    this.db.deleteCollection(this.idEstim,`productos/${idProduct}`)
    this.getProductDataList()
  }
  getProductDataList() {
    this.db.getDataCollectionList(this.idEstim, `/productos`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      this.productosArray = data
      let totalCostoCal = 0
      let totalVentaCal = 0
      console.log("Estimacion: ", this.productosArray)
      for (let i = 0; i < this.productosArray.length; i++) {
        let numfrecuencia: number = this.productosArray[i].frecuenciaNum
        totalCostoCal = totalCostoCal + (this.productosArray[i].totalesInsumo.totalCosto / numfrecuencia);
        totalVentaCal = totalVentaCal + (this.productosArray[i].totalesInsumo.totalVenta / numfrecuencia);
      }
      const dataTotal = {
        totalCostos: totalCostoCal,
        totalVentas: totalVentaCal,
        mub: ((totalVentaCal - totalCostoCal) / totalVentaCal)
      }
      this.db.updateDataCollection(dataTotal, this.idEstim, "", 'productosCalMUB');
      localStorage.setItem('mub',dataTotal.mub.toString());


    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
}
