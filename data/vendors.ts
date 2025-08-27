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
  },
  // Additional Uñas vendors
  {
    id: "nails-express-rd",
    name: "Nails Express RD",
    slug: "nails-express-rd",
    logo: "/vendors/nails-express-logo.png",
    coverImage: "/vendors/nails-express-cover.jpg",
    description: "Servicio rápido de uñas sin cita previa. Especialistas en diseños modernos y técnicas express.",
    rating: 4.6,
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
        image: "/services/express-manicure.jpg"
      },
      {
        id: "nail-art-moderno",
        name: "Nail Art Moderno",
        description: "Diseños únicos y tendencias actuales en nail art",
        price: 1200,
        duration: 45,
        category: "unas",
        isPopular: true,
        image: "/services/modern-nail-art.jpg"
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
        image: "/services/luxury-manicure.jpg"
      },
      {
        id: "unas-porcelana",
        name: "Uñas de Porcelana",
        description: "Extensiones de uñas con técnica de porcelana para duración extrema",
        price: 4000,
        duration: 150,
        category: "unas",
        isPopular: true,
        image: "/services/porcelain-nails.jpg"
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
        image: "/services/corporate-makeup.jpg"
      },
      {
        id: "clase-makeup",
        name: "Clase de Maquillaje Personal",
        description: "Aprende técnicas profesionales en sesión personalizada",
        price: 3000,
        duration: 120,
        category: "maquillaje",
        isPopular: true,
        image: "/services/makeup-class.jpg"
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
        image: "/services/natural-makeup.jpg"
      },
      {
        id: "maquillaje-fotografia",
        name: "Maquillaje para Fotografía",
        description: "Maquillaje especializado para sesiones fotográficas profesionales",
        price: 2800,
        duration: 90,
        category: "maquillaje",
        isPopular: true,
        image: "/services/photography-makeup.jpg"
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
        image: "/services/therapeutic-massage.jpg"
      },
      {
        id: "aromaterapia",
        name: "Sesión de Aromaterapia",
        description: "Tratamiento relajante con aceites esenciales y técnicas de respiración",
        price: 1800,
        duration: 60,
        category: "spa",
        isPopular: true,
        image: "/services/aromatherapy.jpg"
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
    description: "Spa de lujo con tratamientos exclusivos y productos importados. Experiencia VIP garantizada.",
    rating: 4.9,
    reviewCount: 87,
    serviceCount: 25,
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
    categories: ["spa", "cuerpo"],
    popularServices: ["Tratamiento VIP", "Masaje con Piedras Calientes", "Facial de Oro"],
    badges: ["VIP", "Luxury", "Premium Partner"],
    availability: {
      isOpen: false,
      nextSlot: "Mañana 11:00 AM",
      todayAvailable: false
    },
    professionalCount: 8,
    priceRange: {
      min: 3500,
      max: 8000
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
        image: "/services/vip-treatment.jpg"
      },
      {
        id: "masaje-piedras-calientes",
        name: "Masaje con Piedras Calientes",
        description: "Relajación profunda con terapia de piedras volcánicas",
        price: 3800,
        duration: 120,
        category: "cuerpo",
        isPopular: true,
        image: "/services/hot-stone-massage.jpg"
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
    rating: 4.5,
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
        image: "/services/modern-haircut.jpg"
      },
      {
        id: "balayage-premium",
        name: "Balayage Premium",
        description: "Técnica de coloración gradual para un look natural y moderno",
        price: 4200,
        duration: 180,
        category: "peinados",
        isPopular: true,
        image: "/services/balayage.jpg"
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
    rating: 4.4,
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
        image: "/services/hair-treatment.jpg"
      },
      {
        id: "peinado-eventos",
        name: "Peinado para Eventos",
        description: "Peinados elegantes para bodas, graduaciones y ocasiones especiales",
        price: 2200,
        duration: 75,
        category: "peinados",
        isPopular: true,
        image: "/services/event-hairstyle.jpg"
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
        image: "/services/russian-volume.jpg"
      },
      {
        id: "microblading-cejas",
        name: "Microblading de Cejas",
        description: "Diseño y pigmentación de cejas con técnica de microblading",
        price: 3200,
        duration: 120,
        category: "pestañas",
        isPopular: true,
        image: "/services/microblading.jpg"
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
        image: "/services/classic-lashes.jpg"
      },
      {
        id: "tinte-pestanas-cejas",
        name: "Tinte de Pestañas y Cejas",
        description: "Pigmentación natural para realzar la mirada sin maquillaje",
        price: 1200,
        duration: 45,
        category: "pestañas",
        isPopular: true,
        image: "/services/lash-tint.jpg"
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
        image: "/services/merengue-hairstyle.jpg"
      },
      {
        id: "maquillaje-caribeno",
        name: "Maquillaje Caribeño",
        description: "Look radiante con colores tropicales que resaltan la belleza natural caribeña",
        price: 2200,
        duration: 60,
        category: "maquillaje",
        isPopular: false,
        image: "/services/caribbean-makeup.jpg"
      },
      {
        id: "pedicure-playa-dorada",
        name: "Pedicure Playa Dorada",
        description: "Pedicure relajante con exfoliación de arena de playa y aceites tropicales",
        price: 1650,
        duration: 105,
        category: "unas",
        isPopular: true,
        image: "/services/golden-beach-pedicure.jpg"
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