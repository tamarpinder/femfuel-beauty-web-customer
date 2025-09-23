import { Product } from "@/types/product";

export const skincareSerumProducts: Product[] = [
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
    isPopular: false,
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
  }
];