window.addEventListener('load', () => {
    console.log('Vinculación de API exitosa!');

    const qs = (element) => document.querySelector(element)

    let animal = qs('#animal')
    let categoria = qs('#category')
    let subCategoria = qs('#subCategory')

    /* capturo el valor de animal e inserto sus respectivas categorías */
    animal.addEventListener('change', () => {

        categoria.innerHTML = `<option value="" disabled selected >Elija una categoría</option>`
        categoria.classList.remove('is-valid')

        fetch('http://localhost:3000/api/categories/' + animal.value + '/categories')

            .then(response => response.json())
            .then(result => {
                result.data.forEach(category => {
                    categoria.innerHTML += `<option value="${category.id}" >${category.category}</option>`
                });
            })

    })

    /* Si hay algo en session storage, reemplazo con lo que tenga en su contenido */
    if (typeof sessionStorage.getItem('categorias') == "string" && animal.value != "") {

        let storage = JSON.parse(sessionStorage.getItem('categorias'))
        categoria.innerHTML = ""
        animal.classList.add("is-valid")

        storage.forEach(category => {
            if (category.value == "") {
                categoria.innerHTML += `<option value="${category.value}"disabled >${category.name}</option>`
            } else if (category.selected == true) {
                categoria.innerHTML += `<option value="${category.value}"selected >${category.name}</option>`
                categoria.classList.add('is-valid')
            } else {
                categoria.innerHTML += `<option value="${category.value}" >${category.name}</option>`
            }
        });
    }


    /* Guardo el valor de las categorías en sessionStorage por si se activan las validaciones del back-end */
    categoria.addEventListener('change', () => {

        let opciones = []

        for (let i = 0; i < categoria.options.length; i++) {

            let item = {
                value: categoria.options[i].value,
                name: categoria.options[i].innerText,
                selected: categoria.options[i].selected
            }
            opciones.push(item)
        }
        sessionStorage.setItem('categorias', JSON.stringify(opciones))


        /* Mismo proceso para las subcategorías */
        subCategoria.innerHTML = `<option value="" disabled selected >Elija una sub categoría</option>`
        subCategoria.classList.remove('is-valid')

        fetch('http://localhost:3000/api/categories/' + animal.value + '/' + category.value + '/subcategories')

            .then(response => response.json())
            .then(result => {
                result.data.forEach(sub => {
                    subCategoria.innerHTML += `<option value="${sub.id}" >${sub.subCategory}</option>`
                });
            })

    })

    /* Si hay algo en session storage, reemplazo con lo que tenga en su contenido */
    if (typeof sessionStorage.getItem('subCategorias') == "string" && categoria.value != "") {

        let storageSub = JSON.parse(sessionStorage.getItem('subCategorias'))
        subCategoria.innerHTML = ""

        storageSub.forEach(subCategory => {
            if (subCategory.value == "") {
                subCategoria.innerHTML += `<option value="${subCategory.value}"disabled >${subCategory.name}</option>`
            } else if (subCategory.selected == true) {
                subCategoria.innerHTML += `<option value="${subCategory.value}"selected >${subCategory.name}</option>`
                subCategoria.classList.add('is-valid')
            } else {
                subCategoria.innerHTML += `<option value="${subCategory.value}" >${subCategory.name}</option>`
            }
        });
    }

    subCategoria.addEventListener('change', () => {

        let opcionSub = []

        for (let i = 0; i < subCategoria.options.length; i++) {

            let item = {
                value: subCategoria.options[i].value,
                name: subCategoria.options[i].innerText,
                selected: subCategoria.options[i].selected
            }
            opcionSub.push(item)
        }
        sessionStorage.setItem('subCategorias', JSON.stringify(opcionSub))
    })
})
/* Mi primer trabajo con logica de API Gabriel */