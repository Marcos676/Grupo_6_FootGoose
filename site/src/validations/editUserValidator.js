const { check, body } = require("express-validator");

module.exports = [
  check("name").notEmpty().withMessage("Se requiere su nombre"),

  check("email").notEmpty().withMessage("Se requiere un email"),
  check("email").isEmail().withMessage("El email no es válido"),

  /* pass1 */
  body("pass1")
    .custom((value, { req }) => {
      if (req.body.password.length === 0 && value.length === 0) {
        return true;
      } else {
        if (req.body.password.length > 0 && value.length > 0) {
          return true;
        }
        return false;
      }
    })
    .withMessage("Complete los campos de contraseña"),

  body("pass1")
    .custom((value, { req }) => {
      if (
        (value.length >= 6 && value.length <= 32) ||
        (req.body.password.length === 0 && value.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("La contraseña debe tener entre 6 y 36 caracteres"),

  body("pass2")
    .custom((value, { req }) => {
      if (value !== req.body.pass1) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Las contraseñas no coinciden!!"),
];
