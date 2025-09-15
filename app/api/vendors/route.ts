import { NextResponse } from 'next/server'
import { VendorAdapter } from '@/lib/vendor-adapter'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Get all vendors using unified adapter
    let filteredVendors = VendorAdapter.getAllVendors()

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
        vendor.name.toLowerCase().includes(searchLower) ||
        vendor.description.toLowerCase().includes(searchLower) ||
        vendor.location.district.toLowerCase().includes(searchLower)
      )
    }

    // Limit results
    filteredVendors = filteredVendors.slice(0, limit)

    // Return vendors directly (already in correct format from VendorAdapter)
    const transformedVendors = filteredVendors

    return NextResponse.json(transformedVendors)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}