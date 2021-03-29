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
    let label = form.elements[8];
    let discount = form.elements[9];
    let expiration = form.elements[10];
    let finalPrice = form.elements[11];

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

            case imgs.files[0].size > oneMB * 3:
                qs('.errorImgs').innerHTML = "Cada archivo deben pesar menos de 3Mb"
                imgs.classList.add('is-invalid')
                qs('#img1').src = "/images/productos/undefinedProduct.png"
                break;

            default:
                qs('.errorImgs').innerHTML = '';
                imgs.classList.remove('is-invalid')
                imgs.classList.add('is-valid')

                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    qs('#img1').src = reader.result
                }
                break;
        }
    })



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



})