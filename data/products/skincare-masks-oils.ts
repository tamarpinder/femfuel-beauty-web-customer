import { Product } from "@/types/product";

export const skincareMaskOilProducts: Product[] = [
  // MASCARILLAS
  {
    id: "mask-clay-detox",
    name: "Mascarilla Detox Arcilla Negra FemFuel",
    slug: "mascarilla-detox-arcilla-negra",
    description: "Mascarilla purificante con arcilla negra y carbón activado que extrae impurezas, reduce poros y deja la piel limpia y renovada.",
    shortDescription: "Mascarilla detox con arcilla negra y carbón",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Mascarillas",
    price: 1690,
    currency: "RD$",
    sku: "FF-MASK-CLAY-75",
    barcode: "758940563162",
    images: [
      {
        id: "img1",
        url: "/products/skincare/mask-clay-detox.png",
        alt: "Mascarilla Detox Arcilla Negra FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "75", unit: "ml" },
      { name: "Tipo", value: "Wash-off" },
      { name: "Tiempo", value: "10-15", unit: "minutos" }
    ],
    ingredients: [
      "Arcilla negra",
      "Carbón activado",
      "Ácido salicílico",
      "Extracto de árbol de té",
      "Caolín",
      "Extracto de hamamelis"
    ],
    howToUse: [
      "Aplicar capa generosa sobre piel limpia",
      "Evitar contorno de ojos",
      "Dejar actuar 10-15 minutos",
      "Retirar con agua tibia",
      "Usar 1-2 veces por semana"
    ],
    benefits: [
      "Extrae impurezas profundas",
      "Reduce poros visibles",
      "Controla exceso de grasa",
      "Piel purificada",
      "Efecto detox"
    ],
    suitableFor: ["Piel grasa", "Piel mixta", "Poros dilatados"],
    volume: "75ml",
    rating: 4.6,
    reviewCount: 456,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["mascarilla", "detox", "arcilla", "purificante"],
    availability: {
      inStock: true,
      stockQuantity: 98,
      lowStockThreshold: 18,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["cleanser-foam-gentle", "serum-niacinamide-pore"],
    createdAt: "2024-05-25T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "mask-sheet-collagen",
    name: "Mascarilla de Colágeno en Hoja FemFuel",
    slug: "mascarilla-colageno-hoja",
    description: "Mascarilla en hoja impregnada con colágeno marino y péptidos que proporciona un tratamiento intensivo anti-edad en solo 20 minutos.",
    shortDescription: "Mascarilla en hoja con colágeno marino",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Mascarillas",
    price: 390,
    currency: "RD$",
    sku: "FF-MASK-SHEET-1",
    barcode: "758940563179",
    images: [
      {
        id: "img1",
        url: "/products/skincare/mask-sheet-collagen.png",
        alt: "Mascarilla de Colágeno en Hoja FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Unidades", value: "1", unit: "hoja" },
      { name: "Tiempo", value: "20", unit: "minutos" },
      { name: "Uso", value: "Un solo uso" }
    ],
    ingredients: [
      "Colágeno marino",
      "Péptidos",
      "Ácido hialurónico",
      "Vitamina C",
      "Extracto de algas",
      "Niacinamida"
    ],
    howToUse: [
      "Desplegar la mascarilla",
      "Aplicar sobre rostro limpio",
      "Ajustar a contornos faciales",
      "Dejar 20 minutos",
      "Masajear exceso de sérum"
    ],
    benefits: [
      "Boost de colágeno",
      "Hidratación intensa",
      "Efecto lifting inmediato",
      "Reduce líneas finas",
      "Luminosidad instantánea"
    ],
    suitableFor: ["Todo tipo de piel", "Tratamiento express", "Anti-edad"],
    volume: "25ml sérum",
    rating: 4.7,
    reviewCount: 789,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["mascarilla", "colágeno", "sheet mask", "anti-edad"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 30,
      dimensions: { length: 12, width: 10, height: 1 },
      fragile: false
    },
    relatedProducts: ["serum-collagen", "cream-peptide-firming"],
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

  // ACEITES FACIALES
  {
    id: "oil-face-argan",
    name: "Aceite Facial Argán Puro FemFuel",
    slug: "aceite-facial-argan-puro",
    description: "Aceite de argán 100% puro y orgánico que nutre profundamente, repara y protege la piel. Rico en vitamina E y ácidos grasos esenciales.",
    shortDescription: "Aceite de argán puro para nutrición intensa",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Aceites",
    price: 2190,
    currency: "RD$",
    sku: "FF-OIL-ARGAN-30",
    barcode: "758940563193",
    images: [
      {
        id: "img1",
        url: "/products/skincare/oil-face-argan.png",
        alt: "Aceite Facial Argán Puro FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Pureza", value: "100% orgánico" },
      { name: "Extracción", value: "Prensado en frío" }
    ],
    ingredients: [
      "Aceite de argán 100% puro",
      "Vitamina E natural"
    ],
    howToUse: [
      "Aplicar 2-3 gotas en palmas",
      "Calentar frotando las manos",
      "Presionar sobre rostro y cuello",
      "Usar preferiblemente de noche"
    ],
    benefits: [
      "Nutrición profunda",
      "Repara piel dañada",
      "Anti-envejecimiento",
      "Brillo saludable",
      "Protege barrera cutánea"
    ],
    suitableFor: ["Piel seca", "Piel madura", "Todo tipo de piel"],
    volume: "30ml",
    rating: 4.8,
    reviewCount: 567,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["aceite", "argán", "nutritivo", "orgánico"],
    availability: {
      inStock: true,
      stockQuantity: 89,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["oil-rosehip-regenerating", "serum-oil-blend"],
    createdAt: "2024-04-25T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "oil-rosehip-regenerating",
    name: "Aceite de Rosa Mosqueta Regenerador FemFuel",
    slug: "aceite-rosa-mosqueta-regenerador",
    description: "Aceite puro de rosa mosqueta con propiedades regeneradoras excepcionales. Reduce cicatrices, manchas y signos de envejecimiento.",
    shortDescription: "Aceite regenerador de rosa mosqueta pura",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Aceites",
    price: 1990,
    currency: "RD$",
    sku: "FF-OIL-ROSE-30",
    barcode: "758940563209",
    images: [
      {
        id: "img1",
        url: "/products/skincare/oil-rosehip-regenerating.png",
        alt: "Aceite de Rosa Mosqueta Regenerador FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Origen", value: "Chile" },
      { name: "Método", value: "Prensado en frío" }
    ],
    ingredients: [
      "Aceite de rosa mosqueta 100%",
      "Rico en vitaminas A, C, E",
      "Ácidos grasos omega 3,6,9"
    ],
    howToUse: [
      "Aplicar sobre piel limpia",
      "2-3 gotas son suficientes",
      "Masajear suavemente",
      "Ideal para cicatrices y manchas"
    ],
    benefits: [
      "Regenera tejidos",
      "Reduce cicatrices",
      "Atenúa manchas",
      "Mejora elasticidad",
      "Anti-envejecimiento"
    ],
    suitableFor: ["Todo tipo de piel", "Cicatrices", "Manchas", "Estrías"],
    volume: "30ml",
    rating: 4.7,
    reviewCount: 432,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["rosa mosqueta", "regenerador", "cicatrices", "aceite"],
    availability: {
      inStock: true,
      stockQuantity: 76,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["oil-face-argan", "cream-scar-treatment"],
    createdAt: "2024-05-05T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
];