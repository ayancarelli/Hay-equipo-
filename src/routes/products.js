const express = require('express');
const router = express.Router();
const path = require('path');


// Controller
const productsController = require('../controllers/productsController');


// Middlewares
const upload = require('../middlewares/multerEquipo');
const validacionCrearEquipo = require('../middlewares/validacionCrearEquipo');


// CREAR Equipo
router.get ('/crear-equipo', productsController.create);
router.post ('/crear-equipo', upload.single("imgEquipo"), validacionCrearEquipo, productsController.crear);

// DETALLE Equipo
router.get ('/equipo/:id', productsController.equipo);

// EDITAR Equipo
router.get ('/editar-equipo/:id', productsController.edit);
router.put('/editar-equipo/:id', upload.single("fotoEquipo"), productsController.update);

// BORRAR Equipo
router.delete('/delete/:id', productsController.destroy);

// RUTAS A VER !!!
router.get ('/canchas', productsController.canchas);
router.get ('/equipos', productsController.equipos);
router.get ('/carrito', productsController.carrito);
router.get ('/carrito2', productsController.carrito2);
  
module.exports = router;