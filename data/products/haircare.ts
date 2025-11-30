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
  },
  // ACONDICIONADORES - CONDITIONERS
  {
    id: "conditioner-hydrating-silk",
    name: "Acondicionador Hidratación Sedosa FemFuel",
    slug: "acondicionador-hidratacion-sedosa",
    description: "Acondicionador ultra hidratante que desenreda y suaviza el cabello sin apelmazar. Fórmula ligera con proteínas de seda que aporta brillo y manejabilidad.",
    shortDescription: "Acondicionador hidratante con proteínas de seda",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Acondicionador",
    price: 1490,
    currency: "RD$",
    sku: "FF-COND-SILK-300",
    barcode: "758940564032",
    images: [
      {
        id: "img1",
        url: "/products/haircare/conditioner-hydrating-silk.png",
        alt: "Acondicionador Hidratación Sedosa FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "300", unit: "ml" },
      { name: "Tipo de cabello", value: "Todo tipo de cabello" },
      { name: "Textura", value: "Cremosa ligera" }
    ],
    ingredients: [
      "Proteínas de seda",
      "Pantenol",
      "Aceite de argán",
      "Extracto de aloe vera",
      "Vitamina B5",
      "Glicerina vegetal"
    ],
    howToUse: [
      "Aplicar sobre cabello limpio y húmedo",
      "Distribuir de medios a puntas",
      "Dejar actuar 2-3 minutos",
      "Enjuagar con agua tibia"
    ],
    benefits: [
      "Desenreda instantáneamente",
      "Hidratación profunda",
      "Suavidad sedosa",
      "Brillo natural",
      "Fácil peinado"
    ],
    suitableFor: ["Todo tipo de cabello", "Uso diario", "Cabello seco"],
    volume: "300ml",
    rating: 4.7,
    reviewCount: 578,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["acondicionador", "hidratante", "seda", "cabello"],
    availability: {
      inStock: true,
      stockQuantity: 198,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 320,
      dimensions: { length: 18, width: 7, height: 20 },
      fragile: false
    },
    relatedProducts: ["shampoo-hydrating", "hair-mask-repair"],
    createdAt: "2024-07-12T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  // STYLING - PRODUCTOS DE PEINADO
  {
    id: "styling-cream-curl-definer",
    name: "Crema Definidora de Rizos FemFuel",
    slug: "crema-definidora-rizos",
    description: "Crema para peinado que define y controla rizos sin dejar residuos. Fórmula anti-frizz que mantiene los rizos definidos y elásticos todo el día.",
    shortDescription: "Crema definidora anti-frizz para rizos",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Styling",
    price: 1690,
    currency: "RD$",
    sku: "FF-STYLE-CURL-150",
    barcode: "758940564049",
    images: [
      {
        id: "img1",
        url: "/products/haircare/styling-cream-curl-definer.png",
        alt: "Crema Definidora de Rizos FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "150", unit: "ml" },
      { name: "Tipo de cabello", value: "Rizado, ondulado" },
      { name: "Fijación", value: "Media" }
    ],
    ingredients: [
      "Aceite de coco",
      "Manteca de karité",
      "Proteínas de trigo",
      "Extracto de lino",
      "Glicerina vegetal",
      "Vitamina E"
    ],
    howToUse: [
      "Aplicar sobre cabello húmedo",
      "Distribuir de raíz a puntas",
      "Definir rizos con los dedos",
      "Dejar secar al aire o con difusor"
    ],
    benefits: [
      "Define rizos naturalmente",
      "Controla el frizz",
      "Hidratación ligera",
      "Sin residuos pesados",
      "Fijación flexible"
    ],
    suitableFor: ["Cabello rizado", "Cabello ondulado", "Cabello texturizado"],
    volume: "150ml",
    rating: 4.8,
    reviewCount: 692,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["styling", "rizos", "definidor", "anti-frizz"],
    availability: {
      inStock: true,
      stockQuantity: 156,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 170,
      dimensions: { length: 14, width: 6, height: 16 },
      fragile: false
    },
    relatedProducts: ["serum-anti-frizz", "conditioner-hydrating-silk"],
    createdAt: "2024-07-18T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "styling-spray-texturizing",
    name: "Spray Texturizante Volumen FemFuel",
    slug: "spray-texturizante-volumen",
    description: "Spray texturizante que aporta volumen y textura con acabado mate. Ideal para crear looks despeinados con fijación ligera.",
    shortDescription: "Spray texturizante de volumen acabado mate",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Styling",
    price: 1590,
    currency: "RD$",
    sku: "FF-STYLE-TEXT-200",
    barcode: "758940564056",
    images: [
      {
        id: "img1",
        url: "/products/haircare/styling-spray-texturizing.png",
        alt: "Spray Texturizante Volumen FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "200", unit: "ml" },
      { name: "Acabado", value: "Mate" },
      { name: "Fijación", value: "Ligera a media" }
    ],
    ingredients: [
      "Sales marinas",
      "Extracto de algas",
      "Proteínas vegetales",
      "Pantenol",
      "Extracto de té verde"
    ],
    howToUse: [
      "Agitar bien antes de usar",
      "Pulverizar sobre cabello seco",
      "Aplicar desde raíces a medios",
      "Peinar con los dedos para texturizar"
    ],
    benefits: [
      "Volumen instantáneo",
      "Textura despeinada",
      "Acabado mate natural",
      "Fijación flexible",
      "Efecto playa"
    ],
    suitableFor: ["Cabello fino", "Cabello lacio", "Todo tipo de cabello"],
    volume: "200ml",
    rating: 4.6,
    reviewCount: 445,
    isPopular: false,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["spray", "texturizante", "volumen", "styling"],
    availability: {
      inStock: true,
      stockQuantity: 189,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 220,
      dimensions: { length: 16, width: 6, height: 20 },
      fragile: false
    },
    relatedProducts: ["styling-cream-curl-definer", "serum-anti-frizz"],
    createdAt: "2024-07-22T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  // TRATAMIENTOS - TREATMENTS
  {
    id: "treatment-oil-argan-intensive",
    name: "Aceite de Argán Tratamiento Intensivo FemFuel",
    slug: "aceite-argan-tratamiento-intensivo",
    description: "Aceite de argán 100% puro para tratamiento capilar intensivo. Rico en vitamina E y ácidos grasos que nutren profundamente y aportan brillo extraordinario.",
    shortDescription: "Aceite de argán puro para nutrición profunda",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Tratamientos",
    price: 2190,
    currency: "RD$",
    sku: "FF-TREAT-ARG-50",
    barcode: "758940564063",
    images: [
      {
        id: "img1",
        url: "/products/haircare/treatment-oil-argan-intensive.png",
        alt: "Aceite de Argán Tratamiento Intensivo FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Pureza", value: "100%", unit: "" },
      { name: "Tipo", value: "Prensado en frío" }
    ],
    ingredients: [
      "Aceite de argán 100% puro",
      "Vitamina E natural",
      "Ácidos grasos esenciales",
      "Antioxidantes naturales"
    ],
    howToUse: [
      "Aplicar 2-3 gotas sobre cabello húmedo o seco",
      "Distribuir de medios a puntas",
      "Puede usarse también en el rostro",
      "No enjuagar"
    ],
    benefits: [
      "Nutrición profunda",
      "Brillo extraordinario",
      "Suaviza y repara",
      "Protección antioxidante",
      "Versatilidad total"
    ],
    suitableFor: ["Cabello seco", "Cabello dañado", "Todo tipo de cabello"],
    volume: "50ml",
    rating: 4.9,
    reviewCount: 834,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["aceite", "argán", "tratamiento", "nutrición"],
    availability: {
      inStock: true,
      stockQuantity: 123,
      lowStockThreshold: 25,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["hair-mask-repair", "serum-anti-frizz"],
    createdAt: "2024-06-28T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]