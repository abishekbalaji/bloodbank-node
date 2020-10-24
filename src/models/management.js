const mongoose = require("mongoose");
const validator = require("validator");

const managementSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!");
      }
    },
  },
  hospitalType: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalName: {
    type: String,
    required: true,
    trim: true,
  },
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Management = mongoose.model("management", managementSchema);

module.exports = Management;
