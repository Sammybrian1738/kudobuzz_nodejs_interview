const mongoose = require("mongoose");
const config = require("config");

module.exports = function initMongoDBConnection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.get("MONGO_URI"));

    var mongodb = mongoose.connection;
    mongodb.on("error", function (err) {
      reject(err);
    });

    mongodb.once("open", function () {
      resolve(mongoose);
    });
  });
};
