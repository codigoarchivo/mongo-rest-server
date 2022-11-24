const { Router } = require("express");

const { check } = require("express-validator");

const { validateFiels } = require("../middlewares/validate-fields");

const { login, googleSingIn } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFiels,
  ],
  login
);
router.post(
  "/google",
  [check("id_token", "Token is required").not().isEmpty(), validateFiels],
  googleSingIn
);

module.exports = router;
