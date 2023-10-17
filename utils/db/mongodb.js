const mongoose = require("mongoose");

module.exports = function initMongoDBConnection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb://127.0.0.1:27017/${
        process.env.NODE_ENV == "test" ? "kudobuzz_test" : "kudobuzz_dev"
      }?retryWrites=true&w=majority`
    );

    var mongodb = mongoose.connection;
    mongodb.on("error", function (err) {
      reject(err);
    });

    mongodb.once("open", function () {
      resolve(mongoose);
    });
  });
};
