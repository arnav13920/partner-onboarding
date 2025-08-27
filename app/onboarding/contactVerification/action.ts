"use server";

import {
  sendOtpRequestSchema,
  sendOtpResponseSchema,
  verifyOtpRequestSchema,
  verifyOtpResponseSchema,
  type SendOtpRequest,
  type SendOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
} from "./schema";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function sendOtpAction(
  formData: FormData
): Promise<SendOtpResponse> {
  try {
    // Get form data
    const mobile = String(formData.get("mobile") || "");
    const email = String(formData.get("email") || "");
    const userId = Number(formData.get("userId") || 0);
    const userType = String(formData.get("userType") || "");

    if (!userId || !userType) {
      throw new Error("userId and userType are required");
    }

    if (!mobile && !email) {
      throw new Error("Either mobile or email is required");
    }

    // Prepare request payload
    const requestPayload: SendOtpRequest = {
      mobile: mobile || undefined,
      email: email || undefined,
      userId,
      userType,
    };

    // Validate request data
    const validatedRequest = sendOtpRequestSchema.parse(requestPayload);
    console.log(validatedRequest, "validated request for send OTP");

    // Call the API
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedRequest),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Send OTP API failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log(data, "response from send OTP API");

    // Validate response data
    const validatedResponse = sendOtpResponseSchema.parse(data);
    return validatedResponse;
  } catch (error) {
    console.error("Send OTP error:", error);
    if (error instanceof Error) {
      throw new Error(`Send OTP failed: ${error.message}`);
    }
    throw new Error("Send OTP failed: Unknown error");
  }
}

export async function verifyOtpAction(
  formData: FormData
): Promise<VerifyOtpResponse> {
  try {
    // Get form data
    const mobile = String(formData.get("mobile") || "");
    const email = String(formData.get("email") || "");
    const otp = Number(formData.get("otp") || 0);
    const type = String(formData.get("type") || ""); // 'MOBILE' or 'EMAIL'
    const userId = Number(formData.get("userId") || 0);
    const userType = String(formData.get("userType") || "");



    if (!userId || !userType || !otp || !type) {
      throw new Error("userId, userType, otp, and type are required");
    }

    if (!mobile && !email) {
      throw new Error("Either mobile or email is required");
    }

    // Prepare request payload
    const requestPayload: VerifyOtpRequest = {
      mobile: mobile || undefined,
      email: email || undefined,
      otp,
      type,
      userType,
      userId,
    };

    // Validate request data
    const validatedRequest = verifyOtpRequestSchema.parse(requestPayload);
    console.log(validatedRequest, "validated request for verify OTP");

    // Call the API
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedRequest),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Verify OTP API failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log(data, "response from verify OTP API");

    // Validate response data
    const validatedResponse = verifyOtpResponseSchema.parse(data);
    return validatedResponse;
  } catch (error) {
    console.error("Verify OTP error:", error);
    if (error instanceof Error) {
      throw new Error(`Verify OTP failed: ${error.message}`);
    }
    throw new Error("Verify OTP failed: Unknown error");
  }
}
