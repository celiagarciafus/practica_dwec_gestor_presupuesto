import * as gesPrep from '/js/gestionPresupuesto.js';
import * as gesPrepWeb from '/js/gestionPresupuestoWeb.js';


gesPrep.actualizarPresupuesto(1500);

let presupuesto = gesPrep.mostrarPresupuesto();

gesPrepWeb.mostrarDatoEnId("div", presupuesto);



