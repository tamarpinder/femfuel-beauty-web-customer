import { NextResponse } from 'next/server'
import { mockData } from '@/data/shared/mock-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Start with all vendors
    let filteredVendors = [...mockData.vendorProfiles]

    // Apply category filter
    if (category) {
      filteredVendors = filteredVendors.filter(vendor => 
        vendor.categories.includes(category)
      )
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredVendors = filteredVendors.filter(vendor =>
        vendor.businessName.toLowerCase().includes(searchLower) ||
        vendor.description.toLowerCase().includes(searchLower) ||
        vendor.location.district.toLowerCase().includes(searchLower)
      )
    }

    // Limit results
    filteredVendors = filteredVendors.slice(0, limit)

    // Transform data to match frontend format
    const transformedVendors = filteredVendors.map(vendor => {
      const vendorServices = mockData.services.filter(s => s.vendorId === vendor.id)
      
      return {
        id: vendor.id,
        name: vendor.businessName,
        slug: vendor.id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        logo: vendor.user.avatar,
        coverImage: `/vendor-cover-${vendor.id}.jpg`,
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
          .filter(s => s && s.isPopular)
          .slice(0, 3)
          .map(s => s?.name || ''),
        badges: vendor.isVerified ? ['Verificado'] : [],
        availability: {
          isOpen: true,
          nextSlot: "Hoy 3:00 PM",
          todayAvailable: true
        },
        professionalCount: 1,
        priceRange: {
          min: vendorServices.length > 0 ? Math.min(...vendorServices.filter(s => s).map(s => s?.price || 0)) : 0,
          max: vendorServices.length > 0 ? Math.max(...vendorServices.filter(s => s).map(s => s?.price || 0)) : 0
        },
        services: vendorServices.filter(service => service).map(service => ({
          id: service?.id || '',
          name: service?.name || '',
          description: service?.description || '',
          price: service?.price || 0,
          duration: service?.duration || 60,
          category: service?.category || '',
          isPopular: service?.isPopular || false,
          image: service?.images?.[0]?.url || ''
        })),
        businessHours: vendor.businessHours
      }
    })

    return NextResponse.json(transformedVendors)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}