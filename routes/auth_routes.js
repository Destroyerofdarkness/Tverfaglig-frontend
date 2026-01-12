const router = require("express").Router();
const controller = require("../controller/auth_controller.js");

router.get("/sign-in",controller.render_login)

router.get("/sign-up",controller.render_register)

module.exports = router