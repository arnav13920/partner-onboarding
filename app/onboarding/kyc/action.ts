'use server'

import {
  verifyPanResponseSchema,
  verifyBankResponseSchema,
  verifyGstResponseSchema,
  verifySrnResponseSchema,
  type VerifyPanResponse,
  type VerifyBankResponse,
  type VerifyGstResponse,
  type VerifySrnResponse,
} from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function verifyPan(pan: string): Promise<VerifyPanResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyPan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pan }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`verifyPan failed with status ${res.status}`)
  const data = await res.json().catch(() => ({}))
  console.log(data,"data from verify pan")
  const parsed = verifyPanResponseSchema.safeParse(data)
  if (!parsed.success) throw new Error('Invalid response format from verifyPan')
  return parsed.data
}

export async function verifyPanAction(formData: FormData) {
  const pan = String(formData.get('pan') || '')
  return verifyPan(pan)
}

export async function verifyBank(account_number: string, ifsc_code: string): Promise<VerifyBankResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyBank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ account_number, ifsc_code }),
    cache: 'no-store',
  })
  console.log(res,"response from verify bank")
  if (!res.ok) throw new Error(`verifyBank failed with status ${res.status}`)
  const data = await res.json().catch(() => ({}))
  console.log(data,"data from verify bank")
  const parsed = verifyBankResponseSchema.safeParse(data)
  if (!parsed.success) throw new Error('Invalid response format from verifyBank')
  return parsed.data
}

export async function verifyBankAction(formData: FormData) {
  const account_number = String(formData.get('account_number') || '')
  const ifsc_code = String(formData.get('ifsc_code') || '')
  return verifyBank(account_number, ifsc_code)
}

export async function verifyGst(gst_number: string): Promise<VerifyGstResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifyGst`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gst_number }),
    cache: 'no-store',
  })
  console.log(res,"response from verify gst")
  if (!res.ok) throw new Error(`verifyGst failed with status ${res.status}`)
  const data = await res.json().catch(() => ({}))
  console.log(data,"data from verify gst")
  const parsed = verifyGstResponseSchema.safeParse(data)
  if (!parsed.success) throw new Error('Invalid response format from verifyGst')
  return parsed.data
}

export async function verifyGstAction(formData: FormData) {
  const gst_number = String(formData.get('gst_number') || '')
  return verifyGst(gst_number)
}

export async function verifySrn(srn_number: string): Promise<VerifySrnResponse> {
  const res = await fetch(`${API_BASE_URL}/kyc/verifySrn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ srn_number }),
    cache: 'no-store',
  })
  console.log(res,"response from verify srn")
  if (!res.ok) throw new Error(`verifySrn failed with status ${res.status}`)
  const data = await res.json().catch(() => ({}))
  console.log(data,"data from verify srn")
  const parsed = verifySrnResponseSchema.safeParse(data)
  if (!parsed.success) throw new Error('Invalid response format from verifySrn')
  return parsed.data
}

export async function verifySrnAction(formData: FormData) {
  const srn_number = String(formData.get('srn_number') || '')
  return verifySrn(srn_number)
}


