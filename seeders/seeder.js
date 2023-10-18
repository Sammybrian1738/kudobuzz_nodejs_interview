const {
  generateRandomBusinessID,
  generateRandomEmail,
  generateRandomString,
  generateRandomPaymentPlatformExternalID,
  generateRandomPaymentPlatformName,
} = require("../utils/general");

const plan_seeders = {
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

const subscription_seeders = {
  platinumSubscription: {
    business_id: generateRandomBusinessID(),
    email: generateRandomEmail(),
    plan_id: null,
    payment_platform: {
      token: generateRandomString(40),
      external_id: generateRandomPaymentPlatformExternalID(),
      name: generateRandomPaymentPlatformName(),
    },
  },
  goldSubscription: {
    business_id: generateRandomBusinessID(),
    email: generateRandomEmail(),
    plan_id: null,
    payment_platform: {
      token: generateRandomString(40),
      external_id: generateRandomPaymentPlatformExternalID(),
      name: generateRandomPaymentPlatformName(),
    },
  },
  silverSubscription: {
    business_id: generateRandomBusinessID(),
    email: generateRandomEmail(),
    plan_id: null,
    payment_platform: {
      token: generateRandomString(40),
      external_id: generateRandomPaymentPlatformExternalID(),
      name: generateRandomPaymentPlatformName(),
    },
  },
  bronzeSubscription: {
    business_id: generateRandomBusinessID(),
    email: generateRandomEmail(),
    plan_id: null,
    payment_platform: {
      token: generateRandomString(40),
      external_id: generateRandomPaymentPlatformExternalID(),
      name: generateRandomPaymentPlatformName(),
    },
  },
  freeSubscription: {
    business_id: generateRandomBusinessID(),
    email: generateRandomEmail(),
    plan_id: null,
    payment_platform: {
      token: generateRandomString(40),
      external_id: generateRandomPaymentPlatformExternalID(),
      name: generateRandomPaymentPlatformName(),
    },
  },
};

module.exports = { plan_seeders, subscription_seeders };
