const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get ('/login', usersController.login);
router.get ('/registro',usersController.registro);
router.post ('/registro',usersController.crear);

router.get('/users',usersController.users);
router.get('/users/edit-user',usersController.edit);
//router.put('/users/edit-user/:dni',usersController.update);

module.exports = router;