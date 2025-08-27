'use server'

import { aboutYouRequestSchema, aboutYouResponseSchema, type AboutYouRequest, type AboutYouResponse } from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function submitAboutYouAction(formData: FormData): Promise<AboutYouResponse> {
  try {
    // Get form data
    const partnerIdentity = String(formData.get('partner_identity') || '')
    const businessType = String(formData.get('buisness_type') || '')
    const businessCategory = String(formData.get('buisness_category') || '')
    
    // Get userId and userType from localStorage (this will be passed from the client)
    // For now, we'll require them as parameters
    const userId = Number(formData.get('userId') || 0)
    const userType = String(formData.get('userType') || '')
    
    if (!userId || !userType) {
      throw new Error('userId and userType are required')
    }
    
    // Prepare request payload
    const requestPayload: AboutYouRequest = {
      partnerIdentity,
      businessType,
      businessCategory: businessCategory || undefined,
      userType,
      userId,
    }
    
    // Validate request data
    const validatedRequest = aboutYouRequestSchema.parse(requestPayload)
    console.log(validatedRequest, "validated request for about you")
    
    // Call the API
    const res = await fetch(`${API_BASE_URL}/about/persist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedRequest),
      cache: 'no-store',
    })
    
    if (!res.ok) {
      throw new Error(`About You API failed with status ${res.status}`)
    }
    
    const data = await res.json()
    console.log(data, "response from about you API")
    
    // Validate response data
    const validatedResponse = aboutYouResponseSchema.parse(data)
    return validatedResponse
    
  } catch (error) {
    console.error('About You submission error:', error)
    if (error instanceof Error) {
      throw new Error(`About You submission failed: ${error.message}`)
    }
    throw new Error('About You submission failed: Unknown error')
  }
}


