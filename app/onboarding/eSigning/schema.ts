import { z } from "zod";

/**
 * Request schema
 * Expected body:
 * {
 *   "userId": 1,
 *   "userType": "PARTNER"
 * }
 */
export const EsignRequestSchema = z.object({
  userId: z.number().int().positive(),
  userType: z.enum(["PARTNER","TEMP"]), // extend if more roles
});

export type EsignRequest = z.infer<typeof EsignRequestSchema>;

/**
 * Response schema
 * Example:
 * {
 *   success: true,
 *   message: "Esign Link",
 *   data: { esignUrl: "https://..." }
 * }
 */
export const EsignResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    esignUrl: z.string().url(),
  }),
});

export type EsignResponse = z.infer<typeof EsignResponseSchema>;
