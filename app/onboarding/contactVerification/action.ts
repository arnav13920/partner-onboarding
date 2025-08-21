'use server'

import { otpSendResponseSchema, otpVerifyResponseSchema, type OtpSendResponse, type OtpVerifyResponse } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

type SendOtpEmailPayload = { type: 'email'; email: string }
type SendOtpMobilePayload = { type: 'mobile'; mobileNumber: string }
export type SendOtpPayload = SendOtpEmailPayload | SendOtpMobilePayload

type VerifyOtpEmailPayload = { type: 'email'; email: string; otp: string }
type VerifyOtpMobilePayload = { type: 'mobile'; mobileNumber: string; otp: string }
export type VerifyOtpPayload = VerifyOtpEmailPayload | VerifyOtpMobilePayload

export async function sendOtp(payload: SendOtpPayload): Promise<OtpSendResponse> {
  const res = await fetch(`${API_BASE_URL}/contact-verification/sendOtp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`sendOtp failed with status ${res.status}`)
  }
  const data = await res.json().catch(() => ({}))
  console.log(data, "data of sendOtp")
  const parsed = otpSendResponseSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid response format from sendOtp')
  }
  return parsed.data
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<OtpVerifyResponse> {
  const res = await fetch(`${API_BASE_URL}/contact-verification/verifyOtp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`verifyOtp failed with status ${res.status}`)
  }
  const data = await res.json().catch(() => ({}))
  console.log(data, "data of verifyOtp")
  const parsed = otpVerifyResponseSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid response format from verifyOtp')
  }
  return parsed.data
}

export async function sendOtpAction(formData: FormData) {
  const type = String(formData.get('type') || '') as 'email' | 'mobile'
  if (type === 'email') {
    const email = String(formData.get('email') || '')
    return sendOtp({ type, email })
  } else {
    const mobileNumber = String(formData.get('mobileNumber') || '')
    return sendOtp({ type, mobileNumber })
  }
}

export async function verifyOtpAction(formData: FormData) {
  const type = String(formData.get('type') || '') as 'email' | 'mobile'
  const otp = String(formData.get('otp') || '')
  if (type === 'email') {
    const email = String(formData.get('email') || '')
    return verifyOtp({ type, email, otp })
  } else {
    const mobileNumber = String(formData.get('mobileNumber') || '')
    return verifyOtp({ type, mobileNumber, otp })
  }
}


