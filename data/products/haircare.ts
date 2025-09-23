import { Product } from "@/types/product"

export const haircareProducts: Product[] = [
  {
    id: "hair-mask-repair",
    name: "Mascarilla Capilar Reparadora Intensiva FemFuel",
    slug: "mascarilla-capilar-reparadora-intensiva",
    description: "Mascarilla reparadora con queratina y aceites naturales que reconstruye el cabello dañado desde la raíz hasta las puntas. Ideal para cabello procesado químicamente.",
    shortDescription: "Mascarilla reparadora con queratina para cabello dañado",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Mascarillas",
    price: 1890,
    currency: "RD$",
    sku: "FF-HAIR-MASK-250",
    barcode: "758940564001",
    images: [
      {
        id: "img1",
        url: "/products/haircare/hair-mask-repair.png",
        alt: "Mascarilla Capilar Reparadora Intensiva FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "250", unit: "ml" },
      { name: "Tipo de cabello", value: "Dañado, procesado" },
      { name: "Frecuencia", value: "2-3 veces/semana" }
    ],
    ingredients: [
      "Queratina hidrolizada",
      "Aceite de argán",
      "Proteínas de seda",
      "Manteca de karité",
      "Vitamina E",
      "Extracto de bambú"
    ],
    howToUse: [
      "Aplicar sobre cabello húmedo y limpio",
      "Distribuir de medios a puntas",
      "Dejar actuar 10-15 minutos",
      "Enjuagar abundantemente"
    ],
    benefits: [
      "Repara cabello dañado",
      "Aporta brillo intenso",
      "Suavidad sedosa",
      "Facilita el peinado",
      "Fortalece la fibra capilar"
    ],
    suitableFor: ["Cabello dañado", "Cabello procesado", "Cabello seco"],
    volume: "250ml",
    rating: 4.6,
    reviewCount: 324,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["mascarilla", "reparadora", "queratina", "cabello"],
    availability: {
      inStock: true,
      stockQuantity: 87,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 280,
      dimensions: { length: 15, width: 8, height: 18 },
      fragile: false
    },
    relatedProducts: ["serum-anti-frizz", "spray-heat-protectant"],
    createdAt: "2024-07-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "serum-anti-frizz",
    name: "Sérum Anti-Frizz Control Total FemFuel",
    slug: "serum-anti-frizz-control-total",
    description: "Sérum capilar avanzado que controla el frizz y aporta suavidad duradera. Formula ligera que no apelmaza y protege del calor.",
    shortDescription: "Sérum anti-frizz para control y suavidad",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Serums",
    price: 1590,
    currency: "RD$",
    sku: "FF-HAIR-SERUM-100",
    barcode: "758940564018",
    images: [
      {
        id: "img1",
        url: "/products/haircare/serum-anti-frizz.png",
        alt: "Sérum Anti-Frizz Control Total FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "100", unit: "ml" },
      { name: "Protección térmica", value: "Hasta 230°C" },
      { name: "Textura", value: "Ligera, no grasa" }
    ],
    ingredients: [
      "Siliconas suaves",
      "Aceite de argán",
      "Vitamina E",
      "Extracto de lino",
      "Proteínas vegetales"
    ],
    howToUse: [
      "Aplicar sobre cabello húmedo o seco",
      "Distribuir desde medios a puntas",
      "No enjuagar",
      "Proceder al peinado habitual"
    ],
    benefits: [
      "Controla el frizz 24h",
      "Protección térmica",
      "Brillo natural",
      "Suavidad sedosa",
      "Facilita el peinado"
    ],
    suitableFor: ["Cabello encrespado", "Cabello graso", "Todo tipo de cabello"],
    volume: "100ml",
    rating: 4.5,
    reviewCount: 456,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["sérum", "anti-frizz", "protección térmica", "cabello"],
    availability: {
      inStock: true,
      stockQuantity: 134,
      lowStockThreshold: 25,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 12, width: 5, height: 15 },
      fragile: false
    },
    relatedProducts: ["hair-mask-repair", "spray-heat-protectant"],
    createdAt: "2024-07-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "spray-heat-protectant",
    name: "Spray Protector Térmico FemFuel",
    slug: "spray-protector-termico",
    description: "Spray termoprotector que protege el cabello del daño causado por herramientas de calor hasta 230°C. Formula ligera que no apelmaza.",
    shortDescription: "Spray protector térmico hasta 230°C",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Protección",
    price: 1290,
    currency: "RD$",
    sku: "FF-HAIR-SPRAY-150",
    barcode: "758940564025",
    images: [
      {
        id: "img1",
        url: "/products/haircare/spray-heat-protectant.png",
        alt: "Spray Protector Térmico FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "150", unit: "ml" },
      { name: "Protección", value: "Hasta 230°C" },
      { name: "Tipo", value: "Spray" }
    ],
    ingredients: [
      "Polímeros protectores",
      "Extracto de té verde",
      "Vitamina E",
      "Pantenol",
      "Glicerina vegetal"
    ],
    howToUse: [
      "Pulverizar sobre cabello húmedo",
      "Distribuir uniformemente",
      "Aplicar antes del secado/peinado",
      "No enjuagar"
    ],
    benefits: [
      "Protección térmica total",
      "Previene sequedad",
      "Mantiene hidratación",
      "Facilita peinado",
      "Brillo saludable"
    ],
    suitableFor: ["Todo tipo de cabello", "Uso frecuente de herramientas", "Cabello teñido"],
    volume: "150ml",
    rating: 4.4,
    reviewCount: 287,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["protector térmico", "spray", "calor", "cabello"],
    availability: {
      inStock: true,
      stockQuantity: 156,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 180,
      dimensions: { length: 16, width: 6, height: 18 },
      fragile: false
    },
    relatedProducts: ["serum-anti-frizz", "hair-mask-repair"],
    createdAt: "2024-07-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]