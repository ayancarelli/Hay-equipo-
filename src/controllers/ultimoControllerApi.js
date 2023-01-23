const db = require('../database/models');


const controlador = {
    last: (req, res) => {
        db.usuario.findOne(
            {
                order: [['id', 'DESC']]
            }
        )
            .then(usuario => {
                return res.status(200).json({
                    total: usuario.length,
                    data: usuario,
                    status: 200
                })
            })

    },

    logged: (req, res) => {
        db.usuario
        .findByPk(req.session.id)
        .then(usuario => {
            return res.status(200).json({
                data: usuario,
                status: 200
            })
        })

    }
}

module.exports = controlador;