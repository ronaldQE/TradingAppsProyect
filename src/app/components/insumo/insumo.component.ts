import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalEditPage } from 'src/app/pages/modal-edit/modal-edit.page';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss'],
})
export class InsumoComponent implements OnInit {
  @Input() nombreInsumo:string;

  constructor(
    private router: Router,
    public modalControllerEdit: ModalController

  ) { }

  ngOnInit() {}

  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  async openModal() {
    const modalEdit = await this.modalControllerEdit.create({
      component: ModalEditPage,
      cssClass: 'my-custom-class'
    });
    return await modalEdit.present();
  }
}
