import * as gestionPresupuesto from '/js/gestionPresupuesto.js';
import * as gestionPresupuestopWeb from '/js/gestionPresupuestoWeb.js';


gestionPresupuesto.actualizarPresupuesto(1500);

let presupuesto = gestionPresupuestp.mostrarPresupuesto();

gestionPresupuestoWeb.mostrarDatoEnId("div", presupuesto);

let gastos = [
    gestionPresupuesto.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    gestionPresupuesto.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    gestionPresupuesto.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    gestionPresupuesto.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    gestionPresupuesto.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    gestionPresupuesto.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"),
]



