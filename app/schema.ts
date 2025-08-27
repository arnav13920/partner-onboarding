import { z } from 'zod'

// Onboarding Request Schema
export const onboardingRequestSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number format')
})

// Onboarding Response Schema
export const onboardingResponseSchema = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
  data: z.object({
    userId: z.number(),
    userType: z.string()
  })
})

// Meta Data Request Schema
export const metaDataRequestSchema = z.object({
  userId: z.number(),
  userType: z.string()
})

// Meta Data Response Schema
export const metaDataResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    userId: z.number(),
    userType: z.string(),
    current_page: z.string(),
    partnerIdentity: z.string(),
    businessType: z.string(),
    businessCategory: z.string(),
    pan: z.string(),
    account_number: z.string(),
    ifsc_code: z.string(),
    gst_number: z.string(),
    srn_number: z.string(),
    personDetails: z.array(z.any())
  })
})

// Type exports
export type OnboardingRequest = z.infer<typeof onboardingRequestSchema>
export type OnboardingResponse = z.infer<typeof onboardingResponseSchema>
export type MetaDataRequest = z.infer<typeof metaDataRequestSchema>
export type MetaDataResponse = z.infer<typeof metaDataResponseSchema>
