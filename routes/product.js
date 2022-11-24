const { Router } = require("express");

const { check } = require("express-validator");

const {
  createProduct,
  listProduct,
  listIdProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const {
  existProductById,
  existCategoryById,
} = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares");

const { validarJWT } = require("../middlewares/validar-jwt");

const { validateFiels } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", listProduct);

router.get(
  "/:id",
  [
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existProductById),
    validateFiels,
  ],
  listIdProduct
);

router.post(
  "/",
  [
    validarJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Not valid id").isMongoId(),
    check("category").custom(existCategoryById),
    validateFiels,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existProductById),
    validateFiels,
  ],
  updateProduct
);
// Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Not valid id").isMongoId(),
    check("id").custom(existProductById),
    validateFiels,
  ],
  deleteProduct
);

module.exports = router;
