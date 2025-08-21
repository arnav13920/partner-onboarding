import { z } from "zod";

export const otpSendResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      otp: z.string(),
    })
    .optional(),
});

export const otpVerifyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type OtpSendResponse = z.infer<typeof otpSendResponseSchema>;
export type OtpVerifyResponse = z.infer<typeof otpVerifyResponseSchema>;

