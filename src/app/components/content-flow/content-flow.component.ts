import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';
import { serviceDataBase } from '../../services/services-database';





@Component({
  selector: 'app-content-flow',
  templateUrl: './content-flow.component.html',
  styleUrls: ['./content-flow.component.scss'],
})
export class ContentFlowComponent implements OnInit {

  @Input() idEstim:string;

  public showSpinner:boolean

  showFlujoRango:boolean
  showFlujoSimulation:boolean
  btncolorRa:string
  btncolorSi:string

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,

  ) {

  }

    ngOnInit() {
    this.idEstim = localStorage.getItem('idEstim')
    this.showFlujoRango = false;
    this.showFlujoSimulation = false;
    this.btncolorRa="tertiary"
    this.btncolorSi="warning"

     }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }

  showTableFlujoRango(){
    this.showFlujoRango = true;
    this.showFlujoSimulation = false;
    this.btncolorRa="light"
    this.btncolorSi="warning"
  }
  showTableFlujoSimulation(){
    this.showFlujoRango = false;
    this.showFlujoSimulation = true;
    this.btncolorRa="tertiary"
    this.btncolorSi="light"

  }



}
