import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductSer, TotalesInsumo } from 'src/app/models/interfaces';
import { serviceDataBase } from 'src/app/services/services-database';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';


@Component({
  selector: 'app-direct-costs',
  templateUrl: './direct-costs.page.html',
  styleUrls: ['./direct-costs.page.scss'],
})
export class DirectCostsPage implements OnInit {

  public insumos = ["servicion de servidores", "alquiler de dominio"];
  public idProduct: number
  public idNewProduct: number
  public idEstim: number

  public productSer: ProductSer = {
    cantidad: null,
    frecuencia: null,
    frecuenciaNum: null,
    nombre: null,
    tipo: null
  }
  public totalesInsumo: TotalesInsumo={
    totalCosto:null,
  totalVenta:null
  }



  constructor(
    public modalController: ModalController,
    public db: serviceDataBase

  ) { }

  ngOnInit() {
    this.idEstim = 1;
    this.idProduct = 1;


  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalInsumoPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  newIdProduct(numId: number) {
    //let numId = 1

    this.db.getCollectionInside(this.idEstim, `/productos/producto-${(numId)}`).subscribe((data) => {
      console.log("numero: " + (numId))
      console.log(data)
      if (data === null) {
        //AQUI CREAR eL NUEVO PRODUCTO
        console.log("nuevoID: " + numId)
        return numId

      } else {
        this.newIdProduct(numId + 1)
      }

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )

  }
  newIdEstimacion(idEstim: number) {

    this.db.getCollectionNew(idEstim).subscribe((data) => {
      console.log("idExiste: " + (idEstim))
      console.log(data)
      if (data === null) {

        console.log("nuevoID: " + idEstim)
        //AQUI CREAR LA NUEVA ESTIMACION (EL METODO)
        return idEstim

      } else {
        this.newIdEstimacion(idEstim + 1)
      }
    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }




}
