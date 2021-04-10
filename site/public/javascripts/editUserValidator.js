window.addEventListener('load', () => {

    console.log('Vinculación de validaciones exitosa!');

    const qs = (element) => document.querySelector(element)

    /* Expresiónes regulares */
    let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[:!"#$%&'[()*+,\-./:;<=>?@^_`{|}:]).{8,}$/;

    let regExExt = /(.jpg|.jpeg|.png|.gif)$/i;

    /* VALIDACIONES DE EDICIÓN DE PERFIL */
    let formEdit = qs('.user-profile')

    let img = formEdit.elements[0];
    let name = formEdit.elements[1];
    let email = formEdit.elements[2];
    let password = formEdit.elements[5];
    let newPass = formEdit.elements[6];
    let confirmNew = formEdit.elements[7];

    const oneMB = 1048576;
    (img.value) ? img.value = "" : null

    /* validación de extensión de imagen */
    img.addEventListener('change', (e) => {
        switch (true) {
            case !regExExt.test(img.value):
                qs('.errorImg').innerHTML = 'Solo archivos: JPG, JPEG, PNG y GIF';
                img.classList.add('is-invalid')
                qs('#image').src = "/images/users/undefined.png"
                break;

            case img.files[0].size > oneMB * 3:
                qs('.errorImg').innerHTML = "El archivo debe pesar menos de 3Mb"
                img.classList.add('is-invalid')
                qs('#image').src = "/images/users/undefined.png"
                break;

            default:
                qs('.errorImg').innerHTML = '';
                img.classList.remove('is-invalid')
                img.classList.add('is-valid')

                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    qs('#image').src = reader.result
                }
                break;
        }
    })

    /* validaciónes de nombre y apellido */
    name.addEventListener('blur', (e) => {
        var arrayName = name.value.split(" ")

        switch (true) {
            case name.value || (arrayName.length === 1):
                qs('.errorRegisterName').innerHTML = 'Se requiere su nombre y apellido';
                name.classList.add('is-invalid');
                break;

            case (arrayName[0].length <= 2) || (arrayName[1].length <= 2):
                qs('.errorName').innerHTML = 'El nombre y apellido deben tener más de 2 caracteres';
                name.classList.add('is-invalid');
                break;

            case arrayName.length > 2:
                qs('.errorName').innerHTML = 'Si su apellido tiene 2 palabras escríbelo junto';
                name.classList.add('is-invalid');
                break;

            default:
                qs('.errorName').innerHTML = '';
                name.classList.remove('is-invalid');
                name.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones de email */
    email.addEventListener('blur', () => {

        switch (true) {
            case email.value.length === 0:
                qs('.errorEmail').innerHTML = 'Se requiere el email';
                email.classList.add('is-invalid');
                break;

            case !regExEmail.test(email.value):
                qs('.errorEmail').innerHTML = 'El email no es válido';
                email.classList.add('is-invalid');
                break;

            default:
                qs('.errorEmail').innerHTML = '';
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
                break;
        }
    })


    /* Validacion de contraseña actual */
    password.addEventListener('blur', () => {

        switch (true) {
            case ((password.value.length > 0) && (newPass.value === "")):
                qs('.errorNewPass').innerHTML = 'Para cambiar la contraseña, complete los 3 campos requeridos';
                newPass.classList.add('is-invalid');
                break;

            default:
                qs('.errorPass').innerHTML = '';
                newPass.classList.remove('is-invalid');
                password.classList.add('is-valid');
                break;
        }
    })


    /* Validacion de Nueva contraseña */
    newPass.addEventListener('blur', () => {

        switch (true) {
            case ((password.value === "") && (newPass.value.length > 0)):
                qs('.errorPass').innerHTML = 'Para cambiar la contraseña, complete los 3 campos requeridos';
                newPass.classList.add('is-invalid');
                break;

            case (newPass.value !== 0) && (!regExPass.test(newPass.value) && (password.value !== "")):
                qs('.errorNewPass').innerHTML = 'Debe tener numeros, letras (minúsculas y mayúsculas), caracteres especiales y por lo menos 8 caracteres';
                newPass.classList.add('is-invalid');
                break;

            default:
                qs('.errorNewPass').innerHTML = '';
                newPass.classList.remove('is-invalid');
                newPass.classList.add('is-valid');
                password.classList.add('is-valid');
                break;
        }
    })

    /* Validación de confirmación de nueva contraseña */
    confirmNew.addEventListener('blur', () => {

        switch (true) {
            case (newPass.value !== "") && (confirmNew.value === ""):
                qs('.errorConfirmNew').innerHTML = 'No te olvides de confirmar la nueva contraseña!!!';
                confirmNew.classList.add('is-invalid');
                break;

            case (newPass.value !== "") && (confirmNew.value !== "") && (newPass.value !== confirmNew.value):
                qs('.errorConfirmNew').innerHTML = 'Las contraseñas no coinciden!!';
                confirmNew.classList.add('is-invalid');
                break;

            default:
                qs('.errorConfirmNew').innerHTML = '';
                confirmNew.classList.remove('is-invalid');
                confirmNew.classList.add('is-valid');
                break;
        }
    })
    /* Validación para submit */
    formEdit.addEventListener('submit', (e) => {
        e.preventDefault()
        if(
            !img.classList.contains('is-invalid') &&
            !name.classList.contains('is-invalid') &&
            !email.classList.contains('is-invalid') &&
            !password.classList.contains('is-invalid') &&
            !newPass.classList.contains('is-invalid') &&
            !confirmNew.classList.contains('is-invalid') 
        ) {
            formEdit.submit()
        }
    })
})