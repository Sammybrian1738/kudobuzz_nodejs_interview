process.env.NODE_ENV = "test";
const initMongoDBConnection = require("../utils/db/mongodb");
const { Plan } = require("../models/plan");
const assert = require("assert");

const test_plan = {
  name: "Platinum",
  price: 100,
  period: "monthly",
  status: "A",
  features: {
    videos: true,
    audio: true,
    download: true,
    streaming: true,
    customize: true,
  },
};

describe("Plans", () => {
  before((done) => {
    initMongoDBConnection()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  describe("/Model Initialisation", () => {
    it("it creates a mongoose Plan Model ", () => {
      assert.ok(Plan, "Plan model created successfuuly");
    });
  });
  describe("Schema Validation", () => {
    it("name is required", async () => {
      delete test_plan.name;

      const new_plan = new Plan(test_plan);

      await assert.rejects(
        async () => {
          await new_plan.validate();
        },
        (err) => {
          return true;
        }
      );
    });
  });
});
