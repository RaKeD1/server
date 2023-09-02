const Router = require("express");
const router = new Router();
const AccountController = require("../controllers/accountController");
const accountController = require("../controllers/accountController");

router.post("/registration", accountController.registration);
router.post("/login", accountController.login);
router.get("/auth", accountController.check);

module.exports = router;
