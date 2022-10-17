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
    },
    users: (req,res) => {
        const userJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render('./users/users', {users : userJson});
    },
    edit: (req,res) => {
        
        let dniUser = req.params.dni;
		let objUser;

		for (let e of userJson){
			if (dniUser == e.dni){
				objUser=e;
				break;
			}
		}

		res.render('./users/editar-users');/*,{useraEditar: objUser});*/

    },
    update: (req, res) => {

		let dniUser = req.params.dni;

		for (let s of userJson){
			if (dniUser == s.dni){
				s.nombre = req.body.nombre;
                s.apellido = req.body.apellido;
                s.dni = req.body.dni;
                s.fechaDeNacimiento = req.body.fechaDeNacimiento ;
                s.sexo = req.body.sexo;
                s.foto = "enzo.jpg";
                s.email = req.body.email;
                s.usuario = req.body.usuario
				break;
			}
		}

		fs.writeFileSync(usersFilePath, JSON.stringify(userJson,null,' '));

		res.redirect('/');
	}
}

module.exports = controlador;