const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: (req, file,cb) =>{
        cb(null,path.join(__dirname,'../../public/img/img-equipos'));
    },
    filename: (req,file,cb) =>{
        
        console.log(file);
        const newFileName = 'img-equipo-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer ({storage: storage});


router.get ('/canchas', productsController.canchas);
router.get ('/equipos', productsController.equipos);
router.get ('/carrito', productsController.carrito);
router.get ('/carrito2', productsController.carrito2);

router.get ('/equipo/:id', productsController.equipo);

/*** Para Crear Equipos ***/
router.get ('/crear-equipo', productsController.create);
router.post ('/crear-equipo', upload.single("imgEquipo"), productsController.crear);

/*** Para Editar Equipos ***/
router.get ('/editar-equipo/:id', productsController.edit);
router.put('/editar-equipo/:id', productsController.update);

/*** Para Borrar Equipos ***/
router.delete('/delete/:id', productsController.destroy); 
  

module.exports = router;