const db = require('../database/models');


const controlador = {
    list: (req, res) => {
        db.usuario_equipo
        .findAll()
        .then(usuario => {
            return res.status(200).json({
                total: usuario.length,
                data: usuario,
                status: 200
            })
        })

    },
    
    show: (req, res) => {
        db.usuario
        .findByPk(req.params.id)
        .then(usuario => {
            return res.status(200).json({
                data: usuario,
                status: 200
            })
        })

    },

    todos: (req, res) => {
        db.usuario
        .findAll()
        .then(usuario => {
            return res.status(200).json({
                total: usuario.length,
                data: usuario,
                status: 200
            })
        })

    }

    }

module.exports = controlador;