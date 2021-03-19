const express = require("express");
const router = express.Router();
const scanJobController = require("../controllers/scanJobController");

// get all scan jobs for a single asset
router.get("/", scanJobController.fetch_scan_jobs_for_asset);

// create a scan job that will run at given date
router.post("/create", scanJobController.create_scan_job);

module.exports = router;
