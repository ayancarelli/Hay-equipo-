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
        /* let usersTeams = await db.usuario_equipo.findAll({ include: [{ association: 'usuario' }, { association: 'equipo' }] });  */       
        
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
        }).then((teamToCreate) => {

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
                /* db.usuario_equipo.create({
                    nombre: req.body.nombre.toUpperCase(),
                    apellido: req.body.apellido.toUpperCase(),
                    dni: req.body.dni,
                    genero: req.body.genero,
                    email: req.body.email,
                    foto_perfil: req.file.filename,
                    password: encriptar.hashSync(req.body.password, 10)
                }) */
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

    equipo: (req, res) => {
        db.equipo.findOne({
            where: {
                id: req.params.id
            }
        }).then((objEquipo) => {
            res.render('./products/equipo', { equipo: objEquipo })
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
    }
}

module.exports = controlador;