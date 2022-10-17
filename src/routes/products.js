const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get ('/canchas', productsController.canchas);
router.get ('/equipos', productsController.equipos);
router.get ('/carrito', productsController.carrito);
router.get ('/carrito2', productsController.carrito2);
router.get ('/crear-equipo', productsController.create);
router.post ('/crear-equipo', productsController.crear);
router.get ('/editar-equipo', productsController.edit);

module.exports = router;