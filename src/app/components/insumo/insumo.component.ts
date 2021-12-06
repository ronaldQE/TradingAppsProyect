import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private router: Router,
    public modalControllerEdit: ModalController,
    public db: serviceDataBase


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
  }
}
