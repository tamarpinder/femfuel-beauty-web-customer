// Shared data types for FemFuel Beauty platform
// Used across Customer, Vendor, and Admin applications

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Location {
  address: string
  district: string
  city: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface BusinessHours {
  [key: string]: {
    open: string
    close: string
    isOpen: boolean
  }
}

export interface Media {
  id: string
  url: string
  alt: string
  type: 'image' | 'video'
}

// User Management
export interface User extends BaseEntity {
  email: string
  name: string
  avatar?: string
  phone?: string
  role: 'admin' | 'vendor' | 'customer'
  status: 'active' | 'inactive' | 'suspended'
}

export interface CustomerProfile extends BaseEntity {
  userId: string
  user: User
  preferences: {
    categories: string[]
    priceRange: { min: number; max: number }
    location: Location
  }
  loyaltyLevel: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalBookings: number
  totalSpent: number
}

export interface VendorProfile extends BaseEntity {
  userId: string
  user: User
  businessName: string
  description: string
  categories: string[]
  location: Location
  businessHours: BusinessHours
  rating: number
  reviewCount: number
  isVerified: boolean
  isActive: boolean
  joinedDate: string
  portfolio: Media[]
  specialties: string[]
  yearsExperience: number
  certifications: string[]
}

// Services & Bookings
export interface Service extends BaseEntity {
  vendorId: string
  vendor: VendorProfile
  name: string
  description: string
  category: string
  subcategory?: string
  price: number
  duration: number // in minutes
  images: Media[]
  isPopular: boolean
  isActive: boolean
  requirements?: string[]
}

export interface Booking extends BaseEntity {
  customerId: string
  customer: CustomerProfile
  vendorId: string
  vendor: VendorProfile
  serviceId: string
  service: Service
  scheduledDate: string
  scheduledTime: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  totalAmount: number
  notes?: string
  cancellationReason?: string
}

// Reviews & Ratings
export interface Review extends BaseEntity {
  bookingId: string
  booking: Booking
  customerId: string
  customer: CustomerProfile
  vendorId: string
  vendor: VendorProfile
  serviceId: string
  service: Service
  rating: number // 1-5
  comment: string
  images?: Media[]
  response?: {
    text: string
    date: string
  }
}

// Financial Data
export interface Transaction extends BaseEntity {
  bookingId: string
  booking: Booking
  amount: number
  commission: number
  platformFee: number
  vendorEarnings: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: 'card' | 'cash' | 'digital_wallet'
}

// Analytics Data
export interface DashboardStats {
  totalUsers: number
  totalVendors: number
  totalCustomers: number
  totalBookings: number
  monthlyRevenue: number
  averageRating: number
  activeServices: number
  pendingTickets: number
  growthMetrics: {
    userGrowth: number
    revenueGrowth: number
    bookingGrowth: number
  }
}

export interface VendorAnalytics {
  vendorId: string
  totalBookings: number
  totalRevenue: number
  averageRating: number
  topServices: Array<{
    serviceId: string
    serviceName: string
    bookingCount: number
    revenue: number
  }>
  monthlyStats: Array<{
    month: string
    bookings: number
    revenue: number
  }>
}

// Categories
export interface Category {
  id: string
  name: string
  icon: string
  description: string
  serviceCount: number
  isActive: boolean
}

// Support & Communication
export interface SupportTicket extends BaseEntity {
  userId: string
  user: User
  subject: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  messages: Array<{
    id: string
    senderId: string
    message: string
    timestamp: string
    attachments?: Media[]
  }>
}