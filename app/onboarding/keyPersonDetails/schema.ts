import { z } from "zod";

export const addKeyPersonItemSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z.string(),
  email: z.string(),
})

export const addKeyPersonResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      created: z.array(addKeyPersonItemSchema).optional(),
      count: z.number().optional(),
    })
    .optional(),
});

export type AddKeyPersonResponse = z.infer<typeof addKeyPersonResponseSchema>;


