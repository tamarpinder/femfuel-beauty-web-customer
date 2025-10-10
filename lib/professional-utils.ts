import type { ProfessionalWithVendor } from "@/lib/getAllProfessionals"
import { categoryConfig, getVendorPrimaryCategory, type CategoryKey } from "@/lib/category-utils"

/**
 * Groups professionals by their vendor's primary category
 * Uses the vendor's category to determine grouping
 *
 * @param professionals - Array of professionals with vendor information
 * @returns Object with professionals grouped by category key
 */
export function groupProfessionalsByCategory(
  professionals: ProfessionalWithVendor[]
): { [key in CategoryKey]: ProfessionalWithVendor[] } {
  const grouped: { [key in CategoryKey]: ProfessionalWithVendor[] } = {
    hair: [],
    nails: [],
    makeup: [],
    spa: [],
    facial: [],
    lashes: [],
    barberia: []
  }

  professionals.forEach(professional => {
    // Create a minimal vendor object for category determination
    const vendor = {
      id: '',
      name: professional.vendor.name,
      slug: professional.vendor.slug,
      categories: getCategoriesFromVendorName(professional.vendor.name),
      // Add other required Vendor properties with defaults
      logo: '',
      coverImage: '',
      description: '',
      rating: 0,
      reviewCount: 0,
      serviceCount: 0,
      location: professional.vendor.location,
      contact: { phone: '', email: '', whatsapp: '' },
      popularServices: [],
      badges: [],
      availability: { isOpen: true, nextSlot: '', todayAvailable: true },
      professionalCount: 0,
      priceRange: { min: 0, max: 0 },
      services: [],
      businessHours: {
        monday: { open: '09:00', close: '18:00', isOpen: true },
        tuesday: { open: '09:00', close: '18:00', isOpen: true },
        wednesday: { open: '09:00', close: '18:00', isOpen: true },
        thursday: { open: '09:00', close: '18:00', isOpen: true },
        friday: { open: '09:00', close: '18:00', isOpen: true },
        saturday: { open: '09:00', close: '18:00', isOpen: true },
        sunday: { open: '10:00', close: '16:00', isOpen: false }
      },
      professionals: []
    }

    const categoryKey = getVendorPrimaryCategory(vendor)
    grouped[categoryKey].push(professional)
  })

  return grouped
}

/**
 * Groups professionals by vendor within each category
 * Creates a two-level hierarchy: Category → Vendor → Professionals
 *
 * @param professionals - Array of professionals with vendor information
 * @returns Nested object grouped by category, then by vendor
 */
export function groupProfessionalsByVendorWithinCategory(
  professionals: ProfessionalWithVendor[]
): { [categoryKey in CategoryKey]: { [vendorSlug: string]: { vendorName: string, professionals: ProfessionalWithVendor[] } } } {
  const grouped: { [categoryKey in CategoryKey]: { [vendorSlug: string]: { vendorName: string, professionals: ProfessionalWithVendor[] } } } = {
    hair: {},
    nails: {},
    makeup: {},
    spa: {},
    facial: {},
    lashes: {},
    barberia: {}
  }

  // First group by category
  const byCategory = groupProfessionalsByCategory(professionals)

  // Then group by vendor within each category
  Object.entries(byCategory).forEach(([categoryKey, categoryProfessionals]) => {
    categoryProfessionals.forEach(professional => {
      const vendorSlug = professional.vendor.slug

      if (!grouped[categoryKey as CategoryKey][vendorSlug]) {
        grouped[categoryKey as CategoryKey][vendorSlug] = {
          vendorName: professional.vendor.name,
          professionals: []
        }
      }

      grouped[categoryKey as CategoryKey][vendorSlug].professionals.push(professional)
    })
  })

  return grouped
}

/**
 * Helper function to infer categories from vendor name
 * This matches the pattern used in the vendor-adapter
 *
 * @param vendorName - Name of the vendor
 * @returns Array of category strings
 */
function getCategoriesFromVendorName(vendorName: string): string[] {
  const name = vendorName.toLowerCase()
  const categories: string[] = []

  // Hair keywords
  if (name.includes('hair') || name.includes('cabello') || name.includes('salon') || name.includes('pelo')) {
    categories.push('hair')
  }
  // Nails keywords
  if (name.includes('nail') || name.includes('uña') || name.includes('manicure') || name.includes('pedicure')) {
    categories.push('nails')
  }
  // Makeup keywords
  if (name.includes('makeup') || name.includes('maquillaje') || name.includes('beauty') || name.includes('glam')) {
    categories.push('makeup')
  }
  // Spa keywords
  if (name.includes('spa') || name.includes('wellness') || name.includes('zen')) {
    categories.push('spa')
  }
  // Lashes keywords
  if (name.includes('lash') || name.includes('pestaña') || name.includes('brow') || name.includes('ceja')) {
    categories.push('lashes')
  }

  // If no categories matched, default to spa
  if (categories.length === 0) {
    categories.push('spa')
  }

  return categories
}

/**
 * Counts professionals by category
 * Useful for displaying counts in navigation
 *
 * @param professionals - Array of professionals
 * @returns Object with category counts
 */
export function countProfessionalsByCategory(
  professionals: ProfessionalWithVendor[]
): { [key in CategoryKey]: number } {
  const grouped = groupProfessionalsByCategory(professionals)
  const counts: { [key in CategoryKey]: number } = {
    hair: 0,
    nails: 0,
    makeup: 0,
    spa: 0,
    facial: 0,
    lashes: 0,
    barberia: 0
  }

  Object.entries(grouped).forEach(([key, profs]) => {
    counts[key as CategoryKey] = profs.length
  })

  return counts
}
