const mongoose = require("mongoose");

const bloodbankSchema = mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    trim: true,
  },
  volume: {
    type: Number,
    required: true,
  },
});

const Bloodbank = mongoose.model("bloodbank", bloodbankSchema);

module.exports = Bloodbank;
