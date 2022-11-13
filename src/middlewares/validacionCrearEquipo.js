const path = require('path');
const { body } = require('express-validator');

const validacionCrearEquipo = [
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

module.exports = validacionCrearEquipo;