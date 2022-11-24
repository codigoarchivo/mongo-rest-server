const { Router } = require("express");

const { buscar } = require("../controllers/serch");

const { validarJWT } = require("../middlewares");

const router = Router();

router.get("/:collection/:term", [validarJWT], buscar);

module.exports = router;
