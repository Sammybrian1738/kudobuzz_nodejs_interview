const mongoose = require("mongoose");
const Joi = require("joi");

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
    maxlength: 50,
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

function validatePlan(plan) {
  const featureJoiSchema = Joi.object().keys({
    videos: Joi.bool().required(),
    audio: Joi.bool().required(),
    download: Joi.bool().required(),
    streaming: Joi.bool().required(),
    customize: Joi.bool().required(),
  });

  const planJoiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    period: Joi.string().required(),
    status: Joi.string().valid("A", "D").max(1).required(),
    features: featureJoiSchema,
  });

  return planJoiSchema.validate(plan);
}

const Plan = mongoose.model("Plan", planSchema);

module.exports = {
  Plan,
  validatePlan,
};
