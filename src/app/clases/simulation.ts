import { VentaSimulation } from "../models/interfaces"

class Simulation {
  public ventaMeses: VentaSimulation[] = []
  vMed: number
  constructor() { }
  private setMedia(vMax: number, vMin: number) {
    this.vMed = (vMax + vMin) / 2
  }
  calVentaBaja(vMax: number, vMin: number, R: number) {
    this.setMedia(vMax, vMin);
    return vMin + Math.sqrt((vMax - vMin) * (this.vMed - vMin) * (R));

  }
  calVentaAlta(vMax: number, vMin: number, R: number) {
    this.setMedia(vMax, vMin);
    return vMax - Math.sqrt((vMax - vMin) * (this.vMed - vMax) * (R - 1));
  }
  cargarVentasCostos(vMax: number, vMin: number, mub: number) {
    let R: number = 0
    let ventaMes: number
    let costoMes: number
    let semilla: number = this.generateSemilla()

    for (let i = 0; i < 12; i++) {
      //genera R
      R = this.generadorCongruenciaMixto(semilla);
      if (R <= (0.5)) {
        ventaMes = Math.round(this.calVentaBaja(vMax, vMin, R))
        costoMes = Math.round(ventaMes * (1 - mub))
        const venta: VentaSimulation = {
          venta: ventaMes,
          costoVenta: costoMes
        }
        this.ventaMeses[i] = venta
      } else {
        ventaMes = Math.round(this.calVentaAlta(vMax, vMin, R))
        costoMes = Math.round(ventaMes * (1 - mub))
        const venta: VentaSimulation = {
          venta: ventaMes,
          costoVenta: costoMes
        }
        this.ventaMeses[i] = venta
      }
      if (semilla >= 99) {
        semilla = 0;
      } else {
        semilla = semilla + 1
      }
    }
  }
  private generadorCongruenciaMixto(semilla: number) {
    //generador completo de longitud de periodo = 100   a=81, c=89, m=100
    //semilla random >= 0
    let multiplicador: number = 81 // > 0
    let ctteAditiva: number = 89 // > 0
    let modulo: number = 100 // modulo > todos los anteriores
    let nuevoValor: number = this.nextValue(multiplicador, ctteAditiva, modulo, semilla);
    return (nuevoValor / modulo);
  }
  private nextValue(a: number, c: number, m: number, xo: number) {
    return (a * xo + c) % m
  }
  private generateSemilla() {
    return Math.round(Math.random() * (1 + 99 - 1) + 1)
  }

}

export { Simulation }
