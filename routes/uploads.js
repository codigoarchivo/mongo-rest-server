const { Router } = require("express");
const { check } = require("express-validator");
const {
  changeFile,
  // updateFile,
  listImg,
  updateFileCloudinary,
} = require("../controllers/uploads");

const { validateFiels, validarArchivo } = require("../middlewares");
const { collectionPermt } = require("../helpers");

const router = Router();

router.post("/", validarArchivo, changeFile);

router.put(
  "/:collection/:id",
  [
    validarArchivo,
    check("id", "Not valid id").isMongoId(),
    check("collection", "Not valid id").custom((c) =>
      collectionPermt(c, ["user", "product"])
    ),
    validateFiels,
  ],
  updateFileCloudinary
  // updateFile
);
router.get(
  "/:collection/:id",
  check("id", "Not valid id").isMongoId(),
  check("collection", "Not valid id").custom((c) =>
    collectionPermt(c, ["user", "product"])
  ),
  validateFiels,
  listImg
);

module.exports = router;
