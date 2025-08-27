'use server'

import { 
  onboardingRequestSchema, 
  onboardingResponseSchema, 
  metaDataRequestSchema,
  metaDataResponseSchema,
  type OnboardingRequest, 
  type OnboardingResponse,
  type MetaDataRequest,
  type MetaDataResponse
} from './schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function startOnboarding(mobile: string): Promise<OnboardingResponse> {
  // Validate request data
  const requestData: OnboardingRequest = { mobile }
  const validatedRequest = onboardingRequestSchema.parse(requestData)
  
  try {
    const res = await fetch(`${API_BASE_URL}/auth/onboarding`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(validatedRequest),
      cache: 'no-store',
    })
    
    if (!res.ok) {
      throw new Error(`Onboarding API failed with status ${res.status}`)
    }
    
    const data = await res.json()
    console.log('Onboarding API response:', data)
    
    // Validate response data
    const validatedResponse = onboardingResponseSchema.parse(data)
    return validatedResponse
    
  } catch (error) {
    console.error('Onboarding API error:', error)
    if (error instanceof Error) {
      throw new Error(`Onboarding failed: ${error.message}`)
    }
    throw new Error('Onboarding failed: Unknown error')
  }
}



export async function fetchMetaData(userId: number, userType: string): Promise<MetaDataResponse> {
  // Validate request data
  const requestData: MetaDataRequest = { userId, userType }
  const validatedRequest = metaDataRequestSchema.parse(requestData)
  
  try {
    const res = await fetch(`${API_BASE_URL}/partner/data`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(validatedRequest),
      cache: 'no-store',
    })
    
    if (!res.ok) {
      throw new Error(`Meta data API failed with status ${res.status}`)
    }
    
    const data = await res.json()
    console.log('Meta data API response:', data)
    
    // Validate response data
    const validatedResponse = metaDataResponseSchema.parse(data)
    return validatedResponse
    
  } catch (error) {
    console.error('Meta data API error:', error)
    if (error instanceof Error) {
      throw new Error(`Meta data fetch failed: ${error.message}`)
    }
    throw new Error('Meta data fetch failed: Unknown error')
  }
}
