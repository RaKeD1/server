const Router = require("express");
const router = new Router();
const goodsController = require("../controllers/goodsController");

router.post("/", goodsController.create);
router.get("/", goodsController.getAll);
router.get("/:id", goodsController.getOne);

module.exports = router;
