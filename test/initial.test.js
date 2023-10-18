const initMongoDBConnection = require("../utils/db/mongodb");

describe("Initial Setup", () => {
  before((done) => {
    initMongoDBConnection()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
