const { body } = require('express-validator');

const validacionLogin = [
    body('email')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.').bail()
        .isEmail().withMessage('Escribir un e-mail válido'),
    body('password')
        .notEmpty().withMessage('Éste campo no puede quedar vacío.')
];

module.exports = validacionLogin;