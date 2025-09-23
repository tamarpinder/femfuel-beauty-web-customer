import { Product } from "@/types/product"

export const featuredProducts: Product[] = [
  {
    id: "hero-featured-product-1",
    name: "Sérum Anti-Edad Premium Gold FemFuel",
    slug: "serum-anti-edad-premium-gold",
    description: "Nuestro sérum anti-edad más lujoso con partículas de oro de 24k, ácido hialurónico y péptidos avanzados. Una fórmula revolucionaria que reduce visiblemente las líneas de expresión y arrugas mientras ilumina y rejuvenece la piel.",
    shortDescription: "Sérum premium con oro 24k para rejuvenecimiento intensivo",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Sueros",
    price: 4290,
    originalPrice: 5200,
    currency: "RD$",
    sku: "FF-SERUM-GOLD-30",
    barcode: "758940562871",
    images: [
      {
        id: "img1",
        url: "/products/featured/hero-featured-product-1.png",
        alt: "Sérum Anti-Edad Premium Gold FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Tipo de piel", value: "Todo tipo de piel" },
      { name: "Textura", value: "Ligera, absorción rápida" }
    ],
    ingredients: [
      "Oro coloidal 24k",
      "Ácido hialurónico",
      "Péptidos de colágeno",
      "Vitamina C estabilizada",
      "Retinol encapsulado",
      "Extracto de células madre vegetales",
      "Niacinamida",
      "Extracto de rosa damascena"
    ],
    howToUse: [
      "Aplicar 2-3 gotas en rostro limpio",
      "Masajear suavemente con movimientos ascendentes",
      "Usar mañana y noche antes de la crema hidratante",
      "Para mejores resultados, aplicar sobre piel ligeramente húmeda"
    ],
    benefits: [
      "Reduce arrugas y líneas de expresión",
      "Ilumina y unifica el tono de piel",
      "Estimula la producción de colágeno",
      "Hidratación profunda y duradera",
      "Protección antioxidante"
    ],
    suitableFor: ["Todo tipo de piel", "Piel madura", "Piel con signos de edad"],
    volume: "30ml",
    rating: 4.9,
    reviewCount: 1247,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    tags: ["anti-edad", "oro", "premium", "sérum", "luxury"],
    availability: {
      inStock: true,
      stockQuantity: 42,
      lowStockThreshold: 10,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 95,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["moisturizer-night-repair", "eye-cream-anti-aging"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "hero-featured-product-2",
    name: "Paleta de Sombras Signature FemFuel",
    slug: "paleta-sombras-signature-femfuel",
    description: "Nuestra paleta icónica con 16 tonos cuidadosamente seleccionados desde nudes hasta tonos ahumados intensos. Fórmula de alta pigmentación con acabados mate, satinado y metalizado para crear looks versátiles día y noche.",
    shortDescription: "Paleta profesional con 16 tonos de alta pigmentación",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Sombras",
    price: 3490,
    originalPrice: 4200,
    currency: "RD$",
    sku: "FF-PALETTE-SIG-16",
    barcode: "758940562888",
    images: [
      {
        id: "img1",
        url: "/products/featured/hero-featured-product-2.png",
        alt: "Paleta de Sombras Signature FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Número de tonos", value: "16" },
      { name: "Peso neto", value: "20", unit: "g" },
      { name: "Acabados", value: "Mate, Satinado, Metalizado" }
    ],
    ingredients: [
      "Talco",
      "Mica",
      "Dióxido de titanio",
      "Óxidos de hierro",
      "Estearato de magnesio",
      "Aceite de jojoba",
      "Vitamina E",
      "Sílice"
    ],
    howToUse: [
      "Aplicar con brocha o dedo sobre el párpado",
      "Construir intensidad gradualmente",
      "Mezclar tonos para crear efectos personalizados",
      "Usar con primer para mayor duración"
    ],
    benefits: [
      "Alta pigmentación",
      "Larga duración hasta 12 horas",
      "Fácil de difuminar",
      "Versatilidad de looks",
      "Sin fallout"
    ],
    suitableFor: ["Todo tipo de piel", "Uso profesional", "Maquillaje día y noche"],
    volume: "20g",
    rating: 4.8,
    reviewCount: 892,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    tags: ["maquillaje", "sombras", "paleta", "profesional"],
    availability: {
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 150,
      dimensions: { length: 18, width: 12, height: 2 },
      fragile: true
    },
    relatedProducts: ["primer-eyes", "brushes-set-eyes"],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "hero-featured-product-3",
    name: "Mascarilla Capilar Keratina Intensiva",
    slug: "mascarilla-capilar-keratina-intensiva",
    description: "Tratamiento profesional de keratina brasileña para reparación profunda del cabello. Reconstruye la fibra capilar desde el interior, eliminando el frizz y proporcionando suavidad y brillo espectacular.",
    shortDescription: "Tratamiento intensivo con keratina brasileña",
    brand: "FemFuel Beauty",
    category: "haircare",
    subcategory: "Mascarillas",
    price: 2890,
    currency: "RD$",
    sku: "FF-HAIR-KER-250",
    barcode: "758940562895",
    images: [
      {
        id: "img1",
        url: "/products/featured/hero-featured-product-3.png",
        alt: "Mascarilla Capilar Keratina Intensiva",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "250", unit: "ml" },
      { name: "Tipo de cabello", value: "Dañado, seco, procesado" },
      { name: "Libre de", value: "Sulfatos, parabenos, sal" }
    ],
    ingredients: [
      "Keratina hidrolizada",
      "Aceite de argán",
      "Proteínas de seda",
      "Colágeno marino",
      "Aceite de coco",
      "Manteca de karité",
      "Vitamina B5",
      "Extracto de bambú"
    ],
    howToUse: [
      "Aplicar sobre cabello limpio y húmedo",
      "Distribuir de medios a puntas",
      "Dejar actuar 10-15 minutos",
      "Enjuagar con agua tibia",
      "Usar 1-2 veces por semana"
    ],
    benefits: [
      "Reconstrucción profunda",
      "Elimina el frizz",
      "Brillo intenso",
      "Suavidad sedosa",
      "Protección térmica"
    ],
    suitableFor: ["Cabello dañado", "Cabello seco", "Cabello procesado químicamente"],
    volume: "250ml",
    rating: 4.7,
    reviewCount: 543,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
    tags: ["keratina", "reparación", "cabello", "tratamiento"],
    availability: {
      inStock: true,
      stockQuantity: 89,
      lowStockThreshold: 20,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 280,
      dimensions: { length: 15, width: 8, height: 18 },
      fragile: false
    },
    relatedProducts: ["shampoo-keratin", "serum-hair-repair"],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "hero-featured-product-4",
    name: "Base Líquida Cobertura HD FemFuel",
    slug: "base-liquida-cobertura-hd",
    description: "Base de maquillaje profesional con tecnología HD para un acabado impecable en cámara y en persona. Cobertura buildable de media a completa con acabado natural luminoso que dura hasta 24 horas.",
    shortDescription: "Base HD de larga duración con acabado luminoso",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Bases",
    price: 2690,
    currency: "RD$",
    sku: "FF-FOUND-HD-30",
    barcode: "758940562901",
    images: [
      {
        id: "img1",
        url: "/products/featured/hero-featured-product-4.png",
        alt: "Base Líquida Cobertura HD FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Cobertura", value: "Media a completa" },
      { name: "Duración", value: "24", unit: "horas" },
      { name: "SPF", value: "15" }
    ],
    ingredients: [
      "Agua",
      "Ciclopentasiloxano",
      "Dióxido de titanio",
      "Glicerina",
      "Ácido hialurónico",
      "Vitamina E",
      "Extracto de té verde",
      "Sílice"
    ],
    howToUse: [
      "Aplicar con brocha, esponja o dedos",
      "Comenzar desde el centro del rostro",
      "Difuminar hacia afuera",
      "Construir cobertura según necesidad"
    ],
    benefits: [
      "Acabado HD profesional",
      "Larga duración 24h",
      "Resistente al agua",
      "No transfiere",
      "Con SPF 15"
    ],
    suitableFor: ["Todo tipo de piel", "Uso profesional", "Fotografía"],
    volume: "30ml",
    rating: 4.8,
    reviewCount: 1089,
    isPopular: true,
    isFeatured: true,
    isNewArrival: true,
    isOnSale: false,
    tags: ["base", "HD", "larga duración", "cobertura"],
    availability: {
      inStock: true,
      stockQuantity: 156,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 12, width: 4, height: 14 },
      fragile: true
    },
    relatedProducts: ["concealer-hd", "setting-powder-hd"],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "hero-featured-product-5",
    name: "Crema Hidratante Anti-Edad Deluxe",
    slug: "crema-hidratante-anti-edad-deluxe",
    description: "Nuestra crema más lujosa con tecnología de péptidos avanzados y células madre vegetales. Hidratación profunda con acción anti-edad visible en 7 días. Textura sedosa que se absorbe rápidamente.",
    shortDescription: "Crema premium con péptidos y células madre",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 3890,
    originalPrice: 4500,
    currency: "RD$",
    sku: "FF-CREAM-DELUXE-50",
    barcode: "758940562918",
    images: [
      {
        id: "img1",
        url: "/products/featured/hero-featured-product-5.png",
        alt: "Crema Hidratante Anti-Edad Deluxe",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Tipo de piel", value: "Madura, seca" },
      { name: "Uso", value: "Día y noche" }
    ],
    ingredients: [
      "Células madre de argán",
      "Péptidos de colágeno",
      "Ácido hialurónico",
      "Ceramidas",
      "Vitamina C",
      "Retinol encapsulado",
      "Aceite de rosa mosqueta",
      "Manteca de karité"
    ],
    howToUse: [
      "Aplicar sobre rostro y cuello limpios",
      "Masajear con movimientos ascendentes",
      "Usar mañana y noche",
      "Ideal después del sérum"
    ],
    benefits: [
      "Reduce arrugas visiblemente",
      "Hidratación 72 horas",
      "Firmeza y elasticidad",
      "Luminosidad natural",
      "Regeneración celular"
    ],
    suitableFor: ["Piel madura", "Piel seca", "Piel con arrugas"],
    volume: "50ml",
    rating: 4.9,
    reviewCount: 876,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    tags: ["anti-edad", "hidratante", "premium", "péptidos"],
    availability: {
      inStock: true,
      stockQuantity: 73,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: true
    },
    relatedProducts: ["serum-anti-age", "eye-cream-premium"],
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]