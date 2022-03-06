const {
  Router
} = require("express");
const {
  check
} = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  isAvaliableRole, isEmailUsed
} = require("../helpers/dbValidators");
const {
  validateFields
} = require("../middlewares/validatorFields");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is not available").isEmail(),
    check("email").custom(isEmailUsed),
    check(
      "password",
      "Password cannot be empty and cannot be less than 6 characters"
    )
      .notEmpty()
      .isLength({
        min: 6,
      }),
    check("role").custom(isAvaliableRole),
    validateFields,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;