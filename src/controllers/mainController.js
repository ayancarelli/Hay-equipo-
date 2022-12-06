const db = require('../database/models');

const controlador = {
    index: (req, res) => {
        db.equipo.findAll().then((equipos) => {
            res.render('index', { ps: equipos });
        });
    }
}

module.exports = controlador;
