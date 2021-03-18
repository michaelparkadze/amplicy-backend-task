const { mongoose, Schema } = require("../database/central_mongoose");

const scanJobScheme = new Schema(
  {
    dueDate: {
      type: String,
      required: true,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Successed", "Failed", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const collectionName = "assets";
module.exports = Asset = mongoose.model(collectionName, scanJobScheme);
