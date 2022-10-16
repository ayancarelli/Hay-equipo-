const fs = require('fs');
const path = require('path');

const equiposFilePath = path.join(__dirname, '../data/equiposDataBase.json');
const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    canchas: (req, res) => {
        res.render('./products/canchas');
    },
    equipos: (req,res) => {
        res.render('./products/equipos');
    },
    carrito: (req,res) => {
        res.render('./products/carrito');
    },
    carrito2: (req,res) => {
        res.render('./products/carrito2');
    },
    create: (req,res) => {
        res.render('./products/crear-equipo');
    },
    crear: (req,res)=>{
        
        let equipoNuevo = {
            id: (equiposJson[equiposJson.length-1].id+1),
            nombreEquipo: req.body.nombreEquipo,
            imagen: "los-cebollitas.jpeg",
            jugador1: req.body.jugador1,
            jugador2: req.body.jugador2,
            jugador3: req.body.jugador3,
            jugador4: req.body.jugador4,
            jugador5: req.body.jugador5,
            jugador6: req.body.jugador6,
            restricciones: req.body.restricciones,
            restriccionEdad: req.body.restriccionEdad
        };
        
        equiposJson.push(equipoNuevo);
        
        fs.writeFileSync(equiposFilePath,JSON.stringify(equiposJson, null, " "));
       console.log(equipoNuevo);
        res.redirect('/');
    },

    edit: (req,res) => {
        res.render('./products/editar-equipo');
    },
}

module.exports = controlador;