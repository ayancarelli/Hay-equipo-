const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const db = require('../database/models');

const equiposFilePath = path.join(__dirname, '../data/equiposDataBase.json');
const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));

const controlador = {
    canchas: (req, res) => {
        res.render('./products/canchas', { moment: moment });
    },

    equipos: (req, res) => {
        db.equipo.findAll().then((equipos) => {
            res.render('./products/equipos', { ps: equipos });
        });
    },

    carrito: (req, res) => {
        res.render('./products/carrito');
    },

    carrito2: (req, res) => {
        res.render('./products/carrito2');
    },

    create: async (req, res) => {
        let restricciones = await db.tipo_restriccion.findAll({ include: [{ association: 'restriccion' }] })

        res.render('products/crear-equipo', { restricciones: restricciones });
    },

    crear: async (req, res) => {
        let restricciones = await db.tipo_restriccion.findAll({ include: [{ association: 'restriccion' }] });
        /* let usersTeams = await db.usuario_equipo.findAll({ include: [{ association: 'usuario' }, 
                                                                     { association: 'equipo' }] });
        let team = await db.equipo.findAll({ include: [{ association: "usuario_equipo"}] }); */
        
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
                    where:{
                        email: req.cookies.userEmail
                    }
                }).then((usuarioLogged)=>{
                    let p = usuarioLogged.id;
                    return p;
                }).then((letra)=>{
                    db.usuario_equipo.bulkCreate([
                        {
                            nombre_jugador: req.body.nombre1,
                            apellido_jugador: req.body.apellido1,
                            equipo_id: a.id,
                            usuario_id: letra,
                        },
                        {
                            nombre_jugador: req.body.nombre2,
                            apellido_jugador: req.body.apellido2,
                            equipo_id: a.id,
                            usuario_id: letra,
                        },
                        {
                            nombre_jugador: req.body.nombre3,
                            apellido_jugador: req.body.apellido3,
                            equipo_id: a.id,
                            usuario_id: letra,
                        },
                        {
                            nombre_jugador: req.body.nombre4,
                            apellido_jugador: req.body.apellido4,
                            equipo_id: a.id,
                            usuario_id: letra,
                        },
                        {
                            nombre_jugador: req.body.nombre5,
                            apellido_jugador: req.body.apellido5,
                            equipo_id: a.id,
                            usuario_id: letra,
                        }
                    ])
                })

                if(req.body.nombre6 && req.body.apellido6){
                    db.usuario_equipo.create({
                        nombre_jugador: req.body.nombre6,
                        apellido_jugador: req.body.apellido6,
                        equipo_id: a.id,
                        usuario_id: 1
                    })
                }
              
                res.redirect('/users/login'); 
            }
        })
    },

    edit: (req, res) => {
        db.equipo.findOne({
            where: {
                id: req.params.id
            }
        }).then((objEquipo) => {
            res.render('./products/editar-equipo', { equipo: objEquipo })
        })
    },

    equipo: async(req, res) => {
        
        let ju = await db.usuario_equipo.findAll(
            {
                where: {
                    Equipo_id: req.params.id
                }
            }
        )

        let restr = await db.equipo.findAll(
            {
                
                where: {
                    id: req.params.id
                },
                include: [{ association: 'restriccion' }]
                
            }
        )

        db.equipo.findOne({
            where: {
                id: req.params.id
            }
        }).then((objEquipo) => {
            console.log(ju);
            res.render('./products/equipo', { equipo: objEquipo, ju: ju, restr: restr })
        })
    },

    update: (req, res) => {

        let idEquipo = req.params.id;

        for (let e of equiposJson) {
            if (idEquipo == e.id) {

                e.nombreEquipo = req.body.nombreEquipo.toUpperCase();
                e.jugador1 = req.body.jugador1.toUpperCase();
                e.jugador2 = req.body.jugador2.toUpperCase();
                e.jugador3 = req.body.jugador3.toUpperCase();
                e.jugador4 = req.body.jugador4.toUpperCase();
                e.jugador5 = req.body.jugador5.toUpperCase();
                e.jugador6 = req.body.jugador6.toUpperCase();
                e.restriccionEdad = req.body.restriccionEdad;
                e.restriccionesSexo = req.body.restriccionesSexo;
                break;

            }
        }
        fs.writeFileSync(equiposFilePath, JSON.stringify(equiposJson, null, " "));

        res.redirect('/products/equipos');
    },

    destroy: (req, res) => {

        let idEquipo = req.params.id;

        let arrEquipos = equiposJson.filter(function (elemento) {
            return elemento.id != idEquipo;
        });

        fs.writeFileSync(
            path.join(__dirname, '../data/equiposDataBase.json'),
            JSON.stringify(arrEquipos, null, " "));

        res.redirect('/');
    },
    misEquipos: async (req,res)=> {
        // PRIMEROS PASOS DE ESTA VISTA
        db.equipo.findAll({
            where:{
                id: 24
            }
        }).then((miEquipo)=>{
            res.render("./products/mis-equipos", {miEquipo})
        })
    }
}

module.exports = controlador;