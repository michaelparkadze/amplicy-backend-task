const {
  createScanJob,
  fetchScanJobsForAsset,
} = require("../services/scanJobService");

exports.create_scan_job = async (req, res, next) => {
  const reqBody = req.body;

  createScanJob(reqBody)
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, scanJob } = result;
      res.status(statusCode).send({ message, scanJob });
    })
    .catch((error) => {
      console.error(error);
      const { statusCode = 400, message } = error;
      res.status(statusCode).send({ message }) && next(error);
    });
};

exports.fetch_scan_jobs_for_asset = async (req, res, next) => {
  const { assetId } = req.query;

  fetchScanJobsForAsset(assetId)
    .then((result) => {
      console.log(result);
      const { statusCode = 200, message, scanJobs } = result;
      res.status(statusCode).send({ message, scanJobs });
    })
    .catch((error) => {
      console.error(error);
      const { statusCode = 400, message } = error;
      res.status(statusCode).send({ message }) && next(error);
    });
};
