import { Vendor } from "@/types/vendor"

export const unasLuxuryVendors: Vendor[] = [
  {
    id: "luxury-nails-spa",
    name: "Luxury Nails Spa",
    slug: "luxury-nails-spa",
    logo: "/vendors/logos/luxury-nails-studio-logo.png",
    coverImage: "/vendors/covers/luxury-nails-spa.png",
    description: "Experiencia premium en cuidado de uñas con productos importados y ambiente de lujo.",
    rating: 4.9,
    reviewCount: 76,
    serviceCount: 15,
    location: {
      address: "Calle El Conde 567",
      district: "Zona Colonial",
      city: "Santo Domingo",
      distance: "4.2km"
    },
    contact: {
      phone: "+1 809-555-0456",
      email: "info@luxurynailsspa.do",
      whatsapp: "+1 809-555-0456"
    },
    categories: ["unas"],
    popularServices: ["Manicure de Lujo", "Pedicure Premium", "Uñas de Porcelana"],
    badges: ["Luxury", "Premium Partner"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 10:30 AM",
      todayAvailable: false
    },
    professionalCount: 4,
    priceRange: {
      min: 1500,
      max: 4000
    },
    gallery: [
      "/vendors/luxury-nails-spa/main.jpg",
      "/vendors/luxury-nails-spa/interior1.jpg",
      "/vendors/luxury-nails-spa/work1.jpg"
    ],
    services: [
      {
        id: "manicure-lujo",
        name: "Manicure de Lujo",
        description: "Tratamiento completo con productos premium y masaje de manos",
        price: 2200,
        duration: 90,
        category: "unas",
        isPopular: true,
        image: "/services/luxury-manicure.jpg",
        beforeAfter: {
          before: "/transformations/before/manicure-gel-before.png",
          after: "/transformations/after/manicure-gel-after.png",
          title: "Manicure de Lujo"
        }
      },
      {
        id: "unas-porcelana",
        name: "Uñas de Porcelana",
        description: "Extensiones de uñas con técnica de porcelana para duración extrema",
        price: 4000,
        duration: 150,
        category: "unas",
        isPopular: true,
        image: "/services/porcelain-nails.jpg",
        beforeAfter: {
          before: "/transformations/before/extensiones-acrilico-before.png",
          after: "/transformations/after/extensiones-acrilico-after.png",
          title: "Uñas de Porcelana"
        }
      }
    ],
    professionals: [
      {
        id: "patricia-vega",
        name: "Patricia Vega",
        image: "/professionals/portraits/nail-artist-patricia.png",
        rating: 4.9,
        reviewCount: 127,
        yearsExperience: 8,
        monthlyBookings: 89,
        specialties: ["Uñas de Lujo", "Nail Art Avanzado", "Manicure Rusa"],
        isTopRated: true,
        nextAvailable: "Mañana 10:30 AM",
        bio: "Técnica senior especializada en uñas de lujo y nail art avanzado. Certificada en técnica rusa y especialista en diseños únicos.",
        recommendedAddons: [
          { id: "luxury-nail-art", name: "Nail Art de Lujo", price: 800, duration: 60 },
          { id: "russian-manicure", name: "Manicure Rusa", price: 600, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "sofia-torres",
        name: "Sofía Torres",
        image: "/professionals/portraits/nail-artist-sofia.png",
        rating: 4.8,
        reviewCount: 95,
        yearsExperience: 5,
        monthlyBookings: 102,
        specialties: ["Diseños Artísticos", "Uñas Acrílicas", "Decoraciones 3D"],
        isTopRated: true,
        nextAvailable: "Hoy 2:15 PM",
        bio: "Artista de uñas especializada en diseños únicos y decoraciones 3D. Conocida por su creatividad y técnicas innovadoras.",
        recommendedAddons: [
          { id: "3d-nail-art", name: "Arte 3D en Uñas", price: 900, duration: 75 },
          { id: "artistic-design", name: "Diseño Artístico", price: 700, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6, 0],
          workingHours: { start: "10:00", end: "19:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      },
      {
        id: "carmen-herrera",
        name: "Carmen Herrera",
        image: "/professionals/portraits/nail-artist-carmen.png",
        rating: 4.7,
        reviewCount: 78,
        yearsExperience: 6,
        monthlyBookings: 76,
        specialties: ["Uñas de Gel", "Pedicure de Lujo", "Cuidado de Cutículas"],
        nextAvailable: "Mañana 3:00 PM",
        bio: "Especialista en uñas de gel y pedicures de lujo. Experta en cuidado profesional de cutículas y tratamientos premium.",
        recommendedAddons: [
          { id: "gel-overlay", name: "Recubrimiento de Gel", price: 450, duration: 45 },
          { id: "cuticle-luxury", name: "Tratamiento de Cutículas Premium", price: 300, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 5, 6],
          workingHours: { start: "11:00", end: "19:00" },
          lunchBreak: { start: "15:00", end: "16:00" }
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
      sunday: { isClosed: true, open: "", close: "" }
    }
  }
]