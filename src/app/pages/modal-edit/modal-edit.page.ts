import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {

  constructor(
    public modalControllerEdit: ModalController,
    private router:Router

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
    console.log("CERRAR")
    this.modalControllerEdit.dismiss();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
}
