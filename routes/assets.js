const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

router.get("/", assetController.fetch_all_assets);

router.post("/create", assetController.create_asset);

router.get("/fetch-asset", assetController.fetch_asset);

module.exports = router;
