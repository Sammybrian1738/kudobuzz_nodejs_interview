const { Plan, validatePlan } = require("../models/plan");
const logger = require("../utils/logs/logger");

const default_plans = {
  platinum: {
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
  },
  gold: {
    name: "Gold",
    price: 70,
    period: "monthly",
    status: "A",
    features: {
      videos: true,
      audio: true,
      download: false,
      streaming: true,
      customize: true,
    },
  },
  silver: {
    name: "Silver",
    price: 50,
    period: "monthly",
    status: "A",
    features: {
      videos: true,
      audio: true,
      download: false,
      streaming: false,
      customize: true,
    },
  },
  bronze: {
    name: "Bronze",
    price: 30,
    period: "monthly",
    status: "A",
    features: {
      videos: true,
      audio: true,
      download: false,
      streaming: false,
      customize: false,
    },
  },
  freemium: {
    name: "Freemium",
    price: 0,
    period: "monthly",
    status: "A",
    features: {
      videos: false,
      audio: true,
      download: false,
      streaming: false,
      customize: false,
    },
  },
};

async function createPlan(plan) {
  try {
    // validate the plan data
    const { error } = validatePlan();
    if (error) {
      throw error;
    }

    // create new plan
    const new_plan = new Plan(plan);

    await new_plan.save();
  } catch (err) {
    return err;
  }
}

async function generatePlans() {
  try {
    // delete previous generated plans
    await Plan.deleteMany({});

    const plans = Object.keys(default_plans);

    plans.forEach(async (plan) => {
      const err = await createPlan(default_plans[plan]);
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
  generatePlans,
  createPlan,
};
