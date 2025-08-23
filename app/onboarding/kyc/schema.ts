import { z } from "zod";

export const verifyPanResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      pan: z.string().optional(),
      name: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

export const verifyBankResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      account_number: z.string().optional(),
      ifsc_code: z.string().optional(),
      account_holder_name: z.string().optional(),
      bank_name: z.string().optional(),
    })
    .optional(),
});

export const verifyGstResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      gst_number: z.string().optional(),
      legal_name: z.string().optional(),
      state: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

export const verifySrnResponseSchema = z.object({
  success: z.boolean().optional().default(true),
  message: z.string().optional(),
  data: z
    .object({
      srn_number: z.string().optional(),
      entity_name: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
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


