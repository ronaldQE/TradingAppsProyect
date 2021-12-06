import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { IsumosOfProduct, ProductSer, TotalesInsumo } from 'src/app/models/interfaces';
import { serviceDataBase } from 'src/app/services/services-database';
import { Observable } from 'rxjs';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';




@Component({
  selector: 'app-direct-costs',
  templateUrl: './direct-costs.page.html',
  styleUrls: ['./direct-costs.page.scss'],
})
export class DirectCostsPage implements OnInit {

  public idProduct: string
  public idEstim: string
  public btnShow: boolean = false;
  public productSer: ProductSer = {
    id: null,
    cantidad: null,
    unidad: 'unid',
    frecuencia: null,
    frecuenciaNum: null,
    nombre: null,
    tipo: null
  }
  public totalesInsumo: TotalesInsumo = {
    totalCosto: null,
    totalVenta: null
  }

  public estadoFrecuencia: string;
  public numFrecuencia: number = null;
  public totalCostoVenta: number = 0;
  public insumos: Observable<any>

  public productosArray: any[] = []

  constructor(
    public modalController: ModalController,
    public db: serviceDataBase,
    public toast: ToastController,
    private router: Router

  ) { }

  ngOnInit() {
    this.idEstim = "-Mq9gCpEK8IUZsLaY98B";
    this.idProduct = this.db.generateId();

    this.insumos = this.db.getInsumosList<any>(this.idEstim, this.idProduct);

    console.log(this.idProduct)

  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalInsumoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstim': this.idEstim,
        'idProduct': this.idProduct,

      }
    });
    return await modal.present();
  }


  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  selectTipeCouta(event: CustomEvent | any) {
    this.estadoFrecuencia = event.detail.value;
    console.log("el valor: " + this.estadoFrecuencia)
    if (this.estadoFrecuencia === 'Bimestral') { this.numFrecuencia = 2 }
    if (this.estadoFrecuencia === 'Trimestral') { this.numFrecuencia = 3 }
    if (this.estadoFrecuencia === 'Semestral') { this.numFrecuencia = 6 }
  }
  //Metodo de control de campos vacios
  isFormNoFull(): boolean {
    let res = false
    if (
      this.productSer.nombre == null ||
      this.productSer.cantidad == null ||
      this.productSer.unidad == null ||
      this.productSer.tipo == null ||
      this.numFrecuencia == null

    ) {
      res = true
    }
    return res
  }
  //-----------Pruebas--------------//

  addEstimacion() {
    this.db.createEstimacion()
  }

  getEstimacionesLists() {
    this.db.getEstimacionesList().subscribe((data) => {
      console.log("Lista: ", data)
      //console.log(data)
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )

  }

  getEstimacion() {
    this.db.getEstimacion("-Mq9gCpEK8IUZsLaY98B").subscribe((data) => {
      console.log("Estimacion: ", data)
      //console.log(data)
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }

  addProduct() {
    if (this.isFormNoFull()) {
      //console.log("estan incomplestos: " + this.isFormNoFull())
      this.presentToast("Exiten campos sin completar");
    } else {
      //console.log(idNew)
      const data = {
        id: this.idProduct,
        cantidad: this.productSer.cantidad,
        unidad: this.productSer.unidad,
        frecuencia: this.estadoFrecuencia,
        frecuenciaNum: this.numFrecuencia,
        nombre: this.productSer.nombre,
        tipo: this.productSer.tipo

      };
      //console.log("El objeto", data)
      this.db.createProdutCollection(data, this.idEstim, this.idProduct)
      this.btnShow = true;
    }
  }

  addDataInsumoProduct() {
    if (this.isFormNoFull() || this.totalesInsumo.totalVenta == null) {
      //console.log("estan incomplestos: " + this.isFormNoFull())
      this.presentToast("Exiten campos sin completar");
    } else {

      //console.log(idNew)
      const data = {
        //totalCosto: this.totalCostoVenta,
        totalVenta: this.totalesInsumo.totalVenta
      };
      //console.log("El objeto", data)
      this.db.addCollection(data, `${this.idEstim}/productos/${this.idProduct}`, 'totalesInsumo');

      this.getProductDataList()

      this.navigateTo('/business-plan')
    }

  }

  deleteInsumo(idInsumo: string) {
    this.db.deleteCollection(this.idEstim, `productos/${this.idProduct}/insumos/${idInsumo}`)
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
