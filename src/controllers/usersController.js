const encriptar = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');


const controlador = {
    registro: (req, res) => {
        res.render('./users/registro');
    },

    crear: (req, res) => {
        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {            
            return res.render('./users/registro', {
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        db.usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then((userToCreate) => {

            if (userToCreate != null) {
                console.log("Se encontró un usuario");
                return res.render('./users/registro', {
                    errors: {
                        email: {
                            msg: 'Éste email ya se encuentra registrado.'
                        }
                    },
                    oldData: req.body
                });
            } else {
                db.usuario.create({
                    nombre: req.body.nombre.toUpperCase(),
                    apellido: req.body.apellido.toUpperCase(),
                    dni: req.body.dni,
                    genero: req.body.genero,
                    email: req.body.email,
                    foto_perfil: req.file.filename,
                    password: encriptar.hashSync(req.body.password, 10)
                })
                res.redirect('/users/login');
            }
        })

    },

    login: (req, res) => {
        res.render('./users/login');
    },

    loginProcess: (req, res) => {
        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./users/login', {
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        db.usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then((userToLogin) => {
            if (userToLogin != null) {
                let passwordOk = encriptar.compareSync(req.body.password, userToLogin.password);
                if (passwordOk) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if (req.body.recordar) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 1000 })
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
        })
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
        db.usuario.findOne({
            where: {
                email: req.session.userLogged.email
            }
        }).then((userToEdit) => {
            res.render('./users/editar-users', { useraEditar: userToEdit });
        })
    },

    update: async (req, res) => {
        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./users/editar-users', {
                useraEditar: req.session.userLogged,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        console.log(req.body.email);

        let mailEnDB = await db.usuario.findOne({
            where: {
                email: req.body.email
            }
        });

        console.log(mailEnDB);

        if ((req.body.email != req.session.userLogged.email) && (mailEnDB != null)) {
            return res.render('./users/editar-users', {
                useraEditar: req.session.userLogged,
                errors: {
                    email: {
                        msg: 'Éste email ya se encuentra registrado.'
                    }
                },
                oldData: req.body
            });
        } else {
            db.usuario.update({
                //foto_perfil: req.file.filename,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                genero: req.body.genero,
                email: req.body.email
            },
                { where: { id: req.session.userLogged.id } }).then(() => {
                    req.session.destroy();
                    return res.redirect('/users/login')
                })
        }
    },

    users: (req, res) => {
        db.usuario.findAll().then((usuarios) => {
            res.render('./users/users', { users: usuarios });
        });
    },

    check: async (req, res) => {
        
        let restr = await db.equipo.findAll(
            {
                
                where: {
                    id: 27
                },
                include: [{ association: 'restriccion' }]
                
            }
        )
        res.json(restr[0].restriccion[0].nombre)
       
    },

    check2: (req, res) => {
        db.equipo.findOne({
            order: [['id', 'DESC']],
        }).then((resultado) => {
            res.send(resultado);
        });
    }
}
module.exports = controlador;

