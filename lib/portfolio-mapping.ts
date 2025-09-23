// Portfolio mapping utilities for professionals
// Maps existing portfolio images to professionals by specialty

export interface PortfolioMapping {
  professionalId: string
  name: string
  specialty: string
  portfolioImages: string[]
  beforeAfterImages?: Array<{
    before: string
    after: string
    title: string
    category: string
    date?: string
  }>
  isUsed: boolean
}

// Available portfolio images by professional (existing specific portfolios)
export const existingProfessionalPortfolios: PortfolioMapping[] = [
  {
    professionalId: "carla-rodriguez",
    name: "Carla Rodríguez",
    specialty: "hair",
    portfolioImages: [
      "/professionals/portfolios/carla-rodriguez/carla-portfolio-1.png",
      "/professionals/portfolios/carla-rodriguez/carla-portfolio-2.png",
      "/professionals/portfolios/carla-rodriguez/carla-portfolio-3.png",
      "/professionals/portfolios/carla-rodriguez/carla-portfolio-4.png"
    ],
    beforeAfterImages: [
      {
        before: "/transformations/before/hair-transformation-1-before.png",
        after: "/transformations/after/hair-transformation-1-after.png",
        title: "Transformación Corte y Color",
        category: "Corte y Color",
        date: "2024-12-01"
      },
      {
        before: "/transformations/before/hair-transformation-2-before.png",
        after: "/transformations/after/hair-transformation-2-after.png",
        title: "Peinado de Gala",
        category: "Peinados",
        date: "2024-11-28"
      }
    ],
    isUsed: false
  },
  {
    professionalId: "patricia-lopez",
    name: "Patricia López",
    specialty: "nails",
    portfolioImages: [
      "/professionals/portfolios/patricia-lopez/patricia-portfolio-1.png",
      "/professionals/portfolios/patricia-lopez/patricia-portfolio-2.png",
      "/professionals/portfolios/patricia-lopez/patricia-portfolio-3.png",
      "/professionals/portfolios/patricia-lopez/patricia-portfolio-4.png"
    ],
    beforeAfterImages: [
      {
        before: "/transformations/before/nail-transformation-before.png",
        after: "/transformations/after/nail-transformation-after.png",
        title: "Transformación Nail Art",
        category: "Manicure Gel",
        date: "2024-12-01"
      }
    ],
    isUsed: false
  },
  {
    professionalId: "alejandra-santos",
    name: "Alejandra Santos",
    specialty: "makeup",
    portfolioImages: [
      "/professionals/portfolios/alejandra-santos/alejandra-portfolio-1.png",
      "/professionals/portfolios/alejandra-santos/alejandra-portfolio-2.png",
      "/professionals/portfolios/alejandra-santos/alejandra-portfolio-3.png",
      "/professionals/portfolios/alejandra-santos/alejandra-portfolio-4.png"
    ],
    beforeAfterImages: [
      {
        before: "/transformations/before/makeup-transformation-1-before.png",
        after: "/transformations/after/makeup-transformation-1-after.png",
        title: "Maquillaje de Novia",
        category: "Maquillaje",
        date: "2024-12-02"
      },
      {
        before: "/transformations/before/makeup-transformation-2-before.png",
        after: "/transformations/after/makeup-transformation-2-after.png",
        title: "Maquillaje de Gala",
        category: "Maquillaje",
        date: "2024-11-29"
      }
    ],
    isUsed: false
  },
  {
    professionalId: "gabriela-mendez",
    name: "Gabriela Méndez",
    specialty: "spa",
    portfolioImages: [
      "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-1.png",
      "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-2.png",
      "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-3.png",
      "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-4.png"
    ],
    beforeAfterImages: [
      {
        before: "/transformations/before/spa-transformation-1-before.png",
        after: "/transformations/after/spa-transformation-1-after.png",
        title: "Tratamiento Facial Anti-edad",
        category: "Facial",
        date: "2024-11-30"
      }
    ],
    isUsed: false
  }
]

// Available generic portfolio images by category (from image-utils.ts)
export const genericPortfolioImages = {
  hair: [
    "/professionals/portfolios/hair-portfolio-1.png",
    "/professionals/portfolios/hair-portfolio-2.png",
    "/professionals/portfolios/hair-portfolio-3.png",
    "/professionals/portfolios/hair-portfolio-4.webp"
  ],
  makeup: [
    "/professionals/portfolios/makeup-portfolio-1.png",
    "/professionals/portfolios/makeup-portfolio-2.png",
    "/professionals/portfolios/makeup-portfolio-3.png",
    "/professionals/portfolios/makeup-portfolio-4.webp"
  ],
  spa: [
    "/professionals/portfolios/spa-portfolio-1.png",
    "/professionals/portfolios/spa-portfolio-2.png",
    "/professionals/portfolios/spa-portfolio-3.png",
    "/professionals/portfolios/spa-portfolio-4.webp"
  ],
  nails: [
    "/professionals/portfolios/nails-portfolio-1.png",
    "/professionals/portfolios/nails-portfolio-2.png",
    "/professionals/portfolios/nails-portfolio-3.png",
    "/professionals/portfolios/nails-portfolio-4.webp"
  ]
}

// Additional transformation images available for assignment
export const availableTransformations = {
  makeup: [
    {
      before: "/transformations/before/makeup-transformation-3-before.png",
      after: "/transformations/after/makeup-transformation-3-after.png",
      title: "Maquillaje Editorial",
      category: "Maquillaje Editorial"
    }
  ],
  lashes: [
    {
      before: "/transformations/before/lash-transformation-1-before.png",
      after: "/transformations/after/lash-transformation-1-after.png",
      title: "Extensiones de Pestañas",
      category: "Extensiones de Pestañas"
    }
  ]
}

// Track which portfolio sets have been used
let usedPortfolios = new Set<string>()

// Get portfolio for a professional by specialty
export function getPortfolioForProfessional(
  professionalId: string,
  specialty: string,
  name?: string
): {
  images: string[]
  beforeAfter: Array<{
    before: string
    after: string
    title: string
    category: string
    date?: string
  }>
} {
  // First, check if we have a specific portfolio for this professional
  const specificPortfolio = existingProfessionalPortfolios.find(
    p => p.professionalId === professionalId && !p.isUsed
  )

  if (specificPortfolio) {
    specificPortfolio.isUsed = true
    usedPortfolios.add(specificPortfolio.professionalId)
    return {
      images: specificPortfolio.portfolioImages,
      beforeAfter: specificPortfolio.beforeAfterImages || []
    }
  }

  // If no specific portfolio, try to assign unused portfolio by specialty
  const availableBySpecialty = existingProfessionalPortfolios.find(
    p => p.specialty === specialty && !p.isUsed
  )

  if (availableBySpecialty) {
    availableBySpecialty.isUsed = true
    usedPortfolios.add(availableBySpecialty.professionalId)
    return {
      images: availableBySpecialty.portfolioImages,
      beforeAfter: availableBySpecialty.beforeAfterImages || []
    }
  }

  // Fallback to generic portfolio images
  const fallbackImages = genericPortfolioImages[specialty as keyof typeof genericPortfolioImages] || []

  // Add additional transformations if available
  const additionalTransformations = availableTransformations[specialty as keyof typeof availableTransformations] || []

  return {
    images: fallbackImages,
    beforeAfter: additionalTransformations.map(t => ({
      ...t,
      date: "2024-11-15"
    }))
  }
}

// Get list of professionals who need new portfolio images generated
export function getProfessionalsNeedingPortfolios(): string[] {
  const needPortfolios: string[] = []

  // This would be populated after we map all existing professionals
  // For now, return empty array as this will be filled during the mapping process

  return needPortfolios
}

// Reset usage tracking (for testing)
export function resetPortfolioUsage() {
  usedPortfolios.clear()
  existingProfessionalPortfolios.forEach(p => p.isUsed = false)
}

// Get portfolio usage summary
export function getPortfolioUsageSummary() {
  return {
    totalPortfolios: existingProfessionalPortfolios.length,
    usedPortfolios: Array.from(usedPortfolios),
    remainingPortfolios: existingProfessionalPortfolios.filter(p => !p.isUsed)
  }
}