const mongoose = require("mongoose");

const allowed_platform_name = ["Stripe", "Paypal"];

const paymentPlatformSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "token is required"],
    maxlength: [40, "maximum length allowed for token is 40. Got {VALUE}"],
  },
  external_id: {
    type: String,
    required: [true, "external_id is required"],
    maxlength: [
      40,
      "maximum length allowed for external_id is 40. Got {VALUE}",
    ],
  },
  name: {
    type: String,
    enum: {
      values: allowed_platform_name,
      message: "{VALUE} is not supported",
    },
    required: [true, "name is required"],
  },
});

const subscriptionSchema = new mongoose.Schema({
  business_id: {
    type: String,
    required: [true, "business_id is required"],
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "email is required"],
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: [true, "plan_id is required"],
  },
  payment_platform: {
    type: paymentPlatformSchema,
    required: [true, "payment_platform is required"],
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
  allowed_platform_name,
};
