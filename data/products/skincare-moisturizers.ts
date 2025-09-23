import { Product } from "@/types/product";

export const skincareMoisturizerProducts: Product[] = [
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
    isPopular: true,
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
  }
];