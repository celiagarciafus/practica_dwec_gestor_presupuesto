import {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb} from '/js/gestionPresupuestoWeb.js';

import {mostrarPresupuesto, actualizarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, filtrarGastos, agruparGastos} from '/js/gestionPresupuesto.js';

actualizarPresupuesto(1500);

let presupuesto = mostrarPresupuesto();

mostrarDatoEnId("presupuesto", presupuesto);

let g1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(g1);
anyadirGasto(g2);
anyadirGasto(g3);
anyadirGasto(g4);
anyadirGasto(g5);
anyadirGasto(g6);


mostrarDatoEnId("gastos-totales", calcularTotalGastos());
mostrarDatoEnId("balance-total", calcularBalance());


listarGastos().forEach(gasto => mostrarGastoWeb("listado-gastos-completo", gasto));

filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })
    .forEach(gasto => mostrarGastoWeb("listado-gastos-filtrado-1", gasto));

filtrarGastos({ valorMinimo: 50 })
    .forEach(gasto => mostrarGastoWeb("listado-gastos-filtrado-2", gasto));

filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })
    .forEach(gasto => mostrarGastoWeb("listado-gastos-filtrado-3", gasto));

filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })
    .forEach(gasto => mostrarGastoWeb("listado-gastos-filtrado-4", gasto));

mostrarGastosAgrupadosWeb("agrupacion-dia", agruparGastos("dia"), "día");
mostrarGastosAgrupadosWeb("agrupacion-mes", agruparGastos("mes"), "mes");
mostrarGastosAgrupadosWeb("agrupacion-anyo", agruparGastos("anyo"), "año");
