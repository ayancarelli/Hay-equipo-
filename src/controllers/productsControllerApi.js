const db = require('../database/models');


const controlador = {
    lista: (req, res) => {
        db.equipo
        .findAll({            
            include: [{ association: 'restriccion' }, { association: 'usuario_equipo' }]
        })
        .then(equipo => {
            return res.status(200).json({
                total: equipo.length,
                data: equipo,
                status: 200
            })
        })

    },
    
    one: (req, res) => {
        db.equipo
        .findByPk(req.params.id)
        .then(equipo => {
            return res.status(200).json({
                data: equipo,
                status: 200
            })
        })

    }

    }

module.exports = controlador;