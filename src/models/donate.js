const mongoose = require("mongoose");
const validator = require("validator");

const donateSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!");
      }
    },
  },
  haveDisease: {
    type: Boolean,
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
});

const Donate = mongoose.model("donate", donateSchema);

module.exports = Donate;
