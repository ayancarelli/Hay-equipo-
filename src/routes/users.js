const express = require('express');
const router = express.Router();
const path = require('path');

// Controller
const usersController = require('../controllers/usersController');


// Middlewares
const upload = require('../middlewares/multerUsuario');
const validacionCrearUsuario = require('../middlewares/validacionCrearUsuario');


// REGISTRO Usuario
router.get ('/registro', usersController.registro);
router.post ('/registro', upload.single('fotoPerfil'), validacionCrearUsuario, usersController.crear);

// LOGIN Usuario
router.get ('/login', usersController.login);
router.post ('/login', usersController.checkUser);

// EDITAR Usuario
router.get('/editar-users/:id',usersController.edit);
router.put('/editar-users/:id',usersController.update);

// --- EN VEREMOS ESTA VISTA ---
// router.get('/users',usersController.users);

module.exports = router;