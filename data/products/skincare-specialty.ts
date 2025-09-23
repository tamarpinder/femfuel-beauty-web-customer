import { Product } from "@/types/product";

export const skincareSpecialtyProducts: Product[] = [
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
    isPopular: false,
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
    isPopular: false,
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
];