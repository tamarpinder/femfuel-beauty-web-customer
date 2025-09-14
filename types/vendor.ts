export interface Vendor {
  id: string
  name: string
  slug: string
  logo?: string
  coverImage?: string
  description: string
  rating: number
  reviewCount: number
  serviceCount: number
  location: {
    address: string
    district: string
    city: string
    distance?: string
  }
  contact: {
    phone: string
    email?: string
    whatsapp?: string
  }
  categories: string[]
  popularServices: string[]
  badges?: string[]
  availability: {
    isOpen: boolean
    nextSlot?: string
    todayAvailable: boolean
  }
  professionalCount: number
  priceRange: {
    min: number
    max: number
  }
  services: VendorService[]
  professionals?: Professional[]
  businessHours: {
    [key: string]: {
      open: string
      close: string
      isClosed?: boolean
    }
  }
  gallery?: string[]
}

export interface VendorService {
  id: string
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
  }
  addons?: ServiceAddon[]
}

export interface ServiceAddon {
  id: string
  name: string
  price: number
  duration?: number
}

export interface Professional {
  id: string
  name: string
  image?: string
  rating: number
  reviewCount: number
  yearsExperience: number
  monthlyBookings: number
  specialties: string[]
  recommendedAddons: ServiceAddon[]
  bio?: string
  isTopRated?: boolean
  nextAvailable?: string
  personalSchedule?: {
    workingDays: number[] // 0 = Sunday, 1 = Monday, etc.
    workingHours: { start: string; end: string }
    lunchBreak?: { start: string; end: string }
    personalTimeBlocks?: Array<{
      day: number
      start: string
      end: string
      reason: string
    }>
  }
}