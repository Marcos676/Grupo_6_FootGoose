const { check, body } = require('express-validator');

module.exports = [
    check('animal').notEmpty(),
    check('category').notEmpty(),
    check('subCategory').notEmpty(),

    check('name').notEmpty(),
    check('name')
        .isLength({
            min: 5
        }).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('description').notEmpty(),
    check('description')
        .isLength({
            min: 20
        }).withMessage('La descripción debe tener al menos 20 caracteres'),

        check('cuantity').notEmpty(),
        check('price').notEmpty()
]