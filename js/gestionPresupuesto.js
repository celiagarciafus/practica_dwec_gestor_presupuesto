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

    };

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
}
    
function listarGastos(){
    return gastos;
}


function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

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

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {  
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
