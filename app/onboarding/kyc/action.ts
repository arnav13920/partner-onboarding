"use server";

import {
  verifyPanResponseSchema,
  verifyBankResponseSchema,
  verifyGstResponseSchema,
  verifySrnResponseSchema,
  uploadPdfResponseSchema,
  type VerifyPanResponse,
  type VerifyBankResponse,
  type VerifyGstResponse,
  type VerifySrnResponse,
  type UploadPdfResponse,
} from "./schema";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function verifyPan(
  pan: string,
  userId: number,
  userType: string
): Promise<VerifyPanResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyPan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pan, userId, userType }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`verifyPan failed with status ${res.status}`);
  const data = await res.json().catch(() => ({}));
  console.log(data, "data from verify pan");
  const parsed = verifyPanResponseSchema.safeParse(data);
  if (!parsed.success)
    throw new Error("Invalid response format from verifyPan");
  // Save to localStorage via server action isn't possible; return parsed to client to persist
  return parsed.data;
}

export async function verifyPanAction(formData: FormData) {
  const pan = String(formData.get("pan") || "");
  const userId = Number(formData.get("userId") || 0);
  const userType = String(formData.get("userType") || "");
  if (!userId || !userType) throw new Error("userId and userType are required");
  return verifyPan(pan, userId, userType);
}

export async function verifyBank(
  account_number: string,
  ifsc_code: string,
  userId: number
): Promise<VerifyBankResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyBank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, account_number, ifsc_code }),
    cache: "no-store",
  });
  console.log(res, "response from verify bank");
  if (!res.ok) throw new Error(`verifyBank failed with status ${res.status}`);
  const data = await res.json().catch(() => ({}));
  console.log(data, "data from verify bank");
  const parsed = verifyBankResponseSchema.safeParse(data);
  if (!parsed.success)
    throw new Error("Invalid response format from verifyBank");
  return parsed.data;
}

export async function verifyBankAction(formData: FormData) {
  const account_number = String(formData.get("account_number") || "");
  const ifsc_code = String(formData.get("ifsc_code") || "");
  const userId = Number(formData.get("userId") || 0);
  if (!userId) throw new Error("userId is required");
  return verifyBank(account_number, ifsc_code, userId);
}

export async function verifyGst(
  gst_number: string,
  userId: number
): Promise<VerifyGstResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyGst`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gst_number, userId }),
    cache: "no-store",
  });
  console.log(res, "response from verify gst");
  if (!res.ok) throw new Error(`verifyGst failed with status ${res.status}`);
  const data = await res.json().catch(() => ({}));
  console.log(data, "data from verify gst");
  const parsed = verifyGstResponseSchema.safeParse(data);
  if (!parsed.success)
    throw new Error("Invalid response format from verifyGst");
  return parsed.data;
}

export async function verifyGstAction(formData: FormData) {
  const gst_number = String(formData.get("gst_number") || "");
  const userId = Number(formData.get("userId") || 0);
  if (!userId) throw new Error("userId is required");
  return verifyGst(gst_number, userId);
}

export async function verifySrn(
  srn_number: string,
  userId: number
): Promise<VerifySrnResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifySrn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ srn_number, userId }),
    cache: "no-store",
  });
  console.log(res, "response from verify srn");
  if (!res.ok) throw new Error(`verifySrn failed with status ${res.status}`);
  const data = await res.json().catch(() => ({}));
  console.log(data, "data from verify srn");
  const parsed = verifySrnResponseSchema.safeParse(data);
  if (!parsed.success)
    throw new Error("Invalid response format from verifySrn");
  return parsed.data;
}

export async function verifySrnAction(formData: FormData) {
  const srn_number = String(formData.get("srn_number") || "");
  const userId = Number(formData.get("userId") || 0);
  if (!userId) throw new Error("userId is required");
  return verifySrn(srn_number, userId);
}

export async function uploadPdf(file: File): Promise<UploadPdfResponse> {
  const formData = new FormData();
  formData.append("pdf", file);

  const res = await fetch(`${API_BASE_URL}/kyc/uploadPdf`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`uploadPdf failed with status ${res.status}`);
  const data = await res.json().catch(() => ({}));
  console.log(data, "data from upload pdf");
  const parsed = uploadPdfResponseSchema.safeParse(data);
  if (!parsed.success)
    throw new Error("Invalid response format from uploadPdf");
  return parsed.data;
}

export async function uploadPdfAction(formData: FormData) {
  const file = formData.get("pdf") as File;
  if (!file) throw new Error("No file provided");
  return uploadPdf(file);
}
