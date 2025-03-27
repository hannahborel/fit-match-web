import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { leagues, users } from "./schema";

const defaultRequiredTextField = z
  .string()
  .nonempty({ message: "This field is required" });

// const defaultRequiredArrayField = z.preprocess(
//   (obj) => (Array.isArray(obj) ? obj : [obj]),
//   z.array(z.string()).nonempty({ message: "Select an option" })
// );

const defaultRequiredNumberField = z.coerce
  .number()
  .gt(0, { message: "Must be greater than 0" });

const defaultRequiredDateField = z.coerce.date({
  required_error: "Select a date",
  invalid_type_error: "Enter a valid date",
});

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
  start_date: defaultRequiredDateField,
});

export const insertUserFormSchema = createInsertSchema(users, {
  name: defaultRequiredTextField,
  email: defaultRequiredTextField,
  password: defaultRequiredTextField,
});
