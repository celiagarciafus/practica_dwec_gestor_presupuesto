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

function CrearGasto(descripcion, valor){

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

    this.descripcion = descripcion;
    if (valor>=0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
