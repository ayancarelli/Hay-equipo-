const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get ('/login', usersController.login);
router.post ('/login', usersController.checkUser);
router.get ('/registro',usersController.registro);
router.post ('/registro',usersController.crear);

// --- EN VEREMOS ESTA VISTA ---
// router.get('/users',usersController.users);

// --- EDITAR USUARIO ---
router.get('/editar-users/:id',usersController.edit);
router.put('/editar-users/:id',usersController.update);

module.exports = router;