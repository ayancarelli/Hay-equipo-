const db = require('../database/models');


const controlador = {
    totalCiudad: (req, res) => {
        db.
        ciudad.findAll()
        .then(ciudad => {
            return res.status(200).json({
                total: ciudad.length,
                data: ciudad,
                status: 200
            })
        })

    },
    
    unaCiudad: (req, res) => {
        db.ciudad
        .findByPk(req.params.id)
        .then(ciudad => {
            return res.status(200).json({
                data: ciudad,
                status: 200
            })
        })

    }

    }

module.exports = controlador;