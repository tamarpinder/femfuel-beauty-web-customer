import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  try {
    const vendorId = params.id

    // Fetch vendor by slug or vendor_id
    const { data: vendor, error } = await supabase
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
          is_popular,
          image_url,
          addons
        ),
        vendor_business_hours (
          business_hours
        )
      `)
      .or(`vendor_slug.eq.${vendorId},vendor_id.eq.${vendorId}`)
      .eq('is_active', true)
      .single()

    if (error || !vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    // Transform data to match frontend format
    const transformedVendor = {
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
        isPopular: service.is_popular,
        image: service.image_url,
        addons: service.addons ? JSON.parse(service.addons as string) : []
      })) || [],
      businessHours: vendor.vendor_business_hours?.[0]?.business_hours || {},
      gallery: [
        `/vendors/${vendor.vendor_id}-1.jpg`,
        `/vendors/${vendor.vendor_id}-2.jpg`,
        `/vendors/${vendor.vendor_id}-3.jpg`
      ]
    }

    return NextResponse.json(transformedVendor)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}