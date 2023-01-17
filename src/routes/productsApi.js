const express = require('express');
const router = express.Router();

const productsControllerApi = require('../controllers/productsControllerApi');



router.get('/', productsControllerApi.lista);
router.get('/:id', productsControllerApi.one);







module.exports = router;