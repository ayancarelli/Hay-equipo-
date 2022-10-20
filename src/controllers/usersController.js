const fs = require('fs');
const path = require('path');
const moment = require('moment');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const userJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controlador = {
    login: (req, res) => {
        res.render('./users/login');
    },

    registro: (req,res) => {        
        res.render('./users/registro', {moment: moment});
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
        let userLogged = false;

        for(let u of userJson){            
            if((userMail == u.email) && (userPass == u.password)){
                    userLogged = u;
                    break;                                                            
            }
        }

        if (userLogged == false){
            res.send('Usuario no encontrado. Revisar datos ingresados.')
        }

        console.log(userLogged);        
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
        
        let idUser = req.params.id;
		let objUser;

		for (let e of userJson){
			if (idUser == e.id){
				objUser=e;
				break;
			}
		}

		res.render('./users/editar-users', {useraEditar: objUser});

    },
    
    update: (req, res) => {

		let idUser = req.params.id;
        let userEdited;

		for (let s of userJson){
			if (idUser == s.id){
				s.nombre = req.body.nombre;
                s.apellido = req.body.apellido;
                s.dni = req.body.dni;
                s.fechaDeNacimiento = req.body.fechaDeNacimiento ;
                s.genero = req.body.genero;
                s.foto = "enzo.jpg";
                s.email = req.body.email;
                s.password = req.body.password
                userEdited = s;
				break;
			}
		}

		fs.writeFileSync(usersFilePath, JSON.stringify(userJson,null,' '));

		res.render('./users/usuario', {user : userEdited});
	}
}

module.exports = controlador;