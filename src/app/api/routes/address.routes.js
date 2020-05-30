const router = require("express").Router();
const passport = require("../config/passport");
const addressController = require("../controllers/address.controller");
const addressMiddleware = require("../middlewares/address.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const request = require("../requests/address.request");

router.get(
  "/addresses",
  passport.authenticate("jwt"),
  addressController.getAddresses
);
router.get(
  "/addresses/:id",
  passport.authenticate("jwt"),
  addressMiddleware,
  addressController.getAddress
);
router.post(
  "/addresses",
  validationMiddleware(request),
  passport.authenticate("jwt"),
  addressController.postAddress
);
router.put(
  "/addresses/:id",
  validationMiddleware(request),
  passport.authenticate("jwt"),
  addressMiddleware,
  addressController.putAddress
);
router.delete(
  "/addresses/:id",
  passport.authenticate("jwt"),
  addressMiddleware,
  addressController.deleteAddress
);

module.exports = router;
