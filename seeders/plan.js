const { Plan, validatePlan } = require("../models/plan");
const logger = require("../utils/logs/logger");
const { plan_seeders } = require("./seeder");

async function createPlan(plan) {
  try {
    // create new plan
    const new_plan = new Plan(plan);

    await new_plan.validate();

    await new_plan.save();
  } catch (err) {
    return err;
  }
}

async function seedPlans() {
  try {
    // delete previous generated plans
    await Plan.deleteMany({});

    const plans = Object.keys(plan_seeders);

    plans.forEach(async (plan) => {
      const err = await createPlan(plan_seeders[plan]);
      if (err) {
        logger.error(`Failed to save ${plan} plan to DB. ${err}`);
      } else {
        logger.info(`Successfully saved ${plan} plan to DB`);
      }
    });
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  seedPlans,
  createPlan,
};
