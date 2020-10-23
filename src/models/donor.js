const mongoose = require("mongoose");
const validator = require("validator");

const donorSchema = mongoose.Schema({
  created_at: {
    type: Date,
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
  name: {
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

const Donor = mongoose.model("donor", donorSchema);

module.exports = Donor;
