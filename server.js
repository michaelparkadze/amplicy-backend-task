const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, `env/${process.env.NODE_ENV}.env`),
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Router index
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || null;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} using ${ENV} env.`);
});
