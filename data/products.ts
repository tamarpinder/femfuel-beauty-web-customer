import { Product, ProductCategory } from "@/types/product"

export const mockProducts: Product[] = [
  // SKINCARE PRODUCTS
  {
    id: "cerave-hydrating-cleanser",
    name: "CeraVe Limpiador Hidratante",
    slug: "cerave-limpiador-hidratante",
    description: "Limpiador facial suave que limpia sin resecar la piel. Desarrollado con dermatólogos, contiene 3 ceramidas esenciales y ácido hialurónico para ayudar a restaurar y mantener la barrera protectora natural de la piel.",
    shortDescription: "Limpiador facial hidratante para uso diario con ceramidas",
    brand: "CeraVe",
    category: "skincare",
    subcategory: "Limpiadores",
    price: 890,
    originalPrice: 1050,
    currency: "RD$",
    sku: "CV-CLEAN-355ML",
    barcode: "3606000543652",
    images: [
      {
        id: "img1",
        url: "/products/cerave-cleanser-1.jpg",
        alt: "CeraVe Limpiador Hidratante 355ml",
        isPrimary: true,
        sortOrder: 1
      },
      {
        id: "img2", 
        url: "/products/cerave-cleanser-2.jpg",
        alt: "CeraVe Limpiador ingredientes",
        isPrimary: false,
        sortOrder: 2
      }
    ],
    specifications: [
      { name: "Contenido", value: "355", unit: "ml" },
      { name: "Tipo de piel", value: "Normal a seca" },
      { name: "pH", value: "5.5" }
    ],
    ingredients: [
      "Aqua/Water",
      "Cocamidopropyl Betaine",
      "Ceramide NP",
      "Ceramide AP", 
      "Ceramide EOP",
      "Carbomer",
      "Hyaluronic Acid",
      "Cholesterol",
      "Phenoxyethanol"
    ],
    howToUse: [
      "Aplicar sobre la piel húmeda",
      "Masajear suavemente en círculos",
      "Enjuagar con agua tibia",
      "Usar mañana y noche"
    ],
    benefits: [
      "Limpia sin resecar",
      "Restaura la barrera cutánea",
      "Hidrata durante 24 horas",
      "No comedogénico"
    ],
    suitableFor: ["Piel normal", "Piel seca", "Piel sensible"],
    volume: "355ml",
    rating: 4.7,
    reviewCount: 324,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    tags: ["limpiador", "hidratante", "ceramidas", "dermatólogo"],
    availability: {
      inStock: true,
      stockQuantity: 45,
      lowStockThreshold: 10,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 400,
      dimensions: { length: 15, width: 8, height: 22 },
      fragile: false
    },
    relatedProducts: ["cetaphil-gentle-cleanser", "neutrogena-hydrating-foam"],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-08-20T00:00:00Z"
  },
  {
    id: "the-ordinary-niacinamide",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    slug: "the-ordinary-niacinamide-zinc",
    description: "Suero concentrado que reduce la apariencia de imperfecciones y congestión cutánea. La niacinamide (vitamina B3) regula la producción de sebo mientras el zinc equilibra la actividad sebácea.",
    shortDescription: "Suero anti-imperfecciones con niacinamide y zinc",
    brand: "The Ordinary",
    category: "skincare",
    subcategory: "Sueros",
    price: 750,
    currency: "RD$",
    sku: "TO-NIAC-30ML",
    barcode: "769915194313",
    images: [
      {
        id: "img1",
        url: "/products/ordinary-niacinamide-1.jpg",
        alt: "The Ordinary Niacinamide 10% + Zinc 1%",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "30", unit: "ml" },
      { name: "Concentración Niacinamide", value: "10", unit: "%" },
      { name: "Concentración Zinc", value: "1", unit: "%" }
    ],
    ingredients: [
      "Aqua (Water)",
      "Niacinamide", 
      "Pentylene Glycol",
      "Zinc PCA",
      "Dimethyl Isosorbide",
      "Tamarindus Indica Seed Gum",
      "Xanthan Gum",
      "Isoceteth-20",
      "Ethoxydiglycol",
      "Phenoxyethanol",
      "Chlorphenesin"
    ],
    howToUse: [
      "Aplicar unas gotas en el rostro AM y PM",
      "Evitar el área de los ojos",
      "Si irritación ocurre, reducir frecuencia",
      "Usar protector solar en el día"
    ],
    benefits: [
      "Reduce imperfecciones",
      "Controla el brillo",
      "Minimiza poros dilatados",
      "Mejora textura de la piel"
    ],
    suitableFor: ["Piel grasa", "Piel mixta", "Piel propensa al acné"],
    volume: "30ml",
    rating: 4.5,
    reviewCount: 198,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
    tags: ["suero", "niacinamide", "zinc", "anti-acné", "control grasa"],
    availability: {
      inStock: true,
      stockQuantity: 67,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 80,
      dimensions: { length: 10, width: 3, height: 12 },
      fragile: true
    },
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-08-22T00:00:00Z"
  },

  // MAKEUP PRODUCTS
  {
    id: "fenty-beauty-foundation",
    name: "Fenty Beauty Pro Filt'r Soft Matte Base",
    slug: "fenty-beauty-pro-filtr-foundation",
    description: "Base de maquillaje de cobertura buildable con acabado mate suave que dura hasta 12 horas. Disponible en 50 tonos para todos los tonos de piel, resistente al sudor y transfer-proof.",
    shortDescription: "Base mate de larga duración con 50 tonos inclusivos",
    brand: "Fenty Beauty",
    category: "makeup",
    subcategory: "Base",
    price: 2890,
    currency: "RD$",
    sku: "FB-FOUND-32ML-350",
    barcode: "762730885130",
    images: [
      {
        id: "img1",
        url: "/products/fenty-foundation-1.jpg",
        alt: "Fenty Beauty Pro Filt'r Foundation",
        isPrimary: true,
        sortOrder: 1
      },
      {
        id: "img2",
        url: "/products/fenty-foundation-swatches.jpg", 
        alt: "Tonos disponibles Fenty Foundation",
        isPrimary: false,
        sortOrder: 2
      }
    ],
    specifications: [
      { name: "Contenido", value: "32", unit: "ml" },
      { name: "Cobertura", value: "Media a completa" },
      { name: "Acabado", value: "Mate suave" },
      { name: "Duración", value: "12", unit: "horas" },
      { name: "Tono", value: "350 - Medio con subtono cálido" }
    ],
    howToUse: [
      "Aplicar sobre piel limpia e hidratada",
      "Usar brocha, esponja o dedos para difuminar",
      "Construir cobertura gradualmente",
      "Sellar con polvo si es necesario"
    ],
    benefits: [
      "Cobertura buildable",
      "Resistente al sudor",
      "No se transfiere",
      "Tonos inclusivos",
      "Larga duración"
    ],
    suitableFor: ["Todo tipo de piel", "Piel grasa", "Piel mixta"],
    volume: "32ml",
    rating: 4.6,
    reviewCount: 412,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
    tags: ["base", "foundation", "mate", "larga duración", "inclusivo"],
    availability: {
      inStock: true,
      stockQuantity: 23,
      lowStockThreshold: 8,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 120,
      dimensions: { length: 12, width: 4, height: 15 },
      fragile: true
    },
    relatedProducts: ["fenty-concealer", "fenty-setting-powder"],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-22T00:00:00Z"
  },
  {
    id: "rare-beauty-blush",
    name: "Rare Beauty Soft Pinch Liquid Blush",
    slug: "rare-beauty-soft-pinch-blush",
    description: "Rubor líquido de larga duración con color buildable que se difumina perfectamente en la piel. Fórmula ligera que proporciona un acabado natural y luminoso.",
    shortDescription: "Rubor líquido de acabado natural y larga duración",
    brand: "Rare Beauty",
    category: "makeup",
    subcategory: "Rubor",
    price: 1890,
    currency: "RD$",
    sku: "RB-BLUSH-JOY",
    barcode: "850013291885",
    images: [
      {
        id: "img1",
        url: "/products/rare-blush-1.jpg",
        alt: "Rare Beauty Soft Pinch Liquid Blush Joy",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "6", unit: "ml" },
      { name: "Tono", value: "Joy - Rosa neutro" },
      { name: "Acabado", value: "Natural satinado" }
    ],
    howToUse: [
      "Aplicar una gota en el dorso de la mano",
      "Con el dedo, tomar una pequeña cantidad",
      "Dar toques suaves en las mejillas",
      "Difuminar hacia arriba"
    ],
    benefits: [
      "Larga duración",
      "Color buildable",
      "Fácil aplicación",
      "No reseca la piel",
      "Acabado natural"
    ],
    suitableFor: ["Todo tipo de piel"],
    volume: "6ml",
    rating: 4.8,
    reviewCount: 267,
    isPopular: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["rubor", "líquido", "natural", "buildable"],
    availability: {
      inStock: true,
      stockQuantity: 34,
      lowStockThreshold: 12,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 60,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: true
    },
    createdAt: "2024-08-10T00:00:00Z",
    updatedAt: "2024-08-22T00:00:00Z"
  },

  // HAIRCARE PRODUCTS
  {
    id: "olaplex-no3-treatment",
    name: "Olaplex No.3 Hair Perfector",
    slug: "olaplex-no3-hair-perfector",
    description: "Tratamiento capilar reparador en casa que reconstruye los enlaces rotos del cabello. Reduce la rotura y fortalece todo tipo de cabello dañado por procesos químicos, calor y factores ambientales.",
    shortDescription: "Tratamiento reparador para cabello dañado",
    brand: "Olaplex",
    category: "haircare", 
    subcategory: "Tratamientos",
    price: 2450,
    currency: "RD$",
    sku: "OLX-NO3-100ML",
    barcode: "850018802314",
    images: [
      {
        id: "img1",
        url: "/products/olaplex-no3-1.jpg",
        alt: "Olaplex No.3 Hair Perfector 100ml",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "100", unit: "ml" },
      { name: "Tipo de cabello", value: "Todo tipo de cabello" },
      { name: "Frecuencia de uso", value: "1-2 veces por semana" }
    ],
    ingredients: [
      "Water (Aqua)",
      "Bis-Aminopropyl Diglycol Dimaleate",
      "Propylene Glycol",
      "Cetearyl Alcohol", 
      "Behentrimonium Methosulfate",
      "Cetyl Alcohol",
      "Phenoxyethanol",
      "Glycerin",
      "Hydroxyethyl Ethylcellulose",
      "Polyquaternium-37"
    ],
    howToUse: [
      "Aplicar sobre cabello húmedo y toallado",
      "Aplicar desde medios a puntas",
      "Dejar actuar 10 minutos mínimo",
      "Enjuagar completamente",
      "Continuar con shampoo y acondicionador"
    ],
    benefits: [
      "Repara enlaces del cabello",
      "Reduce la rotura",
      "Fortalece el cabello",
      "Mejora la elasticidad",
      "Compatible con tratamientos químicos"
    ],
    suitableFor: ["Cabello dañado", "Cabello teñido", "Cabello con permanente", "Todo tipo de cabello"],
    volume: "100ml",
    rating: 4.7,
    reviewCount: 389,
    isPopular: true,
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
    tags: ["tratamiento", "reparador", "olaplex", "cabello dañado"],
    availability: {
      inStock: true,
      stockQuantity: 28,
      lowStockThreshold: 10,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 150,
      dimensions: { length: 13, width: 5, height: 18 },
      fragile: false
    },
    relatedProducts: ["olaplex-no4-shampoo", "olaplex-no5-conditioner"],
    createdAt: "2024-07-20T00:00:00Z",
    updatedAt: "2024-08-21T00:00:00Z"
  },

  // NAILCARE PRODUCTS
  {
    id: "essie-nail-polish",
    name: "Essie Nail Polish - Ballet Slippers",
    slug: "essie-nail-polish-ballet-slippers",
    description: "Esmalte de uñas icónico en tono rosa neutro perfecto. Fórmula de larga duración con aplicador profesional que proporciona cobertura uniforme y acabado brillante.",
    shortDescription: "Esmalte icónico rosa neutro de larga duración",
    brand: "Essie",
    category: "nailcare",
    subcategory: "Esmaltes",
    price: 650,
    currency: "RD$",
    sku: "ESS-BALLET-13.5ML",
    barcode: "030699205126",
    images: [
      {
        id: "img1",
        url: "/products/essie-ballet-slippers-1.jpg",
        alt: "Essie Ballet Slippers nail polish",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "13.5", unit: "ml" },
      { name: "Tono", value: "Ballet Slippers - Rosa neutro" },
      { name: "Acabado", value: "Brillante" },
      { name: "Número de tono", value: "162" }
    ],
    howToUse: [
      "Preparar uñas con base coat",
      "Aplicar capa delgada de esmalte",
      "Dejar secar completamente",
      "Aplicar segunda capa si es necesario",
      "Finalizar con top coat"
    ],
    benefits: [
      "Larga duración",
      "Fórmula cremosa",
      "Aplicación fácil",
      "Secado rápido",
      "Color icónico"
    ],
    suitableFor: ["Todo tipo de uñas"],
    volume: "13.5ml",
    rating: 4.4,
    reviewCount: 156,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["esmalte", "rosa", "neutro", "clásico"],
    availability: {
      inStock: true,
      stockQuantity: 78,
      lowStockThreshold: 20,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 65,
      dimensions: { length: 8, width: 3, height: 10 },
      fragile: true
    },
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z"
  },

  // FRAGRANCE PRODUCTS
  {
    id: "sol-de-janeiro-perfume",
    name: "Sol de Janeiro Perfume Mist 68",
    slug: "sol-de-janeiro-perfume-mist-68",
    description: "Fragancia corporal con notas de castaña brasileña y vainilla salada que transporta a las playas de Río. Fragancia adictiva y cálida perfecta para el día a día.",
    shortDescription: "Perfume corporal con aroma a castaña brasileña y vainilla",
    brand: "Sol de Janeiro",
    category: "fragrance",
    subcategory: "Perfumes Corporales",
    price: 1890,
    currency: "RD$",
    sku: "SDJ-MIST68-240ML",
    barcode: "810912032684",
    images: [
      {
        id: "img1",
        url: "/products/sol-perfume-1.jpg",
        alt: "Sol de Janeiro Perfume Mist 68",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "240", unit: "ml" },
      { name: "Tipo", value: "Perfume corporal" },
      { name: "Notas principales", value: "Castaña brasileña, vainilla salada" }
    ],
    howToUse: [
      "Agitar bien antes de usar",
      "Aplicar sobre piel limpia y seca",
      "Rociar a 15cm del cuerpo",
      "Re-aplicar durante el día según deseado"
    ],
    benefits: [
      "Fragancia de larga duración",
      "Aroma tropical único",
      "No reseca la piel",
      "Perfecto para capas",
      "Transporta a Brasil"
    ],
    suitableFor: ["Todo tipo de piel"],
    volume: "240ml",
    rating: 4.6,
    reviewCount: 234,
    isPopular: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["perfume", "corporal", "vainilla", "tropical", "brasil"],
    availability: {
      inStock: true,
      stockQuantity: 42,
      lowStockThreshold: 15,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 280,
      dimensions: { length: 15, width: 6, height: 20 },
      fragile: true
    },
    createdAt: "2024-08-05T00:00:00Z",
    updatedAt: "2024-08-22T00:00:00Z"
  },

  // TOOLS & ACCESSORIES
  {
    id: "real-techniques-sponge",
    name: "Real Techniques Miracle Complexion Sponge",
    slug: "real-techniques-miracle-sponge",
    description: "Esponja de maquillaje multifuncional de látex libre que se expande cuando se humedece. Perfecta para aplicar base, corrector y productos líquidos con un acabado natural.",
    shortDescription: "Esponja de maquillaje para aplicación perfecta",
    brand: "Real Techniques",
    category: "tools",
    subcategory: "Esponjas",
    price: 450,
    originalPrice: 550,
    currency: "RD$",
    sku: "RT-SPONGE-01",
    barcode: "090672138910",
    images: [
      {
        id: "img1",
        url: "/products/rt-sponge-1.jpg",
        alt: "Real Techniques Miracle Complexion Sponge",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Material", value: "Látex libre" },
      { name: "Uso", value: "Húmedo o seco" },
      { name: "Forma", value: "Lágrima con punta" }
    ],
    howToUse: [
      "Humedecer con agua antes de usar",
      "Escurrir el exceso de agua",
      "Aplicar producto en toques suaves",
      "Lavar después de cada uso",
      "Reemplazar cada 3 meses"
    ],
    benefits: [
      "Aplicación uniforme",
      "Acabado natural",
      "Multifuncional",
      "Libre de látex",
      "Fácil limpieza"
    ],
    suitableFor: ["Todo tipo de productos líquidos y cremosos"],
    rating: 4.3,
    reviewCount: 89,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    tags: ["esponja", "maquillaje", "aplicación", "herramienta"],
    availability: {
      inStock: true,
      stockQuantity: 124,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 25,
      dimensions: { length: 10, width: 8, height: 6 },
      fragile: false
    },
    createdAt: "2024-05-15T00:00:00Z",
    updatedAt: "2024-08-18T00:00:00Z"
  }
]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return mockProducts.filter(product => product.category === category)
}

export function getProductsByWarehouse(warehouseId: string): Product[] {
  return mockProducts.filter(product => 
    product.availability.warehouseId === warehouseId && product.availability.inStock
  )
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(product => product.isFeatured && product.availability.inStock)
}

export function getPopularProducts(): Product[] {
  return mockProducts
    .filter(product => product.isPopular && product.availability.inStock)
    .sort((a, b) => b.rating - a.rating)
}

export function getNewArrivals(): Product[] {
  return mockProducts
    .filter(product => product.isNewArrival && product.availability.inStock)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getProductsOnSale(): Product[] {
  return mockProducts
    .filter(product => product.isOnSale && product.availability.inStock)
    .sort((a, b) => {
      const discountA = product.originalPrice ? ((product.originalPrice - product.price) / product.originalPrice) : 0
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0
      return discountB - discountA
    })
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product => 
    product.availability.inStock && (
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subcategory.toLowerCase().includes(lowercaseQuery)
    )
  )
}