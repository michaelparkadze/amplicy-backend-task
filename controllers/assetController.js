const {
  createAsset,
  fetchAsset,
  fetchAllAssets,
} = require("../services/assetService");

exports.create_asset = async (req, res, next) => {
  const { ip, name, description } = req.body;

  createAsset({ ip, name, description })
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, asset } = result;
      res.status(statusCode).send({ message, asset });
    })
    .catch((error) => {
      console.error(error);
      const { statusCode = 400, message } = error;
      res.status(statusCode).send({ message }) && next(error);
    });
};

exports.fetch_asset = async (req, res, next) => {
  const { assetId } = req.body;

  fetchAsset(assetId)
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, asset } = result;
      res.status(statusCode).send({ message, asset });
    })
    .catch((error) => {
      console.error(error);
      const { statusCode = 400, message } = error;
      res.status(statusCode).send({ message }) && next(error);
    });
};

exports.fetch_all_assets = async (req, res, next) => {
  fetchAllAssets()
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, assets } = result;
      res.status(statusCode).send({ message, assets });
    })
    .catch((error) => {
      console.error(error);
      const { statusCode = 400, message } = error;
      res.status(statusCode).send({ message }) && next(error);
    });
};
