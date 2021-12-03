import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInsumoPage } from '../modal-insumo/modal-insumo.page';


@Component({
  selector: 'app-direct-costs',
  templateUrl: './direct-costs.page.html',
  styleUrls: ['./direct-costs.page.scss'],
})
export class DirectCostsPage implements OnInit {

  public insumos = ["servicion de servidores", "alquiler de dominio"];

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalInsumoPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
