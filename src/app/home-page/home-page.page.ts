import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  idEstim:string = "";
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) {}

  ngOnInit() {
    this.idEstim = this.getId();
    localStorage.setItem('title','Estimación');
    localStorage.setItem('idEstim','estimicion-1');


  }

  navigateToPlan(path: String) {
    localStorage.setItem('title','Estimación-nueva');
    localStorage.setItem('idEstim',this.idEstim);
    //iniciar DB
    this.createEstimacion()
    this.createColeccion()
    this.createColeccionPresupuesto()
    this.createColeccionMub()
    this.createColeccionRango()
    this.createColeccionCapInversion()
    this.createColeccionCapOperativo()
    this.createColeccionCostoFijos()
    this.createColeccionCredito()
    this.createColeccionRePresupuesto()
    this.createColeccionVentaTotal()

    this.router.navigate([path,this.idEstim,'Estimación-nueva']);
  }

  navigateTo(path: string) {

    this.router.navigate([path]);
  }

  goCompanyInformation(){
    this.navigateTo('information');
  }

  goLastEstimate(){
    this.router.navigate(['business-plan',this.idEstim,localStorage.getItem('title')]);
  }

  goHistorial(){
    this.navigateTo('estimate-history');
  }

  getId(){
    return this.db.generateId();
  }

  //------------Metodos carga BD vacio-------//


  createColeccionMub(){
    const data={
      mub:0,
      totalCostos:0,
      totalVentas:0
    }
    this.db.addCollection(data, this.idEstim, 'productosCalMUB')
  }
  createEstimacion(){
    const data={
      id:this.idEstim
    }
    this.db.addCollection(data, "", this.idEstim)
  }

  createColeccionPresupuesto(){
    const data={
      banco:0,
      efectivo:0,
      otros:0
    }
    this.db.addCollection(data, this.idEstim, 'presupuesto')
  }
  createColeccionRePresupuesto(){
    const data={
      aportePropio:0,
      montoFinanciar:0,
      planInversion:0,
      totalEfectivo:0,
      totalProyecto:0,
    }
    this.db.addCollection(data, this.idEstim, 'resumen-presupuesto')
  }
  createColeccionCapInversion(){
    const data={
      consultoria:0,
      equipamientoOficina:0,
      equipoComputo:0,
    }
    this.db.addCollection(data, this.idEstim, 'capital-de-inversion')
  }
  createColeccionCapOperativo(){
    const data={
      alquiler:0,
      manoObra:0,
      promociones:0,
      manoObraEmprendedor:0,
      serviciosBasicos:0,
    }
    this.db.addCollection(data, this.idEstim, 'capital-operativo')
  }
  createColeccionVentaTotal(){
    const data={
            totalCostoVenta:0,
            totalVenta:0,
    }
    this.db.addCollection(data, `${this.idEstim}/comportamientoVentas`, 'totales')
  }
  createColeccionCostoFijos(){
    const data={
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
    complementariosOtros: 0,
    totalCostosOperativos:0,
    }
    this.db.addCollection(data, this.idEstim, 'costos-operativos')
  }
  createColeccionCredito(){
    const data={
      tipoCuota:'Cuota Fija',
      montoFinanciar:0,
      plazo:0,
      poliza:0,
      tasaInteres:0,
    }
    this.db.addCollection(data, this.idEstim, 'dato-credito')
  }
  createColeccionRango(){
    const data={
      ventaAlta:0,
      ventaBaja:0,
      ventaMedia:0,
    }
    this.db.addCollection(data, this.idEstim, 'rangoVentas')
  }
  createColeccion(){
    const data={
      conclusion:'No Factible',
      tir:"-",
      van:0,
      generado:'vacio'
    }
    this.db.addCollection(data, this.idEstim, 'resultado')
  }

}
