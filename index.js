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
const express = require("express");
const config = require("config");
const subscription_routes = require("./routes/subscription");

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

    // express
    const app = express();
    app.use(express.json());
    app.use("/subscriptions", subscription_routes);

    app.get("/", (req, res) => {
      res.send("Kudobuzz");
    });

    const port = config.has("PORT") ? config.get("PORT") : 8080;

    app.listen(port, () => {
      logger.info(`App listening on port ${port}`);
    });
  } catch (err) {
    logger.error("ERROR", err);
    process.exit(1);
  }
}

main();
