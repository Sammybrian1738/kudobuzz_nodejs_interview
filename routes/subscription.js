const express = require("express");
const { default: mongoose } = require("mongoose");
const { Subscription } = require("../models/subscription");
const { Plan } = require("../models/plan");
const router = express.Router();
const { format } = require("@fast-csv/format");
const logger = require("../utils/logs/logger");
const fs = require("fs");
const path = require("path");

async function createSubscriptionCsv(subscriptions, fileName) {
  return new Promise((resolve, reject) => {
    const csvFile = fs.createWriteStream(fileName);
    const stream = format({ headers: true });
    stream.pipe(csvFile);

    for (i = 0; i < subscriptions.length; i++) {
      stream.write({
        business_id: subscriptions[i].business_id,
        email: subscriptions[i].email,
        plan_id: subscriptions[i].plan_id,
        payment_platform_name: subscriptions[i].payment_platform.name,
      });
    }

    setTimeout(() => {
      stream.end();
    }, 1500);

    stream.on("error", function (err) {
      reject(err);
    });

    stream.on("end", () => {
      resolve(true);
    });
  });
}

router.get("/", async (req, res, next) => {
  try {
    // Get subscriptions with plan pricing greater than or equal to $50
    const plans_query = Plan.find();

    const plans = await plans_query
      .where("price")
      .gte(50)
      .select("_id name price")
      .exec();

    const plan_ids = plans.map((plan) => plan.id);

    const subscription_query = Subscription.find();

    const subscriptions = await subscription_query
      .where("plan_id")
      .in(plan_ids)
      .limit(32500)
      .exec();

    const fileName = "subscriptions.csv";

    await createSubscriptionCsv(subscriptions, fileName);

    const options = {
      root: path.join(path.dirname(require.main.filename)),
    };

    res.status(200).sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        logger.info(`Successfully sent ${fileName} to client`);
      }
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ err: err });
  }
});

module.exports = router;
