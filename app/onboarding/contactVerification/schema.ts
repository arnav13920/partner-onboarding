import { z } from "zod";

// Send OTP Request Schema
export const sendOtpRequestSchema = z.object({
  mobile: z.string().optional(),
  email: z.string().optional(),
  userId: z.number(),
  userType: z.string(),
});

// Flat response shape
const sendOtpFlatResponseSchema = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
  data: z.object({
    userId: z.number(),
    userType: z.string(),
    type: z.string(), // 'MOBILE' or 'EMAIL'
  }),
});

// Nested response shape
const sendOtpNestedResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    status: z.boolean(),
    code: z.number(),
    message: z.string(),
    data: z.object({
      userId: z.number(),
      userType: z.string(),
      type: z.string(),
    }),
  }),
});

// Send OTP Response Schema - accepts flat or nested
export const sendOtpResponseSchema = z.union([
  sendOtpFlatResponseSchema,
  sendOtpNestedResponseSchema,
]);

// Verify OTP Request Schema
export const verifyOtpRequestSchema = z.object({
  mobile: z.string().optional(),
  email: z.string().optional(),
  otp: z.number(),
  type: z.string(), // 'MOBILE' or 'EMAIL'
  userType: z.string(),
  userId: z.number(),
});

// Flat verify response shape (token + userId + userType)
const verifyOtpFlatUserSchema = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
  data: z.object({
    token: z.string(),
    userId: z.number(),
    userType: z.string(), // expected to be 'PARTNER'
  }),
});

// Flat verify response shape (token + partnerId)
const verifyOtpFlatPartnerSchema = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
  data: z.object({
    token: z.string(),
    partnerId: z.number(),
  }),
});

// Nested verify response shape (token + userId + userType)
const verifyOtpNestedUserSchema = z.object({
  success: z.boolean(),
  data: z.object({
    status: z.boolean(),
    code: z.number(),
    message: z.string(),
    data: z.object({
      token: z.string(),
      userId: z.number(),
      userType: z.string(), // expected to be 'PARTNER'
    }),
  }),
});

// Nested verify response shape (token + partnerId)
const verifyOtpNestedPartnerSchema = z.object({
  success: z.boolean(),
  data: z.object({
    status: z.boolean(),
    code: z.number(),
    message: z.string(),
    data: z.object({
      token: z.string(),
      partnerId: z.number(),
    }),
  }),
});




// Verify OTP Response Schema - accepts flat or nested
export const verifyOtpResponseSchema = z.union([
  verifyOtpFlatUserSchema,
  verifyOtpFlatPartnerSchema,
  verifyOtpNestedUserSchema,
  verifyOtpNestedPartnerSchema,
]);

export type SendOtpRequest = z.infer<typeof sendOtpRequestSchema>;
export type SendOtpResponse = z.infer<typeof sendOtpResponseSchema>;
export type VerifyOtpRequest = z.infer<typeof verifyOtpRequestSchema>;
export type VerifyOtpResponse = z.infer<typeof verifyOtpResponseSchema>;
