const { Plan } = require("../../models/plan");
const assert = require("assert");
const { generateRandomString } = require("../../utils/general");
const { seedPlans } = require("../../seeders/plan");

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
            return true;
          }
        );
      });
    });
    describe("price validation", () => {
      it("price should be require", async () => {
        delete test_plan.price;

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
    describe("period validation", () => {
      it("period should be required", async () => {
        delete test_plan.period;

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
      it("period should have a maxlength of 10", async () => {
        test_plan.period = generateRandomString(11);

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
    describe("status validation", () => {
      it("status should be required", async () => {
        delete test_plan.status;

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
      it("status only allows A or D as its value", async () => {
        test_plan.status = "S";

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
    describe("features validation", () => {
      it("features videos should be required", async () => {
        delete test_plan.features.videos;

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
      it("features audio should be required", async () => {
        delete test_plan.features.audio;

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
      it("features download should be required", async () => {
        delete test_plan.features.download;

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
      it("features streaming should be required", async () => {
        delete test_plan.features.streaming;

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
      it("features customize should be required", async () => {
        delete test_plan.features.customize;

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
  describe("Seeders Validation", () => {
    it("should insert all plans", async () => {
      const errs_count = await seedPlans();

      assert.strictEqual(errs_count, 0);
    });
  });
});
