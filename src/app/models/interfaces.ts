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
