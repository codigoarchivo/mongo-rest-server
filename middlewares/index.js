const validateFiels = require("../middlewares/validate-fields");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validateFiels,
  ...validarJWT,
  ...validaRoles,
  ...validarArchivo,
};
