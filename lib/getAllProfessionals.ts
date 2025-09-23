import { VendorAdapter } from "@/lib/vendor-adapter"
import { Professional } from "@/types/vendor"

export interface ProfessionalWithVendor extends Professional {
  vendor: {
    name: string
    slug: string
    location: {
      address: string
      district: string
      city: string
    }
  }
}

export function getAllProfessionals(): ProfessionalWithVendor[] {
  // Get all vendors using VendorAdapter which includes generated professionals
  const allVendors = VendorAdapter.getAllVendors()

  const professionals: ProfessionalWithVendor[] = []

  allVendors.forEach(vendor => {
    if (vendor.professionals) {
      vendor.professionals.forEach(professional => {
        professionals.push({
          ...professional,
          vendor: {
            name: vendor.name,
            slug: vendor.slug,
            location: vendor.location
          }
        })
      })
    }
  })

  return professionals
}

export function getProfessionalBySlug(slug: string): ProfessionalWithVendor | null {
  const allProfessionals = getAllProfessionals()

  // Find professional by matching slug generated from name
  return allProfessionals.find(professional => {
    const professionalSlug = professional.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return professionalSlug === slug
  }) || null
}