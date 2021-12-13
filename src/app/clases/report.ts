import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Report{
    public pdfObject: any;
    public docDefinition = {};
    constructor(presupuesto,capitalOperativo,capitalInversion,resumenPresupuesto,comportamientoVentas,rangoVentas,costosOperativos,credito,resultado,flujoAnual){
        let cv = comportamientoVentas;
        let co = costosOperativos;
        let fa = flujoAnual;
        while(fa.length < 5){
            fa.push(['0.00','0.00','0.00','0.00','0.00','0.00','0.00','0.00'])
        }
        
        this.docDefinition = {
            content: [
                {
                    text: 'Reporte de la Estimación número 1',
                    style: 'header',
                    alignment: 'center'
                },
                '\n\nSe presenta un estracto del plan de negocio de la empresa como resultado de los datos ingresados',
                {text: '\n'},
                {text: 'PRESUPUESTO', style: 'titulo'},
                {text: '_______________________________________________________________________________________________'},
                {
                        
                    columns: [
                        {
                            width: 140,
                            text:[
                                {text: '\nPresupuesto', bold: true},
                                `\n\nEfectivo = ${presupuesto.efectivo}`,
                                `\nBanco = ${presupuesto.banco}`,
                                `\nOtros = ${presupuesto.otros}`,
                            ] 
                        },
                        {
                            width: 175,
                            text:[
                                {text: '\nCapital Operativo', bold: true},
                                `\n\nMano de obra Emp. = ${capitalOperativo.manoObraEmprendedor}`,
                                `\nPromociones = ${capitalOperativo.promociones}`,
                                `\nServicios basicos = ${capitalOperativo.serviciosBasicos}`,
                                `\nMano de obra = ${capitalOperativo.manoObra}`,
                                `\nAlquiler = ${capitalOperativo.alquiler}`
                            ] 
                        },
                        {
                            text:[
                                {text: '\nCapital de Inversión', bold: true},
                                `\n\nEquipo de computo = ${capitalInversion.equipoComputo}`,
                                `\nEquipamiento de oficina = ${capitalInversion.equipamientoOficina}`,
                                `\nConsultoria = ${capitalInversion.consultoria}`
                            ] 
                        }
                    ],
                },
                {
                    text:[
                        {text: '\nResumen del presupuesto', bold: true},
                        `\n\nAporte propio = ${resumenPresupuesto.aportePropio}`,
                        `\nTotal del Plan de Inversión = ${resumenPresupuesto.planInversion}`,
                        `\nTotal del Proyecto = ${resumenPresupuesto.totalProyecto}`,
                        `\nMonto a Financiar = ${resumenPresupuesto.montoFinanciar}`
                    ]
                },
                {text: '\nCOSTOS', style: 'titulo'},
                {text: '_______________________________________________________________________________________________'},
                {text: '\n1) Costos Directos', bold: true},
                {text: '\n'},
                {
                    table: {
                        body: [
                            ['Producto o Servicio', 'Tipo', 'Cantdiad', 'Frecuencia','Precio C','Precio V'],
                            ['Apps Empresas', 'Comercial', '1','Semestral','700','16000']
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#F3C57D' : null;
                        }
                    }
                },
                {text: '\n'},
                {
                    table: {
                        body: [
                            ['Insumo', 'Cantidad', 'Unidades de Productos', 'Precio Unitario','Total'],
                            ['Servidor de prueba', '1', 'Unidad','300','300']
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#B8EBBD' : null;
                        }
                    }
                },
                {text: '\n2) Comportamiento de Ventas mensuales', bold: true},
                {text: '\n'},
                {
                    margin: [100,0,100,0],
                    table: {
                        body: [
                            ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio'],
                            [`${cv.enero.rango}`,`${cv.febrero.rango}`, `${cv.marzo.rango}`, `${cv.abril.rango}`, `${cv.mayo.rango}`, `${cv.junio.rango}`, `${cv.julio.rango}`]
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#92F392' : null;
                        }
                    }
                },
                {text: '\n'},
                {
                    margin: [100,0,100,0],
                    table: {
                        body: [
                            ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                            [`${cv.agosto.rango}`, `${cv.septiembre.rango}`, `${cv.octubre.rango}`, `${cv.noviembre.rango}`, `${cv.diciembre.rango}`]
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#92F392' : null;
                        }
                    }
                },
                {
                    columns: [
                        {
                            text:[
                                {text: '\nVentas Totales por mes (Bs)', bold: true},
                                `\n\nRango de ventas (Bs) Alta = ${rangoVentas.ventaAlta}`,
                                `\n\nRango de ventas (Bs) Media = ${rangoVentas.ventaMedia}`,
                                `\n\nRango de ventas (Bs) Baja = ${rangoVentas.ventaBaja}`,
                            ]
                        },
                        {
                            text:[
                                {text: '\nComportamiento de Ventas', bold: true},
                                `\n\nVentas Totales = ${cv.totales.totalVenta}`,
                                `\nCostos Totales = ${cv.totales.totalCostoVenta}`,
                            ]
                        }
                    ]
                    
                },
                {text: '3) Costos Operativos mensuales', bold: true},
                {
                    columns: [
                        {
                            width: 250,
                            text:[
                                {text: '\nCostos Operativos', bold: true},
                                `\n\nServicio de luz = ${co.servicioLuz}`,
                                `\nServicio de agua = ${co.servicioAgua}`,
                                `\nServicio de telefono/celular = ${co.servicioTelefono}`,
                                `\nServicio de internet = ${co.servicioInternet}`,
                                `\nAlquiler = ${co.alquiler}`,
                                `\nMaterial de escritorio = ${co.materialEscritorio}`,
                                `\nPagos a empleados = ${co.pagosEmpleados}`,
                                `\nPromoción = ${co.promocion}`, 
                            ] 
                        },
                        {
                            width: 175,
                            text:[
                                {text: '\nMantenimiento', bold: true},
                                `\n\nServicios de Cloud = ${co.serviciosCloud}`,
                                `\nOtros = ${co.mantenimientoOtros}`,
                                {text: '\n\nComplementarios', bold: true},
                                `\n\nVestimenta = ${co.vestimenta}`,
                                `\nSalud = ${co.salud}`,
                                `\nOtros = ${co.complementariosOtros}`
                            ] 
                        }
                    ]
                },
                {text: `\n\n-> Total Costos Operativos = ${co.totalCostosOperativos}`, bold: true},
                {text: '\n\nCREDITO', style: 'titulo'},
                {text: '_______________________________________________________________________________________________'},
                {
                    text:[
                        `\nMonto = ${credito.montoFinanciar}`,
                        `\n\nTasa de interes % = ${credito.tasaInteres}`,
                        `\n\nPlazo (meses) = ${credito.plazo}`,
                        `\n\nPoliza % = ${credito.poliza}`,
                        `\n\nTipo de credito = ${credito.tipoCuota}`
                    ]
                },
                {text: '\n\nFLUJO', style: 'titulo'},
                {text: '_______________________________________________________________________________________________'},
                {text: `\nSALDO INICIAL = ${resumenPresupuesto.planInversion}`},
                {text: '\n1) Proyeccion Mensual'},
                {text: '\n'},
                {
                    fontSize:10,
                    table: {
                        body: [
                            ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                            ['SALDO INICIAL', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['Ingresos', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['Costo de producción', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['Utilidad Bruta', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['Costos Fijos', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['UTILIDAD NETA', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['Cuota', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media'],
                            ['FLUJO ACUMULADO', 'Media', 'Media', '100', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media', 'Media']
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#92F392' : null;
                        }
                    }
                },
                {text: '\n\n2) Proyeccion Anual'},
                {text: '\n'},
                {
                    table: {
                        body: [
                            ['', '2021', '2022','2023','2024','2025'],
                            ['SAL. INICIAL', `${fa[0][5]}`, `${fa[1][5]}`,`${fa[2][5]}`,fa[3][5],fa[4][5]],
                            ['Ingresos', fa[0][4], fa[1][4],fa[2][4],fa[3][4],fa[4][4]],
                            ['Costo de producción', fa[0][0], fa[1][0],fa[2][0],fa[3][0],fa[4][0]],
                            ['Utilidad Bruta', fa[0][6], fa[1][6],fa[2][6],fa[3][6],fa[4][6]],
                            ['Costos Fijos', fa[0][1], fa[1][1],fa[2][1],fa[3][1],fa[4][1]],
                            ['UTILIDAD NETA', fa[0][7], fa[1][7],fa[2][7],fa[3][7],fa[4][7]],
                            ['Cuota', fa[0][2], fa[1][2],fa[2][2],fa[3][2],fa[4][2]],
                            ['FLUJO ACUMULADO', fa[0][3], fa[1][3],fa[2][3],fa[3][3],fa[4][3]]
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex  === 0) ? '#7D9BF3' : null;
                        }
                    }
                },
                {text: '\n3) Proyeccion del TIR Y VAR'},
                {
                    text:[
                        `\nVAN = ${resultado.van}`,
                        `\nTIR % = ${resultado.tir}`,
                    ]
                },
                {text: `\n--> La Inversión ${resultado.conclusion} <--`,alignment: 'center', bold: true,fontSize:15},
            ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center'
                    },
                    titulo: {
                        bold: true,
                        alignment: 'center'
                    }
                }
                ,defaultStyle: {
                    fontSize: 12
                }
            
        };
    }
    generarPdf(){
        this.pdfObject = pdfMake.createPdf(this.docDefinition)
        this.pdfObject.download();
    }
}

export {Report}