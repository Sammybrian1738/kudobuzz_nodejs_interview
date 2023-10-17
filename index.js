const logger = require("./utils/logs/logger");
const initMongoDBConnection = require("./utils/db/mongodb");
const { insertMultiplePlans } = require("./generators/plan");

async function main() {
  try {
    process.on("unhandledRejection", (ex) => {
      throw ex;
    });

    // connect to MongoDB
    await initMongoDBConnection();

    logger.info("Connected to MongoDB Successfully");

    insertMultiplePlans();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

main();
