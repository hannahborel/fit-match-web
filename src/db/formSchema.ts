import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import {
  brands,
  campaigns,
  deliverables,
  giftings,
  invoices,
  socialMediaAccounts,
  users,
} from "./schema";

const defaultRequiredTextField = z
  .string()
  .nonempty({ message: "This field is required" });

const defaultRequiredArrayField = z.preprocess(
  (obj) => (Array.isArray(obj) ? obj : [obj]),
  z.array(z.string()).nonempty({ message: "Select an option" })
);

const defaultRequiredNumberField = z.coerce
  .number()
  .gt(0, { message: "Must be greater than 0" });

const defaultRequiredDateField = z.coerce.date({
  required_error: "Select a date",
  invalid_type_error: "Enter a valid date",
});

const defaultOptionalDateField = z.coerce
  .date({
    invalid_type_error: "Enter a valid date",
  })
  .optional();

export const insertDeliverableFormSchema = createInsertSchema(deliverables, {
  title: defaultRequiredTextField,
  description: defaultRequiredTextField,
  deliveredQuantity: z.coerce.number(),
  requiredQuantity: defaultRequiredNumberField,
  dueDate: defaultRequiredDateField,
  socialMediaAccountId: defaultRequiredTextField,
});

export const updateDeliverableFormSchema = createUpdateSchema(deliverables, {
  title: defaultRequiredTextField,
  description: defaultRequiredTextField,
  deliveredQuantity: z.coerce.number(),
  requiredQuantity: defaultRequiredNumberField,
  dueDate: defaultRequiredDateField,
  socialMediaAccountId: defaultRequiredTextField,
});
export const addInfluencerToPortfolioFormSchema = createInsertSchema(users, {
  name: defaultRequiredTextField,
  email: defaultRequiredTextField,
}).extend({ portfolioId: defaultRequiredTextField });
export const insertInvoiceFormSchema = createInsertSchema(invoices, {
  value: defaultRequiredNumberField,
  description: defaultRequiredTextField,
  influencerId: defaultRequiredTextField,
  dueDate: defaultRequiredDateField,
});
export const insertGiftingFormSchema = createInsertSchema(giftings, {
  influencerId: defaultRequiredTextField,
  description: defaultRequiredTextField,
  giftUrl: defaultRequiredTextField,
  availabilityStartDate: defaultRequiredDateField,
  availabilityEndDate: defaultRequiredDateField,
});
export const insertSocialMediaAccountFormSchema = createInsertSchema(
  socialMediaAccounts,
  {
    username: defaultRequiredTextField,
    platform: defaultRequiredTextField,
  }
);
export const insertCampaignFormSchema = createInsertSchema(campaigns, {
  title: defaultRequiredTextField,
  description: defaultRequiredTextField,
  brandId: defaultRequiredTextField,
  startDate: defaultRequiredDateField,
  endDate: defaultRequiredDateField,
  exclusivityEndDate: defaultOptionalDateField,
  usageRightsEndDate: defaultOptionalDateField,
});
export const insertCampaignWithNewBrandFormSchema = createInsertSchema(
  campaigns,
  {
    title: defaultRequiredTextField,
    description: defaultRequiredTextField,
    brandId: z.string().optional(),
    startDate: defaultRequiredDateField,
    endDate: defaultRequiredDateField,
    exclusivityEndDate: defaultOptionalDateField,
    usageRightsEndDate: defaultOptionalDateField,
  }
).extend({
  newBrandName: defaultRequiredTextField,
});
export const insertBrandFormSchema = createInsertSchema(brands, {
  brandName: defaultRequiredTextField,
});
export const addInfluencersToCampaignFormSchema = z.object({
  influencerIds: defaultRequiredArrayField,
  campaignId: defaultRequiredTextField,
});
export const addFileToCampaignFormSchema = z.object({
  file: z
    .any()
    .refine(
      (fileList) =>
        typeof FileList !== "undefined" &&
        fileList instanceof FileList &&
        ["application/pdf"].includes(fileList[0]?.type),
      {
        message: "Invalid document file type",
      }
    ),
  campaignId: defaultRequiredTextField,
});
export const deleteInfluencerFormSchema = z.object({
  influencerId: defaultRequiredTextField,
  portfolioId: defaultRequiredTextField,
});
export const deleteGiftingFormSchema = z.object({
  giftingId: defaultRequiredTextField,
});
export const deleteCampaignFormSchema = z.object({
  campaignId: defaultRequiredTextField,
});

export const deleteDeliverableFormSchema = z.object({
  deliverableId: defaultRequiredTextField,
});
