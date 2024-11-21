import * as gestionPresupuesto from '/js/gestionPresupuesto.js';
import * as gestionPresupuestoWeb from '/js/gestionPresupuestoWeb.js';


gestionPresupuesto.actualizarPresupuesto(1500);

let presupuesto = gestionPresupuesto.mostrarPresupuesto();

gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto);

console.log("hola");

let gastos = [
    gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
]


for (let gasto of gastos){
    gestionPresupuesto.anyadirGasto(gasto);
}

gestionPresupuesto.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuesto.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());


gestionPresupuesto.listarGastos().forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto));

gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })
    .forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto));

gestionPresupuesto.filtrarGastos({ valorMinimo: 50 })
    .forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto));

gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })
    .forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto));

gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })
    .forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto));

gestionPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");
gestionPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
gestionPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");
