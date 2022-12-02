const fs = require('fs');
const path = require('path');
const moment = require('moment');

const db = require('../database/models');

const equiposFilePath = path.join(__dirname, '../data/equiposDataBase.json');
const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));

const controlador = {
    canchas: (req, res) => {
        res.render('./products/canchas', {moment: moment});
    },

    equipos: (req,res) => {
        //const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));
        //res.render('./products/equipos', {ps: equiposJson});
        db.equipo.findAll().then((equipos) => {

            res.render('./products/equipos', { ps: equipos });
        });
    },

    carrito: (req,res) => {
        res.render('./products/carrito');
    },

    carrito2: (req,res) => {
        res.render('./products/carrito2');
    },

    create: (req,res) => {
        res.render('products/crear-equipo');
    },

    crear: (req,res)=> {
        let newId;
        if(equiposJson.length>0){
            newId = equiposJson[(equiposJson.length-1)].id+1;
        } else {
            newId = 1    
        }
        let equipoNuevo = {
            id: newId,
            nombreEquipo: req.body.nombreEquipo.toUpperCase(),
            imagen: req.file.filename,
            jugador1: req.body.jugador1.toUpperCase(),
            jugador2: req.body.jugador2.toUpperCase(),
            jugador3: req.body.jugador3.toUpperCase(),
            jugador4: req.body.jugador4.toUpperCase(),
            jugador5: req.body.jugador5.toUpperCase(),
            jugador6: req.body.jugador6.toUpperCase(),
            restriccionEdad: req.body.restriccionEdad,
            restriccionesSexo: req.body.restriccionesSexo
        };
        
        equiposJson.push(equipoNuevo);
        
        fs.writeFileSync(equiposFilePath,JSON.stringify(equiposJson, null, " "));
        console.log(equipoNuevo);
        res.redirect('/products/equipos');
    },

    edit: (req,res) => {
        let idEquipo = req.params.id;
		let objEquipo;

		for (let e of equiposJson){
			if (idEquipo == e.id){
				objEquipo=e;
				break;
			}
		}

		res.render('./products/editar-equipo',{equipo: objEquipo})
    },
    
    equipo: (req,res) => {
        let idEquipo = req.params.id;
        let objEquipo;

        for (let e of equiposJson){
            if (idEquipo == e.id){
                objEquipo=e;
                break

            }
        }
        /* db.equipo.findOne({
            where:{
                id: req.params.id
            }
        }) */
        
        res.render('./products/equipo', {equipo: objEquipo})
    },
    
    update: (req,res) => {
   
        let idEquipo = req.params.id;
   
        for (let e of equiposJson){
            if (idEquipo == e.id){
                
                e.nombreEquipo= req.body.nombreEquipo.toUpperCase();
                e.jugador1= req.body.jugador1.toUpperCase();
                e.jugador2= req.body.jugador2.toUpperCase();
                e.jugador3= req.body.jugador3.toUpperCase();
                e.jugador4= req.body.jugador4.toUpperCase();
                e.jugador5= req.body.jugador5.toUpperCase();
                e.jugador6= req.body.jugador6.toUpperCase();
                e.restriccionEdad= req.body.restriccionEdad;
                e.restriccionesSexo= req.body.restriccionesSexo;
                break;

            }
        }
        fs.writeFileSync(equiposFilePath,JSON.stringify(equiposJson, null, " "));
      
        res.redirect('/products/equipos');
    },

    destroy: (req, res) => {
		
		let idEquipo = req.params.id;

		let arrEquipos = equiposJson.filter(function(elemento){
			return elemento.id!=idEquipo;
		});
		
		fs.writeFileSync(
            path.join(__dirname, '../data/equiposDataBase.json'),
            JSON.stringify(arrEquipos,null," "));
            
        res.redirect('/');        
	}
}

module.exports = controlador;