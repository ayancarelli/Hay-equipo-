const path = require('path');
const { body } = require('express-validator');

const validacionEditarEquipo = [
    body('nombreEquipo')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
    body('nombre1')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
    body('nombre2')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
    body('nombre3')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
    body('nombre4')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
    body('nombre5')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 3}).withMessage('Éste campo debe tener al menos 3 caracteres'),
        
    /* body('imgEquipo').custom((value, { req }) => {
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
    }) */
];

module.exports = validacionEditarEquipo;