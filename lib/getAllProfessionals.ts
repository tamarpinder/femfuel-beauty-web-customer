import { peinadosVendors } from "@/data/vendors/peinados"
import { maquillajeVendors } from "@/data/vendors/maquillaje"
import { unasBasicVendors } from "@/data/vendors/unas-basic"
import { mixedVendors } from "@/data/vendors/mixed"
import { spaVendors } from "@/data/vendors/spa"
import { pestanasVendors } from "@/data/vendors/pestanas"
import { unasLuxuryVendors } from "@/data/vendors/unas-luxury"
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
  // Aggregate all vendor data
  const allVendors = [
    ...peinadosVendors,
    ...maquillajeVendors,
    ...unasBasicVendors,
    ...mixedVendors,
    ...spaVendors,
    ...pestanasVendors,
    ...unasLuxuryVendors
  ]

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