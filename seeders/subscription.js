const { Subscription } = require("../models/subscription");
const logger = require("../utils/logs/logger");
const { subscription_seeders } = require("./seeder");

async function seedPlatinumSubscriptions() {
  var subscriptions = [];

  for (var counter = 0; counter < 5000; counter++) {
    try {
      subscriptions.push(subscription_seeders.platinumSubscription);
    } catch (err) {
      logger.error(err);
    }
  }

  Subscription.insertMany(subscriptions)
    .then((result) => {
      logger.info(
        `Successfully created ${result.length} platinumSubscriptions. ${
          subscriptions.length - result.length
        } failed`
      );
    })
    .catch((err) => {
      logger.error(`failed to insert platinumSubscriptions. ${err}`);
    });
}

async function seedGoldSubscriptions() {
  var subscriptions = [];

  for (var counter = 0; counter < 8000; counter++) {
    try {
      subscriptions.push(subscription_seeders.goldSubscription);
    } catch (err) {
      logger.error(err);
    }
  }

  Subscription.insertMany(subscriptions)
    .then((result) => {
      logger.info(
        `Successfully created ${result.length} goldSubscriptions. ${
          subscriptions.length - result.length
        } failed`
      );
    })
    .catch((err) => {
      logger.error(`failed to insert goldSubscriptions. ${err}`);
    });
}

async function seedSilverSubscriptions() {
  var subscriptions = [];

  for (var counter = 0; counter < 12000; counter++) {
    try {
      subscriptions.push(subscription_seeders.silverSubscription);
    } catch (err) {
      logger.error(err);
    }
  }

  Subscription.insertMany(subscriptions)
    .then((result) => {
      logger.info(
        `Successfully created ${result.length} silverSubscription. ${
          subscriptions.length - result.length
        } failed`
      );
    })
    .catch((err) => {
      logger.error(`failed to insert silverSubscriptions. ${err}`);
    });
}

async function seedBronzeSubscriptions() {
  var subscriptions = [];

  for (var counter = 0; counter < 7000; counter++) {
    try {
      subscriptions.push(subscription_seeders.bronzeSubscription);
    } catch (err) {
      logger.error(err);
    }
  }

  Subscription.insertMany(subscriptions)
    .then((result) => {
      logger.info(
        `Successfully created ${result.length} bronzeSubscriptions. ${
          subscriptions.length - result.length
        } failed`
      );
    })
    .catch((err) => {
      logger.error(`failed to insert bronzeSubscriptions. ${err}`);
    });
}

async function seedFreeSubscriptions() {
  var subscriptions = [];

  for (var counter = 0; counter < 500; counter++) {
    try {
      subscriptions.push(subscription_seeders.freeSubscription);
    } catch (err) {
      logger.error(err);
    }
  }

  Subscription.insertMany(subscriptions)
    .then((result) => {
      logger.info(
        `Successfully created ${result.length} freeSubscriptions. ${
          subscriptions.length - result.length
        } failed`
      );
    })
    .catch((err) => {
      logger.error(`failed to insert freeSubscriptions. ${err}`);
    });
}

module.exports = {
  seedPlatinumSubscriptions,
  seedGoldSubscriptions,
  seedSilverSubscriptions,
  seedBronzeSubscriptions,
  seedFreeSubscriptions,
};
