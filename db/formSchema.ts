import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { activityChallenges, leagues, loggedActivities } from "./schema";

const defaultRequiredTextField = z
  .string()
  .nonempty({ message: "This field is required" });

// const defaultRequiredArrayField = z.preprocess(
//   (obj) => (Array.isArray(obj) ? obj : [obj]),
//   z.array(z.string()).nonempty({ message: "Select an option" })
// );

const defaultRequiredNumberField = z.coerce.number();

// const defaultRequiredDateField = z.coerce.date({
//   required_error: "Select a date",
//   invalid_type_error: "Enter a valid date",
// });

// const defaultOptionalDateField = z.coerce
//   .date({
//     invalid_type_error: "Enter a valid date",
//   })
//   .optional();

export const insertLeagueFormSchema = createInsertSchema(leagues, {
  name: defaultRequiredTextField,
  description: defaultRequiredTextField,
  size: defaultRequiredNumberField,
  weeks: defaultRequiredNumberField,
  slug: z.string().optional(),
  ownerId: z.string().optional(),
});

export const updateLeagueFormSchema = createUpdateSchema(leagues, {
  id: defaultRequiredTextField,
});

export const joinLeagueFormSchema = z.object({
  leagueSlug: defaultRequiredTextField,
});

export const leaveLeagueFormSchema = z.object({
  leagueId: defaultRequiredTextField,
});

export const deleteLeagueFormSchema = z.object({
  id: defaultRequiredTextField,
});

export const logActivityFormSchema = createInsertSchema(loggedActivities, {
  leagueId: defaultRequiredTextField,
  matchId: defaultRequiredTextField,
  userId: z.string().optional(),
  activityType: defaultRequiredTextField,
  duration: defaultRequiredNumberField,
  sets: defaultRequiredNumberField,
  reps: defaultRequiredNumberField,
  cardioPoints: z.number().optional(),
  strengthPoints: z.number().optional(),
  photoUrl: defaultRequiredTextField,
  activityNote: z.string().optional(),
});

export const challengeActivityFormSchema = createInsertSchema(
  activityChallenges,
  {
    leagueId: defaultRequiredTextField,
    activityId: defaultRequiredTextField,
    userId: defaultRequiredTextField,
    challengeReason: defaultRequiredTextField,
  }
);
