import { z } from "zod";

export const addKeyPersonItemSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z.string(),
  email: z.string(),
});

export const addKeyPersonResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({}).optional().default({}),
});

export type AddKeyPersonResponse = z.infer<typeof addKeyPersonResponseSchema>;
