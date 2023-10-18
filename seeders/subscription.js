const { Subscription } = require("../models/subscription");
const { eventEmitter } = require("../utils/general");
const { subscription_seeders } = require("./seeder");

async function seedPlatinumSubscriptions() {
  console.log("event received");
  var errs_count = 0;

  for (var counter = 0; counter < 5000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.platinumSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
    } catch (err) {
      logger.error(err);
      errs_count++;
    }
  }

  return errs_count;
}

async function seedGoldSubscriptions() {
  var errs_count = 0;

  for (var counter = 0; counter < 8000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.goldSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
    } catch (err) {
      logger.error(err);
      errs_count++;
    }
  }
}

async function seedSilverSubscriptions() {
  var errs_count = 0;

  for (var counter = 0; counter < 12000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.silverSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
    } catch (err) {
      logger.error(err);
      errs_count++;
    }
  }

  return errs_count;
}

async function seedBronzeSubscriptions() {
  var errs_count = 0;

  for (var counter = 0; counter < 7000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.bronzeSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
    } catch (err) {
      logger.error(err);
      errs_count++;
    }
  }

  return errs_count;
}

async function seedFreeSubscriptions() {
  var errs_count = 0;

  for (var counter = 0; counter < 500; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.freeSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
    } catch (err) {
      logger.error(err);
      errs_count++;
    }
  }

  return errs_count;
}

eventEmitter.once("seedPlatinumSubscriptions", seedPlatinumSubscriptions());
eventEmitter.once("seedGoldSubscriptions", seedGoldSubscriptions());
eventEmitter.once("seedSilverSubscriptions", seedSilverSubscriptions());
eventEmitter.once("seedBronzeSubscriptions", seedBronzeSubscriptions());
eventEmitter.once("seedFreeSubscriptions", seedFreeSubscriptions());
