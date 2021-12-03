import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-insumo',
  templateUrl: './modal-insumo.page.html',
  styleUrls: ['./modal-insumo.page.scss'],
})
export class ModalInsumoPage implements OnInit {

  constructor(
    public modalController: ModalController

  ) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
