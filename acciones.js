    /* Variables Cartera */
let saldo = 15000;
let saldoDisplay = document.querySelector("#saldo");
saldoDisplay.innerHTML = `<h2 class="saldo">$${saldo}</h2>`
let portfolio = []

    /* Array Acciones */
let acciones = []
fetch("../acciones.json")
  .then((res) => res.json())
  .then((json) => {
    acciones = [...json];
    listaAcciones() 

    /* Comprar acciones */
    for (let i = 0; i < comprarAccionPortolio.length; i++) {
    let buttonComprar = comprarAccionPortolio[i];
    buttonComprar.addEventListener("click", () => {
        comprarAccion(i)
    })
}
});

    /* Constructor para nuevas acciones */
class ACCION {
    constructor(nombre, id, precio, cantidad) {
    this.nombre = nombre
    this.id = id;
    this.precioUnidad = precio * 0.95;
    this.cantidad = cantidad;
    }
}
//////////////////////////////////////// VIEJO
const listaAcciones = () => {
    let container = document.getElementById("container")
    for (let accion of acciones) {
        let card = document.createElement("div")
        card.classList.add("card", "col-sm-12", "col-md-6", "col-lg-3", "p-3") 
        
        card.innerHTML = `  <div class="card accion text-center">
                            
                            <img class="card-img-top" src="${accion.imagen}" alt="Card image cap">
                            
                            <div class="card-body">
                                <h5 class="card-title">${accion.nombre}</h5>
                            </div>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Precio:</li>
                                <li class="list-group-item precio">$${accion.precioUnidad}</li>
                                <label>Cantidad</label>
                                <input type="number" min="1" class="cantidad" onfocus="this.value='' ">
                            </ul>

                            <div class="card-body">
                                <a href="#" class="card-link btn btn-dark comprar">Comprar</a>
                            </div>
                            </div>
                        `
        container.appendChild(card)
    }
}

     /* Actualizar el saldo en la cartera*/
function updateSaldo(saldo) {
    let resetSaldo = document.getElementById("saldo")
    resetSaldo.innerHTML = "";
    let updateSaldo = document.createElement("h1");
    updateSaldo.innerHTML = `<h2>$${saldo}</h2>`;
    resetSaldo.appendChild(updateSaldo)
}

     /* Actualiza el portfolio */
const listaPortfolio = () => {

    let accionesMias = document.getElementById("portfolio")
    accionesMias.innerHTML = ""

    for (let accion of portfolio) {
        let item = document.createElement("div")
        let totalAccion = (accion.cantidad * accion.precioUnidad)
        item.classList = ("item")
        item.innerHTML = `
                            <div id="carrito" class="item">
                            <div class="col-3"><h3>${accion.nombre}</h3></div>
                            <div class="col-1"><h3>${accion.cantidad}</h3></div>
                            <div class="col-2"><h3>$${accion.precioUnidad}</h3></div>
                            <div class="col-3"><h3>Total: $${totalAccion}</h3></div>
                            <div class="col-3 row"><input type="number" class="cantidad-venta col-4">
                            <button class="btn btn-warning mx-1 col-7 btn-venta">Vender</button></div>
                            </div>
                        `
        accionesMias.appendChild(item)
    }

    if (portfolio.length > 0) {
        for (let i = 0; i < botonVenta.length; i++){
            let buttonVender = botonVenta[i]
            buttonVender.addEventListener("click", () => {
                venderAccion(i)
            })
        }
    }
    let saldoActual = document.querySelector(".totalInvertido")
    saldoActual.innerHTML = ""
    let saldoInvertido = 0;
    for (let accion of portfolio) {
        saldoInvertido += (accion.precioUnidad * accion.cantidad)
    }
    saldoActual.innerHTML = `<h2>Monto invertido: $${saldoInvertido}</h2>`
    
}

    /* Agrega items al portfolio */
const agregarAlPortfolio = (nuevoItem) => {
    let itemPortfolio = portfolio.findIndex((item) => {
        return item.id === nuevoItem.id
    })
    itemPortfolio === -1 ? portfolio.push(nuevoItem) : portfolio[itemPortfolio].cantidad += nuevoItem.cantidad
}

    /* Seleccion de botones y cantidad */
    // botones
let comprarAccionPortolio = document.getElementsByClassName("comprar");
    // cantidad
let cantidadCompra = document.getElementsByClassName("cantidad")


function comprarAccion(i) {
    let cantidad = Number(document.getElementsByClassName("cantidad")[i].value);
    if (cantidad <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Cantidad no válida',
            text: 'Ingrese la cantidad correcta que quiera comprar.',
          })
    }
    else {
        let precio = acciones[i].precioUnidad;
        let monto = precio * cantidad
        if (monto <= saldo) {
            saldo = saldo - monto
            let nombre = acciones[i].nombre
            let id = acciones[i].id
            let nuevaAccion = new ACCION(nombre,id,precio,cantidad)
            agregarAlPortfolio(nuevaAccion)
            updateSaldo(saldo)
            listaPortfolio()
            Swal.fire({
                position: 'center-mid',
                icon: 'success',
                title: 'Su compra se ha realizado con éxito',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Insuficiente',
                text: 'Saldo insuficiente para realizar la operación',
              })
    }
    }
}

    /* Vender Accion */
    // cantidad
let cantidadVenta = document.getElementsByClassName("cantidad-venta")
    // botones
let botonVenta = document.getElementsByClassName("btn-venta")

function venderAccion(i) {
    let cantidad = Number(document.getElementsByClassName("cantidad-venta")[i].value);
    if (cantidad <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Cantidad no válida',
            text: 'Ingrese la cantidad correcta que quiera vender.',
          })
    }
    else {
        if (cantidad > portfolio[i].cantidad){
            Swal.fire({
                icon: 'error',
                title: 'Cantidad no válida',
                text: 'La cantidad que desea vender es mayor a las que Ud. posee.\nIntentelo nuevamente.',
              })
        }
        else {
            let precio = portfolio[i].precioUnidad;
            let montoVenta = cantidad * precio;
            saldo += montoVenta
            updateSaldo(saldo)
            portfolio[i].cantidad -= cantidad
            Swal.fire({
                position: 'center-mid',
                icon: 'success',
                title: 'Su venta se ha realizado con éxito',
                showConfirmButton: false,
                timer: 1500
              })
    
            if (portfolio[i].cantidad === 0){
                portfolio.splice(i, 1)
            }
            listaPortfolio()
        }
    }
}

/* Recoge el mail del usuario del localStorage y sube la info del portfolio y de la cartera */
let salir = document.querySelector("#boton-salir")
salir.addEventListener("click", () => {

    const usuario = JSON.parse(localStorage.getItem("Usuario"));
    let portfolioVacio = document.getElementById("portfolio")
    portfolioVacio.innerHTML = "<h3>Ya no puede seguir operando</h3>"
    let container = document.getElementById("container")
    container.innerHTML = `<h1>Ha salido exitosamente de su sesión</h1>
    <p>Un email ha sido enviado a ${usuario.email} con los detalles su portfolio.</p>`;

    let carteraJSON = JSON.stringify(saldo)
    let portfolioJSON = JSON.stringify(portfolio)

    localStorage.setItem("cartera", carteraJSON)
    localStorage.setItem("portfolio", portfolioJSON)
})

/* saludo al usuario, traido del LocalStorage */

let usuarioNombre = JSON.parse(localStorage.getItem("Usuario"));
let greeting = document.querySelector(".usuario");
greeting.innerHTML = `<h2>Bienvenido ${usuarioNombre.nombre}</h2>`;