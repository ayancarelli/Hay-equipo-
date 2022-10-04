const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get ('/login', usersController.login);
router.get ('/registro',usersController.registro);

module.exports = router;