const express = require('express');
const router = express.Router();

const reservaControllerApi = require('../controllers/reservaControllerApi');



router.get('/', reservaControllerApi.res);
router.get('/:id', reservaControllerApi.resUnica);







module.exports = router;