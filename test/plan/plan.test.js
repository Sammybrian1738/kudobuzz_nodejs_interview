const { Plan } = require("../../models/plan");
const assert = require("assert");
const { generateRandomString } = require("../../utils/general");
const { seedPlans } = require("../../seeders/plan");

var test_plan = {
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
  describe("Model Initialisation", () => {
    it("it creates a mongoose Plan Model ", () => {
      assert.ok(Plan, "Plan model created successfully");
    });
  });
  describe("Schema Validation", () => {
    describe("name validation", () => {
      it("name should be required", async () => {
        delete test_plan.name;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(err.errors["name"].message, "name is required");
            return true;
          }
        );
      });
      it("name should have a maxlength of 50", async () => {
        test_plan.name = generateRandomString(51);

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["name"].message,
              `maximum allowed length for name is 50. Got ${test_plan.name}`
            );
            return true;
          }
        );
      });
    });
    describe("price validation", () => {
      it("price should be required", async () => {
        delete test_plan.price;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["price"].message,
              "price is required"
            );
            return true;
          }
        );
      });
    });
    describe("period validation", () => {
      it("period should be required", async () => {
        delete test_plan.period;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["period"].message,
              "period is required"
            );
            return true;
          }
        );
      });
      it("period should have a maxlength of 10", async () => {
        test_plan.period = generateRandomString(11);

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["period"].message,
              `maximum length allowed for period is 10. Got ${test_plan.period}`
            );
            return true;
          }
        );
      });
    });
    describe("status validation", () => {
      it("status should be required", async () => {
        delete test_plan.status;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["status"].message,
              "status is required"
            );
            return true;
          }
        );
      });
      it("status only allows A or D as its value", async () => {
        test_plan.status = "S";

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["status"].message,
              `${test_plan.status} is not supported`
            );
            return true;
          }
        );
      });
    });
    describe("features validation", () => {
      it("features videos should be required", async () => {
        delete test_plan.features.videos;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["features.videos"].message,
              "videos is required"
            );
            return true;
          }
        );
      });
      it("features audio should be required", async () => {
        delete test_plan.features.audio;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["features.audio"].message,
              "audio is required"
            );
            return true;
          }
        );
      });
      it("features download should be required", async () => {
        delete test_plan.features.download;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["features.download"].message,
              "download is required"
            );
            return true;
          }
        );
      });
      it("features streaming should be required", async () => {
        delete test_plan.features.streaming;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["features.streaming"].message,
              "streaming is required"
            );
            return true;
          }
        );
      });
      it("features customize should be required", async () => {
        delete test_plan.features.customize;

        const new_plan = new Plan(test_plan);

        await assert.rejects(
          async () => {
            await new_plan.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["features.customize"].message,
              "customize is required"
            );
            return true;
          }
        );
      });
    });
  });
  describe("Seeders Validation", () => {
    it("should insert all plans", async () => {
      const errs_count = await seedPlans();

      assert.strictEqual(errs_count, 0);
    });
  });
});
