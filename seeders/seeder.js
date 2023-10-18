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
    plan_id: null,
  },
  goldSubscription: {
    plan_id: null,
  },
  silverSubscription: {
    plan_id: null,
  },
  bronzeSubscription: {
    plan_id: null,
  },
  freeSubscription: {
    plan_id: null,
  },
};

module.exports = { plan_seeders, subscription_seeders };
