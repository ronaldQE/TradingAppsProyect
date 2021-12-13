import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { serviceDataBase } from 'src/app/services/services-database';

@Component({
  selector: 'app-calculated-estimate',
  templateUrl: './calculated-estimate.component.html',
  styleUrls: ['./calculated-estimate.component.scss'],
})
export class CalculatedEstimateComponent implements OnInit {
  //@Input() id:number;
  @Input() title: string;
  @Input() van: number;
  @Input() tir: string;
  @Input() idEstim: string;
  @Input() generado: string;
  @Input() mub: string;

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,
  ) { }

  ngOnInit() {
    console.log("generado: ", this.generado)
   }

  navigateTo(path: string) {
    this.router.navigate([path, this.idEstim, this.title]);
    localStorage.setItem('idEstim', this.idEstim);
    localStorage.setItem('title', this.title);
    localStorage.setItem('mub', this.mub)

  }
  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000
    });
    toast.present(); //
  }

  //METODO PARA EJECURAR TOAST SI NO SE CALCULO LA ESTIMACION
  generatePdf(){
    if(this.generado == 'vacio'){
      this.presentToast('La Estimación es NUEVA requiere ser calculada')

    }else{

      //AQUI tu metodo para GGENERAR TU PDF
    }
  }

}
