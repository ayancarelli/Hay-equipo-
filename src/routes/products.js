const express = require('express');
const router = express.Router();
const path = require('path');



// Controller
const productsController = require('../controllers/productsController');


// Middlewares
const upload = require('../middlewares/multerEquipo');
const validacionCrearEquipo = require('../middlewares/validacionCrearEquipo');
const validacionEditarEquipo = require('../middlewares/validacionEditarEquipo');
const authMiddleware = require('../middlewares/authMiddleware');


// CREAR Equipo
router.get ('/crear-equipo', authMiddleware, productsController.create);
router.post ('/crear-equipo', upload.single("imgEquipo"), validacionCrearEquipo, productsController.crear);

// DETALLE Equipo
router.get ('/equipo/:id', productsController.equipo);

// EDITAR Equipo
router.get ('/editar-equipo/:id', authMiddleware, productsController.edit);
router.put('/editar-equipo/:id', upload.single("fotoEquipo"), validacionEditarEquipo, productsController.update);

// BORRAR Equipo
router.put('/delete/:id', authMiddleware, productsController.destroy);

//RESERVA
router.get ('/carrito2/:id', authMiddleware, productsController.carrito2);
router.post ('/carrito2/:id', authMiddleware, productsController.desafio);


//CONFIRMACION
router.get ('/confirmacion', productsController.confirmation);

// VISTAS A DEFINIR !!!
router.get ('/canchas', productsController.canchas);
router.get ('/equipos', productsController.equipos);
router.get ('/carrito', productsController.carrito);

// MUESTRA MIS EQUIPOS
router.get ('/mis-equipos', authMiddleware, productsController.misEquipos);
  
module.exports = router;