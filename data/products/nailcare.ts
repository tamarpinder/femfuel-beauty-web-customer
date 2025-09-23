import { Product } from "@/types/product"

export const nailcareProducts: Product[] = [
  // NAIL CARE PRODUCTS
  // ========================
  {
    id: "nail-polish-red-classic",
    name: "Esmalte Rojo Clásico FemFuel",
    slug: "esmalte-rojo-clasico",
    description: "Esmalte de uñas rojo clásico con acabado brillante y larga duración. Formula enriquecida que cuida y fortalece las uñas.",
    shortDescription: "Esmalte rojo clásico de larga duración",
    brand: "FemFuel Beauty",
    category: "nailcare",
    subcategory: "Esmaltes",
    price: 890,
    currency: "RD$",
    sku: "FF-NAIL-RED-15",
    barcode: "758940565001",
    images: [
      {
        id: "img1",
        url: "/products/nailcare/nail-polish-red-classic.png",
        alt: "Esmalte Rojo Clásico FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "ml" },
      { name: "Color", value: "Rojo clásico" },
      { name: "Duración", value: "7-10 días" }
    ],
    ingredients: [
      "Nitrocelulosa",
      "Resina de tosylamida",
      "Plastificantes",
      "Pigmentos de alta calidad",
      "Vitamina E"
    ],
    howToUse: [
      "Aplicar base coat",
      "Aplicar 2 capas finas",
      "Dejar secar entre capas",
      "Finalizar con top coat"
    ],
    benefits: [
      "Color intenso y uniforme",
      "Larga duración",
      "Secado rápido",
      "Brillo profesional",
      "Fortalece las uñas"
    ],
    suitableFor: ["Todo tipo de uñas", "Uso profesional", "Ocasiones especiales"],
    volume: "15ml",
    rating: 4.7,
    reviewCount: 892,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["esmalte", "rojo", "clásico", "uñas"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 50,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: true
    },
    relatedProducts: ["base-coat-strengthening", "nail-polish-pink-nude"],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "nail-polish-pink-nude",
    name: "Esmalte Rosa Nude FemFuel",
    slug: "esmalte-rosa-nude",
    description: "Esmalte rosa nude elegante perfecto para cualquier ocasión. Tono versátil que complementa todos los tonos de piel.",
    shortDescription: "Esmalte rosa nude versátil y elegante",
    brand: "FemFuel Beauty",
    category: "nailcare",
    subcategory: "Esmaltes",
    price: 890,
    currency: "RD$",
    sku: "FF-NAIL-NUDE-15",
    barcode: "758940565018",
    images: [
      {
        id: "img1",
        url: "/products/nailcare/nail-polish-pink-nude.png",
        alt: "Esmalte Rosa Nude FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "ml" },
      { name: "Color", value: "Rosa nude" },
      { name: "Duración", value: "7-10 días" }
    ],
    ingredients: [
      "Nitrocelulosa",
      "Resina de tosylamida",
      "Plastificantes",
      "Pigmentos nude",
      "Vitamina E"
    ],
    howToUse: [
      "Preparar uñas con base coat",
      "Aplicar 2 capas uniformes",
      "Dejar secar completamente",
      "Sellar con top coat"
    ],
    benefits: [
      "Tono universal",
      "Acabado elegante",
      "Larga duración",
      "Profesional",
      "Fortalece uñas"
    ],
    suitableFor: ["Todo tipo de uñas", "Uso diario", "Oficina"],
    volume: "15ml",
    rating: 4.6,
    reviewCount: 567,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["esmalte", "nude", "rosa", "elegante"],
    availability: {
      inStock: true,
      stockQuantity: 189,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 50,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: true
    },
    relatedProducts: ["nail-polish-red-classic", "base-coat-strengthening"],
    createdAt: "2024-06-05T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "base-coat-strengthening",
    name: "Base Coat Fortalecedora FemFuel",
    slug: "base-coat-fortalecedora",
    description: "Base coat transparente que fortalece y protege las uñas. Formula enriquecida con calcio y proteínas que mejora la adherencia del esmalte.",
    shortDescription: "Base coat fortalecedora con calcio",
    brand: "FemFuel Beauty",
    category: "nailcare",
    subcategory: "Base Coat",
    price: 790,
    currency: "RD$",
    sku: "FF-NAIL-BASE-15",
    barcode: "758940565025",
    images: [
      {
        id: "img1",
        url: "/products/nailcare/base-coat-strengthening.png",
        alt: "Base Coat Fortalecedora FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "ml" },
      { name: "Tipo", value: "Base coat" },
      { name: "Con calcio", value: "Sí" }
    ],
    ingredients: [
      "Nitrocelulosa",
      "Calcio",
      "Proteínas",
      "Vitamina E",
      "Formaldehído libre"
    ],
    howToUse: [
      "Aplicar sobre uñas limpias y secas",
      "Una capa fina y uniforme",
      "Dejar secar completamente",
      "Aplicar esmalte encima"
    ],
    benefits: [
      "Fortalece uñas débiles",
      "Mejora adherencia",
      "Protege de manchas",
      "Extiende duración",
      "Base perfecta"
    ],
    suitableFor: ["Uñas débiles", "Uso con esmaltes", "Tratamiento"],
    volume: "15ml",
    rating: 4.5,
    reviewCount: 334,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["base coat", "fortalecedora", "calcio", "uñas"],
    availability: {
      inStock: true,
      stockQuantity: 156,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 50,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: true
    },
    relatedProducts: ["nail-polish-red-classic", "cuticle-oil-vitamin-e"],
    createdAt: "2024-06-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "cuticle-oil-vitamin-e",
    name: "Aceite para Cutículas con Vitamina E FemFuel",
    slug: "aceite-cuticulas-vitamina-e",
    description: "Aceite nutritivo para cutículas con vitamina E que suaviza, hidrata y cuida la zona periungual. Aplicador preciso incluido.",
    shortDescription: "Aceite nutritivo para cutículas con vitamina E",
    brand: "FemFuel Beauty",
    category: "nailcare",
    subcategory: "Cuidado",
    price: 690,
    currency: "RD$",
    sku: "FF-NAIL-OIL-15",
    barcode: "758940565032",
    images: [
      {
        id: "img1",
        url: "/products/nailcare/cuticle-oil-vitamin-e.png",
        alt: "Aceite para Cutículas con Vitamina E FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "ml" },
      { name: "Con vitamina E", value: "Sí" },
      { name: "Aplicador", value: "Pincel preciso" }
    ],
    ingredients: [
      "Aceite de jojoba",
      "Vitamina E",
      "Aceite de almendras",
      "Extracto de limón",
      "Aceite esencial de lavanda"
    ],
    howToUse: [
      "Aplicar una gota en cada cutícula",
      "Masajear suavemente",
      "Usar diariamente",
      "Ideal antes de manicura"
    ],
    benefits: [
      "Suaviza cutículas",
      "Hidratación profunda",
      "Estimula crecimiento",
      "Previene padrastros",
      "Uñas más saludables"
    ],
    suitableFor: ["Cutículas secas", "Cuidado diario", "Pre-manicura"],
    volume: "15ml",
    rating: 4.6,
    reviewCount: 445,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["aceite", "cutículas", "vitamina e", "hidratante"],
    availability: {
      inStock: true,
      stockQuantity: 198,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 45,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: false
    },
    relatedProducts: ["base-coat-strengthening", "nail-polish-red-classic"],
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]