import { Vendor } from "@/types/vendor"

export const mixedVendors: Vendor[] = [
  {
    id: "femfuel-beauty-center",
    name: "FemFuel Beauty Center",
    slug: "femfuel-beauty-center",
    description: "Centro integral de belleza FemFuel que ofrece todos los servicios especializados bajo un mismo techo.",
    rating: 4.9,
    reviewCount: 456,
    serviceCount: 11,
    location: {
      address: "Plaza de la Cultura, Bella Vista, Santo Domingo",
      district: "Bella Vista",
      city: "Santo Domingo"
    },
    contact: {
      phone: "+1 (809) 555-1000",
      email: "centro@femfuelbeauty.do"
    },
    categories: ["mixed", "spa", "maquillaje", "peinados", "unas"],
    popularServices: ["Paquete de Relajación", "Preparación Completa de Novia", "Styling Completo para Eventos"],
    badges: ["Premium Partner", "Centro FemFuel"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 11:00 AM",
      todayAvailable: true
    },
    professionalCount: 15,
    priceRange: {
      min: 1500,
      max: 15000
    },
    gallery: [
      "/vendors/femfuel-beauty-center/main.jpg",
      "/vendors/femfuel-beauty-center/facilities1.jpg",
      "/vendors/femfuel-beauty-center/team1.jpg"
    ],
    services: [
      {
        id: "full-beauty-package",
        name: "Paquete Belleza Completa",
        description: "Experiencia completa que incluye facial, manicure, pedicure y peinado.",
        price: 8500,
        duration: 240,
        category: "mixed"
      },
      {
        id: "bridal-complete",
        name: "Paquete Nupcial Completo",
        description: "Preparación completa para novias: facial, maquillaje, peinado y manicure.",
        price: 12500,
        duration: 300,
        category: "mixed"
      },
      {
        id: "express-beauty",
        name: "Belleza Express",
        description: "Sesión rápida de maquillaje, peinado express y manicure básico.",
        price: 4200,
        duration: 120,
        category: "mixed"
      },
      {
        id: "spa-wellness-day",
        name: "Día de Spa y Bienestar",
        description: "Experiencia completa de relajación con masaje, facial y tratamientos corporales.",
        price: 9800,
        duration: 360,
        category: "spa"
      }
    ],
    professionals: [
      {
        id: "male-barber-femfuel",
        name: "Miguel Barbero",
        image: "/professionals/portraits/male-barber-1.png",
        rating: 4.8,
        reviewCount: 145,
        yearsExperience: 7,
        monthlyBookings: 112,
        specialties: ["Cortes Masculinos", "Barbería Clásica", "Styling Moderno"],
        isTopRated: true,
        nextAvailable: "Hoy 4:00 PM",
        bio: "Barbero profesional especializado en cortes masculinos clásicos y modernos. Más de 7 años perfeccionando el arte de la barbería.",
        recommendedAddons: [
          { id: "beard-trim", name: "Arreglo de Barba", price: 800, duration: 30 },
          { id: "classic-shave", name: "Afeitado Clásico", price: 600, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "20:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "carlos-barber-femfuel",
        name: "Carlos Estilista",
        image: "/professionals/portraits/male-barber-2.png",
        rating: 4.7,
        reviewCount: 98,
        yearsExperience: 5,
        monthlyBookings: 87,
        specialties: ["Cortes Modernos", "Degradados", "Peinados Creativos"],
        nextAvailable: "Mañana 9:00 AM",
        bio: "Estilista masculino especializado en cortes modernos y degradados. Experto en crear looks únicos y a la moda.",
        recommendedAddons: [
          { id: "modern-styling", name: "Estilismo Moderno", price: 700, duration: 35 },
          { id: "creative-cut", name: "Corte Creativo", price: 900, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "20:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "corporate-makeup-femfuel",
        name: "Roberto Maquillador",
        image: "/professionals/portraits/corporate-makeup-male.png",
        rating: 4.6,
        reviewCount: 67,
        yearsExperience: 4,
        monthlyBookings: 54,
        specialties: ["Maquillaje Corporativo", "Eventos Empresariales", "Maquillaje Masculino"],
        nextAvailable: "Hoy 6:00 PM",
        bio: "Maquillador especializado en looks corporativos y eventos empresariales. Experto en maquillaje sutil y profesional.",
        recommendedAddons: [
          { id: "corporate-touch", name: "Retoque Corporativo", price: 500, duration: 20 },
          { id: "professional-look", name: "Look Profesional", price: 800, duration: 40 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6, 0],
          workingHours: { start: "09:00", end: "21:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "08:00", close: "20:00" },
      tuesday: { open: "08:00", close: "20:00" },
      wednesday: { open: "08:00", close: "20:00" },
      thursday: { open: "08:00", close: "20:00" },
      friday: { open: "08:00", close: "21:00" },
      saturday: { open: "07:00", close: "19:00" },
      sunday: { open: "09:00", close: "17:00" }
    }
  }
  // TODO: Restructure remaining vendors to match Vendor interface
]
