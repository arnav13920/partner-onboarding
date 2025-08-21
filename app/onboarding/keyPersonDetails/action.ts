'use server'

import { addKeyPersonResponseSchema, type AddKeyPersonResponse } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export type KeyPersonItem = {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
}

export async function addKeyPersonDetails(items: KeyPersonItem[]): Promise<AddKeyPersonResponse> {
  console.log(items, "items from add key person details")
  const payload = { personDetils: items }
  const res = await fetch(`${API_BASE_URL}/key-person-details/addKeyPersonDetails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`addKeyPersonDetails failed with status ${res.status}`)
  const data = await res.json().catch(() => ({}))
  const parsed = addKeyPersonResponseSchema.safeParse(data)
  if (!parsed.success) throw new Error('Invalid response format from addKeyPersonDetails')
  return parsed.data
}


