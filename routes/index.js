const express = require("express");
const router = express.Router();

const assetsRoute = require("./assets");
const scanJobsRoute = require("./scanJobs");

router.use("/api/v1/assets", assetsRoute);
router.use("/api/v1/scan-jobs", scanJobsRoute);

module.exports = router;
