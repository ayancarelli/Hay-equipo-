const fs = require('fs');
const path = require('path');
const moment = require('moment');
const encriptar = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');


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
        const rdosValidaciones = validationResult(req);
        
        if(rdosValidaciones.errors.length > 0){            
            return res.render('./users/registro', {
                moment: moment,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }        

        let userInDB = User.findByField('email', req.body.email);

        if(userInDB) {
            return res.render('./users/registro', {
                moment: moment,
                errors: {
                    email: {
                        msg: 'Éste email ya se encuentra registrado.'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            fotoPerfil: req.file.filename,
            password: encriptar.hashSync(req.body.password, 10)
        }

        let userCreated = User.create(userToCreate);
       
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

		res.render('./users/editar-users', {useraEditar: objUser, moment: moment});

    },
    
    update: (req, res) => {

		let idUser = req.params.id;
        let userEdited;

		for (let s of userJson){
			if (idUser == s.id){
				s.nombre = req.body.nombre.toUpperCase();
                s.apellido = req.body.apellido.toUpperCase();
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