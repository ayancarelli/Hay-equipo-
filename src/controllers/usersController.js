const moment = require('moment');
const encriptar = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');


const controlador = {
    registro: (req, res) => {
        res.render('./users/registro', { moment: moment });
    },

    crear: (req, res) => {
        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./users/registro', {
                moment: moment,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
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

    login: (req, res) => {
        res.render('./users/login');
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email);

        if (userToLogin) {
            let passwordOk = encriptar.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.recordar) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 5 })
                }

                return res.redirect('/users/usuario');
            }

            return res.render('./users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    },
                    password: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }

        return res.render('./users/login', {
            errors: {
                email: {
                    msg: 'Verificar email ingresado.'
                }
            }
        });
    },

    perfilUsuario: (req, res) => {
        res.render('./users/usuario', { user: req.session.userLogged });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    edit: (req, res) => {
        let userToEdit = User.findByField("email", req.session.userLogged.email);

        res.render('./users/editar-users', { useraEditar: userToEdit, moment: moment });
    },

    update: (req, res) => {
        res.send('VISTA EN MANTENIMIENTO. PRÓXIMAMENTE FUNCIONANDO. ESTAMOS TRABAJANDO ARDUAMENTE EN ELLO.');
        /* let userToEdit = User.findByField("email", req.session.userLogged.email);
        const rdosValidaciones = validationResult(req);
        console.log(rdosValidaciones);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./users/editar-users', {
                useraEditar: userToEdit,
                moment: moment,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        let newEmail = User.findByField("email", req.body.email);
        if ((req.body.email !== userToEdit.email) && (newEmail !== undefined)) {
            return res.render('./users/editar-users', {
                useraEditar: userToEdit,
                moment: moment,
                errors: {
                    email: {
                        msg: 'Éste email ya se encuentra registrado.'
                    }
                },
                oldData: req.body
            });
        }

        let passwordIgual = encriptar.compareSync(req.body.password, userToEdit.password);

        if (passwordIgual === false) {
            return res.render('./users/editar-users', {
                useraEditar: userToEdit,
                moment: moment,
                errors: {
                    password: {
                        msg: 'No coincide con la contraseña registrada.'
                    }
                },
                oldData: req.body
            });
        }
        console.log(req.file.filename);
        console.log(userToEdit.fotoPerfil);

        userToEdit = {
            ...req.body
        }

        let userEdited = User.edit(userToEdit);
        res.render('./users/usuario', { user: userEdited }); */

    /*
    --- LÓGICA VIEJA JERO ---
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
} */
}
}
module.exports = controlador;