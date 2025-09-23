/**
 * Centralized price formatting utilities for consistent currency display
 */

/**
 * Formats a price with proper 2 decimal places and Dominican peso currency
 * @param price - The price amount as a number
 * @returns Formatted price string like "RD$1,234.50"
 */
export const formatPrice = (price: number): string => {
  return `RD$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}

/**
 * Formats a price range with proper 2 decimal places
 * @param min - Minimum price
 * @param max - Maximum price
 * @returns Formatted price range like "RD$1,000.00 - RD$2,500.00"
 */
export const formatPriceRange = (min: number, max: number): string => {
  return `${formatPrice(min)} - ${formatPrice(max)}`
}

/**
 * Parses a price string back to a number
 * @param priceString - Price string like "RD$1,234.50"
 * @returns Numeric value
 */
export const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[RD$,]/g, ''))
}

/**
 * Formats a price without currency symbol
 * @param price - The price amount as a number
 * @returns Formatted number string like "1,234.50"
 */
export const formatPriceNumber = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}