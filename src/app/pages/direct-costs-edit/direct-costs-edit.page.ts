import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { serviceDataBase } from 'src/app/services/services-database';
import { ModalEditPage } from '../modal-edit/modal-edit.page';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';
import { IsumosOfProduct, ProductSer, TotalesInsumo } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-direct-costs-edit',
  templateUrl: './direct-costs-edit.page.html',
  styleUrls: ['./direct-costs-edit.page.scss'],
})
export class DirectCostsEditPage implements OnInit {


  public idProduct: string
  public idEstim: string
  public idInsumo: string
  public btnShow:boolean=false;
  public productSer: ProductSer = {
    id: null,
    cantidad: null,
    unidad:null,
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
  public totalCostoVenta:number = 0;
  public insumos:Observable<any>

  constructor(
    public modalControllerEdit: ModalController,
    public db: serviceDataBase,
    public toast: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idEstim = this.activatedRoute.snapshot.paramMap.get("idEstim")
    this.idProduct = this.activatedRoute.snapshot.paramMap.get("idProduct")
    this.getProductData();
    this.getProductDataTotalesInsumo();
    this.insumos = this.db.getInsumosList<any>(this.idEstim, this.idProduct);

  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  async openModal(idEstim:string, idProduct:string, idInsumo:string) {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalEditPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstim': idEstim,
        'idProduct': idProduct,
        'idInsumo': idInsumo

      }
    });
    return await modalEdit.present();
  }
  async openModalCreateInsumo(idEstim:string, idProduct:string) {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalInsumoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstim': idEstim,
        'idProduct': idProduct
      }
    });
    return await modalEdit.present();
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
    //console.log("el valor: " + this.estadoFrecuencia)
    if (this.estadoFrecuencia === 'Bimestral') { this.numFrecuencia = 2 }
    if (this.estadoFrecuencia === 'Trimestral') { this.numFrecuencia = 3 }
    if (this.estadoFrecuencia === 'Semestral') { this.numFrecuencia = 6 }
  }
  asignarNumFrecuencia(frecuencia:string) {

    if (frecuencia === 'Bimestral') { this.numFrecuencia = 2 }
    if (frecuencia === 'Trimestral') { this.numFrecuencia = 3 }
    if (frecuencia === 'Semestral') { this.numFrecuencia = 6 }
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

  getProductData(){
    this.db.getDataCollection<ProductSer>(this.idEstim, `/productos/${this.idProduct}`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      this.productSer = data
      this.estadoFrecuencia=data.frecuencia
      this.asignarNumFrecuencia(data.frecuencia)
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
  getProductDataTotalesInsumo(){
    this.db.getDataCollection<TotalesInsumo>(this.idEstim, `/productos/${this.idProduct}/totalesInsumo`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      if(data==null){
        this.presentToast("Debe agredar el Precion de Venta");
      }else{

        this.totalesInsumo = data
      }
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
      this.btnShow=true;
    }
  }

  addDataInsumoProduct(){
    if (this.isFormNoFull() || this.totalesInsumo.totalVenta == null) {
      //console.log("estan incomplestos: " + this.isFormNoFull())
      this.presentToast("Exiten campos sin completar");
    } else {

      //console.log(idNew)
      const data = {
        totalCosto: this.totalCostoVenta,
        totalVenta: this.totalesInsumo.totalVenta
      };
      //console.log("El objeto", data)
      this.db.addCollection(data, `${this.idEstim}/productos/${this.idProduct}`, 'totalesInsumo')

      this.navigateTo('/business-plan')
    }

  }

  deleteInsumo(idInsumo:string){
    this.db.deleteCollection(this.idEstim,`productos/${this.idProduct}/insumos/${idInsumo}`)
  }

}
