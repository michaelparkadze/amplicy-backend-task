var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

module.exports = { mongoose, Schema };
