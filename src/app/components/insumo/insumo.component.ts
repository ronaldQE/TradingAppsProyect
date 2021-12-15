import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalEditPage } from 'src/app/pages/modal-edit/modal-edit.page';
import { serviceDataBase } from 'src/app/services/services-database';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss'],
})
export class InsumoComponent implements OnInit {
  @Input() nombreInsumo:string;
  @Input() idInsumo:string;
  @Input() idEstim:string;
  @Input() idProduct:string;

  public insumoArray:any[]=[]
  public productosArray: any[] = []



  constructor(
    private router: Router,
    public modalControllerEdit: ModalController,
    public db: serviceDataBase,
    public alertController: AlertController

  ) { }

  ngOnInit() {}

  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  async openModal() {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalEditPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEstim': this.idEstim,
        'idProduct': this.idProduct,
        'idInsumo': this.idInsumo

      }
    });
    return await modalEdit.present();
  }
  deleteInsumo(){
    this.db.deleteCollection(this.idEstim,`productos/${this.idProduct}/insumos/${this.idInsumo}`)
    this.getInsumoDataList()
    this.getProductDataList()
  }

  async presentAlertConfirm(nameinsumo:string) {
    console.log("entra al Alert")
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar Eliminación',
      message: `El Insumo ${nameinsumo} será Eliminado` ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteInsumo()
          },
        },
      ],
    });
    await alert.present();

  }

  getInsumoDataList(){
    this.db.getDataCollectionList(this.idEstim, `/productos/${this.idProduct}/insumos`).subscribe((data) => {
      //console.log("Estimacion: ", data)
      this.insumoArray = data
      let totalCostoCal=0
      console.log("Estimacion: ", this.insumoArray)
      for(let i=0; i<this.insumoArray.length; i++){
        totalCostoCal=totalCostoCal+this.insumoArray[i].totalCostoInsumo;
      }
      const dataTotal={totalCosto:totalCostoCal}
      this.db.updateDataCollection(dataTotal,this.idEstim,`productos/${this.idProduct}`,'totalesInsumo')

    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
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
