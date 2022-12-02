const encriptar = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');

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
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
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

    users: (req, res) => {
        db.usuario.findAll().then((usuarios) => {

            res.render('./users/users', { users: usuarios });
        });
    },

    check: (req, res) => {

        /* db.equipo.findAll().then((rsv) => {
          res.json(rsv)              
        }); */

        db.usuario_equipo.findAll({ include: [{ association: 'usuario' }, { association: 'equipo' }] }).then((resultados) => {

            /* let listaResultados = [];

            for (rdo of resultados) {

                let listaRestriccion = [];

                for (rcion of rdo.restriccion) {

                    listaRestriccion.push(rcion);
                    console.log(listaRestriccion);
                }

                let objAux = {
                    equipo: rdo.nombre_equipo,
                    restriccion: listaRestriccion
                }

                listaResultados.push(objAux);
            }

            console.log(listaResultados); */
            res.send(resultados);
        });
        /* db.restriccion.findAll({ include: [{ association: 'tipo_restriccion' }] }).then((resultados) => {

            console.log(resultados);
            let listaResultados = [];

            for (rdo of resultados) {
                console.log(rdo);
                let listaTipoRestricciones = [];

                for (restricc of rdo.tipo_restriccion) {
                    console.log(restricc);
                    listaTipoRestricciones.push(restricc.descripcion);
                }

                console.log(listaTipoRestricciones);
                let objAux = {
                    restriccion: rdo.nombre,
                    tipo_restriccion: listaTipoRestricciones
                }

                listaResultados.push(objAux);
            }

            
            res.json(listaResultados);
        }); */

    },

    check2: (req, res) => {
        db.usuario.findOne({ where: { email: '555@gmail.com' } }).then((resultado) => {
            console.log(resultado);
            res.send(resultado);
        });
    },

    update: (req, res) => {
        res.send('VISTA EN MANTENIMIENTO. PRÓXIMAMENTE FUNCIONANDO. ESTAMOS TRABAJANDO ARDUAMENTE EN ELLO.');
        

        /*
        PRUEBA PARA EDITAR USUARIO
        db.usuario.update(
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                genero: req.body.genero,
                email: req.body.email
            },
            {
                where: {
                    id: req.session.userLogged.id
                }
            }
        );

        res.redirect('/users/usuario'); */

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