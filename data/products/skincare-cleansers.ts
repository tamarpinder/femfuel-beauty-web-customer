import { Product } from "@/types/product";

export const skincareCleanserProducts: Product[] = [
  // LIMPIADORES
  {
    id: "cleanser-foam-gentle",
    name: "Limpiador Espumoso Suave FemFuel",
    slug: "limpiador-espumoso-suave",
    description: "Limpiador facial espumoso con textura suave que limpia profundamente sin resecar. Formulado con ingredientes naturales que mantienen el equilibrio del pH natural de la piel mientras eliminan impurezas y maquillaje.",
    shortDescription: "Limpiador espumoso para limpieza profunda y suave",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Limpiadores",
    price: 1290,
    currency: "RD$",
    sku: "FF-CLEAN-FOAM-150",
    barcode: "758940563001",
    images: [
      {
        id: "img1",
        url: "/products/skincare/cleanser-foam-gentle.png",
        alt: "Limpiador Espumoso Suave FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "150", unit: "ml" },
      { name: "Tipo de piel", value: "Todo tipo de piel" },
      { name: "pH", value: "5.5" }
    ],
    ingredients: [
      "Agua purificada",
      "Cocamidopropil betaína",
      "Glicerina",
      "Extracto de té verde",
      "Extracto de camomila",
      "Ácido cítrico",
      "Vitamina E"
    ],
    howToUse: [
      "Humedecer el rostro con agua tibia",
      "Aplicar una pequeña cantidad y masajear",
      "Enjuagar abundantemente",
      "Usar mañana y noche"
    ],
    benefits: [
      "Limpieza profunda sin resecar",
      "Mantiene el pH natural",
      "Elimina maquillaje e impurezas",
      "Deja la piel suave y fresca"
    ],
    suitableFor: ["Todo tipo de piel", "Piel sensible", "Uso diario"],
    volume: "150ml",
    rating: 4.6,
    reviewCount: 432,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["limpiador", "espuma", "suave", "diario"],
    availability: {
      inStock: true,
      stockQuantity: 145,
      lowStockThreshold: 25,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 180,
      dimensions: { length: 15, width: 6, height: 18 },
      fragile: false
    },
    relatedProducts: ["toner-rose-water", "moisturizer-hyaluronic"],
    createdAt: "2024-05-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "cleanser-oil-makeup-remover",
    name: "Aceite Desmaquillante Delicado FemFuel",
    slug: "aceite-desmaquillante-delicado",
    description: "Aceite limpiador que disuelve eficazmente todo tipo de maquillaje, incluso el waterproof. Se transforma en una emulsión lechosa al contacto con el agua, dejando la piel limpia, suave e hidratada.",
    shortDescription: "Aceite desmaquillante para maquillaje resistente",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Limpiadores",
    price: 1590,
    currency: "RD$",
    sku: "FF-CLEAN-OIL-150",
    barcode: "758940563018",
    images: [
      {
        id: "img1",
        url: "/products/skincare/cleanser-oil-makeup-remover.png",
        alt: "Aceite Desmaquillante Delicado FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "150", unit: "ml" },
      { name: "Tipo", value: "Aceite emulsionante" },
      { name: "Uso", value: "Desmaquillante" }
    ],
    ingredients: [
      "Aceite de jojoba",
      "Aceite de girasol",
      "Aceite de almendras dulces",
      "Vitamina E",
      "Escualano",
      "Extracto de manzanilla"
    ],
    howToUse: [
      "Aplicar sobre piel seca",
      "Masajear suavemente sobre maquillaje",
      "Añadir agua tibia para emulsionar",
      "Enjuagar completamente"
    ],
    benefits: [
      "Elimina maquillaje waterproof",
      "No deja residuos grasos",
      "Hidrata mientras limpia",
      "Apto para ojos sensibles"
    ],
    suitableFor: ["Todo tipo de piel", "Maquillaje pesado", "Piel seca"],
    volume: "150ml",
    rating: 4.7,
    reviewCount: 287,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["desmaquillante", "aceite", "limpiador", "waterproof"],
    availability: {
      inStock: true,
      stockQuantity: 98,
      lowStockThreshold: 20,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 180,
      dimensions: { length: 15, width: 6, height: 18 },
      fragile: false
    },
    relatedProducts: ["cleanser-foam-gentle", "toner-rose-water"],
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
];