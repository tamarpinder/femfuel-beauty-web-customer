import { Product } from "@/types/product"

export const makeupProducts: Product[] = [
  // OJOS - EYES
  {
    id: "mascara-volume-extreme",
    name: "Máscara Volumen Extremo FemFuel",
    slug: "mascara-volumen-extremo",
    description: "Máscara de pestañas con cepillo exclusivo que multiplica el volumen hasta 10x sin apelmazarse. Fórmula resistente al agua de larga duración.",
    shortDescription: "Máscara de volumen extremo resistente al agua",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Ojos",
    price: 1490,
    currency: "RD$",
    sku: "FF-MASC-VOL-10",
    barcode: "758940567001",
    images: [
      {
        id: "img1",
        url: "/products/makeup/mascara-volume-extreme.png",
        alt: "Máscara Volumen Extremo FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "10", unit: "ml" },
      { name: "Resistencia", value: "Agua" },
      { name: "Duración", value: "16", unit: "horas" }
    ],
    ingredients: [
      "Ceras naturales",
      "Pantenol",
      "Vitamina E",
      "Polímeros volumizadores",
      "Pigmentos minerales"
    ],
    howToUse: [
      "Aplicar desde la raíz a las puntas",
      "Zigzaguear el cepillo para mayor volumen",
      "Aplicar segunda capa si se desea",
      "Dejar secar 30 segundos entre capas"
    ],
    benefits: [
      "Volumen extremo 10x",
      "Resistente al agua",
      "Larga duración 16h",
      "No se corre ni apelmaza",
      "Cepillo de fibras precisas"
    ],
    suitableFor: ["Todo tipo de pestañas", "Uso diario", "Ocasiones especiales"],
    volume: "10ml",
    rating: 4.7,
    reviewCount: 543,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["mascara", "volumen", "pestañas", "ojos"],
    availability: {
      inStock: true,
      stockQuantity: 234,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 35,
      dimensions: { length: 12, width: 3, height: 3 },
      fragile: false
    },
    relatedProducts: ["eyeliner-gel-black", "eyebrow-pencil"],
    createdAt: "2024-06-10T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "eyeliner-gel-black",
    name: "Delineador en Gel Negro Intenso FemFuel",
    slug: "delineador-gel-negro-intenso",
    description: "Delineador en gel ultra pigmentado con aplicador de precisión. Acabado mate intenso que no se corre ni se transfiere.",
    shortDescription: "Delineador en gel de alta precisión",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Ojos",
    price: 1290,
    currency: "RD$",
    sku: "FF-LINER-GEL-BLK",
    barcode: "758940567018",
    images: [
      {
        id: "img1",
        url: "/products/makeup/eyeliner-gel-black.png",
        alt: "Delineador en Gel Negro Intenso FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "3", unit: "g" },
      { name: "Acabado", value: "Mate" },
      { name: "Duración", value: "24", unit: "horas" }
    ],
    ingredients: [
      "Pigmentos minerales",
      "Ceras vegetales",
      "Vitamina E",
      "Aceite de jojoba"
    ],
    howToUse: [
      "Usar brocha angular fina",
      "Aplicar pegado a la línea de pestañas",
      "Crear el trazo deseado",
      "Dejar secar 30 segundos"
    ],
    benefits: [
      "Alta pigmentación",
      "Precisión perfecta",
      "No se corre 24h",
      "Resistente al agua",
      "Fácil aplicación"
    ],
    suitableFor: ["Todo tipo de ojos", "Maquillaje profesional", "Uso diario"],
    volume: "3g",
    rating: 4.8,
    reviewCount: 432,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["delineador", "gel", "ojos", "negro"],
    availability: {
      inStock: true,
      stockQuantity: 187,
      lowStockThreshold: 35,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 25,
      dimensions: { length: 8, width: 8, height: 3 },
      fragile: false
    },
    relatedProducts: ["mascara-volume-extreme", "brush-eyeliner"],
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  // LABIALES - LIPS
  {
    id: "lipstick-matte-classic-red",
    name: "Labial Matte Rojo Clásico FemFuel",
    slug: "labial-matte-rojo-clasico",
    description: "Labial mate de alta pigmentación en tono rojo clásico. Fórmula cremosa que no reseca con acabado aterciopelado de larga duración.",
    shortDescription: "Labial mate rojo de alta pigmentación",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Labiales",
    price: 1690,
    currency: "RD$",
    sku: "FF-LIP-MATTE-RED",
    barcode: "758940567025",
    images: [
      {
        id: "img1",
        url: "/products/makeup/lipstick-matte-classic-red.png",
        alt: "Labial Matte Rojo Clásico FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Peso", value: "3.5", unit: "g" },
      { name: "Acabado", value: "Matte" },
      { name: "Duración", value: "8", unit: "horas" }
    ],
    ingredients: [
      "Ceras naturales",
      "Aceite de jojoba",
      "Vitamina E",
      "Manteca de karité",
      "Pigmentos minerales"
    ],
    howToUse: [
      "Exfoliar labios previamente",
      "Aplicar desde el centro hacia afuera",
      "Difuminar bordes si se desea",
      "Sellar con pañuelo para mayor duración"
    ],
    benefits: [
      "Alta pigmentación en una pasada",
      "No reseca los labios",
      "Acabado aterciopelado",
      "Larga duración 8h",
      "Color intenso"
    ],
    suitableFor: ["Todo tipo de labios", "Look clásico", "Ocasiones especiales"],
    volume: "3.5g",
    rating: 4.9,
    reviewCount: 892,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["labial", "matte", "rojo", "larga duración"],
    availability: {
      inStock: true,
      stockQuantity: 298,
      lowStockThreshold: 50,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 20,
      dimensions: { length: 8, width: 2, height: 2 },
      fragile: false
    },
    relatedProducts: ["lip-liner-red", "lipgloss-clear"],
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "lipgloss-nude-shine",
    name: "Brillo Labial Nude Luminoso FemFuel",
    slug: "brillo-labial-nude-luminoso",
    description: "Brillo labial con acabado brillante en tono nude universal. Fórmula hidratante con efecto plumping sutil que realza el volumen natural.",
    shortDescription: "Brillo labial nude con efecto volumen",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Labiales",
    price: 1290,
    currency: "RD$",
    sku: "FF-GLOSS-NUDE",
    barcode: "758940567032",
    images: [
      {
        id: "img1",
        url: "/products/makeup/lipgloss-nude-shine.png",
        alt: "Brillo Labial Nude Luminoso FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "6", unit: "ml" },
      { name: "Acabado", value: "Brillante" },
      { name: "Efecto", value: "Plumping" }
    ],
    ingredients: [
      "Aceite de ricino",
      "Vitamina E",
      "Ácido hialurónico",
      "Mentol suave",
      "Pigmentos perlados"
    ],
    howToUse: [
      "Aplicar directamente con aplicador",
      "Usar solo o sobre labial",
      "Reaplicar según necesidad",
      "Ideal para retoque rápido"
    ],
    benefits: [
      "Hidratación profunda",
      "Brillo luminoso",
      "Efecto volumen sutil",
      "No pegajoso",
      "Tono universal"
    ],
    suitableFor: ["Todo tipo de labios", "Look natural", "Uso diario"],
    volume: "6ml",
    rating: 4.6,
    reviewCount: 567,
    isPopular: true,
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
    tags: ["brillo labial", "nude", "hidratante", "volumen"],
    availability: {
      inStock: true,
      stockQuantity: 345,
      lowStockThreshold: 60,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 25,
      dimensions: { length: 12, width: 3, height: 3 },
      fragile: false
    },
    relatedProducts: ["lipstick-nude", "lip-balm"],
    createdAt: "2024-07-25T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "lip-tint-berry",
    name: "Tinte Labial Berry Natural FemFuel",
    slug: "tinte-labial-berry-natural",
    description: "Tinte labial de larga duración en tono berry. Fórmula ligera que se funde con tus labios para un acabado natural que dura todo el día.",
    shortDescription: "Tinte labial de larga duración efecto natural",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Labiales",
    price: 1390,
    currency: "RD$",
    sku: "FF-TINT-BERRY",
    barcode: "758940567049",
    images: [
      {
        id: "img1",
        url: "/products/makeup/lip-tint-berry.png",
        alt: "Tinte Labial Berry Natural FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Contenido", value: "4", unit: "ml" },
      { name: "Acabado", value: "Natural" },
      { name: "Duración", value: "12", unit: "horas" }
    ],
    ingredients: [
      "Tintes naturales",
      "Aceite de rosa mosqueta",
      "Vitamina E",
      "Aloe vera",
      "Manteca de cacao"
    ],
    howToUse: [
      "Aplicar en el centro de los labios",
      "Difuminar con el dedo hacia afuera",
      "Construir intensidad según preferencia",
      "Usar solo o bajo brillo"
    ],
    benefits: [
      "Efecto natural",
      "Larga duración 12h",
      "Ligero y cómodo",
      "Hidratante",
      "No transfiere"
    ],
    suitableFor: ["Todo tipo de labios", "Maquillaje diario", "Look fresco"],
    volume: "4ml",
    rating: 4.7,
    reviewCount: 423,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["tinte", "labial", "natural", "berry"],
    availability: {
      inStock: true,
      stockQuantity: 267,
      lowStockThreshold: 45,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 18,
      dimensions: { length: 10, width: 3, height: 3 },
      fragile: false
    },
    relatedProducts: ["lipgloss-nude-shine", "lip-balm"],
    createdAt: "2024-06-05T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  // MEJILLAS - CHEEKS
  {
    id: "blush-cream-pink-glow",
    name: "Rubor en Crema Pink Glow FemFuel",
    slug: "rubor-crema-pink-glow",
    description: "Rubor cremoso en tono rosa natural que se funde con la piel para un acabado luminoso y fresco. Fórmula buildable fácil de difuminar.",
    shortDescription: "Rubor en crema de acabado natural luminoso",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Mejillas",
    price: 1590,
    currency: "RD$",
    sku: "FF-BLUSH-CRM-PINK",
    barcode: "758940567056",
    images: [
      {
        id: "img1",
        url: "/products/makeup/blush-cream-pink-glow.png",
        alt: "Rubor en Crema Pink Glow FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Peso", value: "5", unit: "g" },
      { name: "Acabado", value: "Luminoso natural" },
      { name: "Textura", value: "Crema" }
    ],
    ingredients: [
      "Aceite de jojoba",
      "Vitamina E",
      "Ácido hialurónico",
      "Pigmentos minerales",
      "Manteca de karité"
    ],
    howToUse: [
      "Aplicar con dedos o esponja húmeda",
      "Dar toques en manzanas de las mejillas",
      "Difuminar hacia las sienes",
      "Construir intensidad gradualmente"
    ],
    benefits: [
      "Acabado natural luminoso",
      "Fácil difuminado",
      "Hidrata mientras colorea",
      "Larga duración",
      "Tono universal"
    ],
    suitableFor: ["Todo tipo de piel", "Look natural", "Uso diario"],
    volume: "5g",
    rating: 4.8,
    reviewCount: 678,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["rubor", "crema", "mejillas", "natural"],
    availability: {
      inStock: true,
      stockQuantity: 213,
      lowStockThreshold: 40,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 30,
      dimensions: { length: 6, width: 6, height: 3 },
      fragile: false
    },
    relatedProducts: ["highlighter-champagne", "bronzer-matte"],
    createdAt: "2024-06-20T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "bronzer-matte-sun-kissed",
    name: "Bronceador Matte Sun-Kissed FemFuel",
    slug: "bronceador-matte-sun-kissed",
    description: "Bronceador en polvo con acabado matte para un efecto bronceado natural. Tono cálido que favorece a todos los tonos de piel.",
    shortDescription: "Bronceador matte de efecto natural",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Mejillas",
    price: 1790,
    currency: "RD$",
    sku: "FF-BRONZ-MATTE",
    barcode: "758940567063",
    images: [
      {
        id: "img1",
        url: "/products/makeup/bronzer-matte-sun-kissed.png",
        alt: "Bronceador Matte Sun-Kissed FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Peso", value: "10", unit: "g" },
      { name: "Acabado", value: "Matte" },
      { name: "Tono", value: "Cálido universal" }
    ],
    ingredients: [
      "Talco micronizado",
      "Mica",
      "Óxidos de hierro",
      "Vitamina E",
      "Sílice"
    ],
    howToUse: [
      "Aplicar con brocha grande",
      "Aplicar en sienes, pómulos y mandíbula",
      "Difuminar bien",
      "Construir intensidad gradualmente"
    ],
    benefits: [
      "Efecto bronceado natural",
      "Acabado matte",
      "Fácil difuminado",
      "Tono universal",
      "Larga duración"
    ],
    suitableFor: ["Todo tipo de piel", "Contouring", "Look bronceado"],
    volume: "10g",
    rating: 4.7,
    reviewCount: 534,
    isPopular: false,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["bronceador", "matte", "mejillas", "contouring"],
    availability: {
      inStock: true,
      stockQuantity: 167,
      lowStockThreshold: 30,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 45,
      dimensions: { length: 8, width: 8, height: 3 },
      fragile: false
    },
    relatedProducts: ["blush-cream-pink-glow", "brush-set-makeup-professional"],
    createdAt: "2024-06-22T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  },
  {
    id: "highlighter-champagne-glow",
    name: "Iluminador Champagne Glow FemFuel",
    slug: "iluminador-champagne-glow",
    description: "Iluminador en polvo con acabado champagne dorado. Reflejos sutiles que realzan los puntos altos del rostro con un brillo natural.",
    shortDescription: "Iluminador champagne de brillo natural",
    brand: "FemFuel Beauty",
    category: "makeup",
    subcategory: "Mejillas",
    price: 1890,
    currency: "RD$",
    sku: "FF-HIGH-CHAMP",
    barcode: "758940567070",
    images: [
      {
        id: "img1",
        url: "/products/makeup/highlighter-champagne-glow.png",
        alt: "Iluminador Champagne Glow FemFuel",
        isPrimary: true,
        sortOrder: 1
      }
    ],
    specifications: [
      { name: "Peso", value: "8", unit: "g" },
      { name: "Acabado", value: "Luminoso" },
      { name: "Tono", value: "Champagne dorado" }
    ],
    ingredients: [
      "Mica",
      "Pigmentos perlados",
      "Vitamina E",
      "Aceite de jojoba",
      "Sílice"
    ],
    howToUse: [
      "Aplicar con brocha en puntos altos",
      "Aplicar en pómulos, arco de Cupido y tabique",
      "Difuminar suavemente",
      "Usar con moderación para efecto natural"
    ],
    benefits: [
      "Brillo natural",
      "Realza facciones",
      "Acabado luminoso",
      "Tono favorecedor",
      "Fácil aplicación"
    ],
    suitableFor: ["Todo tipo de piel", "Look luminoso", "Ocasiones especiales"],
    volume: "8g",
    rating: 4.9,
    reviewCount: 789,
    isPopular: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
    tags: ["iluminador", "highlighter", "champagne", "mejillas"],
    availability: {
      inStock: true,
      stockQuantity: 245,
      lowStockThreshold: 45,
      warehouseId: "warehouse-santo-domingo-central"
    },
    shipping: {
      weight: 40,
      dimensions: { length: 7, width: 7, height: 3 },
      fragile: false
    },
    relatedProducts: ["blush-cream-pink-glow", "bronzer-matte-sun-kissed"],
    createdAt: "2024-06-25T00:00:00Z",
    updatedAt: "2024-08-28T00:00:00Z"
  }
]
