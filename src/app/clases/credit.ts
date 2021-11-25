class Cuota {

  public cuotasV=[]
  public cuotasF=[]
  constructor(){}
   // CALCULAR EL PLAN DE PAGOS CUOTA VARIADA
  private calSaldoVariado(saldo: number, amortizacion: number):number {

    return saldo - amortizacion;
  }
  private calCuotaVariado(amortizacion: number, saldo: number, interesMes: number):number {
    return amortizacion + (saldo * interesMes)
  }

  public calPlanPagosVariado(monto: number, tasaInteres: number, plazo: number, poliza: number):void {
    let saldo = monto;
    //let showSaldo: number
    let showCuota: number
    let cuota: number
    this.cuotasV=[];

    for (let i = 0; i < plazo; i++) {

      cuota = this.calCuotaVariado(monto / plazo, saldo, (tasaInteres / 12) / 100) + (saldo * (poliza / 1000))
      saldo = this.calSaldoVariado(saldo, monto / plazo)
      //showSaldo = Math.round(saldo)
      showCuota = Math.round(cuota)
      this.cuotasV[i] = showCuota
    }

  }

  private calSaldoFijo(saldo:number, interesMes:number, pago:number):number{
    return saldo-(pago-saldo*interesMes);
  }
  private calPagoFijo(monto:number,intersMes:number, plazo:number){
    let aux =  Math.pow((1+intersMes), plazo);
    return monto*((intersMes*aux)/(aux-1));
  }
  public calPlanPagosFijo(monto: number, tasaInteres: number, plazo: number, poliza: number):void{
    this.cuotasF=[];
    let saldo = monto;
    let showCuota: number
    let pago: number
    pago = this.calPagoFijo(monto,(tasaInteres / 12) / 100, plazo);
    for (let i = 0; i < plazo; i++) {
      showCuota = Math.round(pago + (saldo * (poliza / 1000)))
      saldo = this.calSaldoFijo(saldo, (tasaInteres / 12) / 100, pago)
      this.cuotasF[i] = showCuota
    }

  }
}
export{Cuota}
