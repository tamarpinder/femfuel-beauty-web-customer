import { Vendor } from "@/types/vendor"

export const mockVendors: Vendor[] = [
  {
    id: "beauty-studio-rd",
    name: "Beauty Studio RD",
    slug: "beauty-studio-rd",
    logo: "/vendors/beauty-studio-logo.png",
    coverImage: "/vendors/beauty-studio-cover.jpg",
    description: "Especialistas en uñas y cuidado de manos con más de 8 años de experiencia. Ofrecemos los mejores tratamientos con productos premium.",
    rating: 4.8,
    reviewCount: 124,
    serviceCount: 12,
    location: {
      address: "Av. Winston Churchill 1234",
      district: "Piantini", 
      city: "Santo Domingo",
      distance: "1.2km"
    },
    contact: {
      phone: "+1 809-555-0123",
      email: "info@beautystudiord.com",
      whatsapp: "+1 809-555-0123"
    },
    categories: ["unas"],
    popularServices: ["Manicure Gel Premium", "Pedicure Spa", "Nail Art"],
    badges: ["Premium Partner", "Respuesta Rápida"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 3:00 PM",
      todayAvailable: true
    },
    professionalCount: 3,
    priceRange: {
      min: 800,
      max: 2500
    },
    services: [
      {
        id: "manicure-gel-premium",
        name: "Manicure Gel Premium",
        description: "Manicure completo con gel de larga duración y acabado profesional",
        price: 1200,
        duration: 60,
        category: "unas",
        isPopular: true,
        image: "/services/manicure-gel.jpg",
        addons: [
          { id: "nail-art", name: "Nail Art Básico", price: 300, duration: 15 },
          { id: "french-tip", name: "French Tips", price: 200, duration: 10 }
        ]
      },
      {
        id: "pedicure-spa",
        name: "Pedicure Spa Completo",
        description: "Pedicure relajante con exfoliación, masaje y hidratación profunda",
        price: 1800,
        duration: 90,
        category: "unas",
        isPopular: true,
        image: "/services/pedicure-spa.jpg"
      },
      {
        id: "manicure-clasico",
        name: "Manicure Clásico",
        description: "Manicure tradicional con esmaltado regular",
        price: 800,
        duration: 45,
        category: "unas",
        image: "/services/manicure-clasico.jpg"
      }
    ],
    businessHours: {
      monday: { open: "9:00", close: "18:00" },
      tuesday: { open: "9:00", close: "18:00" },
      wednesday: { open: "9:00", close: "18:00" },
      thursday: { open: "9:00", close: "18:00" },
      friday: { open: "9:00", close: "19:00" },
      saturday: { open: "8:00", close: "17:00" },
      sunday: { open: "10:00", close: "16:00" }
    },
    gallery: [
      "/vendors/beauty-studio-1.jpg",
      "/vendors/beauty-studio-2.jpg",
      "/vendors/beauty-studio-3.jpg"
    ]
  },
  {
    id: "glamour-house",
    name: "Glamour House",
    slug: "glamour-house", 
    logo: "/vendors/glamour-house-logo.png",
    coverImage: "/vendors/glamour-house-cover.jpg",
    description: "Estudio de maquillaje profesional especializado en novias, eventos y sesiones fotográficas. Maquilladores certificados internacionalmente.",
    rating: 4.9,
    reviewCount: 89,
    serviceCount: 8,
    location: {
      address: "Calle José Amado Soler 567",
      district: "Gazcue",
      city: "Santo Domingo", 
      distance: "2.1km"
    },
    contact: {
      phone: "+1 809-555-0456",
      whatsapp: "+1 809-555-0456"
    },
    categories: ["maquillaje"],
    popularServices: ["Maquillaje de Novia", "Maquillaje Profesional", "Maquillaje de Noche"],
    badges: ["Nuevo", "Top Rated"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 10:00 AM",
      todayAvailable: false
    },
    professionalCount: 2,
    priceRange: {
      min: 1500,
      max: 4500
    },
    services: [
      {
        id: "maquillaje-novia",
        name: "Maquillaje de Novia",
        description: "Maquillaje completo para el día más especial, incluye prueba previa",
        price: 4500,
        duration: 180,
        category: "maquillaje",
        isPopular: true,
        image: "/services/bridal-makeup.jpg",
        addons: [
          { id: "hair-styling", name: "Peinado Incluido", price: 1500, duration: 60 },
          { id: "makeup-trial", name: "Prueba Extra", price: 1000, duration: 90 }
        ]
      },
      {
        id: "maquillaje-profesional",
        name: "Maquillaje Profesional",
        description: "Maquillaje para eventos, sesiones fotográficas o ocasiones especiales",
        price: 2500,
        duration: 90,
        category: "maquillaje",
        isPopular: true,
        image: "/services/professional-makeup.jpg"
      }
    ],
    businessHours: {
      monday: { open: "10:00", close: "19:00" },
      tuesday: { open: "10:00", close: "19:00" },
      wednesday: { open: "10:00", close: "19:00" },
      thursday: { open: "10:00", close: "19:00" },
      friday: { open: "10:00", close: "20:00" },
      saturday: { open: "9:00", close: "18:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  {
    id: "spa-paradise",
    name: "Spa Paradise",
    slug: "spa-paradise",
    logo: "/vendors/spa-paradise-logo.png", 
    coverImage: "/vendors/spa-paradise-cover.jpg",
    description: "Oasis de relajación y bienestar. Tratamientos faciales y corporales con productos naturales y orgánicos.",
    rating: 4.7,
    reviewCount: 156,
    serviceCount: 15,
    location: {
      address: "Av. Sarasota 890",
      district: "Bella Vista",
      city: "Santo Domingo",
      distance: "3.5km"
    },
    contact: {
      phone: "+1 809-555-0789",
      email: "reservas@spaparadise.do"
    },
    categories: ["spa", "cuerpo"],
    popularServices: ["Facial Hidratante", "Masaje Relajante", "Limpieza Profunda"],
    badges: ["Eco-Friendly"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 4:30 PM", 
      todayAvailable: true
    },
    professionalCount: 5,
    priceRange: {
      min: 2000,
      max: 5000
    },
    services: [
      {
        id: "facial-hidratante",
        name: "Tratamiento Facial Hidratante",
        description: "Facial profundo con productos naturales para hidratar y rejuvenecer",
        price: 3500,
        duration: 75,
        category: "spa",
        isPopular: true,
        image: "/services/facial-treatment.jpg"
      },
      {
        id: "masaje-relajante",
        name: "Masaje Relajante Completo",
        description: "Masaje de cuerpo completo para liberar tensiones y estrés",
        price: 2800,
        duration: 120,
        category: "cuerpo",
        isPopular: true,
        image: "/services/relaxing-massage.jpg"
      }
    ],
    businessHours: {
      monday: { open: "8:00", close: "20:00" },
      tuesday: { open: "8:00", close: "20:00" },
      wednesday: { open: "8:00", close: "20:00" },
      thursday: { open: "8:00", close: "20:00" },
      friday: { open: "8:00", close: "21:00" },
      saturday: { open: "8:00", close: "21:00" },
      sunday: { open: "9:00", close: "19:00" }
    }
  },
  {
    id: "hair-salon-elite",
    name: "Hair Salon Elite",
    slug: "hair-salon-elite",
    logo: "/vendors/hair-salon-logo.png",
    coverImage: "/vendors/hair-salon-cover.jpg", 
    description: "Salón especializado en cortes, coloración y peinados modernos. Estilistas con formación internacional.",
    rating: 4.5,
    reviewCount: 203,
    serviceCount: 18,
    location: {
      address: "Plaza Central, Local 15",
      district: "Naco",
      city: "Santo Domingo",
      distance: "1.8km"
    },
    contact: {
      phone: "+1 809-555-0321",
      whatsapp: "+1 809-555-0321"
    },
    categories: ["peinados"],
    popularServices: ["Corte y Peinado", "Coloración", "Tratamiento Capilar"],
    badges: ["Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:15 PM",
      todayAvailable: true
    },
    professionalCount: 4,
    priceRange: {
      min: 1200,
      max: 3500
    },
    services: [
      {
        id: "corte-peinado",
        name: "Corte y Peinado",
        description: "Corte personalizado y peinado acorde a tu estilo",
        price: 1500,
        duration: 60,
        category: "peinados",
        isPopular: true,
        image: "/services/haircut-styling.jpg"
      },
      {
        id: "coloracion-completa",
        name: "Coloración Completa",
        description: "Cambio de color completo con productos profesionales",
        price: 3500,
        duration: 180,
        category: "peinados",
        isPopular: true,
        image: "/services/hair-coloring.jpg"
      }
    ],
    businessHours: {
      monday: { open: "9:00", close: "18:00" },
      tuesday: { open: "9:00", close: "18:00" },
      wednesday: { open: "9:00", close: "18:00" },
      thursday: { open: "9:00", close: "18:00" },
      friday: { open: "9:00", close: "19:00" },
      saturday: { open: "8:00", close: "17:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  {
    id: "lash-studio-dr",
    name: "Lash Studio DR", 
    slug: "lash-studio-dr",
    logo: "/vendors/lash-studio-logo.png",
    coverImage: "/vendors/lash-studio-cover.jpg",
    description: "Especialistas en extensiones de pestañas y diseño de cejas. Técnicas avanzadas y productos de alta calidad.",
    rating: 4.9,
    reviewCount: 67,
    serviceCount: 6,
    location: {
      address: "Calle Pasteur 123",
      district: "Gazcue", 
      city: "Santo Domingo",
      distance: "2.3km"
    },
    contact: {
      phone: "+1 809-555-0654",
      whatsapp: "+1 809-555-0654"
    },
    categories: ["pestañas"],
    popularServices: ["Extensiones Pestañas", "Lifting de Pestañas", "Diseño Cejas"],
    badges: ["Top Rated", "Especialistas"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 11:00 AM",
      todayAvailable: false
    },
    professionalCount: 2,
    priceRange: {
      min: 1800,
      max: 3200
    },
    services: [
      {
        id: "extensiones-pestanas",
        name: "Extensiones de Pestañas",
        description: "Extensiones individuales para una mirada impactante y natural",
        price: 2200,
        duration: 120,
        category: "pestañas",
        isPopular: true,
        image: "/services/lash-extensions.jpg"
      }
    ],
    businessHours: {
      monday: { open: "10:00", close: "18:00" },
      tuesday: { open: "10:00", close: "18:00" },
      wednesday: { open: "10:00", close: "18:00" },
      thursday: { open: "10:00", close: "18:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "9:00", close: "16:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  }
]

// Helper function to get vendors by category
export function getVendorsByCategory(category: string): Vendor[] {
  return mockVendors.filter(vendor => vendor.categories.includes(category))
}

// Helper function to get vendor by ID
export function getVendorById(id: string): Vendor | undefined {
  return mockVendors.find(vendor => vendor.id === id)
}

// Helper function to get vendor by slug
export function getVendorBySlug(slug: string): Vendor | undefined {
  return mockVendors.find(vendor => vendor.slug === slug)
}