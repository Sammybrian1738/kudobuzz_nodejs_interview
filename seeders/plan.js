const { Plan, validatePlan } = require("../models/plan");
const { Subscription } = require("../models/subscription");
const { eventEmitter } = require("../utils/general");
const logger = require("../utils/logs/logger");
const { plan_seeders, subscription_seeders } = require("./seeder");

async function createPlan(plan) {
  try {
    // create new plan
    const new_plan = new Plan(plan);

    await new_plan.validate();

    const saved_plan = await new_plan.save();

    return { err: null, saved_plan };
  } catch (err) {
    return { err, saved_plan: null };
  }
}

async function seedPlans() {
  var errs_count = 0;

  try {
    // delete previous generated plans
    await Plan.deleteMany({});
    await Subscription.deleteMany({});

    const plans = Object.keys(plan_seeders);

    plans.forEach(async (plan) => {
      const { err, saved_plan } = await createPlan(plan_seeders[plan]);
      if (err) {
        logger.error(`Failed to save ${plan} plan to DB. ${err}`);
        errs_count++;
      } else {
        switch (plan) {
          case "platinum":
            subscription_seeders.platinumSubscription.plan_id = saved_plan._id;
            eventEmitter.emit("seedPlatinumSubscriptions");
            break;
          case "gold":
            subscription_seeders.goldSubscription.plan_id = saved_plan._id;
            eventEmitter.emit("seedGoldSubscriptions");
            break;
          case "silver":
            subscription_seeders.silverSubscription.plan_id = saved_plan._id;
            eventEmitter.emit("seedSilverSubscriptions");
            break;
          case "bronze":
            subscription_seeders.bronzeSubscription.plan_id = saved_plan._id;
            eventEmitter.emit("seedBronzeSubscriptions");
            break;
          case "freemium":
            subscription_seeders.freeSubscription.plan_id = saved_plan._id;
            eventEmitter.emit("seedFreeSubscriptions");
            break;
          default:
            logger.error(`Invalid plan ${plan}`);
        }
        logger.info(`Successfully saved ${plan} plan to DB`);
      }
    });
  } catch (err) {
    logger.error(err);
  }

  return errs_count;
}

module.exports = {
  seedPlans,
  createPlan,
};
