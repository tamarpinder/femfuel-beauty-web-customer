// Mock data functions for demo - using shared mock data directly
import { mockData } from '@/data/shared/mock-data'
import { getVendorLogo, getVendorCover, getServiceImage, getProfessionalPortrait, getRandomProfessionalPortrait } from '@/lib/image-mappings'

export interface VendorFilters {
  category?: string
  search?: string
  limit?: number
}

// Simulate async delay for realistic demo experience
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Fetch all vendors with optional filters
export async function getVendors(filters: VendorFilters = {}) {
  await simulateDelay()
  
  try {
    // Start with all vendors from shared mock data
    let filteredVendors = [...mockData.vendorProfiles]

    // Apply category filter
    if (filters.category) {
      filteredVendors = filteredVendors.filter(vendor => 
        vendor.categories.includes(filters.category!)
      )
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredVendors = filteredVendors.filter(vendor =>
        vendor.businessName.toLowerCase().includes(searchLower) ||
        vendor.description.toLowerCase().includes(searchLower) ||
        vendor.location.district.toLowerCase().includes(searchLower)
      )
    }

    // Limit results
    if (filters.limit) {
      filteredVendors = filteredVendors.slice(0, filters.limit)
    }

    // Transform data to match frontend format
    const transformedVendors = filteredVendors.map(vendor => {
      const vendorServices = mockData.services.filter(s => s.vendorId === vendor.id)
      
      return {
        id: vendor.id,
        name: vendor.businessName,
        slug: vendor.id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        logo: getVendorLogo(vendor.businessName),
        coverImage: getVendorCover(vendor.businessName),
        description: vendor.description,
        rating: vendor.rating,
        reviewCount: vendor.reviewCount,
        serviceCount: vendorServices.length,
        location: {
          address: vendor.location.address,
          district: vendor.location.district,
          city: vendor.location.city,
          distance: "2.5km"
        },
        contact: {
          phone: vendor.user.phone,
          email: vendor.user.email,
          whatsapp: vendor.user.phone
        },
        categories: vendor.categories,
        popularServices: vendorServices
          .filter(s => s.isPopular)
          .slice(0, 3)
          .map(s => s.name),
        badges: vendor.isVerified ? ['Verificado'] : [],
        availability: {
          isOpen: true,
          nextSlot: "Hoy 3:00 PM",
          todayAvailable: true
        },
        professionalCount: 1,
        priceRange: {
          min: Math.min(...vendorServices.map(s => s.price)),
          max: Math.max(...vendorServices.map(s => s.price))
        },
        services: vendorServices.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category,
          isPopular: service.isPopular,
          image: getServiceImage(service.name),
          addons: service.addons || []
        })),
        businessHours: vendor.businessHours
      }
    })

    return transformedVendors
  } catch (error) {
    console.error('Error processing vendor data:', error)
    return []
  }
}

// Fetch vendors by category
export async function getVendorsByCategory(category: string) {
  return await getVendors({ category })
}

// Fetch vendor by ID or slug
export async function getVendorById(id: string) {
  await simulateDelay()
  
  try {
    const vendor = mockData.vendorProfiles.find(v => v.id === id || v.id.toLowerCase().replace(/[^a-z0-9]/g, '-') === id)
    if (!vendor) return null

    // Transform single vendor to match format
    const vendorServices = mockData.services.filter(s => s.vendorId === vendor.id)
    
    return {
      id: vendor.id,
      name: vendor.businessName,
      slug: vendor.id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      logo: getVendorLogo(vendor.businessName),
      coverImage: getVendorCover(vendor.businessName),
      description: vendor.description,
      rating: vendor.rating,
      reviewCount: vendor.reviewCount,
      serviceCount: vendorServices.length,
      location: {
        address: vendor.location.address,
        district: vendor.location.district,
        city: vendor.location.city,
        distance: "2.5km"
      },
      contact: {
        phone: vendor.user.phone,
        email: vendor.user.email,
        whatsapp: vendor.user.phone
      },
      categories: vendor.categories,
      popularServices: vendorServices
        .filter(s => s.isPopular)
        .slice(0, 3)
        .map(s => s.name),
      badges: vendor.isVerified ? ['Verificado'] : [],
      availability: {
        isOpen: true,
        nextSlot: "Hoy 3:00 PM",
        todayAvailable: true
      },
      professionalCount: 1,
      priceRange: {
        min: Math.min(...vendorServices.map(s => s.price)),
        max: Math.max(...vendorServices.map(s => s.price))
      },
      services: vendorServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category,
        isPopular: service.isPopular,
        image: service.images?.[0]?.url,
        addons: service.addons || []
      })),
      businessHours: vendor.businessHours,
      gallery: [
        `/vendors/galleries/${vendor.businessName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-1.png`,
        `/vendors/galleries/${vendor.businessName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-2.png`,
        `/vendors/galleries/${vendor.businessName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-3.png`
      ]
    }
  } catch (error) {
    console.error('Error fetching vendor by id:', error)
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
  // Return vendors with highest ratings and most popular services
  const allVendors = await getVendors()
  return allVendors
    .filter(v => v.services.some(s => s.isPopular))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}