import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ComportamientoVentas, DataCredit, FlujoAnual, OutCome } from 'src/app/models/interfaces';
import { serviceDataBase } from '../../services/services-database';

import { Cuota } from '../../clases/credit'



interface Gestions {
  id: number,
  rank: string
}
@Component({
  selector: 'app-content-flow',
  templateUrl: './content-flow.component.html',
  styleUrls: ['./content-flow.component.scss'],
})
export class ContentFlowComponent implements OnInit {

  public flujoAnual: FlujoAnual = {
    saldoInicial: 0,
    ingresos: 0,
    costoProduccion: 0,
    utilidadBruta: 0,
    costosFijo: 0,
    utilidadNeta: 0,
    cuota: 0,
    flujoAcumulado: 0
  }
  public outCome: OutCome = {
    van: 0,
    tir: "",
    conclusion: "No Factible"
  }
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  totalCostos = 0;
  totalVentas = 0;
  public valueSelected: string = "2021"
  public gestions: Gestions[] = [
    {
      id: 1,
      rank: '2021'
    },
    {
      id: 2,
      rank: '2022',
    },
    {
      id: 3,
      rank: '2023',
    },
    {
      id: 2,
      rank: '2024',
    },
    {
      id: 3,
      rank: '2025',
    }
  ];

  public dataCredit: DataCredit = {
    montoFinanciar: 0,
    tasaInteres: 0,
    plazo: 0, //Solo prueba
    poliza: 0,
    tipoCuota: ""
  }
  public planPagosVariado = new Cuota();
  public cuotas = [];

  constructor(
    private router: Router,
    public db: serviceDataBase,
    public toast: ToastController,

  ) {

  }

  ngOnInit() {

    this.getDataCredit()
    this.getFlujoAnual("2021");
    //this.getOutCome();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  segmentChanged(event: CustomEvent | any) {
    this.valueSelected = event.detail.value;
    //console.log('la gestion es: '+ this.selectGestion);
    this.getFlujoAnual(this.valueSelected);
  }
  getFlujoAnual(gestion: string) {
    this.db.getCollection<FlujoAnual>(`/Estimaciones/estimicion-1/flujo-anual/${gestion}`).subscribe((data) => {
      if (data == null) {
        this.presentToast("La gestion esta vacia");
        this.flujoAnual = {
          saldoInicial: 0,
          ingresos: 0,
          costoProduccion: 0,
          utilidadBruta: 0,
          costosFijo: 0,
          utilidadNeta: 0,
          cuota: 0,
          flujoAcumulado: 0
        }
        //this.db.updateData<FlujoAnual>(this.flujoAnual, '/Estimaciones/estimicion-1/flujo-anual', '2022')

      } else {

        this.flujoAnual = data;
      }


    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }
  getOutCome() {
    this.db.getCollection<OutCome>(`/Estimaciones/estimicion-1/resultado`).subscribe((data) => {
      this.outCome = data;

    },
      (error: any) => {
        console.log(`Error: ${error}`);
      }
    )
  }

  async presentToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000
    });
    toast.present(); //
  }
  getTotalSuma() {
    this.totalCostos = 0;
    this.totalVentas = 0;

    for (let i = 0; i < this.meses.length; i++) {
      this.db.getCollection<ComportamientoVentas>('/Estimaciones/estimicion-1/comportamientoVentas/' + this.meses[i]).subscribe((data) => {
        if (data !== null) {
          this.totalCostos = this.totalCostos + data.costoVenta;
          this.totalVentas = this.totalVentas + data.venta;
        }
        if (i == 11) {
          let dataTotal = {
            totalVenta: this.totalVentas,
            totalCostoVenta: this.totalCostos,
          }
          this.db.updateData(dataTotal, '/Estimaciones/estimicion-1/comportamientoVentas', 'totales');
          console.log("----------------------------------------")
          console.log(this.totalVentas)
          console.log(this.totalCostos)
        }
      },
        (error: any) => {
          console.log(`Error: ${error}`);

        }
      )
    }

  }

  //Metodos para actualizar le Plan de pagos
  getDataCredit() {
    this.db.getCollection<DataCredit>('/Estimaciones/estimicion-1/dato-credito').subscribe((data) => {
      this.dataCredit = data;
      //this.dataCredit.montoFinanciar = this.budgetSummary.montoFinanciar

      this.cuotas = []

      if (this.dataCredit.tipoCuota == "Cuota Fija") {

        this.planPagosVariado.calPlanPagosFijo(this.dataCredit.montoFinanciar, this.dataCredit.tasaInteres, this.dataCredit.plazo, this.dataCredit.poliza);
        this.cuotas = this.planPagosVariado.cuotasF
        console.log(this.cuotas)
        this.updateFlujoCuotaGestion(2021, this.dataCredit.plazo, this.cuotas);
      }
      if (this.dataCredit.tipoCuota == "Cuota Variable") {
        this.planPagosVariado.calPlanPagosVariado(this.dataCredit.montoFinanciar, this.dataCredit.tasaInteres, this.dataCredit.plazo, this.dataCredit.poliza);
        this.cuotas = this.planPagosVariado.cuotasV
        console.log(this.cuotas)
        this.updateFlujoCuotaGestion(2021, this.dataCredit.plazo, this.cuotas);

      }

    },
      (error: any) => {
        console.log(`Error: ${error}`);

      }
    )
  }

  calCuotaTotal(cuotas: any[], indexInicio: number) {
    let totalCuotaAnual = 0;
    let cont = 0
    for (let i = indexInicio; (cont < 12 && i < cuotas.length); i++) {
      totalCuotaAnual = totalCuotaAnual + cuotas[i]
      cont = cont + 1
    }
    return totalCuotaAnual
  }

  updateFlujoCuotaGestion(anio: number, numMeses: number, cuotas: any[]) {
    let numGestiones = numMeses / 12;
    //let saldoInicial = 0;
    let indexCuotas = 0;
    //this.db.replaceData({}, '/Estimaciones/estimicion-1', 'flujo-anual')
    for (let i = 0; i < numGestiones; i++) {
      if (i == 0) {

        let totalCuotas = this.calCuotaTotal(cuotas, indexCuotas)
        const upCuotaAnio={cuota:totalCuotas}
        this.db.updateData(upCuotaAnio, '/Estimaciones/estimicion-1/flujo-anual', anio.toString())
        //if (this.outCome.van > 0) { this.outCome.conclusion = 'Es Factible' }
        console.log("2021: "+totalCuotas)
        //calcular TIR
        //this.testTirCal(this.dataCredit.montoFinanciar, this.flujoAnual.flujoAcumulado, this.dataCredit.plazo);
        //this.outCome.tir = this.tirCal.toFixed(2)
        //carga de datos Reusltado
        //this.db.updateData<OutCome>(this.outCome, '/Estimaciones/estimicion-1', 'resultado');

      } else {
        indexCuotas = indexCuotas + 12;
        anio = anio + 1;
        let totalCuotas = this.calCuotaTotal(cuotas, indexCuotas)
        const upCuotaAnio={cuota:totalCuotas}
        this.db.updateData(upCuotaAnio, '/Estimaciones/estimicion-1/flujo-anual', anio.toString())
      }

    }
  }


}
