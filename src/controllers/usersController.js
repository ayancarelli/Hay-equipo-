const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const userJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    login: (req, res) => {
        res.render('./users/login');
    },
    registro: (req,res) => {
        res.render('./users/registro');
    },
    crear: (req,res)=>{
        
        let usuarioNuevo = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            fechaDeNacimiento: req.body.fechaDeNacimiento ,
            sexo: req.body.sexo,
            foto: "enzo.jpg",
            email: req.body.email,
            usuario: req.body.usuario
        };
        
        userJson.push(usuarioNuevo);
        
        fs.writeFileSync(usersFilePath,JSON.stringify(userJson, null, " "));
       console.log(usuarioNuevo);
        res.redirect('/');
    }
}

module.exports = controlador;