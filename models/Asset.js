const { mongoose, Schema } = require("../database/central_mongoose");

const assetSchema = new Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const collectionName = "assets";
module.exports = Asset = mongoose.model(collectionName, assetSchema);
