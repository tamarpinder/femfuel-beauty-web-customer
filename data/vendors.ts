import { Vendor } from "@/types/vendor"

export const mockVendors: Vendor[] = [
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
        image: "/services/manicure-gel.jpg",
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
        description: "Pedicure relajante con exfoliación, masaje y hidratación profunda",
        price: 1800,
        duration: 90,
        category: "unas",
        isPopular: true,
        image: "/services/pedicure-spa.jpg",
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
        image: "/services/manicure-clasico.jpg",
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
        image: "/services/manicure-express.jpg",
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
        image: "/services/combo-mani-pedi.jpg",
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
        image: "/services/nail-fill.jpg",
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
        image: "/professionals/maria-rodriguez.jpg",
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
          workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
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
        image: "/professionals/carmen-santana.jpg",
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
          workingDays: [1, 2, 3, 4, 5], // Mon-Fri
          workingHours: { start: "10:00", end: "17:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      },
      {
        id: "laura-perez",
        name: "Laura Pérez",
        image: "/professionals/laura-perez.jpg",
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
          workingDays: [2, 3, 4, 5, 6], // Tue-Sat
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
    id: "glamour-house",
    name: "Glamour House",
    slug: "glamour-house", 
    logo: "/vendors/glamour-house-logo.png",
    coverImage: "/vendors/glamour-house-cover.jpg",
    description: "Estudio de maquillaje profesional especializado en novias, eventos y sesiones fotográficas. Maquilladores certificados internacionalmente.",
    rating: 4.8,
    reviewCount: 89,
    serviceCount: 6,
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
    popularServices: ["Paquete de Novia Completo", "Maquillaje Ejecutivo", "Maquillaje Profesional"],
    badges: ["Nuevo", "Top Rated"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 10:00 AM",
      todayAvailable: false
    },
    professionalCount: 2,
    priceRange: {
      min: 800,
      max: 6500
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
        beforeAfter: {
          before: "/transformations/before/maquillaje-novia-before.png",
          after: "/transformations/after/maquillaje-novia-after.png",
          title: "Maquillaje de Novia"
        },
        addons: [
          { id: "hair-styling", name: "Peinado Incluido", price: 1500, duration: 60 },
          { id: "makeup-trial", name: "Prueba Extra", price: 1000, duration: 90 },
          { id: "false-lashes", name: "Pestañas Postizas Premium", price: 800, duration: 30 },
          { id: "touch-up-kit", name: "Kit de Retoques", price: 600, duration: 15 },
          { id: "photo-session", name: "Sesión de Fotos", price: 1200, duration: 45 }
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
        image: "/services/professional-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-1-before.png",
          after: "/transformations/after/makeup-transformation-1-after.png",
          title: "Maquillaje Profesional"
        },
        addons: [
          { id: "lashes-basic", name: "Pestañas Postizas", price: 400, duration: 20 },
          { id: "contour-highlighting", name: "Contorno y Destacado", price: 300, duration: 15 },
          { id: "makeup-products", name: "Productos para Llevar", price: 500, duration: 10 }
        ]
      },
      {
        id: "maquillaje-express",
        name: "Maquillaje Express",
        description: "Maquillaje rápido para reuniones o eventos improvisados",
        price: 1500,
        duration: 45,
        category: "maquillaje",
        isPopular: false,
        image: "/services/express-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-2-before.png",
          after: "/transformations/after/makeup-transformation-2-after.png",
          title: "Maquillaje Express"
        },
        addons: [
          { id: "quick-lashes", name: "Pestañas Rápidas", price: 200, duration: 10 },
          { id: "lip-upgrade", name: "Upgrade de Labios", price: 150, duration: 5 }
        ]
      },
      {
        id: "maquillaje-ejecutivo",
        name: "Maquillaje Ejecutivo",
        description: "Look profesional para reuniones de trabajo y presentaciones",
        price: 2000,
        duration: 60,
        category: "maquillaje",
        isPopular: true,
        image: "/services/executive-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/maquillaje-ejecutivo-before.png",
          after: "/transformations/after/maquillaje-ejecutivo-after.png",
          title: "Maquillaje Ejecutivo"
        },
        addons: [
          { id: "long-lasting", name: "Fijación Extra Larga", price: 250, duration: 10 },
          { id: "subtle-glow", name: "Brillo Sutil", price: 200, duration: 10 }
        ]
      },
      {
        id: "paquete-novia-completo",
        name: "Paquete de Novia Completo",
        description: "Maquillaje + peinado + prueba para novias, todo incluido",
        price: 6500,
        duration: 240,
        category: "maquillaje",
        isPopular: true,
        image: "/services/bridal-package.jpg",
        beforeAfter: {
          before: "/transformations/before/maquillaje-gala-before.png",
          after: "/transformations/after/maquillaje-gala-after.png",
          title: "Paquete de Novia Completo"
        },
        addons: [
          { id: "mom-makeup", name: "Maquillaje para Madre", price: 2000, duration: 90 },
          { id: "bridesmaid-makeup", name: "Maquillaje Dama de Honor", price: 1800, duration: 75 },
          { id: "venue-service", name: "Servicio en Locación", price: 1000, duration: 0 }
        ]
      },
      {
        id: "retoque-maquillaje",
        name: "Retoque de Maquillaje",
        description: "Servicio de retoque para eventos largos o fotos adicionales",
        price: 800,
        duration: 30,
        category: "maquillaje",
        isPopular: false,
        image: "/services/makeup-touchup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-3-before.png",
          after: "/transformations/after/makeup-transformation-3-after.png",
          title: "Retoque de Maquillaje"
        },
        addons: [
          { id: "lip-refresh", name: "Renovar Labios", price: 100, duration: 5 },
          { id: "powder-touch", name: "Retoque Polvo", price: 150, duration: 10 }
        ]
      }
    ],
    professionals: [
      {
        id: "valentina-morales",
        name: "Valentina Morales",
        image: "/professionals/portraits/bridal-makeup-artist-valentina.png",
        rating: 4.9,
        reviewCount: 87,
        yearsExperience: 6,
        monthlyBookings: 92,
        specialties: ["Maquillaje de Novias", "Eventos Sociales", "Maquillaje Artístico"],
        isTopRated: true,
        nextAvailable: "Hoy 2:30 PM",
        bio: "Artista del maquillaje especializada en novias y eventos especiales. Certificada internacionalmente con más de 6 años creando looks únicos para cada cliente.",
        recommendedAddons: [
          { id: "bridal-trial-valentina", name: "Prueba de Novia con Valentina", price: 1200, duration: 90 },
          { id: "artistic-makeup", name: "Maquillaje Artístico", price: 800, duration: 45 },
          { id: "premium-lashes", name: "Pestañas Premium", price: 600, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "19:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "alejandra-santos",
        name: "Alejandra Santos",
        image: "/professionals/portraits/makeup-artist-alejandra.png",
        rating: 4.8,
        reviewCount: 104,
        yearsExperience: 8,
        monthlyBookings: 78,
        specialties: ["Maquillaje Editorial", "Fotografía", "Efectos Especiales"],
        isTopRated: true,
        nextAvailable: "Mañana 10:00 AM",
        bio: "Maquilladora profesional con formación en efectos especiales y maquillaje editorial. Especialista en sesiones fotográficas y producciones artísticas.",
        recommendedAddons: [
          { id: "editorial-makeup", name: "Maquillaje Editorial", price: 1000, duration: 75 },
          { id: "photo-makeup", name: "Maquillaje para Fotografía", price: 900, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "12:00", end: "13:00" }
        }
      },
      {
        id: "natalia-restrepo",
        name: "Natalia Restrepo",
        image: "/professionals/portraits/makeup-artist-natalia.png",
        rating: 4.7,
        reviewCount: 69,
        yearsExperience: 4,
        monthlyBookings: 85,
        specialties: ["Maquillaje Natural", "Eventos Corporativos", "Maquillaje de Día"],
        nextAvailable: "Hoy 4:00 PM",
        bio: "Especialista en maquillaje natural y elegante. Perfecta para eventos corporativos y looks de día que realzan la belleza natural.",
        recommendedAddons: [
          { id: "natural-glow", name: "Brillo Natural", price: 400, duration: 20 },
          { id: "corporate-touch", name: "Toque Corporativo", price: 350, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "11:00", end: "19:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
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
    rating: 4.2,
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
        image: "/services/facial-treatment.jpg",
        beforeAfter: {
          before: "/transformations/before/limpieza-facial-before.png",
          after: "/transformations/after/limpieza-facial-after.png",
          title: "Tratamiento Facial Hidratante"
        }
      },
      {
        id: "masaje-relajante",
        name: "Masaje Relajante Completo",
        description: "Masaje de cuerpo completo para liberar tensiones y estrés",
        price: 2800,
        duration: 120,
        category: "cuerpo",
        isPopular: true,
        image: "/services/relaxing-massage.jpg",
        beforeAfter: {
          before: "/transformations/before/masaje-relajante-before.png",
          after: "/transformations/after/masaje-relajante-after.png",
          title: "Masaje Relajante Completo"
        }
      }
    ],
    professionals: [
      {
        id: "rosa-martin",
        name: "Rosa Martín",
        image: "/professionals/portraits/holistic-skin-therapist-rosa.png",
        rating: 4.3,
        reviewCount: 198,
        yearsExperience: 10,
        monthlyBookings: 86,
        specialties: ["Masajes Relajantes", "Tratamientos Faciales", "Hidratación"],
        nextAvailable: "Hoy 4:15 PM",
        bio: "Terapeuta con 10 años de experiencia en masajes relajantes y tratamientos faciales. Especialista en técnicas de hidratación y relajación profunda.",
        recommendedAddons: [
          { id: "facial-hydrating", name: "Facial Hidratante Extra", price: 400, duration: 30 },
          { id: "relaxing-oils", name: "Aceites Relajantes", price: 200, duration: 15 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "17:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      },
      {
        id: "gabriela-hernandez",
        name: "Gabriela Hernández",
        image: "/professionals/portraits/spa-therapist-gabriela.png",
        rating: 4.4,
        reviewCount: 134,
        yearsExperience: 8,
        monthlyBookings: 72,
        specialties: ["Masajes Deportivos", "Terapia Muscular", "Relajación"],
        nextAvailable: "Mañana 11:45 AM",
        bio: "Masajista especializada en terapias deportivas y musculares. Con 8 años de experiencia ayudando en la recuperación y relajación muscular.",
        recommendedAddons: [
          { id: "sports-massage", name: "Masaje Deportivo", price: 500, duration: 60 },
          { id: "muscle-recovery", name: "Recuperación Muscular", price: 600, duration: 75 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6, 0],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
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
    rating: 4.3,
    reviewCount: 203,
    serviceCount: 7,
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
    popularServices: ["Combo Corte + Color", "Tratamiento de Keratina", "Peinado para Evento"],
    badges: ["Premium Partner"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:15 PM",
      todayAvailable: true
    },
    professionalCount: 4,
    priceRange: {
      min: 800,
      max: 4500
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
        image: "/services/haircut-styling.jpg",
        beforeAfter: {
          before: "/transformations/before/corte-cabello-before.png",
          after: "/transformations/after/corte-cabello-after.png",
          title: "Corte y Peinado"
        },
        addons: [
          { id: "deep-treatment", name: "Tratamiento Profundo", price: 500, duration: 30 },
          { id: "special-styling", name: "Peinado Especial", price: 400, duration: 30 },
          { id: "premium-products", name: "Productos Premium", price: 300, duration: 10 }
        ]
      },
      {
        id: "coloracion-completa",
        name: "Coloración Completa",
        description: "Cambio de color completo con productos profesionales",
        price: 3500,
        duration: 180,
        category: "peinados",
        isPopular: true,
        image: "/services/hair-coloring.jpg",
        beforeAfter: {
          before: "/transformations/before/tinte-cabello-before.png",
          after: "/transformations/after/tinte-cabello-after.png",
          title: "Coloración Completa"
        },
        addons: [
          { id: "toning-treatment", name: "Tratamiento Tonificante", price: 600, duration: 45 },
          { id: "color-protection", name: "Protección de Color", price: 400, duration: 20 },
          { id: "glossing", name: "Brillo Profesional", price: 350, duration: 30 }
        ]
      },
      {
        id: "corte-express",
        name: "Corte Express",
        description: "Corte rápido sin lavado, perfecto para mantenimiento",
        price: 800,
        duration: 30,
        category: "peinados",
        isPopular: false,
        image: "/services/express-haircut.jpg",
        beforeAfter: {
          before: "/transformations/before/corte-rizado-before.png",
          after: "/transformations/after/corte-rizado-after.png",
          title: "Corte Express"
        },
        addons: [
          { id: "quick-wash", name: "Lavado Rápido", price: 200, duration: 15 },
          { id: "styling-cream", name: "Crema de Peinado", price: 150, duration: 5 }
        ]
      },
      {
        id: "tratamiento-keratina",
        name: "Tratamiento de Keratina",
        description: "Alisado y nutrición con keratina profesional",
        price: 4500,
        duration: 240,
        category: "peinados",
        isPopular: true,
        image: "/services/keratin-treatment.jpg",
        beforeAfter: {
          before: "/transformations/before/keratin-treatment-service-before.png",
          after: "/transformations/after/keratin-treatment-service-after.png",
          title: "Tratamiento de Keratina"
        },
        addons: [
          { id: "home-care-kit", name: "Kit de Cuidado en Casa", price: 800, duration: 15 },
          { id: "extended-styling", name: "Peinado Extra", price: 500, duration: 45 }
        ]
      },
      {
        id: "retoque-raices",
        name: "Retoque de Raíces",
        description: "Mantenimiento de color solo en raíces",
        price: 1800,
        duration: 90,
        category: "peinados",
        isPopular: true,
        image: "/services/root-touch-up.jpg",
        beforeAfter: {
          before: "/transformations/before/hair-transformation-1-before.png",
          after: "/transformations/after/hair-transformation-1-after.png",
          title: "Retoque de Raíces"
        },
        addons: [
          { id: "toner-refresh", name: "Renovar Tonalizador", price: 300, duration: 20 },
          { id: "scalp-treatment", name: "Tratamiento Cuero Cabelludo", price: 400, duration: 25 }
        ]
      },
      {
        id: "combo-corte-color",
        name: "Combo Corte + Color",
        description: "Servicio completo de corte y coloración con descuento",
        price: 4200,
        duration: 210,
        category: "peinados",
        isPopular: true,
        image: "/services/cut-color-combo.jpg",
        beforeAfter: {
          before: "/transformations/before/hair-transformation-2-before.png",
          after: "/transformations/after/hair-transformation-2-after.png",
          title: "Combo Corte + Color"
        },
        addons: [
          { id: "hair-mask", name: "Mascarilla Reparadora", price: 450, duration: 20 },
          { id: "event-styling", name: "Peinado para Evento", price: 600, duration: 45 }
        ]
      },
      {
        id: "peinado-evento",
        name: "Peinado para Evento",
        description: "Peinado elegante para bodas, graduaciones y ocasiones especiales",
        price: 2200,
        duration: 90,
        category: "peinados",
        isPopular: true,
        image: "/services/event-hairstyle.jpg",
        beforeAfter: {
          before: "/transformations/before/peinado-evento-before.png",
          after: "/transformations/after/peinado-evento-after.png",
          title: "Peinado para Evento"
        },
        addons: [
          { id: "hair-accessories", name: "Accesorios para Cabello", price: 300, duration: 15 },
          { id: "touch-up-service", name: "Servicio de Retoque", price: 400, duration: 30 },
          { id: "trial-run", name: "Prueba Previa", price: 800, duration: 60 }
        ]
      }
    ],
    professionals: [
      {
        id: "ricardo-santos",
        name: "Ricardo Santos",
        image: "/professionals/portraits/hair-stylist-ricardo.png",
        rating: 4.9,
        reviewCount: 156,
        yearsExperience: 10,
        monthlyBookings: 98,
        specialties: ["Cortes Modernos", "Barbería", "Diseño Capilar"],
        isTopRated: true,
        nextAvailable: "Hoy 3:15 PM",
        bio: "Estilista senior con más de 10 años de experiencia en cortes modernos y barbería. Especialista en diseños capilares únicos y personalizados.",
        recommendedAddons: [
          { id: "beard-styling", name: "Estilizado de Barba", price: 400, duration: 30 },
          { id: "hair-design", name: "Diseño Capilar", price: 600, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "18:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      },
      {
        id: "lucia-jimenez",
        name: "Lucía Jiménez",
        image: "/professionals/portraits/hair-colorist-lucia.png",
        rating: 4.8,
        reviewCount: 142,
        yearsExperience: 7,
        monthlyBookings: 105,
        specialties: ["Coloración", "Balayage", "Mechas"],
        isTopRated: true,
        nextAvailable: "Mañana 11:00 AM",
        bio: "Colorista experta especializada en técnicas de balayage y mechas. Certificada en las últimas tendencias de coloración capilar.",
        recommendedAddons: [
          { id: "color-protection", name: "Protección de Color", price: 500, duration: 30 },
          { id: "gloss-treatment", name: "Tratamiento de Brillo", price: 450, duration: 25 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "19:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "diego-castillo",
        name: "Diego Castillo",
        image: "/professionals/portraits/hair-designer-diego.png",
        rating: 4.7,
        reviewCount: 89,
        yearsExperience: 5,
        monthlyBookings: 87,
        specialties: ["Tratamientos Capilares", "Keratina", "Alisados"],
        nextAvailable: "Hoy 5:30 PM",
        bio: "Especialista en tratamientos capilares y alisados. Experto en técnicas de keratina y restauración capilar.",
        recommendedAddons: [
          { id: "keratin-boost", name: "Refuerzo de Keratina", price: 600, duration: 45 },
          { id: "hair-reconstruction", name: "Reconstrucción Capilar", price: 700, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 4, 5, 6],
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
        image: "/services/lash-extensions.jpg",
        beforeAfter: {
          before: "/transformations/before/extensiones-pestanas-before.png",
          after: "/transformations/after/extensiones-pestanas-after.png",
          title: "Extensiones de Pestañas"
        }
      }
    ],
    professionals: [
      {
        id: "camila-perez",
        name: "Camila Pérez",
        image: "/professionals/portraits/lash-specialist-camila.png",
        rating: 4.9,
        reviewCount: 134,
        yearsExperience: 6,
        monthlyBookings: 95,
        specialties: ["Extensiones Clásicas", "Volumen Ruso", "Pestañas Híbridas"],
        isTopRated: true,
        nextAvailable: "Hoy 4:30 PM",
        bio: "Técnica certificada en extensiones de pestañas con más de 6 años de experiencia. Especialista en técnicas clásicas y volumen ruso.",
        recommendedAddons: [
          { id: "lash-lift-tint", name: "Lifting y Tinte", price: 600, duration: 60 },
          { id: "volume-upgrade", name: "Upgrade a Volumen", price: 400, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "18:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      },
      {
        id: "liliana-sanchez",
        name: "Liliana Sánchez",
        image: "/professionals/portraits/lash-brow-liliana.png",
        rating: 4.7,
        reviewCount: 87,
        yearsExperience: 4,
        monthlyBookings: 89,
        specialties: ["Diseño de Cejas", "Tinte de Pestañas", "Lifting"],
        nextAvailable: "Mañana 10:15 AM",
        bio: "Especialista en diseño de cejas y tinte de pestañas. Experta en crear looks naturales que realzan la belleza de cada mirada.",
        recommendedAddons: [
          { id: "brow-lamination", name: "Laminado de Cejas", price: 500, duration: 45 },
          { id: "henna-brows", name: "Cejas con Henna", price: 400, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [1, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "17:00" },
          lunchBreak: { start: "12:00", end: "13:00" }
        }
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
  },
  // Additional Uñas vendors
  {
    id: "nails-express-rd",
    name: "Nails Express RD",
    slug: "nails-express-rd",
    logo: "/vendors/nails-express-logo.png",
    coverImage: "/vendors/nails-express-cover.jpg",
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
  },
  {
    id: "luxury-nails-spa",
    name: "Luxury Nails Spa",
    slug: "luxury-nails-spa",
    logo: "/vendors/luxury-nails-logo.png",
    coverImage: "/vendors/luxury-nails-cover.jpg",
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
  },
  // Additional Maquillaje vendors
  {
    id: "makeup-studio-pro",
    name: "Makeup Studio Pro",
    slug: "makeup-studio-pro",
    logo: "/vendors/makeup-studio-logo.png",
    coverImage: "/vendors/makeup-studio-cover.jpg",
    description: "Estudio de maquillaje con maquilladores profesionales para eventos corporativos y sociales.",
    rating: 4.7,
    reviewCount: 112,
    serviceCount: 10,
    location: {
      address: "Av. 27 de Febrero 890",
      district: "Ensanche Naco",
      city: "Santo Domingo",
      distance: "1.9km"
    },
    contact: {
      phone: "+1 809-555-0234",
      whatsapp: "+1 809-555-0234"
    },
    categories: ["maquillaje"],
    popularServices: ["Maquillaje Corporativo", "Maquillaje de Eventos", "Clases de Makeup"],
    badges: ["Certificado", "Corporativo"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 5:00 PM",
      todayAvailable: true
    },
    professionalCount: 3,
    priceRange: {
      min: 1200,
      max: 3000
    },
    services: [
      {
        id: "maquillaje-corporativo",
        name: "Maquillaje Corporativo",
        description: "Maquillaje profesional para reuniones, presentaciones y eventos de trabajo",
        price: 1500,
        duration: 60,
        category: "maquillaje",
        isPopular: true,
        image: "/services/corporate-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/maquillaje-ejecutivo-before.png",
          after: "/transformations/after/maquillaje-ejecutivo-after.png",
          title: "Maquillaje Corporativo"
        }
      },
      {
        id: "clase-makeup",
        name: "Clase de Maquillaje Personal",
        description: "Aprende técnicas profesionales en sesión personalizada",
        price: 3000,
        duration: 120,
        category: "maquillaje",
        isPopular: true,
        image: "/services/makeup-class.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-1-before.png",
          after: "/transformations/after/makeup-transformation-1-after.png",
          title: "Clase de Maquillaje Personal"
        }
      }
    ],
    professionals: [
      {
        id: "carmen-rodriguez",
        name: "Carmen Rodríguez",
        image: "/professionals/portraits/makeup-artist-carmen.png",
        rating: 4.8,
        reviewCount: 156,
        yearsExperience: 9,
        monthlyBookings: 67,
        specialties: ["Maquillaje Ejecutivo", "Eventos Corporativos", "Media Training"],
        isTopRated: true,
        nextAvailable: "Hoy 9:00 AM",
        bio: "Maquilladora corporativa con más de 9 años especializándose en ejecutivos y eventos empresariales. Experta en looks profesionales para medios.",
        recommendedAddons: [
          { id: "executive-look", name: "Look Ejecutivo Premium", price: 500, duration: 45 },
          { id: "media-ready", name: "Preparación para Medios", price: 600, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "07:00", end: "17:00" },
          lunchBreak: { start: "12:00", end: "13:00" }
        }
      },
      {
        id: "andres-mejia",
        name: "Andrés Mejía",
        image: "/professionals/portraits/corporate-makeup-male.png",
        rating: 4.7,
        reviewCount: 92,
        yearsExperience: 6,
        monthlyBookings: 54,
        specialties: ["Maquillaje para Hombres", "TV y Video", "Eventos Especiales"],
        nextAvailable: "Mañana 8:30 AM",
        bio: "Especialista en maquillaje masculino y para medios audiovisuales. Experto en crear looks naturales para ejecutivos y personalidades públicas.",
        recommendedAddons: [
          { id: "male-grooming", name: "Arreglo Masculino", price: 400, duration: 30 },
          { id: "tv-makeup", name: "Maquillaje para TV", price: 700, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "16:00" },
          lunchBreak: { start: "11:30", end: "12:30" }
        }
      }
    ],
    businessHours: {
      monday: { open: "9:00", close: "18:00" },
      tuesday: { open: "9:00", close: "18:00" },
      wednesday: { open: "9:00", close: "18:00" },
      thursday: { open: "9:00", close: "18:00" },
      friday: { open: "9:00", close: "19:00" },
      saturday: { open: "8:00", close: "16:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  {
    id: "belleza-natural-makeup",
    name: "Belleza Natural Makeup",
    slug: "belleza-natural-makeup",
    logo: "/vendors/belleza-natural-logo.png",
    coverImage: "/vendors/belleza-natural-cover.jpg",
    description: "Especialistas en maquillaje natural y orgánico. Productos libres de químicos agresivos.",
    rating: 4.8,
    reviewCount: 65,
    serviceCount: 6,
    location: {
      address: "Calle Mercedes 234",
      district: "Zona Universitaria",
      city: "Santo Domingo",
      distance: "3.1km"
    },
    contact: {
      phone: "+1 809-555-0678",
      email: "info@bellezanaturalmakeup.com"
    },
    categories: ["maquillaje"],
    popularServices: ["Maquillaje Natural", "Maquillaje Orgánico", "Maquillaje para Fotografía"],
    badges: ["Orgánico", "Eco-Friendly"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:30 PM",
      todayAvailable: true
    },
    professionalCount: 2,
    priceRange: {
      min: 1800,
      max: 3500
    },
    services: [
      {
        id: "maquillaje-natural",
        name: "Maquillaje Natural",
        description: "Look natural y fresco usando productos orgánicos certificados",
        price: 1800,
        duration: 75,
        category: "maquillaje",
        isPopular: true,
        image: "/services/natural-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-2-before.png",
          after: "/transformations/after/makeup-transformation-2-after.png",
          title: "Maquillaje Natural"
        }
      },
      {
        id: "maquillaje-fotografia",
        name: "Maquillaje para Fotografía",
        description: "Maquillaje especializado para sesiones fotográficas profesionales",
        price: 2800,
        duration: 90,
        category: "maquillaje",
        isPopular: true,
        image: "/services/photography-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-3-before.png",
          after: "/transformations/after/makeup-transformation-3-after.png",
          title: "Maquillaje para Fotografía"
        }
      }
    ],
    professionals: [
      {
        id: "ana-verde",
        name: "Ana Verde",
        image: "/professionals/portraits/aesthetician-ana.png",
        rating: 4.8,
        reviewCount: 98,
        yearsExperience: 6,
        monthlyBookings: 54,
        specialties: ["Maquillaje Orgánico", "Looks Naturales", "Productos Eco-Friendly"],
        isTopRated: true,
        nextAvailable: "Mañana 12:00 PM",
        bio: "Maquilladora especializada en productos orgánicos y naturales. Certificada en cosmética eco-friendly y técnicas de maquillaje que respetan la piel sensible.",
        recommendedAddons: [
          { id: "organic-base", name: "Base Orgánica Premium", price: 400, duration: 30 },
          { id: "natural-glow", name: "Brillo Natural", price: 300, duration: 20 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 4, 5, 6],
          workingHours: { start: "10:00", end: "17:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "10:00", close: "17:00" },
      tuesday: { open: "10:00", close: "17:00" },
      wednesday: { open: "10:00", close: "17:00" },
      thursday: { open: "10:00", close: "17:00" },
      friday: { open: "10:00", close: "18:00" },
      saturday: { open: "9:00", close: "15:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  // Additional Spa/Cuerpo vendors
  {
    id: "zen-wellness-center",
    name: "Zen Wellness Center",
    slug: "zen-wellness-center",
    logo: "/vendors/zen-wellness-logo.png",
    coverImage: "/vendors/zen-wellness-cover.jpg",
    description: "Centro holístico de bienestar con tratamientos de relajación y terapias alternativas.",
    rating: 4.6,
    reviewCount: 134,
    serviceCount: 20,
    location: {
      address: "Plaza Universitaria 123",
      district: "Gazcue",
      city: "Santo Domingo",
      distance: "2.5km"
    },
    contact: {
      phone: "+1 809-555-0345",
      email: "reservas@zenwellness.do",
      whatsapp: "+1 809-555-0345"
    },
    categories: ["spa", "cuerpo"],
    popularServices: ["Masaje Terapéutico", "Aromaterapia", "Reflexología"],
    badges: ["Holístico", "Terapias Alternativas"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 3:15 PM",
      todayAvailable: true
    },
    professionalCount: 6,
    priceRange: {
      min: 1500,
      max: 4500
    },
    services: [
      {
        id: "masaje-terapeutico",
        name: "Masaje Terapéutico",
        description: "Masaje especializado para aliviar tensiones musculares y estrés",
        price: 2200,
        duration: 90,
        category: "cuerpo",
        isPopular: true,
        image: "/services/therapeutic-massage.jpg",
        beforeAfter: {
          before: "/transformations/before/masaje-relajante-before.png",
          after: "/transformations/after/masaje-relajante-after.png",
          title: "Masaje Terapéutico"
        }
      },
      {
        id: "aromaterapia",
        name: "Sesión de Aromaterapia",
        description: "Tratamiento relajante con aceites esenciales y técnicas de respiración",
        price: 1800,
        duration: 60,
        category: "spa",
        isPopular: true,
        image: "/services/aromatherapy.jpg",
        beforeAfter: {
          before: "/transformations/before/spa-transformation-1-before.png",
          after: "/transformations/after/spa-transformation-1-after.png",
          title: "Sesión de Aromaterapia"
        }
      }
    ],
    professionals: [
      {
        id: "isabella-luna",
        name: "Isabella Luna",
        image: "/professionals/portraits/wellness-therapist-isabella.png",
        rating: 4.9,
        reviewCount: 167,
        yearsExperience: 11,
        monthlyBookings: 78,
        specialties: ["Aromaterapia", "Reiki", "Masajes Holísticos"],
        isTopRated: true,
        nextAvailable: "Mañana 9:30 AM",
        bio: "Terapeuta holística certificada con más de 11 años de experiencia en aromaterapia y reiki. Especialista en sanación integral mente-cuerpo.",
        recommendedAddons: [
          { id: "reiki-session", name: "Sesión de Reiki", price: 800, duration: 60 },
          { id: "chakra-balancing", name: "Equilibrio de Chakras", price: 600, duration: 75 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "08:00", end: "16:00" },
          lunchBreak: { start: "12:00", end: "13:00" }
        }
      },
      {
        id: "raquel-valdez",
        name: "Raquel Valdez",
        image: "/professionals/portraits/massage-therapist-raquel.png",
        rating: 4.8,
        reviewCount: 134,
        yearsExperience: 15,
        monthlyBookings: 65,
        specialties: ["Masaje Terapéutico", "Reflexología", "Acupresión"],
        isTopRated: true,
        nextAvailable: "Hoy 2:45 PM",
        bio: "Masajista terapéutica con 15 años de experiencia en técnicas orientales. Especialista en reflexología y tratamientos de acupresión.",
        recommendedAddons: [
          { id: "reflexology-session", name: "Sesión de Reflexología", price: 600, duration: 60 },
          { id: "acupressure", name: "Acupresión Terapéutica", price: 700, duration: 75 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "18:00" },
          lunchBreak: { start: "13:30", end: "14:30" }
        }
      }
    ],
    businessHours: {
      monday: { open: "8:00", close: "19:00" },
      tuesday: { open: "8:00", close: "19:00" },
      wednesday: { open: "8:00", close: "19:00" },
      thursday: { open: "8:00", close: "19:00" },
      friday: { open: "8:00", close: "20:00" },
      saturday: { open: "8:00", close: "18:00" },
      sunday: { open: "9:00", close: "17:00" }
    }
  },
  {
    id: "royal-spa-dominicano",
    name: "Royal Spa Dominicano",
    slug: "royal-spa-dominicano",
    logo: "/vendors/royal-spa-logo.png",
    coverImage: "/vendors/royal-spa-cover.jpg",
    description: "Centro de belleza de lujo con servicios completos: spa, maquillaje profesional y manicure premium. Experiencia VIP garantizada.",
    rating: 4.9,
    reviewCount: 87,
    serviceCount: 6,
    location: {
      address: "Torre Empresarial, Piso 15",
      district: "Piantini",
      city: "Santo Domingo",
      distance: "1.7km"
    },
    contact: {
      phone: "+1 809-555-0789",
      email: "vip@royalspadr.com"
    },
    categories: ["spa", "cuerpo", "maquillaje", "unas"],
    popularServices: ["Tratamiento VIP", "Maquillaje de Lujo", "Manicure Premium"],
    badges: ["VIP", "Luxury", "Premium Partner"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 11:00 AM",
      todayAvailable: false
    },
    professionalCount: 8,
    priceRange: {
      min: 3200,
      max: 12000
    },
    services: [
      {
        id: "tratamiento-vip",
        name: "Tratamiento VIP Completo",
        description: "Experiencia de spa de lujo con masaje, facial y tratamiento corporal",
        price: 6500,
        duration: 180,
        category: "spa",
        isPopular: true,
        image: "/services/vip-treatment.jpg",
        beforeAfter: {
          before: "/transformations/before/spa-transformation-1-before.png",
          after: "/transformations/after/spa-transformation-1-after.png",
          title: "Tratamiento VIP Completo"
        },
        addons: [
          { id: "champagne-service", name: "Servicio con Champagne", price: 1200, duration: 30 },
          { id: "luxury-products", name: "Productos de Lujo para Llevar", price: 2000, duration: 15 }
        ]
      },
      {
        id: "masaje-piedras-calientes",
        name: "Masaje con Piedras Calientes",
        description: "Relajación profunda con terapia de piedras volcánicas",
        price: 3800,
        duration: 120,
        category: "cuerpo",
        isPopular: true,
        image: "/services/hot-stone-massage.jpg",
        beforeAfter: {
          before: "/transformations/before/masaje-relajante-before.png",
          after: "/transformations/after/masaje-relajante-after.png",
          title: "Masaje con Piedras Calientes"
        },
        addons: [
          { id: "aromatherapy-upgrade", name: "Upgrade Aromaterapia", price: 500, duration: 20 },
          { id: "extended-massage", name: "Masaje Extendido", price: 800, duration: 30 }
        ]
      },
      {
        id: "maquillaje-lujo",
        name: "Maquillaje de Lujo",
        description: "Maquillaje profesional con productos de alta gama y técnicas exclusivas",
        price: 4500,
        duration: 90,
        category: "maquillaje",
        isPopular: true,
        image: "/services/luxury-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/maquillaje-gala-before.png",
          after: "/transformations/after/maquillaje-gala-after.png",
          title: "Maquillaje de Lujo"
        },
        addons: [
          { id: "diamond-lashes", name: "Pestañas con Diamantes", price: 1500, duration: 45 },
          { id: "gold-highlight", name: "Destacado con Oro", price: 800, duration: 20 },
          { id: "makeup-artist-touch", name: "Retoque del Artista", price: 600, duration: 30 }
        ]
      },
      {
        id: "manicure-premium",
        name: "Manicure Premium",
        description: "Manicure de lujo con productos exclusivos y técnicas VIP",
        price: 3200,
        duration: 90,
        category: "unas",
        isPopular: true,
        image: "/services/premium-manicure.jpg",
        beforeAfter: {
          before: "/transformations/before/manicure-gel-before.png",
          after: "/transformations/after/manicure-gel-after.png",
          title: "Manicure Premium"
        },
        addons: [
          { id: "swarovski-crystals", name: "Cristales Swarovski", price: 1000, duration: 30 },
          { id: "gold-leaf-art", name: "Arte con Hoja de Oro", price: 800, duration: 25 },
          { id: "hand-spa-treatment", name: "Tratamiento Spa de Manos", price: 600, duration: 20 }
        ]
      },
      {
        id: "facial-oro",
        name: "Facial de Oro 24K",
        description: "Tratamiento facial exclusivo con oro de 24 quilates para rejuvenecer la piel",
        price: 5500,
        duration: 120,
        category: "spa",
        isPopular: true,
        image: "/services/gold-facial.jpg",
        beforeAfter: {
          before: "/transformations/before/facial-oro-before.png",
          after: "/transformations/after/facial-oro-after.png",
          title: "Facial de Oro 24K"
        },
        addons: [
          { id: "gold-eye-treatment", name: "Tratamiento de Ojos con Oro", price: 1200, duration: 30 },
          { id: "collagen-mask", name: "Mascarilla de Colágeno", price: 800, duration: 20 }
        ]
      },
      {
        id: "paquete-belleza-total",
        name: "Paquete Belleza Total VIP",
        description: "Experiencia completa: spa, maquillaje y manicure en sesión de día completo",
        price: 12000,
        duration: 360,
        category: "spa",
        isPopular: true,
        image: "/services/total-beauty-package.jpg",
        beforeAfter: {
          before: "/transformations/before/spa-transformation-1-before.png",
          after: "/transformations/after/spa-transformation-1-after.png",
          title: "Paquete Belleza Total VIP"
        },
        addons: [
          { id: "personal-butler", name: "Servicio de Mayordomo Personal", price: 2500, duration: 360 },
          { id: "luxury-lunch", name: "Almuerzo de Lujo", price: 1800, duration: 60 },
          { id: "photographer", name: "Sesión con Fotógrafo", price: 3000, duration: 90 }
        ]
      }
    ],
    professionals: [
      {
        id: "eduardo-martinez",
        name: "Eduardo Martínez",
        image: "/professionals/portraits/male-massage-therapist.png",
        rating: 4.9,
        reviewCount: 143,
        yearsExperience: 12,
        monthlyBookings: 67,
        specialties: ["Masaje Terapéutico", "Aromaterapia", "Tratamientos VIP"],
        isTopRated: true,
        nextAvailable: "Mañana 11:30 AM",
        bio: "Terapeuta senior con más de 12 años de experiencia en masajes terapéuticos y aromaterapia. Especialista en tratamientos VIP y técnicas de relajación profunda.",
        recommendedAddons: [
          { id: "deep-tissue-massage", name: "Masaje de Tejido Profundo", price: 800, duration: 60 },
          { id: "aromatherapy-premium", name: "Aromaterapia Premium", price: 600, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5],
          workingHours: { start: "09:00", end: "17:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "minerva-batista",
        name: "Minerva Batista",
        image: "/professionals/portraits/anti-aging-specialist-minerva.png",
        rating: 4.8,
        reviewCount: 98,
        yearsExperience: 9,
        monthlyBookings: 73,
        specialties: ["Tratamientos Faciales", "Anti-edad", "Limpieza Profunda"],
        isTopRated: true,
        nextAvailable: "Hoy 3:45 PM",
        bio: "Esteticista especializada en tratamientos faciales anti-edad y limpiezas profundas. Certificada en las últimas tecnologías de rejuvenecimiento facial.",
        recommendedAddons: [
          { id: "anti-aging-facial", name: "Facial Anti-edad", price: 1000, duration: 90 },
          { id: "collagen-treatment", name: "Tratamiento de Colágeno", price: 800, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "18:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      },
      {
        id: "valentina-cruz",
        name: "Valentina Cruz",
        image: "/professionals/portraits/skin-specialist-valentina.png",
        rating: 4.9,
        reviewCount: 112,
        yearsExperience: 7,
        monthlyBookings: 56,
        specialties: ["Tratamientos Corporales", "Exfoliaciones", "Envolturas"],
        isTopRated: true,
        nextAvailable: "Mañana 2:00 PM",
        bio: "Especialista en tratamientos corporales de lujo. Experta en exfoliaciones y envolturas corporales con productos premium internacionales.",
        recommendedAddons: [
          { id: "body-wrap-gold", name: "Envoltura Corporal de Oro", price: 1500, duration: 120 },
          { id: "exfoliation-premium", name: "Exfoliación Premium", price: 600, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 4, 5, 6],
          workingHours: { start: "11:00", end: "19:00" },
          lunchBreak: { start: "15:00", end: "16:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "9:00", close: "20:00" },
      tuesday: { open: "9:00", close: "20:00" },
      wednesday: { open: "9:00", close: "20:00" },
      thursday: { open: "9:00", close: "20:00" },
      friday: { open: "9:00", close: "21:00" },
      saturday: { open: "8:00", close: "21:00" },
      sunday: { open: "10:00", close: "18:00" }
    }
  },
  // Additional Peinados vendors
  {
    id: "trendy-hair-studio",
    name: "Trendy Hair Studio",
    slug: "trendy-hair-studio",
    logo: "/vendors/trendy-hair-logo.png",
    coverImage: "/vendors/trendy-hair-cover.jpg",
    description: "Salón moderno especializado en cortes actuales y coloración de tendencia para todas las edades.",
    rating: 4.0,
    reviewCount: 156,
    serviceCount: 12,
    location: {
      address: "Av. Abraham Lincoln 567",
      district: "Piantini",
      city: "Santo Domingo",
      distance: "1.3km"
    },
    contact: {
      phone: "+1 809-555-0123",
      whatsapp: "+1 809-555-0123"
    },
    categories: ["peinados"],
    popularServices: ["Corte Moderno", "Balayage", "Alisado Brasileño"],
    badges: ["Trendy", "Coloración"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 4:15 PM",
      todayAvailable: true
    },
    professionalCount: 5,
    priceRange: {
      min: 800,
      max: 4500
    },
    services: [
      {
        id: "corte-moderno",
        name: "Corte Moderno",
        description: "Cortes actuales y personalizados según tu estilo de vida",
        price: 1200,
        duration: 45,
        category: "peinados",
        isPopular: true,
        image: "/services/modern-haircut.jpg",
        beforeAfter: {
          before: "/transformations/before/corte-cabello-before.png",
          after: "/transformations/after/corte-cabello-after.png",
          title: "Corte Moderno"
        }
      },
      {
        id: "balayage-premium",
        name: "Balayage Premium",
        description: "Técnica de coloración gradual para un look natural y moderno",
        price: 4200,
        duration: 180,
        category: "peinados",
        isPopular: true,
        image: "/services/balayage.jpg",
        beforeAfter: {
          before: "/transformations/before/balayage-before.png",
          after: "/transformations/after/balayage-after.png",
          title: "Balayage Premium"
        }
      }
    ],
    professionals: [
      {
        id: "carla-rosario",
        name: "Carla Rosario",
        image: "/professionals/portraits/hair-stylist-carla.png",
        rating: 4.6,
        reviewCount: 89,
        yearsExperience: 4,
        monthlyBookings: 112,
        specialties: ["Colores Fantasía", "Cortes Modernos", "Hair Styling"],
        nextAvailable: "Hoy 11:30 AM",
        bio: "Estilista joven especializada en colores fantasía y cortes modernos. Experta en las últimas tendencias y técnicas de coloración creativa.",
        recommendedAddons: [
          { id: "fantasy-color", name: "Color Fantasía", price: 800, duration: 120 },
          { id: "creative-cut", name: "Corte Creativo", price: 400, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "19:00" },
          lunchBreak: { start: "14:00", end: "15:00" }
        }
      },
      {
        id: "jean-carlos-diaz",
        name: "Jean Carlos Díaz",
        image: "/professionals/portraits/male-barber-2.png",
        rating: 4.7,
        reviewCount: 76,
        yearsExperience: 5,
        monthlyBookings: 94,
        specialties: ["Barbería Moderna", "Fade Cuts", "Diseños Capilares"],
        nextAvailable: "Mañana 1:15 PM",
        bio: "Barbero especializado en cortes modernos y técnicas de fade. Experto en diseños capilares únicos y tendencias urbanas.",
        recommendedAddons: [
          { id: "modern-fade", name: "Fade Moderno", price: 300, duration: 45 },
          { id: "hair-tattoo", name: "Tatuaje Capilar", price: 500, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
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
  },
  {
    id: "cabello-y-estilo",
    name: "Cabello y Estilo",
    slug: "cabello-y-estilo",
    logo: "/vendors/cabello-estilo-logo.png",
    coverImage: "/vendors/cabello-estilo-cover.jpg",
    description: "Salón familiar con más de 15 años de experiencia. Especialistas en tratamientos capilares.",
    rating: 3.9,
    reviewCount: 189,
    serviceCount: 18,
    location: {
      address: "Calle Paseo de los Locutores 89",
      district: "Mirador Sur",
      city: "Santo Domingo",
      distance: "3.8km"
    },
    contact: {
      phone: "+1 809-555-0456",
      email: "info@cabelloestilo.com"
    },
    categories: ["peinados"],
    popularServices: ["Tratamiento Capilar", "Peinado para Eventos", "Corte Familiar"],
    badges: ["Familiar", "Tratamientos"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 1:30 PM",
      todayAvailable: true
    },
    professionalCount: 6,
    priceRange: {
      min: 600,
      max: 2800
    },
    services: [
      {
        id: "tratamiento-capilar-intensivo",
        name: "Tratamiento Capilar Intensivo",
        description: "Reparación profunda para cabello dañado con productos profesionales",
        price: 1800,
        duration: 90,
        category: "peinados",
        isPopular: true,
        image: "/services/hair-treatment.jpg",
        beforeAfter: {
          before: "/transformations/before/hair-transformation-1-before.png",
          after: "/transformations/after/hair-transformation-1-after.png",
          title: "Tratamiento Capilar Intensivo"
        }
      },
      {
        id: "peinado-eventos",
        name: "Peinado para Eventos",
        description: "Peinados elegantes para bodas, graduaciones y ocasiones especiales",
        price: 2200,
        duration: 75,
        category: "peinados",
        isPopular: true,
        image: "/services/event-hairstyle.jpg",
        beforeAfter: {
          before: "/transformations/before/peinado-evento-before.png",
          after: "/transformations/after/peinado-evento-after.png",
          title: "Peinado para Eventos"
        }
      }
    ],
    professionals: [
      {
        id: "mercedes-garcia",
        name: "Mercedes García",
        image: "/professionals/portraits/senior-hair-stylist.png",
        rating: 4.1,
        reviewCount: 234,
        yearsExperience: 18,
        monthlyBookings: 89,
        specialties: ["Cortes Familiares", "Peinados Clásicos", "Canas y Madurez"],
        nextAvailable: "Mañana 9:00 AM",
        bio: "Estilista senior con 18 años de experiencia atendiendo familias completas. Especialista en cortes para todas las edades y tratamientos para canas.",
        recommendedAddons: [
          { id: "family-package", name: "Paquete Familiar", price: 800, duration: 120 },
          { id: "gray-coverage", name: "Cobertura de Canas", price: 400, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "08:00", end: "17:00" },
          lunchBreak: { start: "12:00", end: "13:00" }
        }
      },
      {
        id: "gabriel-flores",
        name: "Gabriel Flores",
        image: "/professionals/portraits/male-barber-1.png",
        rating: 4.0,
        reviewCount: 189,
        yearsExperience: 14,
        monthlyBookings: 76,
        specialties: ["Barbería Clásica", "Cortes de Niños", "Afeitado Tradicional"],
        nextAvailable: "Hoy 2:30 PM",
        bio: "Barbero tradicional con 14 años de experiencia. Especialista en barbería clásica, cortes infantiles y técnicas de afeitado tradicional con navaja.",
        recommendedAddons: [
          { id: "traditional-shave", name: "Afeitado Tradicional", price: 300, duration: 30 },
          { id: "kids-cut", name: "Corte Infantil Especial", price: 200, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6, 0],
          workingHours: { start: "08:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "8:00", close: "18:00" },
      tuesday: { open: "8:00", close: "18:00" },
      wednesday: { open: "8:00", close: "18:00" },
      thursday: { open: "8:00", close: "18:00" },
      friday: { open: "8:00", close: "19:00" },
      saturday: { open: "7:00", close: "17:00" },
      sunday: { open: "9:00", close: "15:00" }
    }
  },
  // Additional Pestañas vendors
  {
    id: "lashes-and-brows-rd",
    name: "Lashes & Brows RD",
    slug: "lashes-and-brows-rd",
    logo: "/vendors/lashes-brows-logo.png",
    coverImage: "/vendors/lashes-brows-cover.jpg",
    description: "Especialistas exclusivos en pestañas y cejas. Técnicas certificadas internacionalmente.",
    rating: 4.7,
    reviewCount: 94,
    serviceCount: 8,
    location: {
      address: "Centro Comercial Acropolis, Local 23",
      district: "Bella Vista",
      city: "Santo Domingo",
      distance: "2.1km"
    },
    contact: {
      phone: "+1 809-555-0567",
      whatsapp: "+1 809-555-0567"
    },
    categories: ["pestañas"],
    popularServices: ["Extensiones Volumen", "Microblading", "Lifting Cejas"],
    badges: ["Certificado Internacional", "Especialistas"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:45 PM",
      todayAvailable: true
    },
    professionalCount: 3,
    priceRange: {
      min: 1200,
      max: 3500
    },
    services: [
      {
        id: "extensiones-volumen-ruso",
        name: "Extensiones Volumen Ruso",
        description: "Técnica avanzada para máximo volumen y densidad natural",
        price: 2800,
        duration: 150,
        category: "pestañas",
        isPopular: true,
        image: "/services/russian-volume.jpg",
        beforeAfter: {
          before: "/transformations/before/lash-transformation-1-before.png",
          after: "/transformations/after/lash-transformation-1-after.png",
          title: "Extensiones Volumen Ruso"
        }
      },
      {
        id: "microblading-cejas",
        name: "Microblading de Cejas",
        description: "Diseño y pigmentación de cejas con técnica de microblading",
        price: 3200,
        duration: 120,
        category: "pestañas",
        isPopular: true,
        image: "/services/microblading.jpg",
        beforeAfter: {
          before: "/transformations/before/microblading-before.png",
          after: "/transformations/after/microblading-after.png",
          title: "Microblading de Cejas"
        }
      }
    ],
    professionals: [
      {
        id: "andrea-moreno",
        name: "Andrea Moreno",
        image: "/professionals/portraits/microblade-artist-andrea.png",
        rating: 4.8,
        reviewCount: 145,
        yearsExperience: 7,
        monthlyBookings: 98,
        specialties: ["Microblading", "Diseño de Cejas", "Powder Brows"],
        isTopRated: true,
        nextAvailable: "Mañana 10:45 AM",
        bio: "Especialista certificada en microblading y diseño de cejas con más de 7 años de experiencia. Experta en técnicas de powder brows y hiperrealismo.",
        recommendedAddons: [
          { id: "microblading-touch", name: "Retoque de Microblading", price: 600, duration: 90 },
          { id: "powder-brows", name: "Powder Brows", price: 800, duration: 120 }
        ],
        personalSchedule: {
          workingDays: [2, 3, 4, 5, 6],
          workingHours: { start: "10:00", end: "18:00" },
          lunchBreak: { start: "13:00", end: "14:00" }
        }
      },
      {
        id: "stephanie-arias",
        name: "Stephanie Arias",
        image: "/professionals/portraits/lash-specialist-camila.png",
        rating: 4.7,
        reviewCount: 103,
        yearsExperience: 5,
        monthlyBookings: 87,
        specialties: ["Extensiones Mega Volume", "Lash Lift", "Tinte Natural"],
        nextAvailable: "Hoy 3:30 PM",
        bio: "Técnica especializada en extensiones mega volume y lash lift. Certificada en técnicas avanzadas de extensiones y tratamientos naturales.",
        recommendedAddons: [
          { id: "mega-volume", name: "Mega Volume", price: 700, duration: 150 },
          { id: "lash-lift-premium", name: "Lash Lift Premium", price: 500, duration: 60 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 4, 5, 6],
          workingHours: { start: "11:00", end: "19:00" },
          lunchBreak: { start: "15:00", end: "16:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "10:00", close: "18:00" },
      tuesday: { open: "10:00", close: "18:00" },
      wednesday: { open: "10:00", close: "18:00" },
      thursday: { open: "10:00", close: "18:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "9:00", close: "17:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  {
    id: "bella-mirada-studio",
    name: "Bella Mirada Studio",
    slug: "bella-mirada-studio",
    logo: "/vendors/bella-mirada-logo.png",
    coverImage: "/vendors/bella-mirada-cover.jpg",
    description: "Estudio boutique especializado en realzar la belleza natural de tu mirada.",
    rating: 4.8,
    reviewCount: 52,
    serviceCount: 6,
    location: {
      address: "Calle José Reyes 345",
      district: "Zona Universitaria",
      city: "Santo Domingo",
      distance: "3.4km"
    },
    contact: {
      phone: "+1 809-555-0890",
      whatsapp: "+1 809-555-0890"
    },
    categories: ["pestañas"],
    popularServices: ["Extensiones Clásicas", "Tinte de Pestañas", "Depilación Cejas"],
    badges: ["Boutique", "Personalizado"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 9:30 AM",
      todayAvailable: false
    },
    professionalCount: 2,
    priceRange: {
      min: 900,
      max: 2500
    },
    services: [
      {
        id: "extensiones-clasicas",
        name: "Extensiones Clásicas",
        description: "Aplicación 1:1 para un look natural y elegante",
        price: 1800,
        duration: 120,
        category: "pestañas",
        isPopular: true,
        image: "/services/classic-lashes.jpg",
        beforeAfter: {
          before: "/transformations/before/extensiones-pestanas-before.png",
          after: "/transformations/after/extensiones-pestanas-after.png",
          title: "Extensiones Clásicas"
        }
      },
      {
        id: "tinte-pestanas-cejas",
        name: "Tinte de Pestañas y Cejas",
        description: "Pigmentación natural para realzar la mirada sin maquillaje",
        price: 1200,
        duration: 45,
        category: "pestañas",
        isPopular: true,
        image: "/services/lash-tint.jpg",
        beforeAfter: {
          before: "/transformations/before/diseno-cejas-before.png",
          after: "/transformations/after/diseno-cejas-after.png",
          title: "Tinte de Pestañas y Cejas"
        }
      }
    ],
    professionals: [
      {
        id: "yolanda-silva",
        name: "Yolanda Silva",
        image: "/professionals/portraits/facial-specialist-yolanda.png",
        rating: 4.8,
        reviewCount: 67,
        yearsExperience: 5,
        monthlyBookings: 43,
        specialties: ["Extensiones Boutique", "Looks Personalizados", "Cuidado Premium"],
        isTopRated: true,
        nextAvailable: "Mañana 11:30 AM",
        bio: "Técnica boutique especializada en extensiones personalizadas y cuidado premium de pestañas. Experta en crear looks únicos adaptados a cada forma de ojo.",
        recommendedAddons: [
          { id: "custom-lashes", name: "Pestañas Personalizadas", price: 600, duration: 90 },
          { id: "premium-care", name: "Cuidado Premium", price: 400, duration: 30 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 4, 5, 6],
          workingHours: { start: "11:00", end: "19:00" },
          lunchBreak: { start: "15:00", end: "16:00" }
        }
      }
    ],
    businessHours: {
      monday: { open: "9:00", close: "17:00" },
      tuesday: { open: "9:00", close: "17:00" },
      wednesday: { open: "9:00", close: "17:00" },
      thursday: { open: "9:00", close: "17:00" },
      friday: { open: "9:00", close: "18:00" },
      saturday: { open: "8:00", close: "16:00" },
      sunday: { isClosed: true, open: "", close: "" }
    }
  },
  // Test vendor for Vendor app integration
  {
    id: "belleza-dominicana-salon",
    name: "Belleza Dominicana Salon",
    slug: "belleza-dominicana-salon",
    logo: "/vendors/belleza-dominicana-logo.png",
    coverImage: "/vendors/belleza-dominicana-cover.jpg",
    description: "Salón auténticamente dominicano que celebra la belleza caribeña con técnicas tradicionales y modernas. Especialistas en looks que resaltan el orgullo dominicano.",
    rating: 4.9,
    reviewCount: 147,
    serviceCount: 4,
    location: {
      address: "Calle Duarte 456",
      district: "Gazcue",
      city: "Santo Domingo",
      distance: "2.2km"
    },
    contact: {
      phone: "+1 809-555-0199",
      email: "owner@bellezadominicana.com",
      whatsapp: "+1 809-555-0199"
    },
    categories: ["unas", "peinados", "maquillaje"],
    popularServices: ["Manicure Dominicana Especial", "Peinado Merengue Style", "Pedicure Playa Dorada"],
    badges: ["Auténtico Dominicano", "Premium Partner", "Top Rated"],
    availability: {
      isOpen: true,
      nextSlot: "Hoy 2:00 PM",
      todayAvailable: true
    },
    professionalCount: 4,
    priceRange: {
      min: 950,
      max: 2200
    },
    services: [
      {
        id: "manicure-dominicana-especial",
        name: "Manicure Dominicana Especial",
        description: "Manicure tradicional dominicano con técnicas ancestrales y productos locales",
        price: 950,
        duration: 75,
        category: "unas",
        isPopular: true,
        image: "/services/dominican-manicure.jpg",
        beforeAfter: {
          before: "/transformations/before/dominican-blowout-before.png",
          after: "/transformations/after/dominican-blowout-after.png",
          title: "Manicure Dominicana Especial"
        },
        addons: [
          { id: "tropical-nail-art", name: "Arte Tropical", price: 350, duration: 20 },
          { id: "coconut-treatment", name: "Tratamiento de Coco", price: 250, duration: 15 }
        ]
      },
      {
        id: "peinado-merengue-style",
        name: "Peinado Merengue Style",
        description: "Peinado inspirado en la cultura dominicana, perfecto para eventos y celebraciones",
        price: 1800,
        duration: 90,
        category: "peinados",
        isPopular: true,
        image: "/services/merengue-hairstyle.jpg",
        beforeAfter: {
          before: "/transformations/before/dominican-blowout-before.png",
          after: "/transformations/after/dominican-blowout-after.png",
          title: "Peinado Merengue Style"
        }
      },
      {
        id: "maquillaje-caribeno",
        name: "Maquillaje Caribeño",
        description: "Look radiante con colores tropicales que resaltan la belleza natural caribeña",
        price: 2200,
        duration: 60,
        category: "maquillaje",
        isPopular: false,
        image: "/services/caribbean-makeup.jpg",
        beforeAfter: {
          before: "/transformations/before/makeup-transformation-1-before.png",
          after: "/transformations/after/makeup-transformation-1-after.png",
          title: "Maquillaje Caribeño"
        }
      },
      {
        id: "pedicure-playa-dorada",
        name: "Pedicure Playa Dorada",
        description: "Pedicure relajante con exfoliación de arena de playa y aceites tropicales",
        price: 1650,
        duration: 105,
        category: "unas",
        isPopular: true,
        image: "/services/golden-beach-pedicure.jpg",
        beforeAfter: {
          before: "/transformations/before/pedicure-spa-before.png",
          after: "/transformations/after/pedicure-spa-after.png",
          title: "Pedicure Playa Dorada"
        }
      }
    ],
    professionals: [
      {
        id: "marisol-pena",
        name: "Marisol Peña",
        image: "/professionals/portraits/pedicure-specialist-marisol.png",
        rating: 4.9,
        reviewCount: 178,
        yearsExperience: 12,
        monthlyBookings: 87,
        specialties: ["Blow-out Dominicano", "Tratamientos Tropicales", "Peinados Tradicionales"],
        isTopRated: true,
        nextAvailable: "Hoy 10:30 AM",
        bio: "Estilista auténticamente dominicana con 12 años especializándose en blow-outs y tratamientos con productos tropicales locales. Guardiana de las tradiciones capilares dominicanas.",
        recommendedAddons: [
          { id: "dominican-blowout", name: "Blow-out Dominicano Tradicional", price: 600, duration: 90 },
          { id: "coconut-treatment", name: "Tratamiento de Coco", price: 400, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6],
          workingHours: { start: "09:00", end: "18:00" },
          lunchBreak: { start: "12:30", end: "13:30" }
        }
      },
      {
        id: "esperanza-jimenez",
        name: "Esperanza Jiménez",
        image: "/professionals/portraits/hair-stylist-esperanza.png",
        rating: 4.8,
        reviewCount: 143,
        yearsExperience: 15,
        monthlyBookings: 69,
        specialties: ["Trenzas Dominicanas", "Peinados Tradicionales", "Tratamientos Naturales"],
        isTopRated: true,
        nextAvailable: "Mañana 8:00 AM",
        bio: "Estilista tradicional dominicana con 15 años de experiencia preservando las técnicas clásicas de peinados caribeños. Especialista en trenzas y tratamientos naturales.",
        recommendedAddons: [
          { id: "dominican-braids", name: "Trenzas Dominicanas", price: 350, duration: 120 },
          { id: "natural-treatment", name: "Tratamiento Natural", price: 200, duration: 45 }
        ],
        personalSchedule: {
          workingDays: [1, 2, 3, 4, 5, 6, 0],
          workingHours: { start: "08:00", end: "17:00" },
          lunchBreak: { start: "11:30", end: "12:30" }
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
      "/vendors/belleza-dominicana-1.jpg",
      "/vendors/belleza-dominicana-2.jpg",
      "/vendors/belleza-dominicana-3.jpg",
      "/vendors/belleza-dominicana-4.jpg"
    ]
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