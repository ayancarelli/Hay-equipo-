const form = document.getElementById("form2")
const nequipo = document.getElementById("formGroupExampleInput")
const jugador1 = document.getElementById("nombre1")
const jugadora1 = document.getElementById("apellido1")
const jugador2 = document.getElementById("nombre2")
const jugadora2 = document.getElementById("apellido2")
const jugador3 = document.getElementById("nombre3")
const jugadora3 = document.getElementById("apellido4")
const jugador4 = document.getElementById("nombre4")
const jugadora4 = document.getElementById("apellido4")
const jugador5 = document.getElementById("nombre5")
const jugadora5 = document.getElementById("apellido5")
const parrafo = document.getElementById("warnings")
const inputs = document.querySelectorAll('#form2 input')

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    let warnings = ''
    let entrar = false
        
    parrafo.innerHTML = ""
       
    if(nequipo.value.length <3){
            warnings += 'Poner nombre mayor a 3 caracteres <br>'
            entrar = true
        }    
    if(jugador1.value.length <3){
            warnings += 'Poner nombre del primer jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugadora1.value.length <3){
            warnings += 'Poner apellido del primer jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugador2.value.length <3){
            warnings += 'Poner nombre del segundo jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugadora2.value.length <3){
            warnings += 'Poner apellido del segundo jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugador3.value.length <3){
            warnings += 'Poner nombre del tercer jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugadora3.value.length <3){
            warnings += 'Poner apellido del tercer jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugador4.value.length <3){
            warnings += 'Poner nombre del cuarto jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugadora4.value.length <3){
            warnings += 'Poner apellido del cuarto jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugador5.value.length <3){
            warnings += 'Poner nombre del quinto jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(jugadora5.value.length <3){
            warnings += 'Poner apellido del quinto jugador mayor a 3 caracteres <br>'
            entrar = true
        }
    if(entrar){
            parrafo.innerHTML = warnings
        }
        /*if (entrar == false){
            form.submit ()
        }*/
})