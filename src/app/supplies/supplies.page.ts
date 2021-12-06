import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplies } from '../models/interfaces';
import { serviceDataBase } from '../services/services-database';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.page.html',
  styleUrls: ['./supplies.page.scss'],
})
export class SuppliesPage implements OnInit {

  newSupplies: Supplies = {
    insumo: null,
    cantidadA: null,
    unidProducB: null,
    unidad: null,
    precioUnutarioC: null
  };
  public idEstim:string

  public totalCantidadABC: number = 0;

  constructor(private router: Router,
              public db: serviceDataBase) { }

  ngOnInit() {
    this.idEstim=localStorage.getItem('idEstim')
  }

  save(){
    console.log(this.newSupplies);

  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  getnewSupplies(){
    this.db.getCollection<Supplies>(`/Estimaciones/${this.idEstim}/sevicios-insumo`).subscribe( (data)=>{
      this.newSupplies = data;
      this.newSupplies.insumo = data.insumo;
      this.newSupplies.cantidadA = data.cantidadA;
      this.newSupplies.unidProducB = data.unidProducB;
      this.newSupplies.unidad = data.unidad;
      this.newSupplies.precioUnutarioC =data.precioUnutarioC;
    },
    (error:any) => {
      console.log(`Error: ${error}`);
    })
  }

  saveOperSupplies(){
    this.totalCantidadABC = (this.newSupplies.cantidadA / this.newSupplies.unidProducB) * this.newSupplies.precioUnutarioC;
  }

}
