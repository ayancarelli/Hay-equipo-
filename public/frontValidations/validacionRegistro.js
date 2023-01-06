const form = document.getElementById("formularioRegistro")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const dni = document.getElementById("dni")
const genero = document.getElementById("genero")
const email = document.getElementById("email")
const password = document.getElementById("contraseña")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    let warnings = ''
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    parrafo.innerHTML = ""

    if(nombre.value.length <4){
            warnings += 'El nombre no es valido <br>'
            entrar = true
        }
    if(apellido.value.length <4){
            warnings += 'El apellido no es valido <br>'
            entrar = true
        }
    if(dni.value.length <8){
            warnings += 'El DNI no es valido <br>'
            entrar = true
        }
    
    if(!regexEmail.test(email.value)){
            warnings += 'El email no es valido <br>'
            entrar = true
        }
    if(password.value.length <6){
            warnings += 'La contraseña no es valido <br>'
            entrar = true
        }
    if(entrar){
            parrafo.innerHTML = warnings
        }
    if (entrar == false){
            form.submit ()
        }
})

