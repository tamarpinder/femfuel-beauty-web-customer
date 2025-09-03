import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit') || '20'

    // Build query
    let query = supabase
      .from('vendor_profiles')
      .select(`
        *,
        vendor_services (
          id,
          service_id,
          name,
          description,
          price,
          duration,
          category,
          is_popular
        ),
        vendor_business_hours (
          business_hours
        )
      `)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(parseInt(limit))

    // Apply filters
    if (category) {
      query = query.ilike('categories', `%${category}%`)
    }

    if (search) {
      query = query.or(`business_name.ilike.%${search}%,description.ilike.%${search}%,business_district.ilike.%${search}%`)
    }

    const { data: vendors, error } = await query

    if (error) {
      console.error('Error fetching vendors:', error)
      return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
    }

    // Transform data to match frontend format
    const transformedVendors = vendors?.map(vendor => ({
      id: vendor.vendor_id || vendor.id,
      name: vendor.business_name,
      slug: vendor.vendor_slug || vendor.vendor_id,
      logo: `/vendors/${vendor.vendor_id}-logo.png`,
      coverImage: `/vendors/${vendor.vendor_id}-cover.jpg`,
      description: vendor.description,
      rating: parseFloat(vendor.rating) || 0,
      reviewCount: vendor.review_count || 0,
      serviceCount: vendor.service_count || vendor.vendor_services?.length || 0,
      location: {
        address: vendor.business_address,
        district: vendor.business_district,
        city: vendor.business_city,
        distance: "2.5km" // Calculate based on user location
      },
      contact: {
        phone: vendor.business_phone,
        email: vendor.business_email,
        whatsapp: vendor.business_whatsapp
      },
      categories: vendor.categories?.split(',') || [],
      popularServices: vendor.vendor_services
        ?.filter(s => s.is_popular)
        ?.slice(0, 3)
        ?.map(s => s.name) || [],
      badges: vendor.badges?.split(',').filter(b => b) || [],
      availability: {
        isOpen: true, // Calculate based on current time and business hours
        nextSlot: "Hoy 3:00 PM",
        todayAvailable: true
      },
      professionalCount: vendor.professional_count || 1,
      priceRange: {
        min: vendor.price_range_min || 0,
        max: vendor.price_range_max || 0
      },
      services: vendor.vendor_services?.map(service => ({
        id: service.service_id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category,
        isPopular: service.is_popular
      })) || [],
      businessHours: vendor.vendor_business_hours?.[0]?.business_hours || {}
    }))

    return NextResponse.json(transformedVendors)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}