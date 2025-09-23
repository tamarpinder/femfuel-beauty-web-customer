import { peinadosVendors } from "@/data/vendors/peinados"
import { maquillajeVendors } from "@/data/vendors/maquillaje"
import { unasBasicVendors } from "@/data/vendors/unas-basic"
import { mixedVendors } from "@/data/vendors/mixed"
import { spaVendors } from "@/data/vendors/spa"
import { pestanasVendors } from "@/data/vendors/pestanas"
import { unasLuxuryVendors } from "@/data/vendors/unas-luxury"

export interface Professional {
  id: string
  name: string
  image?: string
  rating: number
  reviewCount: number
  yearsExperience: number
  monthlyBookings: number
  specialties: string[]
  isTopRated?: boolean
  nextAvailable?: string
  bio?: string
  vendor: {
    name: string
    location: {
      address: string
      district: string
      city: string
    }
  }
}

export function getAllProfessionals(): Professional[] {
  const allVendors = [
    ...peinadosVendors,
    ...maquillajeVendors,
    ...unasBasicVendors,
    ...mixedVendors,
    ...spaVendors,
    ...pestanasVendors,
    ...unasLuxuryVendors
  ]

  const professionals: Professional[] = []

  allVendors.forEach(vendor => {
    if (vendor.professionals) {
      vendor.professionals.forEach(professional => {
        professionals.push({
          ...professional,
          vendor: {
            name: vendor.name,
            location: vendor.location
          }
        })
      })
    }
  })

  return professionals
}