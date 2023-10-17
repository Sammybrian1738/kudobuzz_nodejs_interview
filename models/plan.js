const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema({
  videos: {
    type: Boolean,
    required: true,
  },
  audio: {
    type: Boolean,
    required: true,
  },
  download: {
    type: Boolean,
    required: true,
  },
  streaming: {
    type: Boolean,
    required: true,
  },
  customize: {
    type: Boolean,
    required: true,
  },
});

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    required: true,
    maxlength: 10,
  },
  status: {
    type: String,
    enum: ["A", "D"],
    required: true,
    maxlength: 1,
  },
  features: {
    type: featuresSchema,
    required: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = {
  Plan,
};
