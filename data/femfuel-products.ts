import { Product, ProductCategory } from "@/types/product"

// FemFuel Beauty Product Catalog
export const femfuelProducts: Product[] = [
  // ========================
  // FEATURED HERO PRODUCTS
  // ========================
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
  },

  // ========================
  // SKINCARE PRODUCTS
  // ========================

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
    isPopular: true,
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
  },

  // SUEROS
  {
    id: "serum-vitamin-c",
    name: "Sérum Vitamina C Iluminador FemFuel",
    slug: "serum-vitamina-c-iluminador",
    description: "Sérum concentrado con vitamina C estabilizada al 15% que ilumina, unifica el tono y combate los signos del envejecimiento. Potente acción antioxidante que protege contra los radicales libres.",
    shortDescription: "Sérum iluminador con vitamina C al 15%",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Sueros",
    price: 2190,
    originalPrice: 2600,
    currency: "RD$",
    sku: "FF-SERUM-VITC-30",
    barcode: "758940563025",
    images: [
      {
        id: "img1",
        url: "/products/skincare/serum-vitamin-c.png",
        alt: "Sérum Vitamina C Iluminador FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Concentración Vitamina C", value: "15", unit: "%" },
      { name: "pH", value: "3.5" }
    ],
    ingredients: [
      "Ácido L-ascórbico 15%",
      "Vitamina E",
      "Ácido ferúlico",
      "Ácido hialurónico",
      "Extracto de naranja",
      "Glicerina vegetal"
    ],
    howToUse: [
      "Aplicar 3-4 gotas en rostro limpio",
      "Usar preferiblemente por la mañana",
      "Seguir con protector solar",
      "Evitar el contorno de ojos"
    ],
    benefits: [
      "Ilumina y unifica el tono",
      "Reduce manchas oscuras",
      "Estimula colágeno",
      "Protección antioxidante",
      "Mejora textura de la piel"
    ],
    suitableFor: ["Todo tipo de piel", "Piel opaca", "Manchas"],
    volume: "30ml",
    rating: 4.8,
    reviewCount: 654,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    tags: ["vitamina c", "iluminador", "antioxidante", "sérum"],
    availability: {
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["sunscreen-spf50", "moisturizer-hyaluronic"],
    createdAt: "2024-04-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "serum-retinol-night",
    name: "Sérum Retinol Reparación Nocturna FemFuel",
    slug: "serum-retinol-reparacion-nocturna",
    description: "Tratamiento nocturno intensivo con retinol encapsulado que acelera la renovación celular, reduce arrugas y mejora la textura de la piel mientras duermes.",
    shortDescription: "Sérum nocturno con retinol para renovación celular",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Sueros",
    price: 2490,
    currency: "RD$",
    sku: "FF-SERUM-RET-30",
    barcode: "758940563032",
    images: [
      {
        id: "img1",
        url: "/products/skincare/serum-retinol-night.png",
        alt: "Sérum Retinol Reparación Nocturna FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Concentración Retinol", value: "0.5", unit: "%" },
      { name: "Uso", value: "Nocturno" }
    ],
    ingredients: [
      "Retinol encapsulado 0.5%",
      "Bakuchiol",
      "Niacinamida",
      "Péptidos",
      "Escualano",
      "Vitamina E",
      "Extracto de centella asiática"
    ],
    howToUse: [
      "Aplicar solo por la noche",
      "Comenzar 2 veces por semana",
      "Aumentar frecuencia gradualmente",
      "Siempre usar SPF al día siguiente"
    ],
    benefits: [
      "Acelera renovación celular",
      "Reduce arrugas finas",
      "Mejora textura",
      "Minimiza poros",
      "Aclara manchas"
    ],
    suitableFor: ["Piel madura", "Arrugas", "Textura irregular"],
    volume: "30ml",
    rating: 4.7,
    reviewCount: 432,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["retinol", "anti-edad", "nocturno", "renovación"],
    availability: {
      inStock: true,
      stockQuantity: 54,
      lowStockThreshold: 12,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["moisturizer-night-repair", "eye-cream-anti-aging"],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "serum-niacinamide-pore",
    name: "Sérum Niacinamida Control de Poros FemFuel",
    slug: "serum-niacinamida-control-poros",
    description: "Sérum especializado con niacinamida al 10% y zinc para controlar el exceso de grasa, minimizar poros dilatados y mejorar la textura general de la piel.",
    shortDescription: "Sérum con niacinamida para poros y control de grasa",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Sueros",
    price: 1890,
    currency: "RD$",
    sku: "FF-SERUM-NIAC-30",
    barcode: "758940563049",
    images: [
      {
        id: "img1",
        url: "/products/skincare/serum-niacinamide-pore.png",
        alt: "Sérum Niacinamida Control de Poros FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Concentración Niacinamida", value: "10", unit: "%" },
      { name: "Con Zinc", value: "1", unit: "%" }
    ],
    ingredients: [
      "Niacinamida 10%",
      "Zinc PCA 1%",
      "Ácido salicílico",
      "Extracto de hamamelis",
      "Ácido hialurónico",
      "Aloe vera"
    ],
    howToUse: [
      "Aplicar mañana y noche",
      "2-3 gotas sobre piel limpia",
      "Enfocar en zona T",
      "Seguir con hidratante"
    ],
    benefits: [
      "Minimiza poros visibles",
      "Controla producción de grasa",
      "Mejora textura",
      "Reduce imperfecciones",
      "Unifica tono de piel"
    ],
    suitableFor: ["Piel grasa", "Piel mixta", "Poros dilatados"],
    volume: "30ml",
    rating: 4.6,
    reviewCount: 567,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["niacinamida", "poros", "control grasa", "sérum"],
    availability: {
      inStock: true,
      stockQuantity: 89,
      lowStockThreshold: 18,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["cleanser-foam-gentle", "moisturizer-hyaluronic"],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "serum-hyaluronic-plumping",
    name: "Sérum Hialurónico Rellenador FemFuel",
    slug: "serum-hialuronico-rellenador",
    description: "Sérum ultra-hidratante con múltiples pesos moleculares de ácido hialurónico que proporciona hidratación en todas las capas de la piel, rellenando visiblemente las líneas finas.",
    shortDescription: "Sérum rellenador con ácido hialurónico multicapa",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Sueros",
    price: 2290,
    currency: "RD$",
    sku: "FF-SERUM-HYA-30",
    barcode: "758940563056",
    images: [
      {
        id: "img1",
        url: "/products/skincare/serum-hyaluronic-plumping.png",
        alt: "Sérum Hialurónico Rellenador FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Concentración HA", value: "2", unit: "%" },
      { name: "Pesos moleculares", value: "5 tipos" }
    ],
    ingredients: [
      "Ácido hialurónico 2%",
      "Vitamina B5",
      "Extracto de algas marinas",
      "Glicerina",
      "Extracto de pepino",
      "Agua de rosas"
    ],
    howToUse: [
      "Aplicar sobre piel húmeda",
      "2-3 gotas mañana y noche",
      "Sellar con crema hidratante",
      "Ideal después de limpieza"
    ],
    benefits: [
      "Hidratación profunda multicapa",
      "Rellena líneas finas",
      "Efecto plumping inmediato",
      "Mejora elasticidad",
      "Calma irritaciones"
    ],
    suitableFor: ["Todo tipo de piel", "Piel deshidratada", "Líneas finas"],
    volume: "30ml",
    rating: 4.8,
    reviewCount: 789,
    isPopular: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["hialurónico", "hidratante", "plumping", "sérum"],
    availability: {
      inStock: true,
      stockQuantity: 124,
      lowStockThreshold: 25,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 85,
      dimensions: { length: 10, width: 4, height: 12 },
      fragile: true
    },
    relatedProducts: ["moisturizer-hyaluronic", "mist-facial-hydrating"],
    createdAt: "2024-07-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

  // HIDRATANTES
  {
    id: "moisturizer-hyaluronic",
    name: "Crema Hidratante Ácido Hialurónico FemFuel",
    slug: "crema-hidratante-acido-hialuronico",
    description: "Crema hidratante ligera enriquecida con ácido hialurónico y ceramidas que proporciona hidratación duradera sin sensación grasa. Perfecta para uso diario.",
    shortDescription: "Crema hidratante con ácido hialurónico",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 1790,
    currency: "RD$",
    sku: "FF-MOIST-HYA-50",
    barcode: "758940563063",
    images: [
      {
        id: "img1",
        url: "/products/skincare/moisturizer-hyaluronic.png",
        alt: "Crema Hidratante Ácido Hialurónico FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Textura", value: "Ligera, no grasa" },
      { name: "Uso", value: "Día y noche" }
    ],
    ingredients: [
      "Ácido hialurónico",
      "Ceramidas",
      "Niacinamida",
      "Glicerina",
      "Manteca de karité",
      "Vitamina E",
      "Extracto de centella asiática"
    ],
    howToUse: [
      "Aplicar sobre rostro y cuello limpios",
      "Masajear hasta absorción completa",
      "Usar mañana y noche",
      "Ideal después del sérum"
    ],
    benefits: [
      "Hidratación 24 horas",
      "Fortalece barrera cutánea",
      "Textura ligera",
      "No comedogénica",
      "Calma irritaciones"
    ],
    suitableFor: ["Todo tipo de piel", "Piel normal a seca", "Uso diario"],
    volume: "50ml",
    rating: 4.7,
    reviewCount: 892,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["hidratante", "hialurónico", "ceramidas", "diario"],
    availability: {
      inStock: true,
      stockQuantity: 167,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["serum-hyaluronic-plumping", "sunscreen-spf50"],
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "moisturizer-night-repair",
    name: "Crema Nocturna Reparadora Intensiva FemFuel",
    slug: "crema-nocturna-reparadora-intensiva",
    description: "Tratamiento nocturno rico y nutritivo que trabaja mientras duermes para reparar, regenerar y revitalizar la piel. Con péptidos y antioxidantes para máxima reparación.",
    shortDescription: "Crema nocturna intensiva para reparación profunda",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 2390,
    currency: "RD$",
    sku: "FF-MOIST-NIGHT-50",
    barcode: "758940563070",
    images: [
      {
        id: "img1",
        url: "/products/skincare/moisturizer-night-repair.png",
        alt: "Crema Nocturna Reparadora Intensiva FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Textura", value: "Rica, nutritiva" },
      { name: "Uso", value: "Nocturno" }
    ],
    ingredients: [
      "Péptidos de colágeno",
      "Retinol encapsulado",
      "Aceite de argán",
      "Vitamina C",
      "Coenzima Q10",
      "Extracto de lavanda",
      "Manteca de cacao"
    ],
    howToUse: [
      "Aplicar por la noche sobre piel limpia",
      "Masajear rostro y cuello",
      "Dejar actuar durante la noche",
      "Usar después del sérum nocturno"
    ],
    benefits: [
      "Reparación nocturna intensiva",
      "Estimula regeneración celular",
      "Reduce arrugas",
      "Nutrición profunda",
      "Despertar con piel renovada"
    ],
    suitableFor: ["Piel madura", "Piel seca", "Signos de edad"],
    volume: "50ml",
    rating: 4.8,
    reviewCount: 543,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["nocturna", "reparadora", "anti-edad", "nutritiva"],
    availability: {
      inStock: true,
      stockQuantity: 78,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["serum-retinol-night", "eye-cream-anti-aging"],
    createdAt: "2024-04-05T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "cream-peptide-firming",
    name: "Crema Reafirmante con Péptidos FemFuel",
    slug: "crema-reafirmante-peptidos",
    description: "Crema avanzada con complejo de péptidos que mejora la firmeza y elasticidad de la piel. Tecnología lifting que redefine el contorno facial.",
    shortDescription: "Crema reafirmante con tecnología péptidos",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 2790,
    currency: "RD$",
    sku: "FF-CREAM-PEPT-50",
    barcode: "758940563087",
    images: [
      {
        id: "img1",
        url: "/products/skincare/cream-peptide-firming.png",
        alt: "Crema Reafirmante con Péptidos FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Con péptidos", value: "5 tipos" },
      { name: "Efecto", value: "Lifting y firmeza" }
    ],
    ingredients: [
      "Complejo de 5 péptidos",
      "Colágeno marino",
      "Elastina",
      "DMAE",
      "Vitamina C",
      "Aceite de jojoba",
      "Extracto de ginseng"
    ],
    howToUse: [
      "Aplicar mañana y noche",
      "Masajear con movimientos ascendentes",
      "Enfocarse en zonas de flacidez",
      "Extender hasta el cuello"
    ],
    benefits: [
      "Mejora firmeza visible",
      "Efecto lifting",
      "Redefine contornos",
      "Estimula colágeno",
      "Piel más elástica"
    ],
    suitableFor: ["Piel madura", "Pérdida de firmeza", "Anti-edad"],
    volume: "50ml",
    rating: 4.7,
    reviewCount: 376,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["péptidos", "reafirmante", "lifting", "anti-edad"],
    availability: {
      inStock: true,
      stockQuantity: 56,
      lowStockThreshold: 12,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["serum-peptide", "eye-cream-firming"],
    createdAt: "2024-05-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "cream-vitamin-e-antioxidant",
    name: "Crema Vitamina E Antioxidante FemFuel",
    slug: "crema-vitamina-e-antioxidante",
    description: "Crema protectora enriquecida con vitamina E y antioxidantes naturales que protege contra el daño ambiental y mantiene la piel nutrida y saludable.",
    shortDescription: "Crema antioxidante con vitamina E",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 1590,
    currency: "RD$",
    sku: "FF-CREAM-VITE-50",
    barcode: "758940563094",
    images: [
      {
        id: "img1",
        url: "/products/skincare/cream-vitamin-e-antioxidant.png",
        alt: "Crema Vitamina E Antioxidante FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Vitamina E", value: "Alta concentración" },
      { name: "Protección", value: "Antioxidante" }
    ],
    ingredients: [
      "Vitamina E (tocoferol)",
      "Extracto de té verde",
      "Vitamina C",
      "Resveratrol",
      "Aceite de semilla de uva",
      "Aloe vera",
      "Glicerina"
    ],
    howToUse: [
      "Aplicar mañana y/o noche",
      "Sobre piel limpia y seca",
      "Masajear suavemente",
      "Ideal para pieles expuestas a contaminación"
    ],
    benefits: [
      "Protección antioxidante",
      "Combate radicales libres",
      "Previene envejecimiento prematuro",
      "Nutrición intensa",
      "Calma irritaciones"
    ],
    suitableFor: ["Todo tipo de piel", "Piel estresada", "Protección diaria"],
    volume: "50ml",
    rating: 4.5,
    reviewCount: 234,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["vitamina e", "antioxidante", "protección", "nutritiva"],
    availability: {
      inStock: true,
      stockQuantity: 89,
      lowStockThreshold: 18,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["serum-vitamin-c", "sunscreen-spf50"],
    createdAt: "2024-06-12T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "cream-ceramide-barrier",
    name: "Crema Barrera con Ceramidas FemFuel",
    slug: "crema-barrera-ceramidas",
    description: "Crema reparadora con triple complejo de ceramidas que restaura y fortalece la barrera protectora de la piel. Ideal para pieles sensibles y comprometidas.",
    shortDescription: "Crema reparadora con ceramidas para barrera cutánea",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Hidratantes",
    price: 2090,
    currency: "RD$",
    sku: "FF-CREAM-CERA-50",
    barcode: "758940563100",
    images: [
      {
        id: "img1",
        url: "/products/skincare/cream-ceramide-barrier.png",
        alt: "Crema Barrera con Ceramidas FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "Ceramidas", value: "Triple complejo" },
      { name: "Para", value: "Piel sensible" }
    ],
    ingredients: [
      "Ceramida NP",
      "Ceramida AP",
      "Ceramida EOP",
      "Colesterol",
      "Ácidos grasos",
      "Niacinamida",
      "Centella asiática"
    ],
    howToUse: [
      "Aplicar sobre piel limpia",
      "Mañana y noche",
      "Capa generosa en zonas secas",
      "Perfecto para pieles sensibilizadas"
    ],
    benefits: [
      "Restaura barrera cutánea",
      "Reduce sensibilidad",
      "Retiene humedad",
      "Calma irritaciones",
      "Fortalece piel"
    ],
    suitableFor: ["Piel sensible", "Piel seca", "Barrera dañada"],
    volume: "50ml",
    rating: 4.8,
    reviewCount: 456,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["ceramidas", "barrera", "sensible", "reparadora"],
    availability: {
      inStock: true,
      stockQuantity: 93,
      lowStockThreshold: 18,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 8, width: 8, height: 10 },
      fragile: false
    },
    relatedProducts: ["cleanser-gentle", "serum-ceramide"],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

  // TRATAMIENTOS ESPECIALES
  {
    id: "sunscreen-spf50",
    name: "Protector Solar SPF 50 Invisible FemFuel",
    slug: "protector-solar-spf50-invisible",
    description: "Protector solar de amplio espectro con tecnología invisible que no deja residuo blanco. Textura ultraligera que se absorbe instantáneamente, perfecto para uso diario bajo el maquillaje.",
    shortDescription: "Protector solar invisible SPF 50 de textura ligera",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Protección Solar",
    price: 1990,
    currency: "RD$",
    sku: "FF-SUN-SPF50-50",
    barcode: "758940563117",
    images: [
      {
        id: "img1",
        url: "/products/skincare/sunscreen-spf50.png",
        alt: "Protector Solar SPF 50 Invisible FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "50", unit: "ml" },
      { name: "SPF", value: "50" },
      { name: "Protección", value: "UVA/UVB amplio espectro" }
    ],
    ingredients: [
      "Zinc oxide",
      "Titanium dioxide",
      "Niacinamida",
      "Vitamina E",
      "Extracto de té verde",
      "Ácido hialurónico",
      "Aloe vera"
    ],
    howToUse: [
      "Aplicar generosamente 15 min antes de exposición",
      "Reaplicar cada 2 horas",
      "Usar diariamente como último paso",
      "Ideal bajo el maquillaje"
    ],
    benefits: [
      "Protección SPF 50",
      "No deja residuo blanco",
      "Textura invisible",
      "Resistente al agua",
      "No comedogénico"
    ],
    suitableFor: ["Todo tipo de piel", "Uso diario", "Bajo maquillaje"],
    volume: "50ml",
    rating: 4.9,
    reviewCount: 1234,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["protector solar", "spf50", "invisible", "diario"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 110,
      dimensions: { length: 14, width: 5, height: 16 },
      fragile: false
    },
    relatedProducts: ["moisturizer-hyaluronic", "serum-vitamin-c"],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "eye-cream-anti-aging",
    name: "Contorno de Ojos Anti-Edad Premium FemFuel",
    slug: "contorno-ojos-anti-edad-premium",
    description: "Tratamiento especializado para el contorno de ojos con péptidos y cafeína que reduce ojeras, bolsas y líneas de expresión. Fórmula oftalmológicamente probada.",
    shortDescription: "Contorno de ojos anti-edad con péptidos y cafeína",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Cuidado de Ojos",
    price: 2290,
    currency: "RD$",
    sku: "FF-EYE-ANTI-15",
    barcode: "758940563124",
    images: [
      {
        id: "img1",
        url: "/products/skincare/eye-cream-anti-aging.png",
        alt: "Contorno de Ojos Anti-Edad Premium FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "ml" },
      { name: "Zona", value: "Contorno de ojos" },
      { name: "Testado", value: "Oftalmológicamente" }
    ],
    ingredients: [
      "Péptidos",
      "Cafeína",
      "Vitamina K",
      "Retinol suave",
      "Ácido hialurónico",
      "Extracto de pepino",
      "Niacinamida"
    ],
    howToUse: [
      "Aplicar pequeña cantidad con dedo anular",
      "Dar toques suaves sin frotar",
      "Usar mañana y noche",
      "Desde el lagrimal hacia afuera"
    ],
    benefits: [
      "Reduce ojeras",
      "Disminuye bolsas",
      "Alisa líneas finas",
      "Hidrata delicadamente",
      "Ilumina la mirada"
    ],
    suitableFor: ["Todo tipo de piel", "Ojeras", "Líneas de expresión"],
    volume: "15ml",
    rating: 4.7,
    reviewCount: 678,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["contorno ojos", "anti-edad", "ojeras", "premium"],
    availability: {
      inStock: true,
      stockQuantity: 87,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 50,
      dimensions: { length: 8, width: 4, height: 10 },
      fragile: true
    },
    relatedProducts: ["patch-hydrogel-eye", "serum-eye"],
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

  // TÓNICOS Y ESENCIAS
  {
    id: "toner-rose-water",
    name: "Tónico Facial Agua de Rosas FemFuel",
    slug: "tonico-facial-agua-rosas",
    description: "Tónico refrescante con agua de rosas pura que equilibra el pH, tonifica y prepara la piel para maximizar la absorción de los tratamientos posteriores.",
    shortDescription: "Tónico equilibrante con agua de rosas naturales",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Tónicos",
    price: 1290,
    currency: "RD$",
    sku: "FF-TONER-ROSE-200",
    barcode: "758940563131",
    images: [
      {
        id: "img1",
        url: "/products/skincare/toner-rose-water.png",
        alt: "Tónico Facial Agua de Rosas FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "200", unit: "ml" },
      { name: "Tipo", value: "Spray" },
      { name: "pH", value: "5.5" }
    ],
    ingredients: [
      "Agua de rosas orgánica",
      "Hamamelis",
      "Glicerina vegetal",
      "Extracto de camomila",
      "Aloe vera",
      "Pantenol"
    ],
    howToUse: [
      "Pulverizar sobre rostro limpio",
      "O aplicar con algodón",
      "Usar mañana y noche",
      "No enjuagar"
    ],
    benefits: [
      "Equilibra pH de la piel",
      "Tonifica y refresca",
      "Prepara para tratamientos",
      "Calma irritaciones",
      "Hidrata suavemente"
    ],
    suitableFor: ["Todo tipo de piel", "Piel sensible", "Uso diario"],
    volume: "200ml",
    rating: 4.6,
    reviewCount: 543,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["tónico", "agua de rosas", "equilibrante", "refrescante"],
    availability: {
      inStock: true,
      stockQuantity: 145,
      lowStockThreshold: 25,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 230,
      dimensions: { length: 16, width: 6, height: 18 },
      fragile: false
    },
    relatedProducts: ["cleanser-foam-gentle", "moisturizer-hyaluronic"],
    createdAt: "2024-04-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "essence-hydrating",
    name: "Esencia Hidratante K-Beauty FemFuel",
    slug: "esencia-hidratante-k-beauty",
    description: "Esencia ligera inspirada en la rutina coreana que proporciona una capa extra de hidratación y prepara la piel para maximizar la absorción de los siguientes productos.",
    shortDescription: "Esencia hidratante estilo K-Beauty",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Esencias",
    price: 1890,
    currency: "RD$",
    sku: "FF-ESS-HYDRA-150",
    barcode: "758940563148",
    images: [
      {
        id: "img1",
        url: "/products/skincare/essence-hydrating.png",
        alt: "Esencia Hidratante K-Beauty FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "150", unit: "ml" },
      { name: "Textura", value: "Acuosa ligera" },
      { name: "Origen", value: "K-Beauty inspired" }
    ],
    ingredients: [
      "Extracto de arroz fermentado",
      "Ácido hialurónico",
      "Extracto de ginseng",
      "Niacinamida",
      "Extracto de bambú",
      "Beta-glucano"
    ],
    howToUse: [
      "Aplicar después del tónico",
      "Palmear suavemente en la piel",
      "No frotar, dejar absorber",
      "Seguir con sérum"
    ],
    benefits: [
      "Hidratación en capas",
      "Prepara la piel",
      "Mejora absorción",
      "Ilumina el rostro",
      "Textura refinada"
    ],
    suitableFor: ["Todo tipo de piel", "Rutina multicapa", "Piel deshidratada"],
    volume: "150ml",
    rating: 4.5,
    reviewCount: 234,
    isPopular: false,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["esencia", "k-beauty", "hidratante", "preparadora"],
    availability: {
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 12,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 180,
      dimensions: { length: 15, width: 5, height: 17 },
      fragile: false
    },
    relatedProducts: ["toner-rose-water", "serum-hyaluronic-plumping"],
    createdAt: "2024-07-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "mist-facial-hydrating",
    name: "Bruma Facial Hidratante Refrescante FemFuel",
    slug: "bruma-facial-hidratante-refrescante",
    description: "Bruma facial ultrafina que refresca e hidrata al instante. Perfecta para fijar el maquillaje o refrescar la piel durante el día.",
    shortDescription: "Bruma refrescante para hidratación instantánea",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Brumas",
    price: 1190,
    currency: "RD$",
    sku: "FF-MIST-HYDRA-100",
    barcode: "758940563155",
    images: [
      {
        id: "img1",
        url: "/products/skincare/mist-facial-hydrating.png",
        alt: "Bruma Facial Hidratante Refrescante FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "100", unit: "ml" },
      { name: "Tipo", value: "Spray ultrafino" },
      { name: "Uso", value: "Durante el día" }
    ],
    ingredients: [
      "Agua termal",
      "Ácido hialurónico",
      "Extracto de pepino",
      "Vitamina B5",
      "Extracto de aloe vera",
      "Glicerina"
    ],
    howToUse: [
      "Pulverizar a 20cm del rostro",
      "Usar sobre piel limpia o maquillaje",
      "Reaplicar cuando necesites frescura",
      "Dejar secar naturalmente"
    ],
    benefits: [
      "Hidratación instantánea",
      "Fija el maquillaje",
      "Refresca la piel",
      "Calma irritaciones",
      "Portable"
    ],
    suitableFor: ["Todo tipo de piel", "Retoque durante el día", "Viajes"],
    volume: "100ml",
    rating: 4.4,
    reviewCount: 321,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["bruma", "hidratante", "refrescante", "fijador"],
    availability: {
      inStock: true,
      stockQuantity: 178,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 130,
      dimensions: { length: 14, width: 4, height: 16 },
      fragile: false
    },
    relatedProducts: ["toner-rose-water", "moisturizer-hyaluronic"],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

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
    isPopular: true,
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

  // EXFOLIANTES
  {
    id: "exfoliator-gentle-enzyme",
    name: "Exfoliante Enzimático Suave FemFuel",
    slug: "exfoliante-enzimatico-suave",
    description: "Exfoliante suave con enzimas de papaya y piña que elimina células muertas sin irritar, revelando una piel más suave y luminosa.",
    shortDescription: "Exfoliante enzimático para renovación suave",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Exfoliantes",
    price: 1590,
    currency: "RD$",
    sku: "FF-EXFO-ENZ-75",
    barcode: "758940563186",
    images: [
      {
        id: "img1",
        url: "/products/skincare/exfoliator-gentle-enzyme.png",
        alt: "Exfoliante Enzimático Suave FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "75", unit: "ml" },
      { name: "Tipo", value: "Enzimático" },
      { name: "Frecuencia", value: "2-3 veces/semana" }
    ],
    ingredients: [
      "Enzima de papaya",
      "Enzima de piña",
      "Ácido láctico suave",
      "Aloe vera",
      "Vitamina E",
      "Extracto de camomila"
    ],
    howToUse: [
      "Aplicar sobre piel húmeda",
      "Masajear suavemente 1-2 minutos",
      "Dejar actuar 5 minutos más",
      "Enjuagar con agua tibia",
      "Usar 2-3 veces por semana"
    ],
    benefits: [
      "Exfoliación suave",
      "Renueva textura",
      "Ilumina la piel",
      "No irrita",
      "Apto piel sensible"
    ],
    suitableFor: ["Todo tipo de piel", "Piel sensible", "Textura irregular"],
    volume: "75ml",
    rating: 4.5,
    reviewCount: 345,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["exfoliante", "enzimático", "suave", "renovador"],
    availability: {
      inStock: true,
      stockQuantity: 76,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 100,
      dimensions: { length: 14, width: 5, height: 16 },
      fragile: false
    },
    relatedProducts: ["cleanser-foam-gentle", "moisturizer-hyaluronic"],
    createdAt: "2024-05-30T00:00:00Z",
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
  },

  // ========================
  // HAIR CARE PRODUCTS
  // ========================
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
    isPopular: true,
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
    isPopular: true,
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

  // ========================
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
    isPopular: true,
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
    isPopular: true,
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
    isPopular: true,
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
  },

  // ========================
  // BEAUTY TOOLS & ACCESSORIES
  // ========================
  {
    id: "brush-set-makeup-professional",
    name: "Set de Brochas Profesionales FemFuel",
    slug: "set-brochas-profesionales",
    description: "Set completo de 12 brochas profesionales para maquillaje con cerdas sintéticas de alta calidad. Incluye estuche de lujo.",
    shortDescription: "Set de 12 brochas profesionales con estuche",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Brochas",
    price: 3490,
    currency: "RD$",
    sku: "FF-BRUSH-SET-12",
    barcode: "758940566001",
    images: [
      {
        id: "img1",
        url: "/products/tools/brush-set-makeup-professional.png",
        alt: "Set de Brochas Profesionales FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Cantidad", value: "12", unit: "brochas" },
      { name: "Cerdas", value: "Sintéticas" },
      { name: "Incluye", value: "Estuche de lujo" }
    ],
    ingredients: [
      "Cerdas sintéticas premium",
      "Ferrule de aluminio",
      "Mango de madera lacada",
      "Estuche de cuero sintético"
    ],
    howToUse: [
      "Seleccionar brocha según uso",
      "Aplicar producto con movimientos suaves",
      "Limpiar después de cada uso",
      "Guardar en estuche"
    ],
    benefits: [
      "Aplicación profesional",
      "Cerdas ultra suaves",
      "Larga duración",
      "Fácil limpieza",
      "Presentación de lujo"
    ],
    suitableFor: ["Profesionales", "Entusiastas del maquillaje", "Regalo"],
    volume: "Set completo",
    rating: 4.8,
    reviewCount: 234,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["brochas", "profesional", "set", "maquillaje"],
    availability: {
      inStock: true,
      stockQuantity: 45,
      lowStockThreshold: 10,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 350,
      dimensions: { length: 25, width: 15, height: 5 },
      fragile: false
    },
    relatedProducts: ["sponge-beauty-pink", "mirror-led-magnifying"],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "sponge-beauty-pink",
    name: "Esponja de Maquillaje Rosa FemFuel",
    slug: "esponja-maquillaje-rosa",
    description: "Esponja de maquillaje ultra suave que se expande con agua para una aplicación perfecta. Sin látex y libre de crueldad animal.",
    shortDescription: "Esponja de maquillaje expandible sin látex",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Esponjas",
    price: 490,
    currency: "RD$",
    sku: "FF-SPONGE-PINK-1",
    barcode: "758940566018",
    images: [
      {
        id: "img1",
        url: "/products/tools/sponge-beauty-pink.png",
        alt: "Esponja de Maquillaje Rosa FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Unidades", value: "1", unit: "esponja" },
      { name: "Material", value: "Sin látex" },
      { name: "Se expande", value: "Con agua" }
    ],
    ingredients: [
      "Hidro-poliuretano",
      "Libre de látex",
      "No tóxico"
    ],
    howToUse: [
      "Humedecer con agua",
      "Escurrir el exceso",
      "Aplicar producto con toques",
      "Limpiar después de cada uso"
    ],
    benefits: [
      "Acabado natural",
      "Sin rayas",
      "Reutilizable",
      "Cobertura uniforme",
      "Textura suave"
    ],
    suitableFor: ["Todo tipo de maquillaje", "Pieles sensibles", "Uso diario"],
    volume: "Una unidad",
    rating: 4.5,
    reviewCount: 789,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["esponja", "maquillaje", "sin látex", "rosa"],
    availability: {
      inStock: true,
      stockQuantity: 345,
      lowStockThreshold: 60,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 15,
      dimensions: { length: 6, width: 6, height: 6 },
      fragile: false
    },
    relatedProducts: ["brush-set-makeup-professional", "cleanser-brush"],
    createdAt: "2024-05-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "curling-iron-ceramic",
    name: "Rizadora de Cerámica Profesional FemFuel",
    slug: "rizadora-ceramica-profesional",
    description: "Rizadora profesional con revestimiento cerámico que protege el cabello. Calentamiento rápido y temperatura ajustable.",
    shortDescription: "Rizadora cerámica con temperatura ajustable",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Herramientas de Cabello",
    price: 2890,
    currency: "RD$",
    sku: "FF-CURL-CER-25",
    barcode: "758940566025",
    images: [
      {
        id: "img1",
        url: "/products/tools/curling-iron-ceramic.png",
        alt: "Rizadora de Cerámica Profesional FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Diámetro", value: "25", unit: "mm" },
      { name: "Temperatura", value: "80-210°C" },
      { name: "Revestimiento", value: "Cerámica" }
    ],
    ingredients: [
      "Revestimiento cerámico",
      "Tecnología iónica",
      "Calentamiento PTC"
    ],
    howToUse: [
      "Calentar a temperatura deseada",
      "Enrollar mechón de cabello",
      "Mantener 8-12 segundos",
      "Soltar con cuidado"
    ],
    benefits: [
      "Rizos duraderos",
      "Protege el cabello",
      "Calentamiento uniforme",
      "Fácil de usar",
      "Resultados profesionales"
    ],
    suitableFor: ["Todo tipo de cabello", "Uso profesional", "Peinados especiales"],
    volume: "25mm barril",
    rating: 4.6,
    reviewCount: 156,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["rizadora", "cerámica", "profesional", "cabello"],
    availability: {
      inStock: true,
      stockQuantity: 23,
      lowStockThreshold: 5,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 450,
      dimensions: { length: 30, width: 8, height: 8 },
      fragile: true
    },
    relatedProducts: ["spray-heat-protectant", "serum-anti-frizz"],
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "mirror-led-magnifying",
    name: "Espejo LED con Aumento FemFuel",
    slug: "espejo-led-aumento",
    description: "Espejo de maquillaje con iluminación LED ajustable y aumento 10x. Perfecto para maquillaje de precisión y cuidado facial.",
    shortDescription: "Espejo LED con aumento 10x para maquillaje",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Espejos",
    price: 1890,
    currency: "RD$",
    sku: "FF-MIRROR-LED-10X",
    barcode: "758940566032",
    images: [
      {
        id: "img1",
        url: "/products/tools/mirror-led-magnifying.png",
        alt: "Espejo LED con Aumento FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Aumento", value: "10x" },
      { name: "Iluminación", value: "LED regulable" },
      { name: "Alimentación", value: "Batería/USB" }
    ],
    ingredients: [
      "Cristal de alta calidad",
      "LEDs de bajo consumo",
      "Base antideslizante"
    ],
    howToUse: [
      "Encender presionando botón",
      "Ajustar intensidad de luz",
      "Usar para maquillaje detallado",
      "Cargar cuando sea necesario"
    ],
    benefits: [
      "Iluminación perfecta",
      "Maquillaje de precisión",
      "Aumento ideal",
      "Portátil",
      "Batería larga duración"
    ],
    suitableFor: ["Maquillaje detallado", "Cuidado facial", "Viajes"],
    volume: "Espejo portátil",
    rating: 4.7,
    reviewCount: 423,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["espejo", "led", "aumento", "maquillaje"],
    availability: {
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 12,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 280,
      dimensions: { length: 20, width: 15, height: 8 },
      fragile: true
    },
    relatedProducts: ["brush-set-makeup-professional", "tweezers-precision-stainless"],
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "tweezers-precision-stainless",
    name: "Pinzas de Precisión Acero Inoxidable FemFuel",
    slug: "pinzas-precision-acero",
    description: "Pinzas de precisión de acero inoxidable quirúrgico para depilación de cejas perfecta. Punta ultrafina para máxima precisión.",
    shortDescription: "Pinzas de precisión de acero quirúrgico",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Herramientas de Precisión",
    price: 690,
    currency: "RD$",
    sku: "FF-TWEEZ-STEEL-1",
    barcode: "758940566049",
    images: [
      {
        id: "img1",
        url: "/products/tools/tweezers-precision-stainless.png",
        alt: "Pinzas de Precisión Acero Inoxidable FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Material", value: "Acero inoxidable" },
      { name: "Tipo", value: "Punta ultrafina" },
      { name: "Uso", value: "Depilación cejas" }
    ],
    ingredients: [
      "Acero inoxidable 316L",
      "Acabado mate antideslizante"
    ],
    howToUse: [
      "Limpiar antes de usar",
      "Depilar en dirección del crecimiento",
      "Presión firme y precisa",
      "Limpiar después del uso"
    ],
    benefits: [
      "Precisión máxima",
      "Durabilidad superior",
      "Fácil esterilización",
      "Agarre perfecto",
      "Resultados profesionales"
    ],
    suitableFor: ["Depilación cejas", "Uso profesional", "Precisión"],
    volume: "Una unidad",
    rating: 4.8,
    reviewCount: 567,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["pinzas", "precisión", "acero", "cejas"],
    availability: {
      inStock: true,
      stockQuantity: 189,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 25,
      dimensions: { length: 10, width: 2, height: 1 },
      fragile: false
    },
    relatedProducts: ["mirror-led-magnifying", "eyelash-curler-classic"],
    createdAt: "2024-04-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "eyelash-curler-classic",
    name: "Curvador de Pestañas Clásico FemFuel",
    slug: "curvador-pestanas-clasico",
    description: "Curvador de pestañas clásico con almohadillas de repuesto. Diseño ergonómico que se adapta a todas las formas de ojos.",
    shortDescription: "Curvador de pestañas con almohadillas de repuesto",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Herramientas de Ojos",
    price: 590,
    currency: "RD$",
    sku: "FF-CURL-LASH-1",
    barcode: "758940566056",
    images: [
      {
        id: "img1",
        url: "/products/tools/eyelash-curler-classic.png",
        alt: "Curvador de Pestañas Clásico FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Incluye", value: "2 almohadillas extra" },
      { name: "Material", value: "Metal resistente" },
      { name: "Diseño", value: "Ergonómico" }
    ],
    ingredients: [
      "Metal resistente",
      "Almohadillas de silicona",
      "Resorte de precisión"
    ],
    howToUse: [
      "Posicionar en base de pestañas",
      "Presionar suavemente 10 segundos",
      "Mover hacia puntas",
      "Aplicar máscara después"
    ],
    benefits: [
      "Curvatura natural",
      "Diseño universal",
      "Almohadillas suaves",
      "Larga duración",
      "Fácil de usar"
    ],
    suitableFor: ["Todo tipo de pestañas", "Uso diario", "Maquillaje básico"],
    volume: "Una unidad",
    rating: 4.4,
    reviewCount: 890,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["curvador", "pestañas", "clásico", "ojos"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 35,
      dimensions: { length: 10, width: 5, height: 3 },
      fragile: false
    },
    relatedProducts: ["tweezers-precision-stainless", "mascara-volumizing"],
    createdAt: "2024-04-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "roller-jade-facial",
    name: "Rodillo Facial de Jade FemFuel",
    slug: "rodillo-facial-jade",
    description: "Rodillo facial de jade auténtico para masaje facial que mejora la circulación, reduce hinchazón y promueve el drenaje linfático.",
    shortDescription: "Rodillo de jade para masaje facial y drenaje",
    brand: "FemFuel Beauty",
    category: "tools",
    subcategory: "Herramientas de Skincare",
    price: 1290,
    currency: "RD$",
    sku: "FF-ROLLER-JADE-1",
    barcode: "758940566063",
    images: [
      {
        id: "img1",
        url: "/products/tools/roller-jade-facial.png",
        alt: "Rodillo Facial de Jade FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Material", value: "Jade auténtico" },
      { name: "Tamaños", value: "Doble cabezal" },
      { name: "Uso", value: "Facial" }
    ],
    ingredients: [
      "Jade natural 100%",
      "Marco de acero inoxidable"
    ],
    howToUse: [
      "Usar sobre piel limpia",
      "Movimientos ascendentes suaves",
      "Desde centro hacia afuera",
      "5-10 minutos diarios"
    ],
    benefits: [
      "Mejora circulación",
      "Reduce hinchazón",
      "Drenaje linfático",
      "Piel más firme",
      "Relajación"
    ],
    suitableFor: ["Todo tipo de piel", "Cuidado facial", "Relajación"],
    volume: "Una unidad",
    rating: 4.5,
    reviewCount: 345,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["jade", "rodillo", "facial", "masaje"],
    availability: {
      inStock: true,
      stockQuantity: 89,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 15, width: 5, height: 3 },
      fragile: true
    },
    relatedProducts: ["gua-sha-rose-quartz", "serum-facial"],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },

  // OTROS TRATAMIENTOS
  {
    id: "balm-lip-nourishing",
    name: "Bálsamo Labial Nutritivo FemFuel",
    slug: "balsamo-labial-nutritivo",
    description: "Bálsamo labial ultra-nutritivo con manteca de karité y vitamina E que repara labios secos y agrietados, dejándolos suaves y protegidos.",
    shortDescription: "Bálsamo reparador para labios secos",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Cuidado Labial",
    price: 590,
    currency: "RD$",
    sku: "FF-BALM-LIP-15",
    barcode: "758940563216",
    images: [
      {
        id: "img1",
        url: "/products/skincare/balm-lip-nourishing.png",
        alt: "Bálsamo Labial Nutritivo FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "15", unit: "g" },
      { name: "SPF", value: "15" },
      { name: "Formato", value: "Tubo" }
    ],
    ingredients: [
      "Manteca de karité",
      "Vitamina E",
      "Aceite de coco",
      "Cera de abejas",
      "Aceite de jojoba",
      "SPF 15"
    ],
    howToUse: [
      "Aplicar generosamente en labios",
      "Reaplicar según necesidad",
      "Usar antes del labial",
      "Ideal para noche"
    ],
    benefits: [
      "Repara labios secos",
      "Nutrición intensa",
      "Protección SPF 15",
      "Larga duración",
      "No pegajoso"
    ],
    suitableFor: ["Labios secos", "Labios agrietados", "Uso diario"],
    volume: "15g",
    rating: 4.5,
    reviewCount: 890,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["bálsamo", "labios", "nutritivo", "reparador"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 25,
      dimensions: { length: 8, width: 2, height: 10 },
      fragile: false
    },
    relatedProducts: ["lip-scrub", "lip-mask-overnight"],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "patch-hydrogel-eye",
    name: "Parches de Hidrogel para Ojos FemFuel",
    slug: "parches-hidrogel-ojos",
    description: "Parches de hidrogel con oro coloidal y colágeno que reducen ojeras, bolsas y líneas finas en solo 20 minutos. Tratamiento express para ojos cansados.",
    shortDescription: "Parches de hidrogel con oro para contorno de ojos",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Cuidado de Ojos",
    price: 1290,
    currency: "RD$",
    sku: "FF-PATCH-EYE-30",
    barcode: "758940563223",
    images: [
      {
        id: "img1",
        url: "/products/skincare/patch-hydrogel-eye.png",
        alt: "Parches de Hidrogel para Ojos FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Pares", value: "30", unit: "pares" },
      { name: "Tiempo", value: "20", unit: "minutos" },
      { name: "Con oro", value: "24k" }
    ],
    ingredients: [
      "Oro coloidal 24k",
      "Colágeno marino",
      "Ácido hialurónico",
      "Cafeína",
      "Péptidos",
      "Extracto de perla"
    ],
    howToUse: [
      "Aplicar bajo los ojos limpios",
      "Dejar actuar 20 minutos",
      "Retirar y masajear exceso",
      "Usar 2-3 veces por semana"
    ],
    benefits: [
      "Reduce ojeras al instante",
      "Desinfla bolsas",
      "Hidratación intensa",
      "Efecto lifting",
      "Ilumina mirada"
    ],
    suitableFor: ["Todo tipo de piel", "Ojos cansados", "Tratamiento express"],
    volume: "60 parches",
    rating: 4.6,
    reviewCount: 654,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["parches", "hidrogel", "ojos", "oro"],
    availability: {
      inStock: true,
      stockQuantity: 123,
      lowStockThreshold: 20,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 150,
      dimensions: { length: 10, width: 10, height: 8 },
      fragile: false
    },
    relatedProducts: ["eye-cream-anti-aging", "serum-eye-caffeine"],
    createdAt: "2024-06-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "gel-aloe-soothing",
    name: "Gel de Aloe Vera Calmante FemFuel",
    slug: "gel-aloe-vera-calmante",
    description: "Gel puro de aloe vera que calma, hidrata y repara la piel irritada o quemada por el sol. Fórmula multipropósito para rostro y cuerpo.",
    shortDescription: "Gel calmante de aloe vera puro",
    brand: "FemFuel Beauty",
    category: "skincare",
    subcategory: "Tratamientos",
    price: 990,
    currency: "RD$",
    sku: "FF-GEL-ALOE-100",
    barcode: "758940563230",
    images: [
      {
        id: "img1",
        url: "/products/skincare/gel-aloe-soothing.png",
        alt: "Gel de Aloe Vera Calmante FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "100", unit: "ml" },
      { name: "Concentración aloe", value: "99", unit: "%" },
      { name: "Uso", value: "Rostro y cuerpo" }
    ],
    ingredients: [
      "Aloe vera 99%",
      "Vitamina E",
      "Extracto de camomila",
      "Pantenol",
      "Alantoína"
    ],
    howToUse: [
      "Aplicar sobre piel limpia",
      "En zonas irritadas o quemadas",
      "Reaplicar según necesidad",
      "Puede usarse en rostro y cuerpo"
    ],
    benefits: [
      "Calma irritaciones",
      "Alivia quemaduras solares",
      "Hidrata sin grasa",
      "Cicatrizante natural",
      "Refresca la piel"
    ],
    suitableFor: ["Todo tipo de piel", "Piel irritada", "Quemaduras solares"],
    volume: "100ml",
    rating: 4.7,
    reviewCount: 987,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["aloe vera", "calmante", "after sun", "gel"],
    availability: {
      inStock: true,
      stockQuantity: 189,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 130,
      dimensions: { length: 14, width: 5, height: 16 },
      fragile: false
    },
    relatedProducts: ["sunscreen-spf50", "after-sun-lotion"],
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]

// Export helper functions
export function getFemFuelProducts(): Product[] {
  return femfuelProducts
}

export function getFemFuelFeaturedProducts(): Product[] {
  return femfuelProducts.filter(product => product.isFeatured)
}

export function getFemFuelProductsByCategory(category: ProductCategory): Product[] {
  return femfuelProducts.filter(product => product.category === category)
}

export function getFemFuelProductById(id: string): Product | undefined {
  return femfuelProducts.find(product => product.id === id)
}

export function getFemFuelProductBySlug(slug: string): Product | undefined {
  return femfuelProducts.find(product => product.slug === slug)
}