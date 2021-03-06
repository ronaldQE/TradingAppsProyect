import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { IsumosOfProduct } from 'src/app/models/interfaces';
import { serviceDataBase } from 'src/app/services/services-database';

@Component({
  selector: 'app-modal-insumo',
  templateUrl: './modal-insumo.page.html',
  styleUrls: ['./modal-insumo.page.scss'],
})
export class ModalInsumoPage implements OnInit {


  @Input() idEstim: string;
  @Input() idProduct: string;

  //public idEstim: string
  //public idProduct: string
  public idInsumo: string
  public insumo: IsumosOfProduct = {
    id: "",
    cantidad: null,
    unidad: 'unid',
    unidadProducto: null,
    nombreInsumo: null,
    precioUnitario: null
  }
  public insumoArray: any[] = []
  public productosArray: any[] = []


  constructor(
    public modalController: ModalController,
    public db: serviceDataBase,
    public toast: ToastController,
    private router: Router,


  ) { }

  ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim');
    //this.idProduct = "-MqB4s1K4bioJFsMXqrZ";
    this.idInsumo = this.db.generateId();
  }
  closeModal() {
    this.modalController.dismiss();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  addInsumo() {
    if (this.isFormNoFull()) {
      //console.log("estan incomplestos: " + this.isFormNoFull())
      console.log("objeto ", this.insumo)
      this.presentToast("Exiten campos sin completar");
    } else {
      if (this.insumo.cantidad <= 0 || this.insumo.precioUnitario <= 0 || this.insumo.unidadProducto <= 0) {
        //console.log("estan incomplestos: " + this.isFormNoFull())
        this.presentToast("Campos numericos debe ser > 0");
      } else {

        //let idNew = this.idProduct;

        const data = {
          id: this.idInsumo,
          cantidad: this.insumo.cantidad,
          unidad: this.insumo.unidad,
          unidadProducto: this.insumo.unidadProducto,
          nombreInsumo: this.insumo.nombreInsumo,
          precioUnitario: this.insumo.precioUnitario,
          totalCostoInsumo: this.calTotalCostoInsumo(this.insumo.cantidad, this.insumo.unidadProducto, this.insumo.precioUnitario)
        };
        this.db.createInsumoCollection(data, this.idEstim, this.idProduct, this.idInsumo);
        this.getInsumoDataList()
        this.closeModal()
      }
    }
  }
  calTotalCostoInsumo(cantidad: number, unidadProducto: number, precioUnitario: number): number {
    return (cantidad / unidadProducto) * precioUnitario;
  }
  //Metodo de control de campos vacios
  isFormNoFull(): boolean {
    let res = false
    if (
      this.insumo.nombreInsumo == null ||
      this.insumo.precioUnitario == null ||
      this.insumo.unidad == null ||
      this.insumo.unidadProducto == null ||
      this.insumo.cantidad == null
    ) {
      res = true
    }
    return res
  }

  getInsumoDataList() {
    this.db.getDataCollectionList(this.idEstim, `/productos/${this.idProduct}/insumos`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      this.insumoArray = data
      let totalCostoCal = 0
      console.log("Estimacion: ", this.insumoArray)
      for (let i = 0; i < this.insumoArray.length; i++) {
        totalCostoCal = totalCostoCal + this.insumoArray[i].totalCostoInsumo;
      }
      const dataTotal = { totalCosto: totalCostoCal }
      this.db.updateDataCollection(dataTotal, this.idEstim, `productos/${this.idProduct}`, 'totalesInsumo')
      this.getProductDataList()
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }

  //metodo calcular MUB
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
