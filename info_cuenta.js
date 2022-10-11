/* Constructor para nuevos usuarios*/
class NuevoUsuario {
    constructor (nombre, apellido, email, token) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.token = token;
    }
}

/* Crea un usurio con los datos incorporados, y los sube al local storage*/
let crearCuenta = document.getElementById("crearCuenta")
crearCuenta.addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("apellido").value
    let email = document.getElementById("email").value
    let token = document.getElementById("token").value

    let nuevoUsuario = new NuevoUsuario(nombre, apellido, email, token)
    let nuevoUsuarioJSON = JSON.stringify(nuevoUsuario)

    localStorage.setItem("Usuario", nuevoUsuarioJSON)

    let form = document.getElementById("form")
    form.innerHTML = `<h1>Su cuenta ha sido creada con éxito.</h1> <p>Oprima LOG IN para continuar</p>
                      <a id="logIn" href="./pages/acciones.html" class="btn btn-primary mt-3">LOG IN</a>`

})