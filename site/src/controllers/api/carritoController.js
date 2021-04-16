const db = require('../../database/models');


const verificar =  (carrito, id) => {
    let pos = -1;
    for (let i = 0; i < carrito.length; i++) {
        
        if(carrito[i].id == id){
            pos = i
            break
        }
    }
    return pos
}

module.exports = {
    mostrarCarrito : (req,res) => {
        return res.status(200).json(req.session.carrito)
    },
    agregarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;
        let cantidad = req.params.cantidad;

        db.Product.findOne({
            where : {
                id
            },
            include : [
                {association : 'label'},
                {association : 'image'}
            ]
        })
        .then(producto => {
            let pos = verificar(carrito,id)

            if(pos == -1) {

                let item = {
                    id : producto.id,
                    nombre : producto.name,
                    imagen : producto.images,// es un array con como maximo 3 nombres de imagenes
                    price : producto.price,
                    discount : producto.discount,
                    finalPrice : producto.finalPrice,
                    cantidad,
                    total: item.finalPrice * item.cantidad
                };
                carrito.push(item)

            }else{

                let item = carrito[pos]

                item.cantidad = cantidad
                item.total = item.cantidad * item.precio
                
                carrito[pos] = item
            }
            req.session.carrito = carrito // guardo el nuevo carrito actualizado en req.session...
            res.status(200).json(req.session.carrito)//envío a la vista toda la info del carrito para poder obtenerlo como una API con fetch desde el Front
        })


    },
    quitarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;

        let pos = verificar(carrito,id)// Buscoco el producto esta en el carrito

        let item  = carrito[pos] // Capturo el producto del array

        if(item.cantidad > 1){ // Si la cantidad del producto es mayor a 1
            item.cantidad = item.cantidad - 1 // le resto 1 a la cantidad
            item.total = item.cantidad * item.precio // actalizo el precio  

            carrito[pos] = item //actualizo los datos del producto en el array

            req.session.carrito = carrito //Guardo el array con los datos catualizados

            return res.status(200).json(req.session.carrito) // Envio el carrito actualizado
        }else{// Si es el ultimo producto hay que borrarlo
            carrito.splice(item,1) // splice(producto a eliminar, cantidad a eliminar)
            req.session.carrito = carrito // se guarda el carrito actualizado
            return res.status(200).json(req.session.carrito) // se envia el carrito actualizado
        }


    },
   
    vaciarCarrito : (req,res) => {
        req.session.carrito = []// borra el carrito de la session reemplazando todo con un array vacio
        return res.status(200).json(req.session.carrito) // envio el datoa la vista
    }
}