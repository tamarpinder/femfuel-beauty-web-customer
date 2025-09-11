// Mock data functions for demo - using shared mock data directly
import { mockData } from '@/data/shared/mock-data'
import { getVendorLogo, getVendorCover, getServiceImage, getProfessionalPortrait, getRandomProfessionalPortrait } from '@/lib/image-mappings'
import { getServiceDescription } from '@/lib/service-descriptions'

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

    // Sort vendors alphabetically by business name (using Spanish locale for proper ordering)
    filteredVendors.sort((a, b) => a.businessName.localeCompare(b.businessName, 'es-ES'))

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
          phone: vendor.user.phone || "",
          email: vendor.user.email,
          whatsapp: vendor.user.phone || ""
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
          slug: `${service.category}-${service.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category,
          isPopular: service.isPopular,
          image: getServiceImage(service.name),
          addons: (service as any).addons || []
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
        phone: vendor.user.phone || "",
        email: vendor.user.email,
        whatsapp: vendor.user.phone || ""
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
        slug: `${service.category}-${service.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category,
        isPopular: service.isPopular,
        image: service.images?.[0]?.url,
        addons: (service as any).addons || []
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

// Get all services across all vendors
export async function getAllServices() {
  await simulateDelay()
  
  try {
    const allVendors = await getVendors()
    const allServices: any[] = []
    
    // Collect all services from all vendors
    allVendors.forEach(vendor => {
      vendor.services.forEach(service => {
        allServices.push({
          ...service,
          slug: `${service.category}-${service.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`,
          vendor: {
            id: vendor.id,
            name: vendor.name,
            slug: vendor.slug,
            logo: vendor.logo,
            rating: vendor.rating,
            reviewCount: vendor.reviewCount,
            location: vendor.location,
            priceRange: vendor.priceRange
          }
        })
      })
    })
    
    return allServices
  } catch (error) {
    console.error('Error getting all services:', error)
    return []
  }
}

// Get services by category
export async function getServicesByCategory(category: string) {
  const allServices = await getAllServices()
  return allServices.filter(service => service.category === category)
}

// Get marketplace services with aggregated information
export async function getMarketplaceServices(filters: VendorFilters = {}) {
  await simulateDelay()
  
  try {
    const allServices = await getAllServices()
    const serviceMap = new Map<string, any>()
    
    // Group services by name to aggregate information
    allServices.forEach(service => {
      const serviceName = service.name
      
      if (!serviceMap.has(serviceName)) {
        // Find top-rated vendor for this service (could be sponsored)
        const vendorsForService = allServices
          .filter(s => s.name === serviceName)
          .sort((a, b) => b.vendor.rating - a.vendor.rating)
        
        const topVendor = vendorsForService[0]?.vendor
        const allPrices = vendorsForService.map(s => s.price)
        const allDurations = vendorsForService.map(s => s.duration)
        
        // Calculate average duration across all vendors offering this service
        const avgDuration = Math.round(allDurations.reduce((sum, duration) => sum + duration, 0) / allDurations.length)
        
        serviceMap.set(serviceName, {
          id: service.id,
          name: serviceName,
          category: service.category,
          description: getServiceDescription(serviceName),
          image: service.image,
          isPopular: service.isPopular,
          avgDuration: avgDuration,
          price: `RD$${Math.min(...allPrices).toLocaleString()} - RD$${Math.max(...allPrices).toLocaleString()}`,
          priceRange: {
            min: Math.min(...allPrices),
            max: Math.max(...allPrices)
          },
          availableProviders: vendorsForService.length,
          slug: `${service.category}-${serviceName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`
        })
      }
    })
    
    let marketplaceServices = Array.from(serviceMap.values())
    
    // Apply filters
    if (filters.category) {
      marketplaceServices = marketplaceServices.filter(service => 
        service.category === filters.category
      )
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      marketplaceServices = marketplaceServices.filter(service =>
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort alphabetically by service name (using Spanish locale for proper ordering)
    marketplaceServices.sort((a, b) => a.name.localeCompare(b.name, 'es-ES'))
    
    if (filters.limit) {
      marketplaceServices = marketplaceServices.slice(0, filters.limit)
    }
    
    return marketplaceServices
  } catch (error) {
    console.error('Error getting marketplace services:', error)
    return []
  }
}