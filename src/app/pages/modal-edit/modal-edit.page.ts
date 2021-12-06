import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { IsumosOfProduct } from 'src/app/models/interfaces';
import { serviceDataBase } from 'src/app/services/services-database';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {
  @Input() idInsumo:string;
  @Input() idEstim:string;
  @Input() idProduct:string;

  public insumo: IsumosOfProduct = {
    id:"",
    cantidad: null,
    unidad: null,
    unidadProducto:null,
    nombreInsumo: null,
    precioUnitario: null
  }

  constructor(
    public modalControllerEdit: ModalController,
    public db: serviceDataBase,
    public toast: ToastController,
    private router: Router,

  ) { }

  ngOnInit() {
    this.idEstim=this.idEstim
    //console.log("idEstimacion: "+this.idEstim)

    this.getInsumoData()
  }
  cerrarModal(){
    //console.log("CERRAR")
    this.modalControllerEdit.dismiss();
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
      //console.log("objeto ", this.insumo)
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
        unidadProducto:this.insumo.unidadProducto,
        nombreInsumo: this.insumo.nombreInsumo,
        precioUnitario: this.insumo.precioUnitario,
        totalCostoInsumo: this.calTotalCostoInsumo(this.insumo.cantidad,this.insumo.unidadProducto,this.insumo.precioUnitario)

      };
      this.db.createInsumoCollection(data, this.idEstim, this.idProduct,this.idInsumo);
      this.cerrarModal()
    }
    }
  }
  calTotalCostoInsumo(cantidad:number,unidadProducto:number, precioUnitario:number ):number{
    return (cantidad/unidadProducto)*precioUnitario;
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

  getInsumoData(){
    this.db.getDataCollection<IsumosOfProduct>(this.idEstim, `/productos/${this.idProduct}/insumos/${this.idInsumo}`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      this.insumo = data
    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }

}
