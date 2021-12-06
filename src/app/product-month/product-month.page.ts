import { ProductMonth } from './../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-product-month',
  templateUrl: './product-month.page.html',
  styleUrls: ['./../budget/budget.page.scss','./product-month.page.scss'],
})

export class ProductMonthPage implements OnInit {

  formProduct: FormGroup;

  newProductMonth: ProductMonth = {
    productoServicio: null,
    tipo: null,
    cantidad: null,
    unidadVenta: null,
    tipoFrecuencia: "",
    precioC: null,
    precioV: null,
  };

  public totalCompraMensual: number = 0;

  public idEstim:string
  constructor(private router: Router,
              public db: serviceDataBase,
              public fb: FormBuilder) {

    this.formProduct = this.fb.group({
      id: uuidv4(),
      productoServicio: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      unidadVenta: [null, [Validators.required]],
      tipoFrecuencia: [null, [Validators.required]],
      precioC: [null, [Validators.required]],
      precioV: [null, [Validators.required]],
    })

  }

  ngOnInit() {
    this.idEstim=localStorage.getItem('idEstim')
  }

  selectTipeCouta(event: CustomEvent | any) {

  }

  saveProduct() {
    this.db.actualizarDatos(this.formProduct.value, `Estimaciones/${this.idEstim}/productos`, this.formProduct.get('id').value);
    this.saveOpProductMonth();
    this.navigateTo('business-plan');
  }


  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  saveOpProductMonth(){
  //   const tipoFrecuencia;
  //   if(tipoFrecuencia === "Bimestral"){
  //     this.totalCompraMensual = (this.newProductMonth.cantidad * this.newProductMonth.precioC) * (30/360);
  //   } else {
  //     if(tipoFrecuencia === "Trimestral"){
  //       this.totalCompraMensual = (this.newProductMonth.cantidad * this.newProductMonth.precioC) * (30/90);
  //     } else
  //     this.totalCompraMensual = (this.newProductMonth.cantidad * this.newProductMonth.precioC) * (30/90);
  //   }

  }


}
