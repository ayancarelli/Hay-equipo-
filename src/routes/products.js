const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const productsController = require('../controllers/productsController');

const validaciones = [
    body('nombreEquipo')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('jugador1')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('jugador2')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('jugador3')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('jugador4')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('jugador5')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4}).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('restriccionEdad').notEmpty().withMessage('Éste campo no puede quedar vacío.'),
    body('restriccionesSexo').notEmpty().withMessage('Éste campo no puede quedar vacío.'),
    body('imgEquipo').custom((value, { req }) => {
        let file = req.file;
        let extensionesValidas = ['.jpg', '.jpeg' , '.png'];

        if(!file) {
            throw new Error('Debes subir una imagen.'); 
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!extensionesValidas.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son: ${extensionesValidas.join(', ')}`);
            }
        }
        return true;
    })
];

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
router.post ('/crear-equipo', upload.single("imgEquipo"), validaciones, productsController.crear);

/*** Para Editar Equipos ***/
router.get ('/editar-equipo/:id', productsController.edit);
router.put('/editar-equipo/:id', upload.single("fotoEquipo"), productsController.update);

/*** Para Borrar Equipos ***/
router.delete('/delete/:id', productsController.destroy); 
  

module.exports = router;