const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema({
  videos: {
    type: Boolean,
    required: [true, "videos is required"],
  },
  audio: {
    type: Boolean,
    required: [true, "audio is required"],
  },
  download: {
    type: Boolean,
    required: [true, "download is required"],
  },
  streaming: {
    type: Boolean,
    required: [true, "streaming is required"],
  },
  customize: {
    type: Boolean,
    required: [true, "customize is required"],
  },
});

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxlength: [50, "maximum allowed length for name is 50. Got {VALUE}"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  period: {
    type: String,
    required: [true, "period is required"],
    maxlength: [10, "maximum length allowed for period is 10. Got {VALUE}"],
  },
  status: {
    type: String,
    enum: {
      values: ["A", "D"],
      message: "{VALUE} is not supported",
    },
    required: [true, "status is required"],
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
