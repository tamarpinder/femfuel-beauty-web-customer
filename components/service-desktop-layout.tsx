"use client"

import { DesktopGallery } from "@/components/desktop-gallery"
import { DesktopServiceInfo } from "@/components/desktop-service-info"
import { DesktopProviderList } from "@/components/desktop-provider-list"
import type { Vendor } from "@/types/vendor"

interface ServiceWithVendor {
  id: string
  slug?: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  isPopular?: boolean
  image?: string
  beforeAfter?: {
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }
  transformationGallery?: Array<{
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }>
  vendor: {
    id: string
    name: string
    slug: string
    logo?: string
    rating: number
    reviewCount: number
    location: {
      address: string
      district: string
      city: string
      distance?: string
    }
    priceRange: {
      min: number
      max: number
    }
  }
}

interface ServiceDesktopLayoutProps {
  service: ServiceWithVendor
  providers: Vendor[]
  onProviderSelect: (vendor: Vendor) => void
  onBookNow: (vendor: Vendor) => void
}

export function ServiceDesktopLayout({
  service,
  providers,
  onProviderSelect,
  onBookNow
}: ServiceDesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 lg:pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Split Screen Layout */}
        <div className="grid grid-cols-5 gap-8 min-h-[calc(100vh-8rem)]">
          {/* Left Panel - Service Information */}
          <div className="col-span-2 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-femfuel-rose/10 overflow-y-auto">
            <div className="p-8 space-y-10">
              {/* Gallery */}
              <DesktopGallery
                serviceName={service.name}
                category={service.category}
                beforeAfter={service.beforeAfter}
              />

              {/* Service Info */}
              <DesktopServiceInfo
                serviceName={service.name}
                category={service.category}
                price={service.price}
                duration={service.duration}
                description={service.description}
                isPopular={service.isPopular}
              />
            </div>
          </div>

          {/* Right Panel - Provider Selection */}
          <div className="col-span-3 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-femfuel-rose/10 overflow-y-auto">
            <DesktopProviderList
              providers={providers}
              serviceName={service.name}
              onProviderSelect={onProviderSelect}
              onBookNow={onBookNow}
            />
          </div>
        </div>
      </div>
    </div>
  )
}