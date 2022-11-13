const express = require('express');
const router = express.Router();
const path = require('path');


// Controller
const usersController = require('../controllers/usersController');


// Middlewares
const upload = require('../middlewares/multerUsuario');
const validacionCrearUsuario = require('../middlewares/validacionCrearUsuario');
const validacionLogin = require('../middlewares/validacionLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// REGISTRO Usuario
router.get ('/registro', guestMiddleware, usersController.registro);
router.post ('/registro', upload.single('fotoPerfil'), validacionCrearUsuario, usersController.crear);

// LOGIN Usuario
router.get ('/login', guestMiddleware, usersController.login);
router.post ('/login', validacionLogin, usersController.loginProcess);

// DETALLE Usuario
router.get('/usuario', authMiddleware, usersController.perfilUsuario);

// EDITAR Usuario
router.get('/editar-users/:id', usersController.edit);
router.put('/editar-users/:id', usersController.update);

// --- EN VEREMOS ESTA VISTA ---
// router.get('/users',usersController.users);

module.exports = router;