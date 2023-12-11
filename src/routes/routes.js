const express = require("express");
const router = express();

router.use("/users", require("./users.router"));
router.use("/brands", require("./brands.router"));
router.use("/items", require("./items.router"));
router.use("/orders", require("./orders.router"));
router.get("/", (req, res) => {
  res.json("welcome");
});

module.exports = router;
