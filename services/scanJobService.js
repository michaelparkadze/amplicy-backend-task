const { scanJobCreationValidation } = require("../middleware/validation");
const { dateInPast, getDateDifferenceInMs } = require("../middleware/time");
const ScanJob = require("../models/ScanJob");
const Asset = require("../models/Asset");
const Queue = require("bull");

const scanJobQueue = new Queue("scanJob", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

scanJobQueue.process(async (job) => {
  return await updateScanJob(job.data);
});

scanJobQueue.on("completed", (job, result) => {
  console.log("scan job completed");
  console.log(job.data);
  console.log(result);
});

scanJobQueue.on("error", (error) => {
  console.log(error);
});

scanJobQueue.on("failed", (job, err) => {
  console.log(err);
});

// Create a scan job and schedule it to execute based
// on user input named 'dueDate'
const createScanJob = async (params) => {
  const { error } = scanJobCreationValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { dueDate, assetId } = params;
  let currentDate = new Date();
  let dueDateAsDate = new Date(dueDate);

  // Firstly, check if the dueDate is valid
  if (dateInPast(dueDateAsDate, currentDate)) {
    throw {
      message:
        "dueDate has passed and cannot be used to schedule a future scan, try a different date",
      statusCode: 400,
    };
  }

  // Secondly, check if the asset even exists
  if (!(await Asset.findOne({ _id: assetId }))) {
    throw {
      message: `Asset was not found for provided asset id: ${assetId}`,
      statusCode: 400,
    };
  }

  // Lastly, check if a scanJob for the same asset at the same
  // time doesn't exist
  let scanJob = await ScanJob.findOne(params);
  if (scanJob)
    throw { message: "Scan job already exists at this time.", statusCode: 400 };

  // Once all validations are complete, we can save the
  // scanJob in the database and add it to the task queue
  scanJob = new ScanJob(params);
  return await scanJob
    .save()
    .then(() => {
      const data = {
        dueDate,
        assetId,
      };

      const options = {
        delay: getDateDifferenceInMs(dueDateAsDate, currentDate), // difference in ms
      };

      // 2. Adding a Job to the Queue
      return scanJobQueue
        .add(data, options)
        .then(() => {
          return {
            message: "Scan job was successfully created",
            scanJob,
            statusCode: 201,
          };
        })
        .catch(() => {
          console.error(
            "There was an issue with adding the scan job to the queue"
          );
          throw {
            message: "There was an issue with adding the scan job to the queue",
            statusCode: 500,
          };
        });
    })
    .catch((error) => {
      console.error(error);
      throw {
        message:
          "There was an issue with creating the scan job, please try again.",
        statusCode: 500,
      };
    });
};

const updateScanJob = async (params) => {
  const { dueDate, assetId } = params;

  let scanJob = await ScanJob.findOne({ assetId, dueDate });
  if (!scanJob)
    throw {
      message: `scanJob was not found`,
      statusCode: 400,
    };

  scanJob.completedDate = new Date();
  scanJob.status = "Successed";

  return await scanJob
    .save()
    .then(() => {
      return {
        message: "Scan job was successfully completed",
        scanJob,
        statusCode: 200,
      };
    })
    .catch((err) => {
      console.log(err);
      throw {
        message: `An error as occured`,
        statusCode: 400,
      };
    });
};

const fetchScanJobsForAsset = async (assetId) => {
  if (!assetId)
    throw {
      message: `assetId is required`,
      statusCode: 400,
    };

  if (!assetId.match(/^[0-9a-fA-F]{24}$/)) {
    throw {
      message: `assetId is not a valid ObjectId`,
      statusCode: 400,
    };
  }

  let asset = await Asset.findOne({ _id: assetId });

  if (!asset)
    throw {
      message: `Asset was not found for this asset id: ${assetId}`,
      statusCode: 400,
    };

  let scanJobs = await ScanJob.find({ assetId: assetId });

  if (scanJobs.length === 0) {
    return {
      message: `No scan jobs were found for this asset id: ${assetId}`,
      scanJobs: [],
      statusCode: 200,
    };
  } else {
    return {
      message: `Here are the scan jobs that were found for this asset id: ${assetId}`,
      scanJobs,
      statusCode: 200,
    };
  }
};

module.exports = {
  createScanJob,
  updateScanJob,
  fetchScanJobsForAsset,
};
