// API functions to fetch vendor data from database instead of mock data

export interface VendorFilters {
  category?: string
  search?: string
  limit?: number
}

// Fetch all vendors with optional filters
export async function getVendors(filters: VendorFilters = {}) {
  try {
    const params = new URLSearchParams()
    
    if (filters.category) params.append('category', filters.category)
    if (filters.search) params.append('search', filters.search)
    if (filters.limit) params.append('limit', filters.limit.toString())

    const response = await fetch(`/api/vendors?${params.toString()}`, {
      cache: 'no-store', // Always fetch fresh data for now
    })

    if (!response.ok) {
      throw new Error('Failed to fetch vendors')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return []
  }
}

// Fetch vendors by category
export async function getVendorsByCategory(category: string) {
  return await getVendors({ category })
}

// Fetch vendor by ID or slug
export async function getVendorById(id: string) {
  try {
    const response = await fetch(`/api/vendors/${id}`, {
      cache: 'no-store', // Always fetch fresh data for now
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch vendor')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return null
  }
}

// Fetch vendor by slug (alias for getVendorById)
export async function getVendorBySlug(slug: string) {
  return await getVendorById(slug)
}

// Search vendors
export async function searchVendors(searchTerm: string, limit = 20) {
  return await getVendors({ search: searchTerm, limit })
}

// Get nearby vendors (placeholder - would need geolocation)
export async function getNearbyVendors(limit = 10) {
  return await getVendors({ limit })
}

// Get featured/top rated vendors
export async function getFeaturedVendors(limit = 6) {
  return await getVendors({ limit })
}