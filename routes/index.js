const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const goodsRouter = require("./goodsRouter");
const accountRouter = require("./accountRouter");
const cartRouter = require("./cartRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/cart", cartRouter);
router.use("/brand", brandRouter);
router.use("/goods", goodsRouter);
router.use("/type", typeRouter);

module.exports = router;
