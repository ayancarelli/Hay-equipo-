const db = require('../database/models');


const controlador = {
    totalComplejo: (req, res) => {
        db.
        complejo.findAll()
        .then(complejo => {
            return res.status(200).json({
                total: complejo.length,
                data: complejo,
                status: 200
            })
        })

    },
    
    unaComplejo: (req, res) => {
        db.complejo
        .findByPk(req.params.id)
        .then(complejo => {
            return res.status(200).json({
                data: complejo,
                status: 200
            })
        })

    }

    }

module.exports = controlador;