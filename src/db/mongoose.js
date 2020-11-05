const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/bloodbank-db";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

console.log("Connected to db");
