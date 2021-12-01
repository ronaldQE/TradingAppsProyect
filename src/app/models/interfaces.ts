import { SuppliesPage } from './../supplies/supplies.page';
import { ProductMonthPage } from './../product-month/product-month.page';
import { SaleMonthPage } from './../sale-month/sale-month.page';
export interface Budget{
    efectivo: number;
    banco: number;
    otros: number;
}

export interface InvestmentCapital{
    consultoria: number;
    equipamientoOficina: number;
    equipoComputo: number;
}

export interface OperatingCapital{
    alquiler: number;
    manoObra: number;
    manoObraEmprendedor: number;
    promociones: number;
    serviciosBasicos: number;
}

export interface BudgetSummary{
    aportePropio: number;
    planInversion: number;
    montoFinanciar: number;
    totalProyecto: number;
}

export interface MonthlyCost{
    servicioLuz: number;
    servicioAgua: number;
    servicioTelefono: number;
    servicioInternet: number;
    alquiler: number;
    materialEscritorio: number;
    pagosEmpleados: number;
    promocion: number;
    serviciosCloud: number;
    mantenimientoOtros: number;
    vestimenta: number;
    salud: number;
    complementariosOtros: number;
    //totalCostoOperativos:number;
}
export interface MonthlyCostFull{
    servicioLuz: number|undefined;
    servicioAgua: number|undefined;
    servicioTelefono: number|undefined;
    servicioInternet: number|undefined;
    alquiler: number|undefined;
    materialEscritorio: number|undefined;
    pagosEmpleados: number|undefined;
    promocion: number|undefined;
    serviciosCloud: number|undefined;
    mantenimientoOtros: number|undefined;
    vestimenta: number|undefined;
    salud: number|undefined;
    complementariosOtros: number|undefined;
    totalCostosOperativos:number|undefined;
}

export interface DataCredit{
  montoFinanciar: number;
  tasaInteres: number;
  plazo:number;
  poliza:number;
  tipoCuota: string;
}

export interface FlujoAnual{
  saldoInicial:number,
  ingresos:number,
  costoProduccion:number,
  utilidadBruta:number,
  costosFijo:number,
  utilidadNeta:number,
  cuota:number,
  flujoAcumulado:number
}
export interface MonthlyFlow{
    saldoInicial: number;
    ingresos: number;
    costoProduccion: number;
    utilidadBruta: number;
    costosFijos: number;
    utilidadNeta: number;
    cuota: number;
    flujoAcumulado: number;
}

export interface OutCome{
  van:number;
  tir:string;
  conclusion:string;
}
export interface SaleMonth{
    ventaAlta: number,
    ventaMedia: number,
    ventaBaja: number,
}
export interface ComportamientoVentas{
    venta: number,
    costoVenta: number,
}
export interface ComportamientoVentasTotales{
    totalVenta: number,
    totalCostoVenta: number,
}
export interface ProductMonth{
    productoServicio: string,
    tipo: string,
    cantidad: number,
    unidadVenta: number,
    tipoFrecuencia: string,
    precioC: number,
    precioV: number,
}
export interface Supplies{
    insumo: string,
    cantidadA: number,
    unidProducB: number,
    unidad: number,
    precioUnutarioC: number
}

export interface HistoryData{
  title:string,
  van: number,
  tir:string
}
