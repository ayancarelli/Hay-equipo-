const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get ('/login', usersController.login);
router.get ('/registro',usersController.registro);
router.post ('/registro',usersController.crear);

module.exports = router;