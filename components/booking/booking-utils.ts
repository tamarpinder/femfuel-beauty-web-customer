import { useMemo } from "react"
import { getMultiDayAvailability } from "@/lib/vendor-scheduling"
import { getVendorLogo } from "@/lib/image-mappings"
import type { VendorService, Professional, ServiceAddon } from "@/types/vendor"
import type { MarketplaceService } from "@/components/service-card"

export type BookingStep = "professional" | "configuration" | "details" | "payment" | "confirmation"

export interface BookingData {
  date: Date | undefined
  time: string
  professional: Professional | null
  selectedAddons: ServiceAddon[]
  notes: string
  paymentMethod: "card" | "cash" | "apple_pay"
}

export const calculatePricing = (
  service: VendorService | MarketplaceService | null,
  selectedAddons: ServiceAddon[]
) => {
  // Handle multiple price formats with robust fallbacks
  let basePrice = 0
  if (service?.price !== undefined && service?.price !== null) {
    if (typeof service.price === 'number') {
      basePrice = service.price
    } else if (typeof service.price === 'string') {
      const parsed = parseInt(service.price.replace(/[^0-9]/g, ''))
      basePrice = isNaN(parsed) ? 0 : parsed
    }
  }

  // Safely calculate addon pricing with validation
  const totalAddonPrice = selectedAddons.reduce((sum, addon) => {
    const addonPrice = typeof addon.price === 'number' ? addon.price : 0
    return sum + (addonPrice || 0)
  }, 0)

  const totalAddonDuration = selectedAddons.reduce((sum, addon) => {
    const duration = typeof addon.duration === 'number' ? addon.duration : 0
    return sum + (duration || 0)
  }, 0)

  // Handle duration with fallbacks
  let serviceDuration = 60 // Default 60 minutes
  if (service?.duration !== undefined && service?.duration !== null) {
    if (typeof service.duration === 'number') {
      serviceDuration = service.duration
    } else if (typeof service.duration === 'string') {
      const parsed = parseInt(service.duration.replace(/[^0-9]/g, ''))
      serviceDuration = isNaN(parsed) ? 60 : parsed
    }
  }

  const totalDuration = serviceDuration + totalAddonDuration
  const subtotal = basePrice + totalAddonPrice

  // Apply commission (8%)
  const commission = subtotal * 0.08
  const subtotalWithCommission = subtotal + commission

  // Apply ITBIS tax (18%)
  const itbis = subtotalWithCommission * 0.18
  const totalPrice = subtotalWithCommission + itbis

  return {
    basePrice,
    totalAddonPrice,
    totalAddonDuration,
    serviceDuration,
    totalDuration,
    subtotal,
    commission,
    itbis,
    totalPrice
  }
}

export const getServiceProfessionals = (
  professionals: Professional[],
  service: VendorService | MarketplaceService | null
) => {
  if (!service || !professionals.length) return []

  const serviceName = service.name || ""
  const serviceCategory = 'category' in service ? service.category : ''

  const relevantProfessionals = professionals.filter(prof => {
    if (!prof.specialties?.length) return true

    const hasRelevantSpecialty = prof.specialties.some(specialty => {
      const specialtyLower = specialty.toLowerCase()
      const serviceNameLower = serviceName.toLowerCase()
      const categoryLower = serviceCategory?.toLowerCase() || ''

      return (
        serviceNameLower.includes(specialtyLower) ||
        specialtyLower.includes(serviceNameLower.split(' ')[0]) ||
        specialtyLower.includes(categoryLower) ||
        specialtyLower.includes("keratina") ||
        specialtyLower.includes("tratamiento") ||
        specialtyLower.includes("alisado") ||
        specialtyLower.includes("maquillaje") ||
        specialtyLower.includes("nail") ||
        specialtyLower.includes("masaje")
      )
    })

    return hasRelevantSpecialty
  })

  return relevantProfessionals.length > 0 ? relevantProfessionals : professionals
}

export const loadQuickAvailability = (
  service: VendorService | MarketplaceService | null,
  vendorId: string | undefined
): Array<{date: Date, time: string}> => {
  if (!service) return []

  // Use fallback vendor ID if not provided
  const resolvedVendorId = vendorId || 'beauty-studio-rd'

  const serviceDuration = typeof service.duration === 'number' ? service.duration : parseInt(service.duration?.toString() || '60')

  try {
    const availability = getMultiDayAvailability(resolvedVendorId, serviceDuration, new Date(), 7)

    const quickSlots: Array<{date: Date, time: string}> = []

    for (const day of availability) {
      if (day.status === 'available' && day.availableSlots > 0) {
        const availableTimes = day.timeSlots
          .filter(slot => slot.available)
          .slice(0, 2)

        availableTimes.forEach(slot => {
          quickSlots.push({
            date: day.date,
            time: slot.time
          })
        })

        if (quickSlots.length >= 3) break
      }
    }

    return quickSlots
  } catch (error) {
    console.error('Error loading quick availability:', error)
    // Return empty array on error, the UI will show loading state
    return []
  }
}

export const createBookingForContext = (
  service: VendorService | MarketplaceService,
  bookingData: BookingData,
  totalDuration: number,
  totalPrice: number,
  vendorId: string | undefined,
  vendorName: string | undefined,
  vendorRating: number | undefined,
  vendor: any,
  getDefaultPaymentMethod: () => any
) => {
  const selectedPaymentMethod = bookingData.paymentMethod === "card" ?
    getDefaultPaymentMethod() || {
      id: "cash-payment",
      type: "cash" as const,
      cardNumber: undefined,
      expiryDate: undefined,
      cardHolderName: undefined,
      brand: undefined,
      isDefault: true
    } : {
      id: bookingData.paymentMethod === "cash" ? "cash-payment" : "apple-pay",
      type: bookingData.paymentMethod as "cash" | "apple_pay",
      cardNumber: undefined,
      expiryDate: undefined,
      cardHolderName: undefined,
      brand: undefined,
      isDefault: false
    }

  const finalVendorName = vendorName || vendor?.name || 'Salon de Belleza'

  return {
    serviceId: service.id,
    serviceName: service.name,
    serviceImage: 'image' in service ? service.image : undefined,
    vendorId: vendorId || 'default-vendor',
    vendorName: finalVendorName,
    vendorLogo: getVendorLogo(finalVendorName),
    vendorRating: vendorRating || vendor?.rating,
    professionalId: bookingData.professional?.id,
    professionalName: bookingData.professional?.name,
    date: bookingData.date || new Date(),
    time: bookingData.time || '10:00',
    duration: totalDuration,
    price: totalPrice,
    addons: bookingData.selectedAddons,
    paymentMethod: selectedPaymentMethod,
    notes: bookingData.notes,
    status: 'confirmed' as const,
    bookingId: `BK${Date.now()}${Math.random().toString(36).substr(2, 5)}`,

    // Add fields expected by BookingSuccessOverlay
    service: {
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
      category: service.category || 'beauty'
    },
    totalPrice: totalPrice,
    totalDuration: totalDuration,
    professional: bookingData.professional
  }
}