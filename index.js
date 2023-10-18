const logger = require("./utils/logs/logger");
const initMongoDBConnection = require("./utils/db/mongodb");
const { seedPlans } = require("./seeders/plan");
const {
  seedPlatinumSubscriptions,
  seedGoldSubscriptions,
  seedSilverSubscriptions,
  seedBronzeSubscriptions,
  seedFreeSubscriptions,
} = require("./seeders/subscription");
const { eventEmitter } = require("./utils/general");

async function main() {
  try {
    process.on("unhandledRejection", (ex) => {
      throw ex;
    });

    // connect to MongoDB
    await initMongoDBConnection();

    logger.info("Connected to MongoDB Successfully");

    seedPlans();

    eventEmitter.once("seedPlatinumSubscriptions", () => {
      seedPlatinumSubscriptions();
    });

    eventEmitter.once("seedGoldSubscriptions", () => {
      seedGoldSubscriptions();
    });

    eventEmitter.once("seedSilverSubscriptions", () => {
      seedSilverSubscriptions();
    });

    eventEmitter.once("seedBronzeSubscriptions", () => {
      seedBronzeSubscriptions();
    });

    eventEmitter.once("seedFreeSubscriptions", () => {
      seedFreeSubscriptions();
    });
  } catch (err) {
    logger.error("ERROR", err);
    process.exit(1);
  }
}

main();
