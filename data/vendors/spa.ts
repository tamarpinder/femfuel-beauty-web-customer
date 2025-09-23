import { Vendor } from "@/types/vendor"

export const spaVendors: Vendor[] = [
  {
    id: "wellness-spa-luxury",
    name: "Wellness Spa Luxury",
    slug: "wellness-spa-luxury",
    logo: "/vendors/wellness-spa-luxury-logo.png",
    coverImage: "/vendors/wellness-spa-luxury-cover.jpg",
    description: "Spa de lujo especializado en tratamientos corporales, faciales y terapias de relajación en un ambiente exclusivo.",
    rating: 4.9,
    reviewCount: 298,
    serviceCount: 5,
    location: {
      address: "Hotel Casa Colonial, Zona Colonial",
      district: "Zona Colonial",
      city: "Santo Domingo",
      distance: "4.2km"
    },
    contact: {
      phone: "+1 (809) 555-8934",
      email: "reservas@wellnessspaluxury.do",
      whatsapp: "+1 (809) 555-8934"
    },
    categories: ["spa"],
    popularServices: ["Facial de Oro 24k", "Masaje con Piedras Calientes", "Paquete de Parejas"],
    badges: ["Spa de Lujo", "Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 5:00 PM",
      todayAvailable: true
    },
    professionalCount: 12,
    priceRange: {
      min: 3500,
      max: 12000
    },
    gallery: [
      "/vendors/wellness-spa-luxury/main.jpg",
      "/vendors/wellness-spa-luxury/facilities1.jpg",
      "/vendors/wellness-spa-luxury/treatments1.jpg"
    ],
    services: [
      {
        id: "facial-gold",
        name: "Facial de Oro 24k",
        description: "Tratamiento facial premium con mascarilla de oro coloidal y masaje especializado.",
        price: 8500,
        duration: 90,
        category: "spa"
      },
      {
        id: "body-wrap-detox",
        name: "Envolvimiento Corporal Detox",
        description: "Tratamiento corporal completo con algas marinas y aceites esenciales.",
        price: 6800,
        duration: 120,
        category: "spa"
      },
      {
        id: "massage-hot-stones",
        name: "Masaje con Piedras Calientes",
        description: "Masaje relajante y terapéutico con piedras volcánicas calientes.",
        price: 5200,
        duration: 80,
        category: "spa"
      },
      {
        id: "couples-package",
        name: "Paquete de Parejas",
        description: "Experiencia completa de spa para dos personas en suite privada.",
        price: 12000,
        duration: 180,
        category: "spa"
      },
      {
        id: "anti-cellulite",
        name: "Tratamiento Anti-Celulitis",
        description: "Tratamiento especializado para reducir celulitis con tecnología avanzada.",
        price: 4500,
        duration: 60,
        category: "spa"
      }
    ],
    professionals: [
      {
        id: "raquel-wellness-luxury",
        name: "Raquel Delgado",
        image: "/professionals/portraits/massage-therapist-raquel.png",
        rating: 4.9,
        reviewCount: 187,
        yearsExperience: 8,
        monthlyBookings: 142,
        specialties: ["Masaje Terapéutico", "Piedras Calientes", "Aromaterapia"],
        isTopRated: true,
        nextAvailable: "Hoy 6:00 PM",
        bio: "Masajista terapéutica senior con 8 años de experiencia en técnicas de relajación y bienestar. Especialista en masajes con piedras calientes.",
        recommendedAddons: [
          { id: "aromatherapy", name: "Aromaterapia Premium", price: 1200, duration: 30 },
          { id: "hot-stone-ext", name: "Extensión Piedras Calientes", price: 800, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "19:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "isabella-wellness-luxury",
        name: "Isabella Martínez",
        image: "/professionals/portraits/wellness-therapist-isabella.png",
        rating: 4.8,
        reviewCount: 124,
        yearsExperience: 6,
        monthlyBookings: 98,
        specialties: ["Terapia de Bienestar", "Faciales de Lujo", "Tratamientos Corporales"],
        isTopRated: true,
        nextAvailable: "Mañana 10:00 AM",
        bio: "Terapeuta de bienestar especializada en tratamientos holísticos y faciales de lujo. Experta en crear experiencias de relajación completas.",
        recommendedAddons: [
          { id: "holistic-therapy", name: "Terapia Holística", price: 1500, duration: 45 },
          { id: "luxury-facial", name: "Facial de Lujo Adicional", price: 2000, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "19:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "ana-wellness-luxury",
        name: "Ana Valdez",
        image: "/professionals/portraits/aesthetician-ana.png",
        rating: 4.7,
        reviewCount: 89,
        yearsExperience: 5,
        monthlyBookings: 76,
        specialties: ["Estética Facial", "Anti-Envejecimiento", "Cuidado Premium"],
        nextAvailable: "Hoy 8:00 PM",
        bio: "Esteticista especializada en tratamientos anti-envejecimiento y cuidado facial premium. Experta en productos de lujo y técnicas avanzadas.",
        recommendedAddons: [
          { id: "anti-aging", name: "Tratamiento Anti-Edad", price: 1800, duration: 50 },
          { id: "premium-mask", name: "Mascarilla Premium", price: 1000, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6, 0],
          workingHours: { start: "09:00", end: "20:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "08:00", close: "19:00" },
      tuesday: { open: "08:00", close: "19:00" },
      wednesday: { open: "08:00", close: "19:00" },
      thursday: { open: "08:00", close: "19:00" },
      friday: { open: "08:00", close: "20:00" },
      saturday: { open: "07:00", close: "18:00" },
      sunday: { open: "09:00", close: "17:00" }
    }
  },
  {
    id: "zen-body-spa",
    name: "Zen Body Spa",
    slug: "zen-body-spa",
    logo: "/vendors/zen-body-spa-logo.png",
    coverImage: "/vendors/zen-body-spa-cover.jpg",
    description: "Centro de bienestar especializado en tratamientos corporales, masajes terapéuticos y relajación.",
    rating: 4.6,
    reviewCount: 189,
    serviceCount: 4,
    location: {
      address: "Av. Máximo Gómez, Gazcue",
      district: "Gazcue",
      city: "Santo Domingo",
      distance: "3.1km"
    },
    contact: {
      phone: "+1 (809) 555-7456",
      email: "info@zenbodyspa.do",
      whatsapp: "+1 (809) 555-7456"
    },
    categories: ["spa"],
    popularServices: ["Masaje Relajante", "Masaje Tejido Profundo", "Facial Hidratante"],
    badges: ["Centro de Bienestar"],
    availability: {
      isOpen: true,
      nextSlot: "Mañana 8:00 AM",
      todayAvailable: false
    },
    professionalCount: 8,
    priceRange: {
      min: 2500,
      max: 6500
    },
    gallery: [
      "/vendors/zen-body-spa/main.jpg"
    ],
    services: [
      {
        id: "relaxing-massage",
        name: "Masaje Relajante",
        description: "Masaje completo con aceites aromáticos para aliviar el estrés.",
        price: 3500,
        duration: 60,
        category: "spa"
      },
      {
        id: "deep-tissue",
        name: "Masaje Tejido Profundo",
        description: "Masaje terapéutico para aliviar tensiones musculares profundas.",
        price: 4200,
        duration: 75,
        category: "spa"
      },
      {
        id: "facial-hydrating",
        name: "Facial Hidratante",
        description: "Tratamiento facial profundamente hidratante con mascarilla nutritiva.",
        price: 3800,
        duration: 70,
        category: "spa"
      },
      {
        id: "body-exfoliation",
        name: "Exfoliación Corporal",
        description: "Exfoliación completa del cuerpo con sales marinas y aceites.",
        price: 2800,
        duration: 45,
        category: "spa"
      }
    ],
    professionals: [
      {
        id: "gabriela-zen-spa",
        name: "Gabriela Peña",
        image: "/professionals/portraits/spa-therapist-gabriela.png",
        rating: 4.8,
        reviewCount: 156,
        yearsExperience: 7,
        monthlyBookings: 118,
        specialties: ["Masaje Relajante", "Terapia Spa", "Bienestar Integral"],
        isTopRated: true,
        nextAvailable: "Mañana 8:30 AM",
        bio: "Terapeuta spa especializada en masajes relajantes y bienestar integral. Experta en crear experiencias de paz y tranquilidad.",
        recommendedAddons: [
          { id: "spa-therapy", name: "Terapia Spa Extendida", price: 1000, duration: 40 },
          { id: "relaxation", name: "Sesión de Relajación", price: 600, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "19:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "carlos-zen-spa",
        name: "Carlos Mendoza",
        image: "/professionals/portraits/male-massage-therapist.png",
        rating: 4.7,
        reviewCount: 92,
        yearsExperience: 5,
        monthlyBookings: 84,
        specialties: ["Masaje Deportivo", "Tejido Profundo", "Terapia Muscular"],
        nextAvailable: "Hoy 7:00 PM",
        bio: "Masajista terapéutico masculino especializado en masajes deportivos y de tejido profundo. Experto en alivio de tensiones musculares.",
        recommendedAddons: [
          { id: "sports-massage", name: "Masaje Deportivo Adicional", price: 800, duration: 30 },
          { id: "muscle-therapy", name: "Terapia Muscular", price: 700, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "20:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "08:00", close: "19:00" },
      tuesday: { open: "08:00", close: "19:00" },
      wednesday: { open: "08:00", close: "19:00" },
      thursday: { open: "08:00", close: "19:00" },
      friday: { open: "08:00", close: "20:00" },
      saturday: { open: "07:00", close: "18:00" },
      sunday: { open: "09:00", close: "17:00" }
    }
  },
  {
    id: "ocean-wellness-center",
    name: "Ocean Wellness Center",
    slug: "ocean-wellness-center",
    logo: "/vendors/ocean-wellness-center-logo.png",
    coverImage: "/vendors/ocean-wellness-center-cover.jpg",
    description: "Centro de bienestar con vista al mar que ofrece tratamientos corporales y terapias marinas.",
    rating: 4.7,
    reviewCount: 143,
    serviceCount: 3,
    location: {
      address: "Malecón de Santo Domingo, Zona Colonial",
      district: "Zona Colonial",
      city: "Santo Domingo",
      distance: "5.3km"
    },
    contact: {
      phone: "+1 (809) 555-2167",
      email: "reservas@oceanwellness.do",
      whatsapp: "+1 (809) 555-2167"
    },
    categories: ["spa"],
    popularServices: ["Terapia Marina", "Envolvimiento de Algas", "Facial Marino"],
    badges: ["Vista al Mar", "Terapias Marinas"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 6:00 PM",
      todayAvailable: true
    },
    professionalCount: 6,
    priceRange: {
      min: 3200,
      max: 8500
    },
    gallery: [
      "/vendors/ocean-wellness-center/main.jpg"
    ],
    services: [
      {
        id: "marine-therapy",
        name: "Terapia Marina",
        description: "Tratamiento con productos del mar y talasoterapia.",
        price: 5800,
        duration: 90,
        category: "spa"
      },
      {
        id: "seaweed-wrap",
        name: "Envolvimiento de Algas",
        description: "Tratamiento corporal detoxificante con algas marinas.",
        price: 4500,
        duration: 75,
        category: "spa"
      },
      {
        id: "ocean-facial",
        name: "Facial Marino",
        description: "Facial revitalizante con minerales y extractos marinos.",
        price: 4200,
        duration: 65,
        category: "spa"
      }
    ],
    professionals: [
      {
        id: "rosa-ocean-wellness",
        name: "Rosa Marítima",
        image: "/professionals/portraits/holistic-skin-therapist-rosa.png",
        rating: 4.9,
        reviewCount: 124,
        yearsExperience: 9,
        monthlyBookings: 96,
        specialties: ["Terapia Holística", "Tratamientos Marinos", "Cuidado de Piel"],
        isTopRated: true,
        nextAvailable: "Hoy 6:30 PM",
        bio: "Terapeuta holística especializada en tratamientos con productos del mar. Más de 9 años perfeccionando terapias marinas únicas.",
        recommendedAddons: [
          { id: "marine-premium", name: "Terapia Marina Premium", price: 1500, duration: 60 },
          { id: "holistic-session", name: "Sesión Holística", price: 1200, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6, 0],
          workingHours: { start: "08:00", end: "19:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "minerva-ocean-wellness",
        name: "Minerva Castillo",
        image: "/professionals/portraits/anti-aging-specialist-minerva.png",
        rating: 4.8,
        reviewCount: 89,
        yearsExperience: 6,
        monthlyBookings: 73,
        specialties: ["Anti-Envejecimiento", "Faciales Marinos", "Rejuvenecimiento"],
        isTopRated: true,
        nextAvailable: "Mañana 11:00 AM",
        bio: "Especialista en tratamientos anti-envejecimiento con productos marinos. Experta en técnicas de rejuvenecimiento facial.",
        recommendedAddons: [
          { id: "anti-aging-marine", name: "Anti-Edad Marino", price: 1800, duration: 70 },
          { id: "rejuvenation", name: "Rejuvenecimiento Facial", price: 1400, duration: 50 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "19:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      }
    ],
    businessHours: {
      monday: { open: "08:00", close: "19:00" },
      tuesday: { open: "08:00", close: "19:00" },
      wednesday: { open: "08:00", close: "19:00" },
      thursday: { open: "08:00", close: "19:00" },
      friday: { open: "08:00", close: "20:00" },
      saturday: { open: "07:00", close: "18:00" },
      sunday: { open: "09:00", close: "17:00" }
    }
  }
]