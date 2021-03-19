const { mongoose, Schema } = require("../database/central_mongoose");

const scanJobScheme = new Schema(
  {
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "assets",
      required: true,
    },
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

const collectionName = "scanJobs";
module.exports = ScanJob = mongoose.model(collectionName, scanJobScheme);
