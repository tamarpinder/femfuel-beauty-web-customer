import { Product } from "@/types/product";

export const skincareEssentialProducts: Product[] = [
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
    isPopular: false,
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
  }
];