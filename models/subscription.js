const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const paymentPlatformSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  external_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    enum: ["Stripe", "Paypal"],
    required: true,
  },
});

const subscriptionSchema = new mongoose.Schema({
  business_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  payment_platform: {
    type: paymentPlatformSchema,
    required: true,
  },
});

function validateSubscription(subcription) {
  const paymentPlatformJoiSchema = Joi.object().keys({
    token: Joi.string().required(),
    external_id: Joi.string().required(),
    name: Joi.string().valid("Stripe", "Paypal").required(),
  });

  const subscriptionJoischema = Joi.object({
    business_id: Joi.string().required(),
    email: Joi.string().email().required(),
    plan_id: Joi.objectId().required(),
    payment_platform: paymentPlatformJoiSchema,
  });

  return subscriptionJoischema.validate(subcription);
}

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
  validateSubscription,
};
