const express = require('express');
const router = express.Router();


// Controller
const mainController = require('../controllers/mainController');


// Inicio
router.get ('/', mainController.index);


module.exports = router;