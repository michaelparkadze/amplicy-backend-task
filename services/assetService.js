const { assetCreationValidation } = require("../middleware/validation");
const Asset = require("../models/Asset");

exports.createAsset = async (params) => {
  const { error } = assetCreationValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  let asset = await Asset.findOne(params);
  if (asset)
    throw {
      message: "Asset already exists, please try different information",
      statusCode: 400,
    };

  asset = new Asset(params);

  return await asset
    .save()
    .then(() => {
      console.log(asset);
      return {
        message: "Asset was successfully created",
        asset,
        statusCode: 201,
      };
    })
    .catch((error) => {
      console.error(error);
      throw {
        message:
          "There was an issue with creating the asset, please try again.",
        statusCode: 500,
      };
    });
};

exports.fetchAsset = async (assetId) => {
  if (!assetId) throw { message: "assetId is required", statusCode: 400 };

  let asset = await Asset.findOne({ _id: assetId });
  if (!asset) {
    throw {
      message: "Asset was not found, please check the provided input",
      statusCode: 400,
    };
  }

  return {
    message: "Asset was successfully fetched",
    asset,
    statusCode: 201,
  };
};

exports.fetchAllAssets = async () => {
  let assets = await Asset.find({});
  if (!assets) {
    throw {
      message: "No assets were created, please create one and try again",
      statusCode: 400,
    };
  }

  return {
    message: "Assets were successfully fetched",
    assets,
    statusCode: 201,
  };
};
