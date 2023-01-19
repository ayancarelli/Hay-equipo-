const db = require('../database/models');


const controlador = {
    res: (req, res) => {
        db.reserva
        .findAll()
        .then(reserva => {
            return res.status(200).json({
                total: reserva.length,
                data: reserva,
                status: 200
            })
        })

    },
    
    resUnica: (req, res) => {
        db.reserva
        .findByPk(req.params.id)
        .then(reserva => {
            return res.status(200).json({
                data: reserva,
                status: 200
            })
        })

    }
    }

module.exports = controlador;