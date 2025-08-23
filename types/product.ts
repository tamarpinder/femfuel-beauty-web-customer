export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  brand: string
  category: ProductCategory
  subcategory: string
  price: number
  originalPrice?: number // for sales/discounts
  currency: string
  sku: string
  barcode?: string
  images: ProductImage[]
  specifications: ProductSpecification[]
  ingredients?: string[]
  howToUse?: string[]
  benefits?: string[]
  suitableFor?: string[] // "Piel grasa", "Todo tipo de piel", etc.
  volume?: string // "50ml", "100g", etc.
  rating: number
  reviewCount: number
  isPopular?: boolean
  isFeatured?: boolean
  isNewArrival?: boolean
  isOnSale?: boolean
  tags: string[]
  availability: ProductAvailability
  shipping: ShippingInfo
  relatedProducts?: string[] // product IDs
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductSpecification {
  name: string
  value: string
  unit?: string
}

export interface ProductAvailability {
  inStock: boolean
  stockQuantity: number
  lowStockThreshold: number
  warehouseId: string
  estimatedRestockDate?: string
  preOrder?: boolean
}

export interface ShippingInfo {
  weight: number // in grams
  dimensions: {
    length: number // in cm
    width: number
    height: number
  }
  fragile: boolean
  temperatureControlled?: boolean
}

export type ProductCategory = 
  | "skincare" 
  | "makeup" 
  | "haircare" 
  | "nailcare" 
  | "fragrance" 
  | "bodycare" 
  | "tools" 
  | "accessories"

export interface ProductFilter {
  categories?: ProductCategory[]
  subcategories?: string[]
  brands?: string[]
  priceRange?: [number, number]
  rating?: number
  inStock?: boolean
  isOnSale?: boolean
  tags?: string[]
  suitableFor?: string[]
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title?: string
  comment: string
  helpful: number
  verified: boolean // verified purchase
  images?: string[]
  createdAt: string
}

// Shopping Cart Types
export interface CartItem {
  productId: string
  quantity: number
  selectedVariant?: string // for products with variations
  addedAt: string
}

export interface Cart {
  id: string
  userId?: string // null for guest users
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  deliveryZoneId: string
  createdAt: string
  updatedAt: string
  expiresAt: string // cart expiration
}

// Order Types
export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  currency: string
  deliveryAddress: DeliveryAddress
  deliveryInstructions?: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  deliveryZoneId: string
  warehouseId: string
  estimatedDeliveryTime: string
  actualDeliveryTime?: string
  trackingInfo?: TrackingInfo
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  unitPrice: number
  totalPrice: number
  selectedVariant?: string
}

export type OrderStatus = 
  | "pending"
  | "confirmed" 
  | "preparing"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded"

export type PaymentStatus = 
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"

export interface DeliveryAddress {
  fullName: string
  phone: string
  address: string
  district: string
  city: string
  coordinates?: {
    lat: number
    lng: number
  }
  deliveryNotes?: string
}

export interface PaymentMethod {
  type: "card" | "cash" | "bank_transfer"
  cardLast4?: string
  cardBrand?: string
}

export interface TrackingInfo {
  currentStatus: OrderStatus
  estimatedDelivery: string
  driverName?: string
  driverPhone?: string
  driverLocation?: {
    lat: number
    lng: number
  }
  updates: TrackingUpdate[]
}

export interface TrackingUpdate {
  status: OrderStatus
  message: string
  timestamp: string
  location?: string
}