const express = require("express");
const router = express.Router();

const assetsRoute = require("./assets");

router.use("/api/v1/assets", assetsRoute);

module.exports = router;
