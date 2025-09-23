import { Vendor } from "@/types/vendor"

export const unasBasicVendors: Vendor[] = [
  {
    id: "beauty-studio-rd",
    name: "Beauty Studio RD",
    slug: "beauty-studio-rd",
    logo: "/vendors/beauty-studio-logo.png",
    coverImage: "/vendors/beauty-studio-cover.jpg",
    description: "Especialistas en uñas y cuidado de manos con más de 8 años de experiencia. Ofrecemos los mejores tratamientos con productos premium.",
    rating: 4.6,
    reviewCount: 124,
    serviceCount: 6,
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
    popularServices: ["Manicure Gel Premium", "Combo Manicure + Pedicure", "Manicure Express"],
    badges: ["Premium Partner", "Respuesta Rápida"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 3:00 PM",
      todayAvailable: true
    },
    professionalCount: 3,
    priceRange: {
      min: 600,
      max: 2400
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
        image: "/services/nails/premium-gel-manicure.png",
        beforeAfter: {
          before: "/transformations/before/manicure-gel-before.png",
          after: "/transformations/after/manicure-gel-after.png",
          title: "Manicure de Gel"
        },
        addons: [
          { id: "nail-art", name: "Nail Art Básico", price: 300, duration: 15 },
          { id: "french-tip", name: "French Tips", price: 200, duration: 10 },
          { id: "cuticle-treatment", name: "Tratamiento Cutículas", price: 150, duration: 10 },
          { id: "hand-massage", name: "Masaje de Manos", price: 250, duration: 15 },
          { id: "premium-products", name: "Productos Premium", price: 400, duration: 5 }
        ]
      },
      {
        id: "pedicure-spa",
        name: "Pedicure Spa Completo",
        description: "Pedicure relajante con exfoliación, masaje e hidratación profunda",
        price: 1800,
        duration: 90,
        category: "unas",
        isPopular: true,
        image: "/services/nails/spa-pedicure-treatment.png",
        beforeAfter: {
          before: "/transformations/before/pedicure-spa-before.png",
          after: "/transformations/after/pedicure-spa-after.png",
          title: "Pedicure Spa Completo"
        },
        addons: [
          { id: "foot-massage-extended", name: "Masaje de Pies Extendido", price: 400, duration: 20 },
          { id: "nail-art-feet", name: "Nail Art para Pies", price: 350, duration: 20 },
          { id: "callus-treatment", name: "Tratamiento Callos", price: 300, duration: 15 }
        ]
      },
      {
        id: "manicure-clasico",
        name: "Manicure Clásico",
        description: "Manicure tradicional con esmaltado regular",
        price: 800,
        duration: 45,
        category: "unas",
        image: "/services/nails/classic-manicure.png",
        beforeAfter: {
          before: "/transformations/before/manicure-clasico-before.png",
          after: "/transformations/after/manicure-clasico-after.png",
          title: "Manicure Clásico"
        },
        addons: [
          { id: "quick-nail-art", name: "Nail Art Rápido", price: 200, duration: 10 },
          { id: "hand-cream", name: "Crema de Manos Premium", price: 100, duration: 5 }
        ]
      },
      {
        id: "manicure-express",
        name: "Manicure Express",
        description: "Manicure rápido en 30 minutos, perfecto para tu rutina ocupada",
        price: 600,
        duration: 30,
        category: "unas",
        isPopular: false,
        image: "/services/nails/express-manicure.png",
        beforeAfter: {
          before: "/transformations/before/manicure-clasico-before.png",
          after: "/transformations/after/manicure-clasico-after.png",
          title: "Manicure Express"
        },
        addons: [
          { id: "quick-dry", name: "Secado Rápido", price: 100, duration: 5 },
          { id: "basic-nail-art", name: "Decoración Básica", price: 150, duration: 10 }
        ]
      },
      {
        id: "combo-mani-pedi",
        name: "Combo Manicure + Pedicure",
        description: "Combo completo de manicure y pedicure con descuento especial",
        price: 2400,
        duration: 120,
        category: "unas",
        isPopular: true,
        image: "/services/nails/luxury-manicure.png",
        beforeAfter: {
          before: "/transformations/before/nail-transformation-before.png",
          after: "/transformations/after/nail-transformation-after.png",
          title: "Combo Manicure + Pedicure"
        },
        addons: [
          { id: "full-nail-art", name: "Nail Art Completo", price: 500, duration: 30 },
          { id: "luxury-treatment", name: "Tratamiento de Lujo", price: 600, duration: 20 }
        ]
      },
      {
        id: "relleno-unas",
        name: "Relleno de Uñas",
        description: "Mantenimiento para uñas de gel o acrílico",
        price: 900,
        duration: 45,
        category: "unas",
        isPopular: false,
        image: "/services/nails/acrylic-extensions.png",
        beforeAfter: {
          before: "/transformations/before/extensiones-acrilico-before.png",
          after: "/transformations/after/extensiones-acrilico-after.png",
          title: "Relleno de Uñas"
        },
        addons: [
          { id: "color-change", name: "Cambio de Color", price: 200, duration: 15 },
          { id: "design-refresh", name: "Renovar Diseño", price: 300, duration: 20 }
        ]
      }
    ],
    professionals: [
      {
        id: "maria-rodriguez",
        name: "Maria Rodriguez",
        image: "/professionals/portraits/nail-artist-sofia.png",
        rating: 4.9,
        reviewCount: 89,
        yearsExperience: 5,
        monthlyBookings: 89,
        specialties: ["Nail Art", "Gel Premium", "Diseños 3D"],
        isTopRated: true,
        nextAvailable: "Hoy 2:00 PM",
        bio: "Especialista en nail art artístico con más de 5 años de experiencia. Conocida por sus diseños únicos y acabados perfectos.",
        recommendedAddons: [
          { id: "nail-art-premium", name: "Nail Art by Maria", price: 350, duration: 20 },
          { id: "3d-designs", name: "Diseños 3D", price: 500, duration: 25 },
          { id: "french-perfecto", name: "French Perfecto", price: 200, duration: 10 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" },
          personalTimeBlocks: [
            { day: 6, start: "16:00", end: "18:00", reason: "Cursos de actualización" }
          ]
        }
      },
      {
        id: "carmen-santana",
        name: "Carmen Santana",
        image: "/professionals/portraits/pedicure-specialist-marisol.png",
        rating: 4.7,
        reviewCount: 62,
        yearsExperience: 3,
        monthlyBookings: 67,
        specialties: ["Manicure Francesa", "Cuidado de Cutículas", "Esmaltado Clásico"],
        nextAvailable: "Hoy 3:30 PM",
        bio: "Técnica especializada en manicures clásicos y cuidado de cutículas. Perfecta para quien busca elegancia y profesionalismo.",
        recommendedAddons: [
          { id: "french-tips-carmen", name: "French Tips Perfecto", price: 200, duration: 15 },
          { id: "cuticle-care", name: "Tratamiento de Cutículas", price: 150, duration: 10 },
          { id: "hand-massage", name: "Masaje de Manos", price: 250, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "10:00", end: "17:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      },
      {
        id: "laura-perez",
        name: "Laura Pérez",
        image: "/professionals/portraits/wellness-therapist-isabella.png",
        rating: 4.8,
        reviewCount: 74,
        yearsExperience: 4,
        monthlyBookings: 45,
        specialties: ["Pedicure Spa", "Tratamientos Relajantes", "Masajes"],
        nextAvailable: "Mañana 10:00 AM",
        bio: "Especialista en pedicures spa y tratamientos relajantes. Experta en crear experiencias de bienestar completas.",
        recommendedAddons: [
          { id: "foot-massage-extended", name: "Masaje de Pies Extendido", price: 400, duration: 20 },
          { id: "spa-treatment", name: "Tratamiento Spa Completo", price: 350, duration: 30 },
          { id: "reflexology", name: "Reflexología", price: 300, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "18:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
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
    id: "nails-express-rd",
    name: "Nails Express RD",
    slug: "nails-express-rd",
    logo: "/vendors/logos/nails-express-rd-logo.png",
    coverImage: "/vendors/covers/nail-express-salon.png",
    description: "Servicio rápido de uñas sin cita previa. Especialistas en diseños modernos y técnicas express.",
    rating: 4.1,
    reviewCount: 98,
    serviceCount: 8,
    location: {
      address: "Plaza Las Américas, Local 45",
      district: "Bella Vista",
      city: "Santo Domingo",
      distance: "2.8km"
    },
    contact: {
      phone: "+1 809-555-0987",
      whatsapp: "+1 809-555-0987"
    },
    categories: ["unas"],
    popularServices: ["Manicure Express", "Nail Art Moderno", "Pedicure Rápido"],
    badges: ["Sin Cita", "Express"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 1:45 PM",
      todayAvailable: true
    },
    professionalCount: 2,
    priceRange: {
      min: 600,
      max: 1800
    },
    gallery: [
      "/vendors/nails-express-rd/main.jpg",
      "/vendors/nails-express-rd/work1.jpg"
    ],
    services: [
      {
        id: "manicure-express",
        name: "Manicure Express",
        description: "Manicure rápido en 30 minutos con esmaltado regular",
        price: 600,
        duration: 30,
        category: "unas",
        isPopular: true,
        image: "/services/express-manicure.jpg",
        beforeAfter: {
          before: "/transformations/before/manicure-clasico-before.png",
          after: "/transformations/after/manicure-clasico-after.png",
          title: "Manicure Express"
        }
      },
      {
        id: "nail-art-moderno",
        name: "Nail Art Moderno",
        description: "Diseños únicos y tendencias actuales en nail art",
        price: 1200,
        duration: 45,
        category: "unas",
        isPopular: true,
        image: "/services/modern-nail-art.jpg",
        beforeAfter: {
          before: "/transformations/before/arte-unas-tropical-before.png",
          after: "/transformations/after/arte-unas-tropical-after.png",
          title: "Nail Art Moderno"
        }
      }
    ],
    professionals: [
      {
        id: "jasmine-cabrera",
        name: "Jasmine Cabrera",
        image: "/professionals/portraits/express-nail-tech-1.png",
        rating: 4.2,
        reviewCount: 167,
        yearsExperience: 3,
        monthlyBookings: 145,
        specialties: ["Manicure Express", "Nail Art Rápido", "Gel Rápido"],
        nextAvailable: "Hoy 1:00 PM",
        bio: "Técnica especializada en servicios rápidos y eficientes. Experta en manicures express y nail art moderno con la mejor calidad en tiempo récord.",
        recommendedAddons: [
          { id: "quick-art", name: "Arte Rápido", price: 200, duration: 15 },
          { id: "express-gel", name: "Gel Express", price: 300, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6, 0],
          workingHours: { start: "10:00", end: "20:00" },
          lunchBreak: { start: "14:30", end: "15:30" }
        }
      },
      {
        id: "nicole-ortega",
        name: "Nicole Ortega",
        image: "/professionals/portraits/express-nail-tech-2.png",
        rating: 4.0,
        reviewCount: 124,
        yearsExperience: 2,
        monthlyBookings: 156,
        specialties: ["Pedicure Rápido", "Diseños Modernos", "Esmaltado Express"],
        nextAvailable: "Hoy 11:45 AM",
        bio: "Técnica joven especializada en pedicures rápidos y diseños modernos. Conocida por su velocidad y precisión en esmaltados express.",
        recommendedAddons: [
          { id: "modern-design", name: "Diseño Moderno", price: 250, duration: 20 },
          { id: "quick-pedi", name: "Pedicure Ultra Rápido", price: 200, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [1, 3, 4, 5, 6, 0],
          workingHours: { start: "11:00", end: "21:00" },
          lunchBreak: { start: "15:00", end: "16:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "10:00", close: "20:00" },
      tuesday: { open: "10:00", close: "20:00" },
      wednesday: { open: "10:00", close: "20:00" },
      thursday: { open: "10:00", close: "20:00" },
      friday: { open: "10:00", close: "21:00" },
      saturday: { open: "9:00", close: "21:00" },
      sunday: { open: "11:00", close: "19:00" }
    }
  }
]