const router = require("express").Router();
const passport = require("../config/passport");
const categoryController = require("../controllers/category.controller");
const role = require("../utils/role");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const request = require("../requests/category.request");

router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.getCategory);
router.post(
  "/categories",
  validationMiddleware(request),
  passport.authenticate("jwt"),
  roleMiddleware([role.ADMIN]),
  categoryController.postCategory
);
router.patch(
  "/categories/:id",
  validationMiddleware(request),
  passport.authenticate("jwt"),
  roleMiddleware([role.ADMIN]),
  categoryController.patchCategory
);
router.delete(
  "/categories/:id",
  passport.authenticate("jwt"),
  roleMiddleware([role.ADMIN]),
  categoryController.deleteCategory
);

module.exports = router;
