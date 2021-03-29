const qs = (e) => document.querySelector(e)

window.addEventListener('load', () => {
    console.log('Javascript esta vinculado correctamente');

    let formulario = qs('form')
    let inputNombreApellido = (formulario.elements[0])
    let inputEmail = (formulario.elements[1])
    let inputPass = (formulario.elements[2])
    let inputPass2 = (formulario.elements[3])


    /* VIEW PASSWORD */
        
    let pass = document.getElementsByClassName('pass');
    let confirm = document.getElementsByClassName('confirm');

    
 /*    function mostrarContraseña(pass, btn){
        if(pass.type == "password"){
            pass.type = "text";
            btn.classList.remove("fa-eye");
            btn.classList.add("fa-eye-slash")
        } else {
            pass.type = "password";
            btn.classList.remove("fa-eye-slash");
            btn.classList.add("fa-eye")
        }
    } */
    
/*     btn1.onclick = () => {
        mostrarContraseña(pass1, btn1)
    }
    
    btn2.onclick = () => {
        mostrarContraseña(pass2, btn2)
    }
    
    btn3.onclick = () => {
        mostrarContraseña(pass3, btn3)
    } */
    
    
    /* FORMS VALIDATIONS */
    
    let id = (elem) => {
        return document.getElementsById(elem);
    }
    
    let errores = {};
    let erroresLog = {};
    
    let formLogin = id('form-login');
    let emailLogin = id('emailInicio');
    let passLogin = id('passwordInicio');
    
    let formReg = id('form-register');
    let nombre = id('nombre');
    let apellido = id('apellido');
    let emailReg = id('email');
    let passReg = id('passwordRegistro');
    let passReg2 = id('passwordRepeat');
    let terminos = id('terminos');
    
    let regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    
    
    /* LOGIN VALIDATIONS */
    
    let emailLoginValidation = () => {
        switch (true) {
            case emailLogin.value.length == 0:
                erroresLog.email = 'El campo email es obligatorio';
                errorEmailLogin.innerHTML = erroresLog.email;
                emailLogin.classList.add('is-invalid');
                break;
            case !regExEmail.test(emailLogin.value):
                erroresLog.email = 'Debes escribir un email válido';
                errorEmailLogin.innerHTML = erroresLog.email;
                emailLogin.classList.add('is-invalid');
                break;
            default:
                emailLogin.classList.remove('is-invalid');
                emailLogin.classList.add('is-valid');
                errorEmailLogin.innerHTML = ''
        }
    }
    
    emailLogin.addEventListener('blur', () => {
        emailLoginValidation();
    })

    
    
    
    /* REGISTER VALIDATIONS */
    
    
    /* NOMBRE Y APELLIDO */
    
    let nombreValidator = () => {
        switch (true) {
            case nombre.value.length == 0:
                errores.nombre = 'Debes ingresar nombre y apellido';
                errorNombre.innerHTML = errores.nombre;
                nombre.classList.add('is-invalid');
                break;
            case nombre.value.length <= 2:
                errores.nombre = 'El nombre y apellido deben tener más de 2 caracteres';
                errorNombre.innerHTML = errores.nombre;
                nombre.classList.add('is-invalid');
                break;
            default:
                nombre.classList.remove('is-invalid');
                nombre.classList.add('is-valid');
                errorNombre.innerHTML = ''
        }
    }
    
    nombre.addEventListener('blur', () => {
        nombreValidator();
    })

    
    /* EMAIL */
    
    let emailRegValidation = () => {
        switch (true) {
            case emailReg.value.length == 0:
                errores.email = 'El campo email es obligatorio';
                errorEmail.innerHTML = errores.email;
                emailReg.classList.add('is-invalid');
                break;
            case !regExEmail.test(emailReg.value):
                errores.email = 'Debes ingresar un email válido';
                errorEmail.innerHTML = errores.email;
                emailReg.classList.add('is-invalid');
                break;
            default:
                emailReg.classList.remove('is-invalid');
                emailReg.classList.add('is-valid');
                errorEmail.innerHTML = ''
        }
    }
    
    email.addEventListener('blur', () => {
        emailRegValidation();
    })

    
    
    /* PASS */
    
    let passRegValidation = () => {
        switch (true) {
            case passReg.value.length == 0:
                errores.pass = 'El campo Pass es obligatorio';
                errorPass.innerHTML = errores.pass;
                passReg.classList.add('is-invalid');
                break;
            case !regExPass.test(passReg.value):
                errores.pass = 'La contraseña debe tener: al menos 8 caracteres, una mayúscula, una minúscula y un número';
                errorPass.innerHTML = errores.pass;
                passReg.classList.add('is-invalid');
                break;
            default:
                passReg.classList.remove('is-invalid');
                passReg.classList.add('is-valid');
                errorPass.innerHTML = ''
        }
    }
    
    passReg.addEventListener('blur', () => {
        passRegValidation();
    })

    
    /* PASS REPEAT */
    
    let passReg2Validation = () => {
        switch (true) {
            case passReg2.value == "":
                errores.pass2 = "La verificación de contraseña es obligatorio"
                errorPass2.innerHTML = errores.pass2;
                passReg2.classList.add('is-invalid')
            break
            case passReg2.value != passReg.value:
                errores.pass2 = "Las contraseñas no coinciden"
                errorPass2.innerHTML = errores.pass2;
                passReg2.classList.add('is-invalid')
            break;
            default:
            passReg2.classList.remove('is-invalid');
            passReg2.classList.add('is-valid');
            errorPass2.innerHTML = "";
        }
    }
    
    passReg2.addEventListener('blur', () => {
        passReg2Validation();
    })

    
    
    /* FORM */
    
    formReg.addEventListener('submit',function(event){
        let error = false
        event.preventDefault()
    
        let elementosForm = formReg.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                error =true
            }
        }
    
    })
    
    })