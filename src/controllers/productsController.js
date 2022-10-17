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
        const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));
        res.render('./products/equipos', {ps: equiposJson});
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
        
        let equipoNuevo = {
            id: (equiposJson[equiposJson.length-1].id)+1,
            nombreEquipo: req.body.nombreEquipo,
            imagen: "los-cebollitas.jpeg",
            jugador1: req.body.jugador1,
            jugador2: req.body.jugador2,
            jugador3: req.body.jugador3,
            jugador4: req.body.jugador4,
            jugador5: req.body.jugador5,
            jugador6: req.body.jugador6,
            restriccionesEdad: req.body.restriccionesEdad,
            restriccionSexo: req.body.restriccionSexo
        };
        
        equiposJson.push(equipoNuevo);
        
        fs.writeFileSync(equiposFilePath,JSON.stringify(equiposJson, null, " "));
       console.log(equipoNuevo);
        res.redirect('/');
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
        
        res.render('./products/equipo', {equipo: objEquipo})
    },
    update: (req,res) => {
   
        let idEquipo = req.params.id;
   
        for (let e of equiposJson){
            if (idEquipo == e.id){
                
                e.nombreEquipo= req.body.nombreEquipo;
                e.jugador1= req.body.jugador1;
                e.jugador2= req.body.jugador2;
                e.jugador3= req.body.jugador3;
                e.jugador4= req.body.jugador4;
                e.jugador5= req.body.jugador5;
                e.jugador6= req.body.jugador6;
                e.restriccionesEdad= req.body.restriccionesEdad;
                e.restriccionSexo= req.body.restriccionSexo;
                break;

            }
        }
        fs.writeFileSync(equiposFilePath,JSON.stringify(equiposJson, null, " "));
      
        res.redirect('/');
    },
    destroy : (req, res) => {
		
		let idEquipo = req.params.id;

		let arrEquipos = equiposJson.filter(function(elemento){
			return elemento.id!=idEquipo;
		})
		
		fs.writeFileSync(equiposFilePath,JSON.stringify(arrEquipos,null," "));

		res.redirect('/');
	}
}

module.exports = controlador;