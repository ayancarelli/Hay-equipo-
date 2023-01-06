const form = document.getElementById("form")
const email = document.getElementById("exampleInputEmail1")
const password = document.getElementById("exampleInputPassword1")
const parrafo = document.getElementById("warnings")
const inputs = document.querySelectorAll('#form input')


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    let warnings = ''
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    parrafo.innerHTML = ""
        
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

