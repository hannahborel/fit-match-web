export type ActivityType =
  | "RUNNING"
  | "JOGGING"
  | "SPRINTS"
  | "CIRCUT_TRAINING"
  | "INTERVAL_TRAINING"
  | "LONG_DISTANCE_RUNNING"
  | "TENNIS"
  | "BASKETBALL"
  | "FOOTBALL"
  | "VOLLEYBALL"
  | "BADMINTON"
  | "YOGA"
  | "PILATES"
  | "CYCLING"
  | "SWIMMING"
  | "WEIGHT_TRAINING"
  | "PICKLEBALL"
  | "GOLF"
  | "ROCK_CLIMBING"
  | "MARTIAL_ARTS"
  | "WALKING"
  | "HIIT"
  | "DANCE"
  | "OTHER";

export type activityFormula = "DURATION" | "SETSANDREPS";

export type ActivityDefinition = {
  name: string;
  description: string;
  activityFormula: activityFormula;
  cardioMultipilier: number;
  strengthMultipilier: number;
};
export const ActivityDefinitions: Record<ActivityType, ActivityDefinition> = {
  CIRCUT_TRAINING: {
    name: "Circuit Training",
    description:
      "A mix of strength and cardio exercises performed in a sequence.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.2,
    strengthMultipilier: 0.4,
  },
  LONG_DISTANCE_RUNNING: {
    name: "Long Distance Running",
    description: "Endurance-focused running over extended distances.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.3,
    strengthMultipilier: 0.3,
  },
  FOOTBALL: {
    name: "Football",
    description: "A team sport that combines strategy, agility, and endurance.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.0,
    strengthMultipilier: 0.4,
  },
  BADMINTON: {
    name: "Badminton",
    description:
      "A fast-paced racket sport that improves reflexes and agility.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.7,
    strengthMultipilier: 0.2,
  },
  PILATES: {
    name: "Pilates",
    description:
      "Low-impact exercises that improve flexibility and core strength.",
    activityFormula: "SETSANDREPS",
    cardioMultipilier: 0.5,
    strengthMultipilier: 0.3,
  },
  WEIGHT_TRAINING: {
    name: "Weight Training",
    description: "Strength-focused exercises using weights to build muscle.",
    activityFormula: "SETSANDREPS",
    cardioMultipilier: 0.4,
    strengthMultipilier: 1.0,
  },
  PICKLEBALL: {
    name: "Pickleball",
    description:
      "A paddle sport that combines elements of tennis, badminton, and ping-pong.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.6,
    strengthMultipilier: 0.2,
  },
  GOLF: {
    name: "Golf",
    description: "A precision sport that combines walking and strategic play.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.4,
    strengthMultipilier: 0.1,
  },
  OTHER: {
    name: "Other",
    description: "Any other activity not listed here.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.5,
    strengthMultipilier: 0.2,
  },
  RUNNING: {
    name: "Running",
    description: "A high-intensity cardio activity that builds endurance.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.0,
    strengthMultipilier: 0.3,
  },
  JOGGING: {
    name: "Jogging",
    description: "A steady-paced run that builds endurance and burns calories.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.7,
    strengthMultipilier: 0.2,
  },
  SPRINTS: {
    name: "Sprints",
    description:
      "High-intensity bursts of speed that boost power and metabolism.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.5,
    strengthMultipilier: 0.4,
  },
  INTERVAL_TRAINING: {
    name: "Interval Training",
    description:
      "Alternate between high and low intensity to maximize calorie burn.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.5,
    strengthMultipilier: 0.4,
  },
  CYCLING: {
    name: "Cycling - Free",
    description: "Low-impact cardio that builds leg strength and endurance.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.8,
    strengthMultipilier: 0.3,
  },
  SWIMMING: {
    name: "Swimming",
    description: "Full-body workout that's gentle on joints.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.2,
    strengthMultipilier: 0.4,
  },
  WALKING: {
    name: "Walking",
    description: "Low-impact cardio that's perfect for all fitness levels.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.5,
    strengthMultipilier: 0.2,
  },
  BASKETBALL: {
    name: "Basketball",
    description: "Fast-paced team sport that builds coordination and power.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.0,
    strengthMultipilier: 0.3,
  },
  TENNIS: {
    name: "Tennis",
    description:
      "A dynamic sport that combines agility, strategy, and endurance.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.8,
    strengthMultipilier: 0.3,
  },
  VOLLEYBALL: {
    name: "Volleyball",
    description:
      "Dynamic team sport that builds coordination and explosive power.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.6,
    strengthMultipilier: 0.2,
  },
  ROCK_CLIMBING: {
    name: "Rock Climbing",
    description:
      "Full-body workout that challenges both physical and mental strength.",
    activityFormula: "SETSANDREPS",
    cardioMultipilier: 1.2,
    strengthMultipilier: 0.5,
  },
  MARTIAL_ARTS: {
    name: "Martial Arts",
    description:
      "Discipline that combines physical training with mental focus.",
    activityFormula: "SETSANDREPS",
    cardioMultipilier: 1.0,
    strengthMultipilier: 0.3,
  },
  HIIT: {
    name: "HIIT / Circuit",
    description:
      "High-intensity interval training that combines strength and cardio.",
    activityFormula: "DURATION",
    cardioMultipilier: 1.5,
    strengthMultipilier: 0.5,
  },
  DANCE: {
    name: "Dance",
    description: "A fun and engaging way to improve cardio and coordination.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.9,
    strengthMultipilier: 0.3,
  },
  YOGA: {
    name: " Yoga",
    description: "A mind-body practice that enhances flexibility and strength.",
    activityFormula: "DURATION",
    cardioMultipilier: 0.3,
    strengthMultipilier: 0.8,
  },
};
