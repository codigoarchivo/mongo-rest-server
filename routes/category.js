const { Router } = require("express");

const { check } = require("express-validator");

const {
  createCategory,
  listCategory,
  listIdCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { existCategoryById } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares");

const { validarJWT } = require("../middlewares/validar-jwt");

const { validateFiels } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", listCategory);

router.get(
  "/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existCategoryById),
    validateFiels,
  ],
  listIdCategory
);

router.post(
  "/",
  [
    validarJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFiels,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validarJWT,
    check("name", "Name is required").not().isEmpty(),
    check("id").custom(existCategoryById),
    validateFiels,
  ],
  updateCategory
);
// Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Not valid id").isMongoId(),
    validateFiels,
    check("id").custom(existCategoryById),
  ],
  deleteCategory
);

module.exports = router;
