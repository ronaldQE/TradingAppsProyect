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
