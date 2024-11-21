import * as gestionPres from "/js/gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}
    

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);

    if (contenedor) {
        let divGasto = document.createElement("div");
        divGasto.classList.add("gasto");

        let divDescripcion = document.createElement("div");
        divDescripcion.classList.add("gasto-descripcion");
        divDescripcion.textContent = gasto.descripcion;
        divGasto.appendChild(divDescripcion);

        let divFecha = document.createElement("div");
        divFecha.classList.add("gasto-fecha");
        divFecha.textContent = new Date(gasto.fecha).toLocaleString();
        divGasto.appendChild(divFecha);

        let divValor = document.createElement("div");
        divValor.classList.add("gasto-valor");
        divValor.textContent = `${gasto.valor} €`;
        divGasto.appendChild(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.classList.add("gasto-etiquetas");

        gasto.etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);

            let manejadorBorrarEtiquetas = new BorrarEtiquetasHandle();
            manejadorBorrarEtiquetas.gasto = gasto;
            manejadorBorrarEtiquetas.etiqueta = etiqueta;
    
            spanEtiqueta.addEventListener("click", manejadorBorrarEtiquetas);
        });

        divGasto.appendChild(divEtiquetas);

        contenedor.appendChild(divGasto);

        let botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.setAttribute("type", "button");
        botonEditar.classList.add("gasto-editar");

        let manejadorEditarGasto = new EditarHandle();
        manejadorEditarGasto.gasto = gasto;

        botonEditar.addEventListener("click", manejadorEditarGasto);

        let botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.setAttribute("type", "button");
        botonBorrar.classList.add("gasto-borrar");

        let manejadorBorrarGasto = new BorrarHandle();
        manejadorBorrarGasto.gasto = gasto;

        botonBorrar.addEventListener("click", manejadorBorrarGasto);

        divGasto.appendChild(botonEditar);
        divGasto.appendChild(botonBorrar);
    }
    


}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divAgrupacionDato = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        divAgrupacionDato += '<div class="agrupacion-dato">' +
            '<span class="agrupacion-dato-clave"> ' + clave + '</span>' +
            '<span class="agrupacion-dato-valor"> ' + valor + '</span>' +
            '</div>';
    }
    elemento.innerHTML = '<div class="agrupacion"><h1>Gastos agrupados por ' + periodo + '</h1>' + divAgrupacionDato + '</div >';
}

function repintar(){
    mostrarDatoEnId("presupuesto", mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", calcularTotalGastos());
    mostrarDatoEnId("balance-total", calcularBalance());
    let borrado = getElementById("listado-gastos-completo");
    borrado.innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", borrado);
    listarGastos().forEach(gasto => 
        mostrarGastoWeb("listado-gastos-completo", gasto));
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduzca un presupuesto: ");
    presupuesto = parseFloat(presupuesto);
    actualizarPresupuesto(presupuesto);
    repintar();
}

let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let newDescripcion = prompt("Indica la descripción del nuevo gasto: ");
    let newValor = prompt("Indica el valor del nuevo gasto: ");
    let newFecha = prompt("Indica la fecha del nuevo gasto: ");
    newFecha = Date.parse(newFecha);
    newValor = parseFloat(newValor)
    let newEtiquetas = prompt("Indica las etiquetas del nuevo gasto separadas por comas: ");
    newEtiquetas = newEtiquetas.split(",");
    anyadirGasto(crearGasto(newDescripcion, newValor, newFecha, newEtiquetas));
    repintar();
}

let boton2 = document.getElementById("anyadirgasto");
boton2.addEventListener("click", nuevoGastoWeb);


function EditarHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();
        let newDescripcion = prompt("Indica la descripció del nuevo gasto: ", this.gasto.descripcion);
        let newValor = prompt("Indica el valor del nuevo gasto: ", this.gasto.valor);
        let newFecha = prompt("Indica la fecha del nuevo gasto: ", this.gasto.fecha);
        newFecha = Date.parse(newFecha);
        newValor = parseInt(newValor)
        let newEtiquetas = prompt("Indica las etiquetas del nuevo gasto separadas por comas: ", this.gasto.etiquetas.join(','));
        newEtiquetas = newEtiquetas.split(",");

        this.gasto.actualizarValor(newValor);
        this.gasto.actualizarDescripion(newDescripcion);
        this.gasto.actualizarFecha(newFecha);
        this.gasto.etiquetas = [];
        this.gasto.anyadirEtiquetas(newEtiquetas);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();
        borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}


export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}