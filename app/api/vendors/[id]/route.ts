import { NextResponse } from 'next/server'
import { mockData } from '@/data/shared/mock-data'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const vendorId = resolvedParams.id

    // Find vendor by ID or slug
    const vendor = mockData.vendorProfiles.find(v => 
      v.id === vendorId || 
      v.id.toLowerCase().replace(/[^a-z0-9]/g, '-') === vendorId
    )

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    // Get vendor services
    const vendorServices = mockData.services.filter(s => s.vendorId === vendor.id)

    // Transform data to match frontend format
    const transformedVendor = {
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
        min: vendorServices.length > 0 ? Math.min(...vendorServices.map(s => s.price)) : 0,
        max: vendorServices.length > 0 ? Math.max(...vendorServices.map(s => s.price)) : 0
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
        addons: []
      })),
      businessHours: vendor.businessHours,
      gallery: vendor.portfolio.map(p => p.url)
    }

    return NextResponse.json(transformedVendor)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}