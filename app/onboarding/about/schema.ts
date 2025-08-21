import { z } from "zod";

// Conservative response schema assumptions; refine later as backend stabilizes
export const aboutYouResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      partner_identity: z.string().optional(),
      buisness_type: z.string().optional(),
      buisness_category: z.string().optional(),
      id: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

export type AboutYouResponse = z.infer<typeof aboutYouResponseSchema>;


