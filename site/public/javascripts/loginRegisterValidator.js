window.addEventListener('load', () => {

    console.log('Vinculación de validaciones exitosa!');

    const qs = (element) => document.querySelector(element)

    /* Expresiónes regulares */
    let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[:!"#$%&'[()*+,\-./:;<=>?@^_`{|}:]).{8,}$/;


    /* VALIDACIONES DE REGISTER */

    let formRegister = qs('.formulario-registro')

    let nameRegister = formRegister.elements[0];
    let emailRegister = formRegister.elements[1];
    let passRegister = formRegister.elements[2];
    let confirmRegister = formRegister.elements[3];


    /* validaciónes de nombre y apellido */
    nameRegister.addEventListener('blur', (e) => {
        var registArrayName = nameRegister.value.split(" ")

        switch (true) {
            case nameRegister.value || (registArrayName.length === 1):
                qs('.errorRegisterName').innerHTML = 'Se requiere su nombre y apellido';
                nameRegister.classList.add('is-invalid');
                break;

            case (registArrayName[0].length <= 2) || (registArrayName[1].length <= 2):
                qs('.errorRegisterName').innerHTML = 'El nombre y apellido deben tener más de 2 caracteres';
                nameRegister.classList.add('is-invalid');
                break;

            case registArrayName.length > 2:
                qs('.errorRegisterName').innerHTML = 'Si su apellido tiene 2 palabras escríbelo junto';
                nameRegister.classList.add('is-invalid');
                break;

            default:
                qs('.errorRegisterName').innerHTML = '';
                nameRegister.classList.remove('is-invalid');
                nameRegister.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones de email */
    emailRegister.addEventListener('blur', () => {

        switch (true) {
            case emailRegister.value.length === 0:
                qs('.errorRegisterEmail').innerHTML = 'Se requiere el email';
                emailRegister.classList.add('is-invalid');
                break;

            case !regExEmail.test(emailRegister.value):
                qs('.errorRegisterEmail').innerHTML = 'El email no es válido';
                emailRegister.classList.add('is-invalid');
                break;

            default:
                qs('.errorRegisterEmail').innerHTML = '';
                emailRegister.classList.remove('is-invalid');
                emailRegister.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones Password */
    passRegister.addEventListener('blur', () => {

        switch (true) {
            case passRegister.value.length === 0:
                qs('.errorRegisterPass').innerHTML = 'Se requiere la contraseña';
                passRegister.classList.add('is-invalid');
                break;

            case !regExPass.test(passRegister.value):
                qs('.errorRegisterPass').innerHTML = 'Debe tener numeros, letras (minúsculas y mayúsculas), caracteres especiales y por lo menos 8 caracteres';
                passRegister.classList.add('is-invalid');
                break;

            default:
                qs('.errorRegisterPass').innerHTML = '';
                passRegister.classList.remove('is-invalid');
                passRegister.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones de Confirmación de Password */
    confirmRegister.addEventListener('blur', () => {

        switch (true) {
            case confirmRegister.value.length === 0:
                qs('.errorRegisterConfirm').innerHTML = 'Se requiere la confirmación de la contraseña';
                confirmRegister.classList.add('is-invalid');
                break;

            case passRegister.value !== confirmRegister.value:
                qs('.errorRegisterConfirm').innerHTML = 'Las contraseñas no coinciden!!';
                confirmRegister.classList.add('is-invalid');
                break;

            default:
                qs('.errorRegisterConfirm').innerHTML = '';
                confirmRegister.classList.remove('is-invalid');
                confirmRegister.classList.add('is-valid');
                break;
        }
    })

    /* Condición para la ejecución de submit en Register */
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault()
        if( 
            nameRegister.classList.contains('is-valid') &&
            emailRegister.classList.contains('is-valid') &&
            passRegister.classList.contains('is-valid') &&
            confirmRegister.classList.contains('is-valid')
        ) {
            formRegister.submit()
        }
    })


    /* VALIDACIONES DE LOGIN */

    let formLogin = qs('.formulario-iniciar')


    let emailLogin = formLogin.elements[0];
    let passLogin = formLogin.elements[1];


    /* Validaciones de email */
    emailLogin.addEventListener('blur', () => {

        switch (true) {
            case emailLogin.value.length === 0:
                qs('.errorLoginEmail').innerHTML = 'Se requiere el email';
                emailLogin.classList.add('is-invalid');
                break;

            case !regExEmail.test(emailLogin.value):
                qs('.errorLoginEmail').innerHTML = 'El email no es válido';
                emailLogin.classList.add('is-invalid');
                break;

            default:
                qs('.errorLoginEmail').innerHTML = '';
                emailLogin.classList.remove('is-invalid');
                emailLogin.classList.add('is-valid');
                break;
        }
    })

    /* Validaciones Password */
    passLogin.addEventListener('blur', () => {

        switch (true) {
            case passLogin.value.length === 0:
                qs('.errorLoginPass').innerHTML = 'Se requiere la contraseña';
                passLogin.classList.add('is-invalid');
                break;

            default:
                qs('.errorLoginPass').innerHTML = '';
                passLogin.classList.remove('is-invalid');
                passLogin.classList.add('is-valid');
                break;
        }
    })

    /* Condición para la ejecución de submit en Login */
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault()
        if( 
            emailLogin.classList.contains('is-valid') &&
            passLogin.classList.contains('is-valid')
        ) {
            formLogin.submit()
        }
    })

})

