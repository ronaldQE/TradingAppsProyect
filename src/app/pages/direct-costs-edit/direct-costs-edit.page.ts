import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditPage } from '../modal-edit/modal-edit.page';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';

@Component({
  selector: 'app-direct-costs-edit',
  templateUrl: './direct-costs-edit.page.html',
  styleUrls: ['./direct-costs-edit.page.scss'],
})
export class DirectCostsEditPage implements OnInit {

  public insumos = ["servicion de servidores", "alquiler de dominio"];

  constructor(
    public modalControllerEdit: ModalController
  ) { }

  ngOnInit() {
  }
  async openModal() {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalEditPage,
      cssClass: 'my-custom-class'
    });
    return await modalEdit.present();
  }
  async openModalCreateInsumo() {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalInsumoPage,
      cssClass: 'my-custom-class'
    });
    return await modalEdit.present();
  }

}
