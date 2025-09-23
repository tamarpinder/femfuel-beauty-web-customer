import { Vendor } from "@/types/vendor"

export const peinadosVendors: Vendor[] = [
  {
    id: "salon-elite-hair",
    name: "Salón Elite Hair",
    slug: "salon-elite-hair",
    logo: "/vendors/salon-elite-hair-logo.png",
    coverImage: "/vendors/salon-elite-hair-cover.jpg",
    description: "Salón de belleza especializado en peinados elegantes para bodas, graduaciones y eventos especiales.",
    rating: 4.7,
    reviewCount: 156,
    serviceCount: 5,
    location: {
      address: "Av. Winston Churchill, Piantini",
      district: "Piantini",
      city: "Santo Domingo",
      distance: "2.1km"
    },
    contact: {
      phone: "+1 (809) 555-7823",
      email: "citas@salonelitehair.do",
      whatsapp: "+1 (809) 555-7823"
    },
    categories: ["peinados"],
    popularServices: ["Peinado de Novia", "Peinado Formal", "Peinado Vintage"],
    badges: ["Especialista en Bodas", "Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 4:00 PM",
      todayAvailable: true
    },
    professionalCount: 8,
    priceRange: {
      min: 2800,
      max: 7500
    },
    gallery: [
      "/vendors/salon-elite-hair/main.jpg",
      "/vendors/salon-elite-hair/portfolio1.jpg"
    ],
    services: [
      {
        id: "bridal-updo",
        name: "Peinado de Novia",
        description: "Peinado elegante y sofisticado para el día de la boda. Incluye prueba previa.",
        price: 6500,
        duration: 120,
        category: "peinados"
      },
      {
        id: "formal-updo",
        name: "Peinado de Gala",
        description: "Peinado elegante para eventos formales y celebraciones especiales.",
        price: 4200,
        duration: 90,
        category: "peinados"
      },
      {
        id: "party-style",
        name: "Peinado de Fiesta",
        description: "Peinado moderno y juvenil para fiestas y graduaciones.",
        price: 3500,
        duration: 75,
        category: "peinados"
      },
      {
        id: "vintage-style",
        name: "Peinado Vintage",
        description: "Peinados clásicos inspirados en diferentes épocas.",
        price: 3800,
        duration: 80,
        category: "peinados"
      }
    ],
    professionals: [
      {
        id: "maria-salon-elite",
        name: "María Fernández",
        image: "/professionals/portraits/lash-specialist-camila.png",
        rating: 4.9,
        reviewCount: 89,
        yearsExperience: 8,
        monthlyBookings: 76,
        specialties: ["Peinados de Novia", "Recogidos Elegantes", "Peinados Vintage"],
        isTopRated: true,
        nextAvailable: "Hoy 4:30 PM",
        bio: "Especialista senior en peinados de bodas y eventos especiales. Más de 8 años creando looks únicos para los días más importantes.",
        recommendedAddons: [
          { id: "bridal-trial", name: "Prueba de Peinado", price: 1500, duration: 60 },
          { id: "hair-accessories", name: "Accesorios Premium", price: 800, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "carla-salon-elite",
        name: "Carla Mendoza",
        image: "/professionals/portraits/hair-stylist-carla.png",
        rating: 4.8,
        reviewCount: 67,
        yearsExperience: 6,
        monthlyBookings: 82,
        specialties: ["Peinados Formales", "Brushing Profesional", "Styling Moderno"],
        isTopRated: true,
        nextAvailable: "Mañana 10:00 AM",
        bio: "Estilista experta en peinados formales y modernos. Especializada en brushing profesional y técnicas de volumen.",
        recommendedAddons: [
          { id: "volume-treatment", name: "Tratamiento de Volumen", price: 600, duration: 30 },
          { id: "shine-finish", name: "Acabado Brillante", price: 400, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "lucia-salon-elite",
        name: "Lucía Restrepo",
        image: "/professionals/portraits/hair-colorist-lucia.png",
        rating: 4.7,
        reviewCount: 45,
        yearsExperience: 4,
        monthlyBookings: 58,
        specialties: ["Peinados con Color", "Mechas y Reflejos", "Color y Peinado"],
        nextAvailable: "Hoy 6:00 PM",
        bio: "Colorista y estilista especializada en combinar técnicas de color con peinados únicos. Experta en mechas y reflejos.",
        recommendedAddons: [
          { id: "color-touch-up", name: "Retoque de Color", price: 1200, duration: 45 },
          { id: "glossing", name: "Brillo Profesional", price: 500, duration: 20 }
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
    id: "studio-hair-art",
    name: "Studio Hair Art",
    slug: "studio-hair-art",
    logo: "/vendors/studio-hair-art-logo.png",
    coverImage: "/vendors/studio-hair-art-cover.jpg",
    description: "Estudio creativo especializado en peinados artísticos y modernos para todas las ocasiones.",
    rating: 4.6,
    reviewCount: 98,
    serviceCount: 5,
    location: {
      address: "Calle José Amado Soler, Ensanche Naco",
      district: "Ensanche Naco",
      city: "Santo Domingo",
      distance: "3.5km"
    },
    contact: {
      phone: "+1 (809) 555-9156",
      email: "info@studiohairart.do",
      whatsapp: "+1 (809) 555-9156"
    },
    categories: ["peinados"],
    popularServices: ["Peinado Artístico", "Brushing Profesional", "Peinado Moderno"],
    badges: ["Creatividad Garantizada"],
    availability: {
      isOpen: true,
      nextSlot: "Mañana 10:00 AM",
      todayAvailable: false
    },
    professionalCount: 6,
    priceRange: {
      min: 2200,
      max: 6800
    },
    gallery: [
      "/vendors/studio-hair-art/main.jpg"
    ],
    services: [
      {
        id: "creative-updo",
        name: "Peinado Creativo",
        description: "Peinados únicos y personalizados con toques artísticos.",
        price: 4800,
        duration: 100,
        category: "peinados"
      },
      {
        id: "boho-style",
        name: "Peinado Boho",
        description: "Peinados con estilo bohemio, trenzas y accesorios naturales.",
        price: 3800,
        duration: 85,
        category: "peinados"
      },
      {
        id: "modern-chic",
        name: "Peinado Moderno",
        description: "Peinados contemporáneos con líneas limpias y elegantes.",
        price: 3200,
        duration: 70,
        category: "peinados"
      }
    ],
    professionals: [
      {
        id: "esperanza-hair-art",
        name: "Esperanza Vásquez",
        image: "/professionals/portraits/hair-stylist-esperanza.png",
        rating: 4.8,
        reviewCount: 73,
        yearsExperience: 7,
        monthlyBookings: 89,
        specialties: ["Peinados Artísticos", "Diseños Creativos", "Peinados de Vanguardia"],
        isTopRated: true,
        nextAvailable: "Mañana 11:00 AM",
        bio: "Artista capilar especializada en peinados únicos y creativos. Pionera en técnicas de vanguardia y diseños innovadores.",
        recommendedAddons: [
          { id: "artistic-design", name: "Diseño Artístico", price: 1000, duration: 45 },
          { id: "avant-garde-style", name: "Estilo Vanguardista", price: 1200, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "diego-hair-art",
        name: "Diego Morales",
        image: "/professionals/portraits/hair-designer-diego.png",
        rating: 4.9,
        reviewCount: 91,
        yearsExperience: 9,
        monthlyBookings: 76,
        specialties: ["Diseño Capilar", "Peinados Modernos", "Estilismo Innovador"],
        isTopRated: true,
        nextAvailable: "Hoy 5:00 PM",
        bio: "Diseñador capilar masculino con experiencia internacional. Especialista en crear peinados modernos con toques artísticos únicos.",
        recommendedAddons: [
          { id: "modern-styling", name: "Estilismo Moderno", price: 800, duration: 40 },
          { id: "creative-finish", name: "Acabado Creativo", price: 600, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "19:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      },
      {
        id: "ricardo-hair-art",
        name: "Ricardo Jiménez",
        image: "/professionals/portraits/hair-stylist-ricardo.png",
        rating: 4.7,
        reviewCount: 58,
        yearsExperience: 5,
        monthlyBookings: 64,
        specialties: ["Peinados Boho", "Estilos Naturales", "Texturas Creativas"],
        nextAvailable: "Mañana 2:00 PM",
        bio: "Estilista masculino especializado en peinados con textura y estilos naturales. Experto en tendencias boho y looks relajados.",
        recommendedAddons: [
          { id: "texture-treatment", name: "Tratamiento de Textura", price: 700, duration: 35 },
          { id: "natural-finish", name: "Acabado Natural", price: 400, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6, 0],
          workingHours: { start: "10:00", end: "18:00" },
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