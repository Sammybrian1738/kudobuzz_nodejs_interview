const {
  Subscription,
  allowed_platform_name,
} = require("../../models/subscription");
const assert = require("assert");
const {
  generateRandomBusinessID,
  generateRandomEmail,
  generateRandomString,
  generateRandomPaymentPlatformExternalID,
  generateRandomPaymentPlatformName,
} = require("../../utils/general");

const test_subscription = {
  business_id: generateRandomBusinessID(),
  email: generateRandomEmail(),
  plan_id: null,
  payment_platform: {
    token: generateRandomString(40),
    external_id: generateRandomPaymentPlatformExternalID(),
    name: generateRandomPaymentPlatformName(),
  },
};

describe("Subscriptions", () => {
  describe("Model Initialisation", () => {
    it("it creates a mongoose Subcription Model ", () => {
      assert.ok(Subscription, "Subscription model created successfully");
    });
  });
  describe("Schema Validation", () => {
    describe("business_id validation", () => {
      it("business_id should be required", async () => {
        delete test_subscription.business_id;

        const new_subscription = new Subscription(test_subscription);

        await assert.rejects(
          async () => {
            await new_subscription.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["business_id"].message,
              "business_id is required"
            );
            return true;
          }
        );
      });
    });
    describe("email validation", () => {
      it("email should be required", async () => {
        delete test_subscription.email;

        const new_subscription = new Subscription(test_subscription);

        await assert.rejects(
          async () => {
            await new_subscription.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["email"].message,
              "email is required"
            );
            return true;
          }
        );
      });
      it("only valid email addresses are allowed", async () => {
        test_subscription.email = "testemail";

        const new_subscription = new Subscription(test_subscription);

        await assert.rejects(
          async () => {
            await new_subscription.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["email"].message,
              `${test_subscription.email} is not a valid email!`
            );
            return true;
          }
        );
      });
    });
    describe("plan_id validation", () => {
      it("plan_id should be required", async () => {
        delete test_subscription.plan_id;

        const new_subscription = new Subscription(test_subscription);

        await assert.rejects(
          async () => {
            await new_subscription.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["plan_id"].message,
              "plan_id is required"
            );
            return true;
          }
        );
      });
      it("plan must be of type mongoDB objectId", async () => {
        test_subscription.plan_id = generateRandomString(11);

        const new_subscription = new Subscription(test_subscription);

        await assert.rejects(
          async () => {
            await new_subscription.validate();
          },
          (err) => {
            assert.strictEqual(
              err.errors["plan_id"].message,
              `Cast to ObjectId failed for value "${test_subscription.plan_id}" (type string) at path "plan_id" because of "BSONError"`
            );
            return true;
          }
        );
      });
    });
    describe("payment platform validation", () => {
      describe("token validation", () => {
        it("token should be required", async () => {
          delete test_subscription.payment_platform.token;

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.token"].message,
                "token is required"
              );
              return true;
            }
          );
        });
        it("token should be maxlength of 40", async () => {
          test_subscription.payment_platform.token = generateRandomString(41);

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.token"].message,
                `maximum length allowed for token is 40. Got ${test_subscription.payment_platform.token}`
              );
              return true;
            }
          );
        });
      });
      describe("external_id validation", () => {
        it("external_id should be required", async () => {
          delete test_subscription.payment_platform.external_id;

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.external_id"].message,
                "external_id is required"
              );
              return true;
            }
          );
        });
        it("external_id should be maxlength of 40", async () => {
          test_subscription.payment_platform.external_id =
            generateRandomString(41);

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.external_id"].message,
                `maximum length allowed for external_id is 40. Got ${test_subscription.payment_platform.external_id}`
              );
              return true;
            }
          );
        });
      });
      describe("name validation", () => {
        it("name should be required", async () => {
          delete test_subscription.payment_platform.name;

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.name"].message,
                "name is required"
              );
              return true;
            }
          );
        });
        it(`the only allowed values for name are ${allowed_platform_name}`, async () => {
          test_subscription.payment_platform.name = generateRandomString(10);

          const new_subscription = new Subscription(test_subscription);

          await assert.rejects(
            async () => {
              await new_subscription.validate();
            },
            (err) => {
              assert.strictEqual(
                err.errors["payment_platform.name"].message,
                `${test_subscription.payment_platform.name} is not supported`
              );
              return true;
            }
          );
        });
      });
    });
  });
});
