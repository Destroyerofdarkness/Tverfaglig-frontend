const router = require("express").Router();
const controller = require("../controller/auth_controller.js");
const {authorize} = require("../middleware/jwtAuth.js");
const { route } = require("./default_router.js");

router.get("/sign-in",controller.render_login);

router.get("/cookie/:userId", controller.createCookie);

router.get("/sign-up",controller.render_register);

router.get("/sign-out",controller.sign_out_user);

module.exports = router