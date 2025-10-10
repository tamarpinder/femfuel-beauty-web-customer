import type { Vendor } from "@/types/vendor"

export type CategoryKey = "hair" | "nails" | "makeup" | "spa" | "facial" | "lashes" | "barberia"

export interface CategoryInfo {
  key: CategoryKey
  name: string
  keywords: string[]
}

/**
 * Unified category configuration for vendor categorization
 * Used across vendors, nearby, and other vendor listing pages
 */
export const categoryConfig: CategoryInfo[] = [
  { key: "hair", name: "Cabello", keywords: ["hair", "cabello", "pelo", "corte", "color", "peinado"] },
  { key: "nails", name: "Uñas", keywords: ["nail", "uñas", "manicure", "pedicure"] },
  { key: "makeup", name: "Maquillaje", keywords: ["makeup", "maquillaje", "maquillista"] },
  { key: "spa", name: "Spa", keywords: ["spa", "masaje", "massage", "relajación"] },
  { key: "facial", name: "Facial", keywords: ["facial", "tratamiento", "skincare", "piel"] },
  { key: "lashes", name: "Pestañas", keywords: ["lash", "pestañas", "cejas", "brows"] },
  { key: "barberia", name: "Barbería", keywords: ["barber", "barbería", "barbero"] }
]

/**
 * Groups vendors by category based on their categories array
 * Matches vendor categories against keywords to determine grouping
 * Vendors without categories or unmatched categories default to "spa"
 *
 * @param vendors - Array of vendors to group
 * @returns Object with vendors grouped by category key
 */
export function groupVendorsByCategory(vendors: Vendor[]): { [key in CategoryKey]: Vendor[] } {
  const grouped: { [key in CategoryKey]: Vendor[] } = {
    hair: [],
    nails: [],
    makeup: [],
    spa: [],
    facial: [],
    lashes: [],
    barberia: []
  }

  vendors.forEach(vendor => {
    if (!vendor.categories || vendor.categories.length === 0) {
      // If no category, default to spa
      grouped.spa.push(vendor)
      return
    }

    // Find which category this vendor belongs to
    let categorized = false
    for (const config of categoryConfig) {
      const matches = vendor.categories.some(cat =>
        config.keywords.some(keyword => cat.toLowerCase().includes(keyword))
      )
      if (matches) {
        grouped[config.key].push(vendor)
        categorized = true
        break
      }
    }

    // If couldn't categorize, add to spa as default
    if (!categorized) {
      grouped.spa.push(vendor)
    }
  })

  return grouped
}

/**
 * Gets all keywords for a specific category
 * Useful for search and filtering operations
 *
 * @param categoryKey - The category to get keywords for
 * @returns Array of keywords or empty array if category not found
 */
export function getCategoryKeywords(categoryKey: CategoryKey): string[] {
  const category = categoryConfig.find(cat => cat.key === categoryKey)
  return category?.keywords || []
}

/**
 * Gets category name by key
 *
 * @param categoryKey - The category key
 * @returns Category name in Spanish or empty string if not found
 */
export function getCategoryName(categoryKey: CategoryKey): string {
  const category = categoryConfig.find(cat => cat.key === categoryKey)
  return category?.name || ''
}

/**
 * Determines the primary category for a vendor
 * Returns the first matching category or 'spa' as default
 *
 * @param vendor - The vendor to categorize
 * @returns The primary category key
 */
export function getVendorPrimaryCategory(vendor: Vendor): CategoryKey {
  if (!vendor.categories || vendor.categories.length === 0) {
    return 'spa'
  }

  for (const config of categoryConfig) {
    const matches = vendor.categories.some(cat =>
      config.keywords.some(keyword => cat.toLowerCase().includes(keyword))
    )
    if (matches) {
      return config.key
    }
  }

  return 'spa'
}
