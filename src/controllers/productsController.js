const { validationResult } = require('express-validator');
const moment = require('moment');
const { where } = require('sequelize');

const db = require('../database/models');
/* const { getMaxListeners } = require('process'); */

const controlador = {
    equipos: async (req, res) => {
        //ESTO DE ABAJO SI FUNCIONA, SOLO FALTA SABER LOGICA PARA MOSTRAR RESTRICCIONES POR EQUIPO
        /* let restr = await db.equipo_restriccion.findAll();

        for(let i = 0; i<restr.length; i++){
            console.log("----------------------------------------");
            console.log(restr[i].dataValues);
        } */

        db.equipo.findAll().then((equipos) => {
            res.render('./products/equipos', { ps: equipos });
        });
    },

    create: async (req, res) => {
        let restricciones = await db.tipo_restriccion.findAll({ include: [{ association: 'restriccion' }] })

        let us = await db.usuario.findOne({
            where: {
                id: req.session.userLogged.id
            }
        })

        res.render('products/crear-equipo', { restricciones: restricciones, us});
    },

    crear: async (req, res) => {
        let restricciones = await db.tipo_restriccion.findAll({ include: [{ association: 'restriccion' }] });

        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./products/crear-equipo', {
                restricciones: restricciones,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        await db.equipo.findOne({
            where: {
                nombre_equipo: req.body.nombreEquipo
            }
        }).then(async (teamToCreate) => {
            console.log(teamToCreate);
            if (teamToCreate != null) {
                console.log("Se encontró un equipo del mismo nombre");
                return res.render('./products/crear-equipo', {
                    restricciones: restricciones,
                    errors: {
                        nombreEquipo: {
                            msg: 'Éste nombre de equipo ya se encuentra registrado.'
                        }
                    },
                    oldData: req.body
                });
            } else {

                let a = await db.equipo.create(
                    {
                        nombre_equipo: req.body.nombreEquipo,
                        img_equipo: req.file.filename
                    }
                )

                await db.usuario.findOne({
                    where: {
                        email: req.cookies.userEmail
                    }
                }).then((usuarioLogged) => {
                    let p = usuarioLogged.id;
                    return p;
                }).then((letra) => {
                    db.usuario_equipo.bulkCreate([
                        {
                            nombre_jugador: req.body.nombre1,
                            equipo_id: a.id,
                            usuario_id: letra
                        },
                        {
                            nombre_jugador: req.body.nombre2,
                            equipo_id: a.id,
                            usuario_id: null
                        },
                        {
                            nombre_jugador: req.body.nombre3,
                            equipo_id: a.id,
                            usuario_id: null
                        },
                        {
                            nombre_jugador: req.body.nombre4,
                            equipo_id: a.id,
                            usuario_id: null
                        },
                        {
                            nombre_jugador: req.body.nombre5,
                            equipo_id: a.id,
                            usuario_id: null
                        }
                    ])
                    db.equipo_restriccion.bulkCreate([
                        {
                            equipo_id: a.id,
                            restriccion_id: req.body.restriccion1
                        },
                        {
                            equipo_id: a.id,
                            restriccion_id: req.body.restriccion2
                        }
                    ])
                })


                res.redirect('/');
            }
        })
    },

    equipo: (req, res) => {
        db.equipo.findOne({
            where: {
                id: req.params.id
            },
            include: [{ association: 'restriccion' }, { association: 'usuario_equipo' }]
        }).then((objEquipo) => {
            res.render('products/equipo', { equipo: objEquipo });
        })
    },

    misEquipos: async (req, res) => {
        console.log(req.session.userLogged)
        db.usuario_equipo.findAll({
            where: {
                usuario_id: req.session.userLogged.id
            },
            include: [{ association: 'equipo' }]
        }).then((objEquipo) => {
            res.render('products/mis-equipos', { e: objEquipo });
        })
    },

    edit: async (req, res) => {

        let jugs = await db.usuario_equipo.findAll({
            where: {
                Equipo_id: req.params.id
            }
        })

        db.equipo.findOne({
            where: {
                id: req.params.id
            }
        }).then((objEquipo) => {
            res.render('./products/editar-equipo', { equipo: objEquipo, jugs })
        })
    },

    update: async (req, res) => {

        let restricciones = await db.tipo_restriccion.findAll({ include: [{ association: 'restriccion' }] });
        const rdosValidaciones = validationResult(req);

        if (rdosValidaciones.errors.length > 0) {
            return res.render('./products/editar-equipo', {
                restricciones: restricciones,
                errors: rdosValidaciones.mapped(),
                oldData: req.body
            });
        }

        let idEquipo = await req.params.id;

        db.equipo.update(
            {
                nombre_equipo: req.body.nombreEquipo
            },
            {
                where: {
                    id: idEquipo
                }
            }
        );

        
        let creador = await db.usuario_equipo.findOne({
            where:{
                Equipo_id: idEquipo
            }
        })

        db.usuario_equipo.update(
            {
                nombre_jugador: req.body.jugador2
            },
            {
                where: {
                            id: (creador.id +1)
                        }
            }
        );
        db.usuario_equipo.update(
            {
                nombre_jugador: req.body.jugador3
            },
            {
                where: {
                            id: (creador.id +2)
                        }
            }
        );
        db.usuario_equipo.update(
            {
                nombre_jugador: req.body.jugador4
            },
            {
                where: {
                            id: (creador.id +3)
                        }
            }
        );
        db.usuario_equipo.update(
            {
                nombre_jugador: req.body.jugador5
            },
            {
                where: {
                            id: (creador.id +4)
                        }
            }
        );

        /* let restri = await db.equipo_restriccion.findOne({
            where:{
                equipo_id: idEquipo
            }
        })

        console.log("--------------------------------------------");
        console.log(restri.id);
        console.log("--------------------------------------------");
        db.equipo_restriccion.update(
            {
                restriccion_id: req.body.restriccionesSexo
            },
            {
                where: {
                            equipo_id: idEquipo
                        }
            }
        ) */

        res.redirect('/products/mis-equipos');

        

    },

    destroy: async (req, res) => {

        db.usuario_equipo.destroy({
            where: {
                Equipo_id: req.params.id
            }
        }).then(() => {
            db.equipo_restriccion.destroy({
                where: {
                    equipo_id: req.params.id
                }
            })
        }).then(() => {
            db.equipo.destroy({
                where: {
                    id: req.params.id
                }
            })
        }).then(() => {
            res.redirect('/products/equipos');
        })

    },

    carrito: (req, res) => {
        res.render('./products/carrito');
    },

    carrito2: async (req, res) => {
        db.equipo.findOne({
            where:{
                id: req.params.id
            }
        }).then(async (equi)=>{
            
            db.usuario_equipo.findAll({
                where: {
                    usuario_id: req.session.userLogged.id
                },
                include: [{ association: 'equipo' }]
            }).then((objEquipo) => {
                res.render('./products/carrito2', {equi, moment, e: objEquipo});
            })


        })
    },
    confirmation: (req,res)=>{
        res.render("./products/confirmacion")
    }
    ,
    canchas: (req, res) => {
        res.render('./products/canchas', { moment: moment });
    }
}

module.exports = controlador;