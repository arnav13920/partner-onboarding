import { z } from "zod";

// About You Request Schema
export const aboutYouRequestSchema = z.object({
  partnerIdentity: z.string(),
  businessType: z.string(),
  businessCategory: z.string().optional(),
  userType: z.string(),
  userId: z.number(),
});

// About You Response Schema - matches the actual nested API response structure
export const aboutYouResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    status: z.boolean(),
    code: z.number(),
    message: z.string(),
    data: z.object({
      userId: z.number(),
      userType: z.string(),
      partnerIdentity: z.string(),
      businessType: z.string(),
      businessCategory: z.string().optional(),
    }),
  }),
});

// Type exports
export type AboutYouRequest = z.infer<typeof aboutYouRequestSchema>;
export type AboutYouResponse = z.infer<typeof aboutYouResponseSchema>;
