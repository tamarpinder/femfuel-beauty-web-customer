import { Vendor } from "@/types/vendor"

export const maquillajeVendors: Vendor[] = [
  {
    id: "glamour-studio-makeup",
    name: "Glamour Studio",
    slug: "glamour-studio-makeup",
    description: "Estudio especializado en maquillaje profesional para eventos especiales, bodas y sesiones fotográficas.",
    rating: 4.8,
    reviewCount: 147,
    serviceCount: 3,
    location: {
      address: "Plaza Central, Piantini, Santo Domingo",
      district: "Piantini",
      city: "Santo Domingo"
    },
    contact: {
      phone: "+1 (809) 555-2145",
      email: "info@glamourstudio.do"
    },
    categories: ["maquillaje"],
    popularServices: ["Maquillaje de Novia", "Maquillaje de Gala", "Maquillaje para Fotografía"],
    badges: ["Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:00 PM",
      todayAvailable: true
    },
    professionalCount: 3,
    priceRange: {
      min: 2500,
      max: 8000
    },
    gallery: [
      "/vendors/glamour-studio-makeup/main.jpg",
      "/vendors/glamour-studio-makeup/portfolio1.jpg"
    ],
    services: [
      {
        id: "makeup-bridal",
        name: "Maquillaje de Novia",
        description: "Maquillaje completo para el día más especial. Incluye prueba previa y maquillaje el día del evento.",
        price: 6500,
        duration: 120,
        category: "maquillaje"
      },
      {
        id: "makeup-evening",
        name: "Maquillaje de Gala",
        description: "Maquillaje elegante para eventos de noche, graduaciones o cenas especiales.",
        price: 3500,
        duration: 90,
        category: "maquillaje"
      },
      {
        id: "makeup-photoshoot",
        name: "Maquillaje para Fotografía",
        description: "Maquillaje profesional diseñado específicamente para sesiones fotográficas.",
        price: 4200,
        duration: 75,
        category: "maquillaje"
      }
    ],
    professionals: [
      {
        id: "alejandra-glamour",
        name: "Alejandra Santos",
        image: "/professionals/portraits/makeup-artist-alejandra.png",
        rating: 4.9,
        reviewCount: 167,
        yearsExperience: 8,
        monthlyBookings: 134,
        specialties: ["Maquillaje Artístico", "Editorial", "Fotografía de Moda"],
        isTopRated: true,
        nextAvailable: "Hoy 2:30 PM",
        bio: "Maquilladora artística con 8 años de experiencia en editorial y fotografía de moda. Especialista en crear looks únicos y vanguardistas.",
        recommendedAddons: [
          { id: "artistic-makeup", name: "Maquillaje Artístico", price: 1500, duration: 60 },
          { id: "fashion-editorial", name: "Look Editorial", price: 1200, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "19:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "valentina-glamour",
        name: "Valentina Bridal",
        image: "/professionals/portraits/bridal-makeup-artist-valentina.png",
        rating: 4.8,
        reviewCount: 142,
        yearsExperience: 6,
        monthlyBookings: 89,
        specialties: ["Maquillaje de Novia", "Eventos Especiales", "Maquillaje Clásico"],
        isTopRated: true,
        nextAvailable: "Mañana 10:00 AM",
        bio: "Especialista en maquillaje nupcial con 6 años perfeccionando looks para el día más especial. Experta en maquillaje duradero y elegante.",
        recommendedAddons: [
          { id: "bridal-trial", name: "Prueba Nupcial", price: 2000, duration: 90 },
          { id: "long-lasting", name: "Maquillaje Duradero", price: 800, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "19:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "carmen-glamour",
        name: "Carmen Reyes",
        image: "/professionals/portraits/makeup-artist-carmen.png",
        rating: 4.7,
        reviewCount: 94,
        yearsExperience: 4,
        monthlyBookings: 67,
        specialties: ["Maquillaje de Gala", "Eventos Nocturnos", "Smokey Eyes"],
        nextAvailable: "Hoy 5:00 PM",
        bio: "Maquilladora especializada en looks de gala y eventos nocturnos. Experta en técnicas de smokey eyes y maquillaje dramático.",
        recommendedAddons: [
          { id: "smokey-eyes", name: "Smokey Eyes Perfecto", price: 600, duration: 30 },
          { id: "evening-glam", name: "Glamour Nocturno", price: 800, duration: 40 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6, 0],
          workingHours: { start: "10:00", end: "20:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      },
      {
        id: "natalia-glamour",
        name: "Natalia Cruz",
        image: "/professionals/portraits/makeup-artist-natalia.png",
        rating: 4.6,
        reviewCount: 78,
        yearsExperience: 3,
        monthlyBookings: 56,
        specialties: ["Maquillaje Natural", "Día", "Corrección de Color"],
        nextAvailable: "Mañana 3:00 PM",
        bio: "Especialista en maquillaje natural y de día. Experta en corrección de color y técnicas que realzan la belleza natural.",
        recommendedAddons: [
          { id: "color-correction", name: "Corrección de Color", price: 500, duration: 25 },
          { id: "natural-glow", name: "Brillo Natural", price: 400, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "09:00", end: "17:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      }
    ],
    businessHours: {
      monday: { open: "09:00", close: "19:00" },
      tuesday: { open: "09:00", close: "19:00" },
      wednesday: { open: "09:00", close: "19:00" },
      thursday: { open: "09:00", close: "19:00" },
      friday: { open: "09:00", close: "20:00" },
      saturday: { open: "08:00", close: "18:00" },
      sunday: { open: "09:00", close: "17:00", isClosed: true }
    }
  }
  // TODO: Add remaining vendors with proper Vendor interface structure
]
