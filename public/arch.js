const email = document.getElementById("exampleInputEmail1")
const pass = document.getElementById("exampleInputPassword1")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    let h = e.preventDefault()
    console.log(h)
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!regexEmail.test(email.value)){
        warnings += 'El email no es valido'
    }
    if(pass.value.length < 6){
        warnings += 'El password no es valido'
    }
})