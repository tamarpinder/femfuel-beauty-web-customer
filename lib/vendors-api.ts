// Mock data functions for demo - using unified vendor adapter
import { mockData } from '@/data/shared/mock-data'
import { VendorAdapter } from '@/lib/vendor-adapter'
import { getVendorLogo, getVendorCover, getServiceImage, getProfessionalPortrait, getRandomProfessionalPortrait } from '@/lib/image-mappings'
import { getServiceDescription } from '@/lib/service-descriptions'

// Search synonyms for better matching
const SERVICE_SYNONYMS: Record<string, string[]> = {
  // Hair services
  'Corte de Cabello': ['corte', 'hair', 'pelo', 'cabello', 'haircut'],
  'Peinado': ['style', 'styling', 'arreglo', 'peinado'],
  'Tinte': ['color', 'tinte', 'dye', 'coloracion'],
  'Mechas': ['highlights', 'luces', 'mechas', 'reflejos'],
  'Alisado': ['straightening', 'liso', 'plancha', 'keratina'],
  'Alisado Dominicano': ['alisado dominicano', 'dominicano', 'dominicana', 'blowout', 'blow out', 'blower', 'secado dominicano', 'brushing', 'rolos'],
  'Permanente': ['perm', 'rizado', 'ondas', 'permanente'],
  'Tratamiento Capilar': ['treatment', 'tratamiento', 'mascarilla', 'hidratacion'],
  'Tratamiento de Keratina': ['keratina', 'keratin', 'alisado brasileño', 'brasileño', 'brazilian'],
  'Balayage': ['balayage', 'babylights', 'iluminaciones', 'mechas balayage'],
  
  // Nails services
  'Manicure': ['manicure', 'mani', 'nails', 'uñas'],
  'Manicure Dominicana': ['manicure dominicana', 'dominicana', 'manicure especial'],
  'Pedicure': ['pedicure', 'pedi', 'feet', 'pies'],
  'Pedicure Playa Dorada': ['pedicure playa', 'playa dorada', 'pedicure dominicano'],
  'Uñas Acrílicas': ['acrylic', 'acrilicas', 'artificial', 'extension'],
  'Uñas de Gel': ['gel', 'shellac', 'semipermanente', 'gel polish'],
  'Uñas de Porcelana': ['porcelana', 'porcelain', 'powder', 'dip powder'],
  'Diseño de Uñas': ['nail art', 'diseño', 'decoracion', 'art'],
  'Nail Art': ['nail art', 'arte de uñas', 'diseño', 'decoracion'],
  
  // Makeup services
  'Maquillaje': ['makeup', 'maquillaje', 'make up'],
  'Maquillaje de Novia': ['bridal', 'novias', 'wedding', 'boda', 'matrimonio'],
  'Maquillaje Social': ['event', 'fiesta', 'social', 'party', 'evento'],
  'Maquillaje Caribeño': ['caribeño', 'caribbean', 'tropical', 'dominicano'],
  'Maquillaje Profesional': ['profesional', 'professional', 'pro'],
  'Cejas': ['brows', 'eyebrows', 'cejas', 'depilacion'],
  'Microblading': ['microblading', 'micropigmentacion', 'cejas permanentes', 'tatuaje de cejas'],
  
  // Spa services
  'Masaje': ['massage', 'masajes', 'relajacion'],
  'Facial': ['facial', 'limpieza', 'tratamiento facial'],
  'Limpieza Facial': ['facial cleansing', 'limpieza', 'deep cleaning'],
  'Exfoliación': ['peeling', 'exfoliacion', 'scrub'],
  
  // Lash services
  'Extensiones de Pestañas': ['lashes', 'pestañas', 'extensions', 'extensiones'],
  'Lifting de Pestañas': ['lash lift', 'lifting', 'curl', 'rizado'],
  'Tinte de Pestañas': ['lash tint', 'tinte', 'color']
}

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
    // Start with all vendor profiles from shared mock data
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
        slug: vendor.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
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
        professionalCount: Math.min(Math.max(2, Math.ceil(vendorServices.length / 3)), 4),
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
          beforeAfter: (service as any).beforeAfter,
          addons: (service as any).addons || []
        })),
        businessHours: vendor.businessHours,
        // Generate professionals using unified adapter
        professionals: VendorAdapter.generateProfessionals(vendor, vendorServices)
      }
    })

    return transformedVendors
  } catch (error) {
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
    // Use unified vendor adapter
    const vendor = VendorAdapter.findVendor(id)
    return vendor
  } catch (error) {
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

// Search services directly (new function for better search)
export async function searchServices(searchTerm: string, limit = 50) {
  await simulateDelay()
  
  try {
    const searchLower = searchTerm.toLowerCase().trim()
    if (!searchLower) return []
    
    const allServices = await getAllServices()
    const matchedServices: any[] = []
    
    // Search through all services
    allServices.forEach(service => {
      let matchScore = 0
      
      // Check service name
      if (service.name.toLowerCase().includes(searchLower)) {
        matchScore = 100
      }
      
      // Check against synonyms
      const synonyms = SERVICE_SYNONYMS[service.name] || []
      for (const synonym of synonyms) {
        if (synonym.toLowerCase().includes(searchLower) || searchLower.includes(synonym.toLowerCase())) {
          matchScore = Math.max(matchScore, 90)
          break
        }
      }
      
      // Check service description
      if (!matchScore && service.description?.toLowerCase().includes(searchLower)) {
        matchScore = 70
      }
      
      // Check category
      if (!matchScore && service.category?.toLowerCase().includes(searchLower)) {
        matchScore = 60
      }
      
      // Check vendor name
      if (!matchScore && service.vendor?.name.toLowerCase().includes(searchLower)) {
        matchScore = 50
      }
      
      if (matchScore > 0) {
        matchedServices.push({ ...service, matchScore })
      }
    })
    
    // Sort by match score and limit results
    return matchedServices
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  } catch (error) {
    return []
  }
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
          beforeAfter: (service as any).beforeAfter, // Explicitly pass through from mock data
          transformationGallery: (service as any).transformationGallery, // Pass through transformation gallery
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
        
        // Use same filtering logic as service page: get category vendors that offer this service
        const categoryVendors = mockData.vendorProfiles.filter(vendor => 
          vendor.categories.includes(service.category)
        )
        const actualAvailableProviders = categoryVendors.filter(vendor =>
          mockData.services.some(s => s.vendorId === vendor.id && s.name === serviceName)
        )
        
        serviceMap.set(serviceName, {
          id: service.id,
          name: serviceName,
          category: service.category,
          description: getServiceDescription(serviceName),
          image: service.image,
          isPopular: service.isPopular,
          beforeAfter: service.beforeAfter,
          avgDuration: avgDuration,
          price: `RD$${Math.min(...allPrices).toLocaleString()} - RD$${Math.max(...allPrices).toLocaleString()}`,
          priceRange: {
            min: Math.min(...allPrices),
            max: Math.max(...allPrices)
          },
          searchSynonyms: SERVICE_SYNONYMS[serviceName] || [],
          availableProviders: actualAvailableProviders.length,
          featuredProvider: topVendor ? {
            id: topVendor.id,
            name: topVendor.name,
            isSponsored: true,
            sponsorshipLevel: 'destacado' as const
          } : undefined,
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
    return []
  }
}