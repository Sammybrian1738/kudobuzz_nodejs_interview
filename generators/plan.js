const { Plan } = require("../models/plan");
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

module.exports = function insertPlans() {
  const plans = Object.keys(default_plans);

  plans.forEach(async (plan) => {
    try {
      const new_plan = new Plan(plan);

      await new_plan.save();
    } catch (err) {
      logger.error("Failed to save plan to DB", plan);
    }
  });
};
