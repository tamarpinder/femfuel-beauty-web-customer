import { NextResponse } from 'next/server'
import { VendorAdapter } from '@/lib/vendor-adapter'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const vendorId = resolvedParams.id

    // Find vendor using unified adapter
    const vendor = VendorAdapter.findVendor(vendorId)

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    // Return vendor directly (already in correct format from VendorAdapter)
    const transformedVendor = vendor

    return NextResponse.json(transformedVendor)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}