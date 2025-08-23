export interface DeliveryZone {
  id: string
  name: string // "Santo Domingo Centro", "Santo Domingo Este"
  code: string // "SD-CENTRO", "SD-ESTE"
  warehouseId: string
  isActive: boolean
  boundaries: DeliveryBoundary
  deliveryOptions: DeliveryOption[]
  restrictions?: DeliveryRestriction[]
  createdAt: string
  updatedAt: string
}

export interface DeliveryBoundary {
  type: "circle" | "polygon"
  center?: {
    lat: number
    lng: number
    radius: number // in kilometers
  }
  polygon?: Array<{
    lat: number
    lng: number
  }>
}

export interface DeliveryOption {
  id: string
  name: string // "Express", "Standard", "Scheduled"
  description: string
  estimatedTime: string // "30-45 min", "1-2 horas"
  fee: number
  freeDeliveryThreshold?: number // free delivery over this amount
  minOrderValue?: number
  maxOrderValue?: number
  availableHours: {
    start: string // "08:00"
    end: string // "20:00"
  }
  availableDays: number[] // [1,2,3,4,5,6,7] where 1=Monday
  isDefault: boolean
  isActive: boolean
  requiresScheduling?: boolean
}

export interface DeliveryRestriction {
  type: "product_category" | "product_weight" | "order_value" | "time_slot"
  value: string | number
  message: string
}

export interface Warehouse {
  id: string
  name: string
  code: string // "WH-SD-01"
  address: {
    street: string
    district: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  contact: {
    phone: string
    email: string
    manager: string
  }
  operatingHours: {
    [key: string]: {
      open: string
      close: string
      isClosed?: boolean
    }
  }
  capacity: {
    maxOrders: number // max orders per day
    maxWeight: number // max kg per day
  }
  serviceZones: string[] // delivery zone IDs served by this warehouse
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DeliverySlot {
  id: string
  zoneId: string
  date: string // YYYY-MM-DD
  timeSlot: {
    start: string // "14:00"
    end: string // "16:00"
  }
  capacity: number
  currentBookings: number
  isAvailable: boolean
  deliveryFee: number
}

// Location Detection
export interface UserLocation {
  coordinates: {
    lat: number
    lng: number
  }
  address: string
  district: string
  city: string
  deliveryZone?: DeliveryZone
  isServiceable: boolean
  accuracy?: number
}

// Distance and Route Calculation
export interface RouteInfo {
  distance: number // in km
  duration: number // in minutes
  drivingRoute: boolean
  estimatedDeliveryTime: string
}

// Driver/Delivery Management
export interface Driver {
  id: string
  name: string
  phone: string
  vehicleType: "moto" | "car" | "bicycle"
  vehicleDetails: {
    brand: string
    model: string
    licensePlate: string
    color: string
  }
  location: {
    lat: number
    lng: number
    lastUpdated: string
  }
  status: "available" | "busy" | "offline"
  currentOrders: string[] // order IDs
  maxOrders: number
  rating: number
  completedDeliveries: number
  workingZones: string[] // delivery zone IDs
}

export interface DeliveryAssignment {
  id: string
  orderId: string
  driverId: string
  status: "assigned" | "picked_up" | "in_transit" | "delivered" | "failed"
  assignedAt: string
  pickedUpAt?: string
  deliveredAt?: string
  estimatedDeliveryTime: string
  actualDeliveryTime?: string
  route: RouteInfo
  notes?: string
  customerRating?: number
  driverNotes?: string
}