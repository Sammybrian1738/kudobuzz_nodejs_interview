const { Subscription } = require("../models/subscription");
const logger = require("../utils/logs/logger");
const { subscription_seeders } = require("./seeder");

async function seedPlatinumSubscriptions() {
  var errs = 0;
  var success = 0;

  for (var counter = 0; counter < 5000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.platinumSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();
      success++;
    } catch (err) {
      logger.error(err);
      errs++;
    }
  }

  logger.info(
    `Successfully created ${success} platinumSubscriptions. ${errs} failed`
  );
}

async function seedGoldSubscriptions() {
  var errs = 0;
  var success = 0;

  for (var counter = 0; counter < 8000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.goldSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();

      success++;
    } catch (err) {
      logger.error(err);
      errs++;
    }
  }

  logger.info(
    `Successfully created ${success} goldSubscriptions. ${errs} failed`
  );
}

async function seedSilverSubscriptions() {
  var errs = 0;
  var success = 0;

  for (var counter = 0; counter < 12000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.silverSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();

      success++;
    } catch (err) {
      logger.error(err);
      errs++;
    }
  }

  logger.info(
    `Successfully created ${success} silverSubscriptions. ${errs} failed`
  );
}

async function seedBronzeSubscriptions() {
  var errs = 0;
  var success = 0;

  for (var counter = 0; counter < 7000; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.bronzeSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();

      success++;
    } catch (err) {
      logger.error(err);
      errs++;
    }
  }

  logger.info(
    `Successfully created ${success} bronzeSubscriptions. ${errs} failed`
  );
}

async function seedFreeSubscriptions() {
  var errs = 0;
  var success = 0;

  for (var counter = 0; counter < 500; counter++) {
    try {
      const new_subscription = new Subscription(
        subscription_seeders.freeSubscription
      );

      await new_subscription.validate();

      await new_subscription.save();

      success++;
    } catch (err) {
      logger.error(err);
      errs++;
    }
  }

  logger.info(
    `Successfully created ${success} freeSubscriptions. ${errs} failed`
  );
}

module.exports = {
  seedPlatinumSubscriptions,
  seedGoldSubscriptions,
  seedSilverSubscriptions,
  seedBronzeSubscriptions,
  seedFreeSubscriptions,
};
