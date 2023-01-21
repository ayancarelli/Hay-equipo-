const express = require('express');
const router = express.Router();

const ciudadControllerApi = require('../controllers/ciudadControllerApi');



router.get('/', ciudadControllerApi.totalCiudad);
router.get('/:id', ciudadControllerApi.unaCiudad);







module.exports = router;