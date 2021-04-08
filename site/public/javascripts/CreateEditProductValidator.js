window.addEventListener('load', () => {
    console.log('Vinculación de validaciones exitosa!');

    const qs = (element) => document.querySelector(element)

    let regExExt = /(.jpg|.jpeg|.png|.gif)$/i;

    let form = qs('form.creatEdit')

    let imgs = form.elements[0];
    let animal = form.elements[1];
    let category = form.elements[2];
    let subCategory = form.elements[3];
    let name = form.elements[4];
    let description = form.elements[5];
    let cuantity = form.elements[6];
    let price = form.elements[7];

    const oneMB = 1048576;
    (imgs.value) ? imgs.value = "" : null

    /* validación de extensión de imagen */
    imgs.addEventListener('change', (e) => {

        switch (true) {
            case !regExExt.test(imgs.value):
                qs('.errorImgs').innerHTML = 'Solo archivos: JPG, JPEG, PNG y GIF';
                imgs.classList.add('is-invalid')
                qs('#img1').src = "/images/productos/undefinedProduct.png"
                break;

            case imgs.files[0].size > oneMB * 2:
                qs('.errorImgs').innerHTML = "Cada archivo deben pesar menos de 2Mb"
                imgs.classList.add('is-invalid')
                qs('#img1').src = "/images/productos/undefinedProduct.png"
                break;

            case imgs.files.length > 3:
                qs('.errorImgs').innerHTML = "Solo puede subir hasta 3 imágenes"
                imgs.classList.add('is-invalid')
                break;

            default:
                qs('.errorImgs').innerHTML = '';
                imgs.classList.remove('is-invalid')
                imgs.classList.add('is-valid')

                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    qs('#img0').src = reader.result

                    if (typeof e.target.files[1] !== "undefined") {
                        reader.readAsDataURL(e.target.files[1])
                        reader.onload = () => {
                            let sinfoto1 = 'hey! no soy undefined'
                            qs('#img1').src = reader.result

                            if (typeof e.target.files[2] !== "undefined") {
                                reader.readAsDataURL(e.target.files[2])
                                reader.onload = () => {
                                    let sinfoto2 = 'hey! no soy undefined'
                                    qs('#img2').src = reader.result

                                }
                            } else {
                                qs('#img2').src = "/images/productos/1MoreImages.png"
                            }
                        }
                    } else {
                        qs('#img1').src = "/images/productos/1MoreImages.png"
                        qs('#img2').src = "/images/productos/1MoreImages.png"
                    }
                }
                break;
        }
    })



    /* Validaciones de animal */
    animal.addEventListener('blur', () => {
        if (animal.value === "") {
            animal.classList.add('is-invalid')
        } else {
            animal.classList.remove('is-invalid');
            animal.classList.add('is-valid');
        }
    })

    /* Validaciones de category */
    category.addEventListener('blur', () => {
        if (category.value === "") {
            category.classList.add('is-invalid')
        } else {
            category.classList.remove('is-invalid');
            category.classList.add('is-valid');
        }
    })

    /* Validaciones de subCategory */
    subCategory.addEventListener('blur', () => {
        if (subCategory.value === "") {
            subCategory.classList.add('is-invalid')
        } else {
            subCategory.classList.remove('is-invalid');
            subCategory.classList.add('is-valid');
        }
    })


    /* Validaciones de nombre */
    name.addEventListener('blur', () => {
        if (name.value === "") {
            name.classList.add('is-invalid')
            qs('.errorName').innerHTML = 'Se requiere el nombre'
        } else if (name.value.length < 5) {
            name.classList.add('is-invalid')
            qs('.errorName').innerText = 'El nombre debe tener al menos 5 caracteres'
        } else {
            qs('.errorName').innerHTML = '';
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
        }
    })

    /* Validaciones de descripción */
    description.addEventListener('blur', () => {
        if (description.value === "") {
            description.classList.add('is-invalid')
            qs('.errorDescription').innerText = 'Se requiere una descripción'
        } else if (description.value.length < 20) {
            description.classList.add('is-invalid')
            qs('.errorDescription').innerText = 'La descripción debe tener al menos 20 caracteres'
        } else {
            qs('.errorDescription').innerHTML = '';
            description.classList.remove('is-invalid');
            description.classList.add('is-valid');
        }
    })

    /* Validaciones de cuantity */
    cuantity.addEventListener('blur', () => {
        if (cuantity.value === "") {
            cuantity.classList.add('is-invalid')
        } else {
            cuantity.classList.remove('is-invalid');
            cuantity.classList.add('is-valid');
        }
    })

     /* Validaciones de price */
     price.addEventListener('blur', () => {
        if (price.value === "") {
            price.classList.add('is-invalid')
        } else {
            price.classList.remove('is-invalid');
            price.classList.add('is-valid');
        }
    })


    /* Condición para enviar formulario */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (
            !imgs.classList.contains('is-invalid') &&
            !animal.classList.contains('is-invalid') &&
            !category.classList.contains('is-invalid') &&
            !subCategory.classList.contains('is-invalid') &&
            !name.classList.contains('is-invalid') &&
            !description.classList.contains('is-invalid') &&
            !cuantity.classList.contains('is-invalid') &&
            !price.classList.contains('is-invalid') 
        ) {
            form.submit()
        }
    })

    
})