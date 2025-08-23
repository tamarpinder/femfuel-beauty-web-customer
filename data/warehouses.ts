import { Warehouse, DeliveryZone, DeliveryOption } from "@/types/delivery"

export const warehouses: Warehouse[] = [
  {
    id: "warehouse-santo-domingo-central",
    name: "FemFuel Beauty Warehouse Central",
    code: "WH-SD-CENTRAL",
    address: {
      street: "Av. John F. Kennedy 567, Edificio Corporativo Torre Central",
      district: "Piantini",
      city: "Santo Domingo",
      coordinates: {
        lat: 18.4861,
        lng: -69.9312
      }
    },
    contact: {
      phone: "+1 809-555-FUEL (3835)",
      email: "warehouse@femfuel.do",
      manager: "María González"
    },
    operatingHours: {
      monday: { open: "07:00", close: "20:00" },
      tuesday: { open: "07:00", close: "20:00" },
      wednesday: { open: "07:00", close: "20:00" },
      thursday: { open: "07:00", close: "20:00" },
      friday: { open: "07:00", close: "21:00" },
      saturday: { open: "08:00", close: "19:00" },
      sunday: { open: "09:00", close: "17:00" }
    },
    capacity: {
      maxOrders: 500,
      maxWeight: 2000
    },
    serviceZones: [
      "zone-sd-centro",
      "zone-sd-norte", 
      "zone-sd-este",
      "zone-sd-oeste",
      "zone-sd-sur"
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  }
]

export const deliveryZones: DeliveryZone[] = [
  {
    id: "zone-sd-centro",
    name: "Santo Domingo Centro",
    code: "SD-CENTRO",
    warehouseId: "warehouse-santo-domingo-central",
    isActive: true,
    boundaries: {
      type: "circle",
      center: {
        lat: 18.4861,
        lng: -69.9312,
        radius: 8 // 8km radius
      }
    },
    deliveryOptions: [
      {
        id: "express-centro",
        name: "Express",
        description: "Entrega rápida en moto",
        estimatedTime: "30-45 minutos",
        fee: 150,
        freeDeliveryThreshold: 2500,
        minOrderValue: 500,
        availableHours: {
          start: "08:00",
          end: "20:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6, 7],
        isDefault: true,
        isActive: true,
        requiresScheduling: false
      },
      {
        id: "scheduled-centro",
        name: "Programada",
        description: "Entrega programada en horario específico",
        estimatedTime: "En tu horario elegido",
        fee: 100,
        freeDeliveryThreshold: 3000,
        minOrderValue: 800,
        availableHours: {
          start: "09:00",
          end: "18:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6],
        isDefault: false,
        isActive: true,
        requiresScheduling: true
      }
    ],
    restrictions: [
      {
        type: "product_weight",
        value: 15,
        message: "Productos que excedan 15kg requieren entrega programada"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  },
  {
    id: "zone-sd-norte",
    name: "Santo Domingo Norte",
    code: "SD-NORTE",
    warehouseId: "warehouse-santo-domingo-central",
    isActive: true,
    boundaries: {
      type: "circle",
      center: {
        lat: 18.5204,
        lng: -69.9120,
        radius: 12
      }
    },
    deliveryOptions: [
      {
        id: "standard-norte",
        name: "Estándar",
        description: "Entrega el mismo día",
        estimatedTime: "1-2 horas",
        fee: 200,
        freeDeliveryThreshold: 3000,
        minOrderValue: 800,
        availableHours: {
          start: "09:00",
          end: "19:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6, 7],
        isDefault: true,
        isActive: true,
        requiresScheduling: false
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  },
  {
    id: "zone-sd-este",
    name: "Santo Domingo Este",
    code: "SD-ESTE",
    warehouseId: "warehouse-santo-domingo-central",
    isActive: true,
    boundaries: {
      type: "circle",
      center: {
        lat: 18.4881,
        lng: -69.8597,
        radius: 15
      }
    },
    deliveryOptions: [
      {
        id: "standard-este",
        name: "Estándar",
        description: "Entrega el mismo día",
        estimatedTime: "1.5-2.5 horas",
        fee: 250,
        freeDeliveryThreshold: 3500,
        minOrderValue: 1000,
        availableHours: {
          start: "10:00",
          end: "18:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6],
        isDefault: true,
        isActive: true,
        requiresScheduling: false
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  },
  {
    id: "zone-sd-oeste",
    name: "Santo Domingo Oeste",
    code: "SD-OESTE", 
    warehouseId: "warehouse-santo-domingo-central",
    isActive: true,
    boundaries: {
      type: "circle",
      center: {
        lat: 18.5001,
        lng: -70.0067,
        radius: 10
      }
    },
    deliveryOptions: [
      {
        id: "standard-oeste",
        name: "Estándar",
        description: "Entrega el mismo día",
        estimatedTime: "1-2 horas",
        fee: 220,
        freeDeliveryThreshold: 3000,
        minOrderValue: 900,
        availableHours: {
          start: "09:00",
          end: "18:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6, 7],
        isDefault: true,
        isActive: true,
        requiresScheduling: false
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  },
  {
    id: "zone-sd-sur",
    name: "Santo Domingo Sur",
    code: "SD-SUR",
    warehouseId: "warehouse-santo-domingo-central",
    isActive: true,
    boundaries: {
      type: "circle",
      center: {
        lat: 18.4277,
        lng: -69.9445,
        radius: 12
      }
    },
    deliveryOptions: [
      {
        id: "standard-sur",
        name: "Estándar", 
        description: "Entrega el mismo día",
        estimatedTime: "1-2 horas",
        fee: 200,
        freeDeliveryThreshold: 2800,
        minOrderValue: 800,
        availableHours: {
          start: "09:00",
          end: "19:00"
        },
        availableDays: [1, 2, 3, 4, 5, 6, 7],
        isDefault: true,
        isActive: true,
        requiresScheduling: false
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-23T00:00:00Z"
  }
]

// Helper functions
export function getWarehouseById(id: string): Warehouse | undefined {
  return warehouses.find(warehouse => warehouse.id === id)
}

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return deliveryZones.find(zone => zone.id === id)
}

export function getDeliveryZonesByWarehouse(warehouseId: string): DeliveryZone[] {
  return deliveryZones.filter(zone => zone.warehouseId === warehouseId && zone.isActive)
}

export function isLocationServiceable(coordinates: { lat: number, lng: number }): {
  isServiceable: boolean
  zone?: DeliveryZone
  distance?: number
} {
  for (const zone of deliveryZones) {
    if (!zone.isActive) continue

    if (zone.boundaries.type === "circle" && zone.boundaries.center) {
      const distance = calculateDistance(
        coordinates,
        { lat: zone.boundaries.center.lat, lng: zone.boundaries.center.lng }
      )
      
      if (distance <= zone.boundaries.center.radius) {
        return {
          isServiceable: true,
          zone,
          distance
        }
      }
    }
  }

  return { isServiceable: false }
}

// Simple distance calculation using Haversine formula
function calculateDistance(
  point1: { lat: number, lng: number },
  point2: { lat: number, lng: number }
): number {
  const R = 6371 // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180
  const dLng = (point2.lng - point1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export function getAvailableDeliveryOptions(zoneId: string): DeliveryOption[] {
  const zone = getDeliveryZoneById(zoneId)
  if (!zone) return []
  
  return zone.deliveryOptions.filter(option => option.isActive)
}

export function calculateDeliveryFee(
  zoneId: string,
  orderValue: number,
  deliveryOptionId?: string
): number {
  const zone = getDeliveryZoneById(zoneId)
  if (!zone) return 0

  const deliveryOption = deliveryOptionId 
    ? zone.deliveryOptions.find(opt => opt.id === deliveryOptionId)
    : zone.deliveryOptions.find(opt => opt.isDefault)

  if (!deliveryOption) return 0

  // Check if order qualifies for free delivery
  if (deliveryOption.freeDeliveryThreshold && orderValue >= deliveryOption.freeDeliveryThreshold) {
    return 0
  }

  return deliveryOption.fee
}