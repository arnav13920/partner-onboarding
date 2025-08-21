'use server'

import { aboutYouResponseSchema, type AboutYouResponse } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export type SubmitAboutYouPayload = {
  partner_identity: string
  buisness_type: string
  buisness_category?: string
}

export async function submitAboutYou(payload: SubmitAboutYouPayload): Promise<AboutYouResponse> {
  console.log(payload,"payload from about you")
  const res = await fetch(`${API_BASE_URL}/about/aboutYou`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  console.log(res,"response from about you")

  if (!res.ok) {
    const message = `AboutYou request failed with status ${res.status}`
    throw new Error(message)
  }

  const data = await res.json().catch(() => ({}))
  console.log(data,"data from about you")
  const parsed = aboutYouResponseSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid response format from /about/aboutYou')
  }
  return parsed.data
}

export async function submitAboutYouAction(formData: FormData) {
  const partner_identity = String(formData.get('partner_identity') || '')
  const buisness_type = String(formData.get('buisness_type') || '')
  const buisness_category_raw = formData.get('buisness_category')
  const buisness_category = typeof buisness_category_raw === 'string' && buisness_category_raw.trim() !== ''
    ? buisness_category_raw
    : undefined

  const payload: SubmitAboutYouPayload = {
    partner_identity,
    buisness_type,
    ...(buisness_category ? { buisness_category } : {}),
  }

  return submitAboutYou(payload)
}


