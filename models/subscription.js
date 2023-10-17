const mongoose = require("mongoose");

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
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
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

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
  validateSubscription,
};
