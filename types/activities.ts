export type ActivityType =
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
  | "OTHER";

export type ActivityDefinition = {
  name: string;
  description: string;
  kpis: KpiDefinition[];
};

export type KpiDefinition = {
  name: string;
  description: string;
  unit: string;
  min: number;
  max: number;
};

export const ActivityDefinitions: Record<ActivityType, ActivityDefinition> = {
  JOGGING: {
    name: "Jogging",
    description:
      "A steady-paced run that builds endurance and burns calories. Perfect for beginners and those looking to maintain a consistent cardio routine!",
    kpis: [
      {
        name: "Distance",
        description: "Total distance covered",
        unit: "km",
        min: 1,
        max: 10,
      },
      {
        name: "Duration",
        description: "Time spent jogging",
        unit: "minutes",
        min: 10,
        max: 60,
      },
    ],
  },
  SPRINTS: {
    name: "Sprints",
    description:
      "High-intensity bursts of speed that boost power and metabolism. Push your limits with these explosive intervals!",
    kpis: [
      {
        name: "Sprint Distance",
        description: "Distance of each sprint",
        unit: "meters",
        min: 50,
        max: 200,
      },
      {
        name: "Number of Sprints",
        description: "Total number of sprint intervals",
        unit: "count",
        min: 4,
        max: 20,
      },
    ],
  },
  CIRCUT_TRAINING: {
    name: "Circuit Training",
    description:
      "A dynamic full-body workout combining strength and cardio. Keep your heart pumping while building muscle!",
    kpis: [
      {
        name: "Circuit Duration",
        description: "Time per circuit",
        unit: "minutes",
        min: 5,
        max: 15,
      },
      {
        name: "Number of Circuits",
        description: "Total circuits completed",
        unit: "count",
        min: 2,
        max: 6,
      },
    ],
  },
  INTERVAL_TRAINING: {
    name: "Interval Training",
    description:
      "Alternate between high and low intensity to maximize calorie burn and improve cardiovascular fitness!",
    kpis: [
      {
        name: "High-Intensity Duration",
        description: "Duration of high-intensity intervals",
        unit: "seconds",
        min: 30,
        max: 120,
      },
      {
        name: "Low-Intensity Duration",
        description: "Duration of recovery intervals",
        unit: "seconds",
        min: 60,
        max: 180,
      },
      {
        name: "Count",
        description: "Total number of high/low intensity pairs completed",
        unit: "count",
        min: 4,
        max: 20,
      },
    ],
  },
  LONG_DISTANCE_RUNNING: {
    name: "Long Distance Running",
    description:
      "Build endurance and mental toughness with extended running sessions. Perfect for marathon training!",
    kpis: [
      {
        name: "Distance",
        description: "Total distance covered",
        unit: "km",
        min: 5,
        max: 42,
      },
      {
        name: "Duration",
        description: "Time spent running",
        unit: "minutes",
        min: 30,
        max: 240,
      },
    ],
  },
  TENNIS: {
    name: "Tennis",
    description:
      "A dynamic sport that combines agility, strategy, and endurance. Challenge yourself with intense rallies!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 30,
        max: 180,
      },
    ],
  },
  BASKETBALL: {
    name: "Basketball",
    description:
      "Fast-paced team sport that builds coordination and explosive power. Show off your skills on the court!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 30,
        max: 120,
      },
    ],
  },
  FOOTBALL: {
    name: "Football",
    description:
      "High-energy team sport that combines speed, strength, and strategy. Give it your all on the field!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 45,
        max: 90,
      },
    ],
  },
  VOLLEYBALL: {
    name: "Volleyball",
    description:
      "Dynamic team sport that builds coordination and explosive power. Spike your way to victory!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 30,
        max: 120,
      },
    ],
  },
  BADMINTON: {
    name: "Badminton",
    description:
      "Fast-paced racquet sport that improves reflexes and agility. Challenge your opponent with quick rallies!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 20,
        max: 90,
      },
    ],
  },
  YOGA: {
    name: "Yoga",
    description:
      "Mind-body practice that improves flexibility and mental focus. Find your inner peace and strength!",
    kpis: [
      {
        name: "Session Duration",
        description: "Time spent practicing",
        unit: "minutes",
        min: 30,
        max: 120,
      },
    ],
  },
  PILATES: {
    name: "Pilates",
    description:
      "Low-impact workout that strengthens core muscles and improves posture. Build a strong foundation!",
    kpis: [
      {
        name: "Session Duration",
        description: "Time spent practicing",
        unit: "minutes",
        min: 30,
        max: 90,
      },
    ],
  },
  CYCLING: {
    name: "Cycling",
    description:
      "Low-impact cardio that builds leg strength and endurance. Pedal your way to fitness!",
    kpis: [
      {
        name: "Distance",
        description: "Total distance covered",
        unit: "km",
        min: 5,
        max: 100,
      },
      {
        name: "Duration",
        description: "Time spent cycling",
        unit: "minutes",
        min: 30,
        max: 300,
      },
    ],
  },
  SWIMMING: {
    name: "Swimming",
    description:
      "Full-body workout that's gentle on joints. Glide through the water and build strength!",
    kpis: [
      {
        name: "Distance",
        description: "Total distance swam",
        unit: "meters",
        min: 200,
        max: 2000,
      },
      {
        name: "Duration",
        description: "Time spent swimming",
        unit: "minutes",
        min: 20,
        max: 120,
      },
    ],
  },
  WEIGHT_TRAINING: {
    name: "Weight Training",
    description:
      "Build muscle and increase strength with targeted resistance exercises. Push your limits!",
    kpis: [
      {
        name: "Total Sets",
        description: "Total number of sets completed",
        unit: "count",
        min: 3,
        max: 12,
      },
      {
        name: "Reps per Set",
        description: "Number of repetitions in each set",
        unit: "count",
        min: 3,
        max: 20,
      },
    ],
  },
  PICKLEBALL: {
    name: "Pickleball",
    description:
      "Fun paddle sport that combines elements of tennis and ping pong. Perfect for all skill levels!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent playing",
        unit: "minutes",
        min: 30,
        max: 90,
      },
    ],
  },
  GOLF: {
    name: "Golf",
    description:
      "Strategic sport that combines walking with precise movements. Perfect your swing!",
    kpis: [
      {
        name: "Number of Holes",
        description: "Holes played",
        unit: "count",
        min: 9,
        max: 18,
      },
    ],
  },
  ROCK_CLIMBING: {
    name: "Rock Climbing",
    description:
      "Full-body workout that challenges both physical and mental strength. Reach new heights!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent climbing",
        unit: "minutes",
        min: 30,
        max: 180,
      },
    ],
  },
  MARTIAL_ARTS: {
    name: "Martial Arts",
    description:
      "Discipline that combines physical training with mental focus. Build strength and confidence!",
    kpis: [
      {
        name: "Duration",
        description: "Time spent training",
        unit: "minutes",
        min: 45,
        max: 120,
      },
    ],
  },
  WALKING: {
    name: "Walking",
    description:
      "Low-impact cardio that's perfect for all fitness levels. Take steps towards better health!",
    kpis: [
      {
        name: "Distance",
        description: "Total distance walked",
        unit: "km",
        min: 1,
        max: 20,
      },
      {
        name: "Duration",
        description: "Time spent walking",
        unit: "minutes",
        min: 15,
        max: 180,
      },
    ],
  },
  OTHER: {
    name: "Other",
    description:
      "Custom activity type for tracking other forms of exercise and movement.",
    kpis: [
      {
        name: "Duration",
        description: "Time spent in activity",
        unit: "minutes",
        min: 10,
        max: 180,
      },
    ],
  },
};
