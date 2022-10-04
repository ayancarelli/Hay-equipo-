const controlador = {
    canchas: (req, res) => {
        res.render('./products/canchas');
    },
    equipos: (req,res) => {
        res.render('./products/equipos');
    },
    carrito: (req,res) => {
        res.render('./products/carrito');
    },
    carrito2: (req,res) => {
        res.render('./products/carrito2');
    },
    create: (req,res) => {
        res.render('./products/crear-equipo');
    },
    edit: (req,res) => {
        res.render('./products/editar-equipo');
    },
}

module.exports = controlador;