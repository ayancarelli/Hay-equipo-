const express = require('express');
const router = express.Router();

const ultimoControllerApi = require('../controllers/ultimoControllerApi');



router.get('/', ultimoControllerApi.last);







module.exports = router;