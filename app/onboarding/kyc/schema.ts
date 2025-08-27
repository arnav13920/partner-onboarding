import { z } from "zod";

export const verifyPanResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    pan: z.string(),
    status: z.string(),
    name: z.string(),
    category: z.string(),
    transactionId: z.string(),
  }),
});

export const verifyBankResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    accountStatus: z.string(),
    beneficiaryName: z.string(),
    bankReferenceNumber: z.string(),
    transactionId: z.string(),
  }),
});

export const verifyGstResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const verifySrnResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const uploadPdfResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    filename: z.string(),
    originalName: z.string(),
    size: z.number(),
    mimetype: z.string(),
    path: z.string(),
    storageType: z.string(),
  }),
});

export type VerifyPanResponse = z.infer<typeof verifyPanResponseSchema>;
export type VerifyBankResponse = z.infer<typeof verifyBankResponseSchema>;
export type VerifyGstResponse = z.infer<typeof verifyGstResponseSchema>;
export type VerifySrnResponse = z.infer<typeof verifySrnResponseSchema>;
export type UploadPdfResponse = z.infer<typeof uploadPdfResponseSchema>;
