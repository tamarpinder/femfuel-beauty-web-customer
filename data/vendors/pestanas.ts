import { Vendor } from "@/types/vendor"

export const pestanasVendors: Vendor[] = [
  {
    id: "lash-studio-premium",
    name: "Lash Studio Premium",
    slug: "lash-studio-premium",
    logo: "/vendors/lash-studio-premium-logo.png",
    coverImage: "/vendors/lash-studio-premium-cover.jpg",
    description: "Estudio especializado en extensiones de pestañas con técnicas 3D, 6D y volume ruso.",
    rating: 4.8,
    reviewCount: 234,
    serviceCount: 5,
    location: {
      address: "Plaza Acrópolis, Bella Vista",
      district: "Bella Vista",
      city: "Santo Domingo",
      distance: "1.8km"
    },
    contact: {
      phone: "+1 (809) 555-6742",
      email: "citas@lashstudiopremium.do",
      whatsapp: "+1 (809) 555-6742"
    },
    categories: ["pestanas"],
    popularServices: ["Extensiones Volume Ruso", "Extensiones 6D", "Extensiones Clásicas"],
    badges: ["Especialista en Pestañas", "Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 3:00 PM",
      todayAvailable: true
    },
    professionalCount: 7,
    priceRange: {
      min: 2800,
      max: 8500
    },
    gallery: [
      "/vendors/lash-studio-premium/main.jpg",
      "/vendors/lash-studio-premium/portfolio1.jpg"
    ],
    services: [
      {
        id: "lash-classic",
        name: "Extensiones Clásicas",
        description: "Técnica 1:1, una extensión por pestaña natural. Look natural y elegante.",
        price: 3500,
        duration: 120,
        category: "pestanas"
      },
      {
        id: "lash-3d",
        name: "Extensiones 3D",
        description: "Técnica de volumen que agrega densidad manteniendo un look natural.",
        price: 4800,
        duration: 150,
        category: "pestanas"
      },
      {
        id: "lash-6d",
        name: "Extensiones 6D",
        description: "Máximo volumen con técnica avanzada para un look dramático.",
        price: 6500,
        duration: 180,
        category: "pestanas"
      },
      {
        id: "lash-russian",
        name: "Volumen Ruso",
        description: "Técnica premium con múltiples extensiones ultra finas por pestaña.",
        price: 7500,
        duration: 200,
        category: "pestanas"
      },
      {
        id: "lash-refill",
        name: "Retoque de Pestañas",
        description: "Mantenimiento y rellenado de extensiones existentes.",
        price: 2800,
        duration: 90,
        category: "pestanas"
      }
    ],
    professionals: [
      {
        id: "camila-lash-premium",
        name: "Camila Herrera",
        image: "/professionals/portraits/lash-specialist-camila.png",
        rating: 4.9,
        reviewCount: 156,
        yearsExperience: 6,
        monthlyBookings: 128,
        specialties: ["Volume Ruso", "Extensiones 6D", "Lash Lifting"],
        isTopRated: true,
        nextAvailable: "Hoy 3:30 PM",
        bio: "Especialista senior en extensiones de pestañas con certificación internacional en técnica rusa. Más de 6 años perfeccionando looks dramáticos.",
        recommendedAddons: [
          { id: "lash-tint", name: "Tinte de Pestañas", price: 800, duration: 30 },
          { id: "brow-shaping", name: "Perfilado de Cejas", price: 600, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "liliana-lash-premium",
        name: "Liliana Santamaría",
        image: "/professionals/portraits/lash-brow-liliana.png",
        rating: 4.8,
        reviewCount: 89,
        yearsExperience: 4,
        monthlyBookings: 94,
        specialties: ["Diseño de Cejas", "Extensiones Clásicas", "Lash & Brow"],
        isTopRated: true,
        nextAvailable: "Mañana 10:00 AM",
        bio: "Experta en diseño integral de cejas y pestañas. Especializada en crear looks naturales que realzan la mirada de cada cliente.",
        recommendedAddons: [
          { id: "brow-tint", name: "Tinte de Cejas", price: 700, duration: 25 },
          { id: "lash-perm", name: "Permanente de Pestañas", price: 900, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "andrea-lash-premium",
        name: "Andrea Moreno",
        image: "/professionals/portraits/microblade-artist-andrea.png",
        rating: 4.7,
        reviewCount: 67,
        yearsExperience: 3,
        monthlyBookings: 73,
        specialties: ["Microblading", "Cejas Pelo a Pelo", "Extensiones Naturales"],
        nextAvailable: "Hoy 5:00 PM",
        bio: "Artista especializada en microblading y técnicas de cejas pelo a pelo. Experta en crear cejas perfectas y naturales.",
        recommendedAddons: [
          { id: "microblading-touch", name: "Retoque Microblading", price: 1200, duration: 60 },
          { id: "brow-mapping", name: "Mapeo de Cejas", price: 500, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "19:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "19:00" },
      saturday: { open: "08:00", close: "17:00" },
      sunday: { open: "10:00", close: "16:00", isClosed: true }
    }
  },
  {
    id: "eyes-beauty-lashes",
    name: "Eyes Beauty Lashes",
    slug: "eyes-beauty-lashes",
    logo: "/vendors/eyes-beauty-lashes-logo.png",
    coverImage: "/vendors/eyes-beauty-lashes-cover.jpg",
    description: "Centro especializado en tratamientos para pestañas y cejas con técnicas modernas.",
    rating: 4.6,
    reviewCount: 167,
    serviceCount: 4,
    location: {
      address: "Calle Seminario, Gazcue",
      district: "Gazcue",
      city: "Santo Domingo",
      distance: "2.8km"
    },
    contact: {
      phone: "+1 (809) 555-3489",
      email: "info@eyesbeautylashes.do",
      whatsapp: "+1 (809) 555-3489"
    },
    categories: ["pestanas"],
    popularServices: ["Lifting de Pestañas", "Extensiones Volumen", "Diseño de Cejas"],
    badges: ["Técnicas Modernas"],
    availability: {
      isOpen: true,
      nextSlot: "Mañana 9:00 AM",
      todayAvailable: false
    },
    professionalCount: 5,
    priceRange: {
      min: 2200,
      max: 5800
    },
    gallery: [
      "/vendors/eyes-beauty-lashes/main.jpg"
    ],
    services: [
      {
        id: "lash-lift",
        name: "Lifting de Pestañas",
        description: "Curvado y tinte de pestañas naturales para un look realzado.",
        price: 2800,
        duration: 75,
        category: "pestanas"
      },
      {
        id: "lash-extensions-basic",
        name: "Extensiones Básicas",
        description: "Extensiones de pestañas para uso diario con look natural.",
        price: 3200,
        duration: 120,
        category: "pestanas"
      },
      {
        id: "lash-volume",
        name: "Extensiones Volumen",
        description: "Técnica de volumen para pestañas más densas y dramáticas.",
        price: 4500,
        duration: 150,
        category: "pestanas"
      },
      {
        id: "eyebrow-design",
        name: "Diseño de Cejas",
        description: "Perfilado, depilación y tinte de cejas profesional.",
        price: 1800,
        duration: 45,
        category: "pestanas"
      }
    ],
    professionals: [
      {
        id: "yolanda-eyes-beauty",
        name: "Yolanda Espinoza",
        image: "/professionals/portraits/facial-specialist-yolanda.png",
        rating: 4.8,
        reviewCount: 94,
        yearsExperience: 5,
        monthlyBookings: 87,
        specialties: ["Lifting de Pestañas", "Tratamientos Faciales", "Cuidado Integral"],
        isTopRated: true,
        nextAvailable: "Mañana 9:30 AM",
        bio: "Especialista facial y de pestañas con enfoque en tratamientos integrales. Experta en lifting de pestañas y cuidado de la zona ocular.",
        recommendedAddons: [
          { id: "eye-treatment", name: "Tratamiento de Contorno", price: 900, duration: 40 },
          { id: "lash-serum", name: "Aplicación de Serum", price: 600, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "valentina-eyes-beauty",
        name: "Valentina Skin",
        image: "/professionals/portraits/skin-specialist-valentina.png",
        rating: 4.6,
        reviewCount: 78,
        yearsExperience: 4,
        monthlyBookings: 69,
        specialties: ["Cuidado de Piel", "Extensiones Básicas", "Tratamientos Suaves"],
        nextAvailable: "Hoy 4:00 PM",
        bio: "Especialista en cuidado de piel y extensiones de pestañas básicas. Enfoque en tratamientos suaves y naturales para pieles sensibles.",
        recommendedAddons: [
          { id: "sensitive-care", name: "Cuidado Piel Sensible", price: 800, duration: 35 },
          { id: "natural-look", name: "Look Natural", price: 400, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "10:00", end: "17:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      }
    ],
    businessHours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "19:00" },
      saturday: { open: "08:00", close: "17:00" },
      sunday: { open: "10:00", close: "16:00", isClosed: true }
    }
  }
]