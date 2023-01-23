const db = require('../database/models');


const controlador = {
    logged: (req, res) => {
        db.usuario
            .findOne({ where: { id: req.session.userLogged.id } })
            .then(usuario => {
                return res.status(200).json({
                    data: usuario,
                    status: 200
                })
            })

    }
}

module.exports = controlador;