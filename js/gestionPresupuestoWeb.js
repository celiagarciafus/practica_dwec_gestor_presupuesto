function mostrarDatoEnId(idElemento, valor){
    let elementoid = document.createElement(idElemento);
    elementoid.textContent = valor;
}

function mostrarGastoWeb(idElemento,gasto){//div, gasto1
    let elementoHtml = document.createElement(idElemento);
    elementoHtml.classList.add("gasto");

    let descripcion = mostrarDatoEnId("div", "Descripción del gasto: " + gasto.descripcion);
    descripcion.classList.add("gasto-descripcion");
    elementoHtml.append(descripcion);
    

    let fecha = mostrarDatoEnId("div", "Fecha del gasto: " + gasto.fecha);
    fecha.classList.add("gasto-fecha");
    elementoHtml.append(fecha);


    let valor = mostrarDatoEnId("div", "Valor del gasto: " + gasto.valor);
    valor.classList.add("gasto-valor");
    elementoHtml.append(valor);

    let etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");

    for (let etiqueta of gasto.etiquetas){
        let etiq = mostrarDatoEnId("span", "Etiqueta: "+  etiqueta);
        etiq.classList.add("gasto-etiquetas-etiqueta");
        etiquetas.append(etiq);
    }

    elementoHtml.append(etiquetas);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

}


export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}