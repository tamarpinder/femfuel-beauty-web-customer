import { VendorAdapter } from "@/lib/vendor-adapter"
import { starProfessionals } from "@/data/star-professionals"
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

  // Add star professionals first (with mock vendor data)
  starProfessionals.forEach(starProf => {
    professionals.push({
      ...starProf,
      vendor: {
        name: starProf.vendorName,
        slug: starProf.vendorSlug,
        location: {
          address: "Santo Domingo",
          district: "Piantini",
          city: "Santo Domingo"
        }
      }
    })
  })

  // Add generated professionals from vendors
  allVendors.forEach(vendor => {
    if (vendor.professionals) {
      vendor.professionals.forEach(professional => {
        // Skip if this professional is already a star professional (by ID)
        const isStarProfessional = starProfessionals.some(sp => sp.id === professional.id)
        if (!isStarProfessional) {
          professionals.push({
            ...professional,
            vendor: {
              name: vendor.name,
              slug: vendor.slug,
              location: vendor.location
            }
          })
        }
      })
    }
  })

  return professionals
}

export function getProfessionalBySlug(slug: string): ProfessionalWithVendor | null {
  const allProfessionals = getAllProfessionals()

  // Find professional by matching slug generated from name OR by ID
  return allProfessionals.find(professional => {
    const professionalSlug = professional.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return professionalSlug === slug || professional.id === slug
  }) || null
}