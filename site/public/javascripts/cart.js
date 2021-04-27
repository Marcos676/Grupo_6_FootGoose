/* //const urlBase = window.location.origin Ya esta declarada

const getCarrito = async () => {// funcion que muestra la cantidad de productos en el carrito en el icono del header y obtiene el total de la compra para el modal
    try {

        let response = await fetch(urlBase + '/listar')
        let result = await response.json()
        mostrarCantidad(result)
    } catch (error) {
        console.log(error)
    }
}


const agregarItem = async (e, id) => {

    cantidad = document.querySelector(`.${id}`)

    e.preventDefault()
    console.log('hola');
    if (cantidad != 0) {
        try {
            let response = await fetch(urlBase + '/agregar/' + id + "/" + cantidad.value)
            let result = await response.json()
            console.log(result);
            console.log(urlBase);
             //cargarTabla(result) // inserto en el contenedor los productos obtenidos
             getCarrito()
        } catch (error) {
            console.log(error)
        }
    }
}





window.addEventListener('load', () => {
    console.log('carrito enlazado correctamente');
    agregarItem()
}) */