import { Product } from "@/types/product"

export const toolsProducts: Product[] = [
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
    isPopular: false,
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
    isPopular: false,
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
  }
]