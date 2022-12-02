const path = require('path');
const { body } = require('express-validator');

const validacionCrearUsuario = [
    body('nombre')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4 }).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 4 }).withMessage('Éste campo debe tener al menos 4 caracteres'),
    body('dni')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isInt({ min: 10000000, max: 50000000 }).withMessage('Ingresar DNI válido'),
    body('genero').notEmpty().withMessage('Éste campo no puede quedar vacío.'),
    body('email')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isEmail().withMessage('Escribir un e-mail válido'),
    body('password')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isLength({ min: 6, max: 12 }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    body('fotoPerfil').custom((value, { req }) => {
        let file = req.file;
        let extensionesValidas = ['.jpg', '.jpeg', '.png'];

        if (!file) {
            throw new Error('Debes subir una imagen.');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensionesValidas.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son: ${extensionesValidas.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validacionCrearUsuario;