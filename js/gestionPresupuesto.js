let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(newPresupuesto) {
    if(newPresupuesto>=0){
        presupuesto = newPresupuesto
        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto +" €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas){

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    this.actualizarDescripcion = function(newDescripcion){
        this.descripcion = newDescripcion;
    }

    this.actualizarValor = function(newValor){
        if(newValor>=0){
            this.valor = newValor;
        } 
    }
    
    this.mostrarGastoCompleto = function() {
        let texto = `Gasto correspondiente a ${this.descripcion } con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let e of this.etiquetas) {
            texto += `- ${e}\n`
        }
        return texto;

    }

    this.actualizarFecha = function(fecha){
        if (Date.parse(fecha)){
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if (this.etiquetas.indexOf(etiqueta) == -1) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiq){
        for(let etiqueta of etiq){
            let position = this.etiquetas.indexOf(etiqueta);
            if(position >= 0){
                this.etiquetas.splice(position, 1);
            }
        }
    }

    this.descripcion = descripcion;
    if (valor>=0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
  
    
    if(fecha == null){
        this.fecha = Date.parse(new Date());
    } else {
        if(Date.parse(fecha)){
            this.fecha = Date.parse(fecha);
        }else{
            this.fecha = Date.parse(new Date());
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        let fechaEscrita = new Date(this.fecha).toISOString();

        if(periodo=="dia"){
            return fechaEscrita.substring(0,10);
        }
        if(periodo=="mes"){
            return fechaEscrita.substring(0,7);
        }
        if(periodo=="anyo"){
            return fechaEscrita.substring(0,4);
        }
    }
}
    
function listarGastos(){
    return gastos;
}


function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}


function borrarGasto(id){
    for (let gasto of gastos){
        if(gasto.id == id){
            let position = gastos.indexOf(gasto);
            gastos.splice(position,1);
            break;
        }
    }
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for (let gasto of gastos){
        totalGastos = gasto.valor + totalGastos;
    }
    return totalGastos;
}


function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(objeto){

    let gastosfiltrado =  gastos.filter(function(gasto) {
        var devolver = true;
        if (objeto.fechaDesde) {
            devolver = devolver && (gasto.fecha >= Date.parse(objeto.fechaDesde));
        }
        if (objeto.fechaHasta) {
            devolver = devolver && (gasto.fecha <= Date.parse(objeto.fechaHasta));
        }
        if (objeto.valorMinimo) {
            devolver = devolver && (gasto.valor >= objeto.valorMinimo);
        }
        if (objeto.valorMaximo) {
            devolver = devolver && (gasto.valor <= objeto.valorMaximo);
        }
        if (objeto.descripcionContiene) {
            devolver = devolver && (gasto.descripcion.indexOf(objeto.descripcionContiene) > -1);
        }
        if (objeto.etiquetasTiene) {
            let etiquetas = false;
            for (let etiq of objeto.etiquetasTiene) {
                if (gasto.etiquetas.indexOf(etiq) > -1) {
                    etiquetas = true;
                }
            }
            devolver = devolver && etiquetas;
        }

        return devolver;
    })

    return gastosfiltrado;
}

function agruparGastos(periodo,etiquetas,fechaDesde,fechaHasta){
    let objeto = {fechaDesde: fechaDesde, fechaHasta: fechaHasta, etiquetasTiene: etiquetas};
    let gastosfiltrados = filtrarGastos(objeto);

    let gastofiltrado = gastosfiltrados.reduce(function(acumulador,gasto){
        let periodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[periodo]) {
            acumulador[periodo] = acumulador[periodo] + gasto.valor;
        } else {
            acumulador[periodo] = gasto.valor;
        }
            return acumulador;
    }, {})

return gastofiltrado;

}

export   {  
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}
