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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Split Screen Layout */}
        <div className="grid grid-cols-5 gap-6 h-screen">
          {/* Left Panel - Service Information */}
          <div className="col-span-2 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Service Info */}
              <DesktopServiceInfo
                serviceName={service.name}
                category={service.category}
                price={service.price}
                duration={service.duration}
                description={service.description}
                isPopular={service.isPopular}
              />

              {/* Gallery */}
              <DesktopGallery
                serviceName={service.name}
                category={service.category}
              />
            </div>
          </div>

          {/* Right Panel - Provider Selection */}
          <div className="col-span-3 bg-white">
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