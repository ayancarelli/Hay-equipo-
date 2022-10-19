const fs = require('fs');
const path = require('path');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const userJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controlador = {
    login: (req, res) => {
        res.render('./users/login');
    },
    registro: (req,res) => {
        res.render('./users/registro');
    },
    crear: (req,res)=>{
        
        let newId;
        if(userJson.length>0){
            newId = userJson[(userJson.length-1)].id+1;
        } else {
            newId = 1    
        }
        let usuarioNuevo = {
            id: newId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            genero: req.body.genero,
            fotoPerfil: "enzo.jpg",
            email: req.body.email,
            password: req.body.password
        };
        
        userJson.push(usuarioNuevo);
        
        fs.writeFileSync(usersFilePath,JSON.stringify(userJson, null, " "));
        console.log(usuarioNuevo);
        res.redirect('/users/login');
    },

    checkUser: (req, res) => {
        let userMail = req.body.email;
        let userPass = req.body.password;
        let userLogged;

        for(let u of userJson){
            if(userMail == u.email && userPass == u.password){
                    userLogged = u;
                    break;                    
            } else {
                res.send('Usuario no encontrado. Verificar datos ingresados.')
            }               
        }
        res.render('./users/usuario', {user : userLogged});
    },
    /*
    --- VER QUE HACEMOS CON ÉSTE MÉTODO --- 
    
    users: (req,res) => {
        const userJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.render('./users/users', {users : userJson});
    },
    */
    edit: (req,res) => {
        
        let dniUser = req.params.dni;
		let objUser;

		for (let e of userJson){
			if (dniUser == e.dni){
				objUser=e;
				break;
			}
		}

		res.render('./users/editar-users', {useraEditar: objUser});

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