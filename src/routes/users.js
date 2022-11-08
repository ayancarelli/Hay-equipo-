const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,path.join(__dirname,'../public/img/img-users'))
    },
    filename: (req,file,cb) =>{
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null,newFileName);
    }
});

const upload = multer ({storage: storage});

router.get ('/login', usersController.login);
router.post ('/login', usersController.checkUser);
router.get ('/registro',usersController.registro);
router.post ('/registro',upload.single('fotoPerfil') ,usersController.crear);

// --- EN VEREMOS ESTA VISTA ---
// router.get('/users',usersController.users);

// --- EDITAR USUARIO ---
router.get('/editar-users/:id',usersController.edit);
router.put('/editar-users/:id',usersController.update);

module.exports = router;