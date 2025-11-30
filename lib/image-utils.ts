// Image utility functions for FemFuel Beauty applications
// Handles fallbacks, optimization, and consistent image loading

export interface ImageConfig {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  fallback?: string
}

// Centralized image paths for easy management
export const imagePaths = {
  // Vendor images
  vendors: {
    logos: {
      beautyStudio: '/vendors/logos/beauty-studio-logo.png',
      glamourHouse: '/vendors/logos/glamour-house-logo.png',
      spaParadise: '/vendors/logos/spa-paradise-logo.png',
      hairSalonElite: '/vendors/logos/hair-salon-elite-logo.png',
      lashStudio: '/vendors/logos/lash-studio-logo.png',
      nailsExpress: '/vendors/logos/nails-express-logo.png',
      luxuryNails: '/vendors/logos/luxury-nails-logo.png',
      makeupStudio: '/vendors/logos/makeup-studio-logo.png',
      bellezaNatural: '/vendors/logos/belleza-natural-logo.png',
      zenWellness: '/vendors/logos/zen-wellness-logo.png',
      royalSpa: '/vendors/logos/royal-spa-logo.png',
      trendyHair: '/vendors/logos/trendy-hair-logo.png',
      cabelloEstilo: '/vendors/logos/cabello-estilo-logo.png',
      lashesBrows: '/vendors/logos/lashes-brows-logo.png',
      bellaMirada: '/vendors/logos/bella-mirada-logo.png',
      bellezaDominicana: '/vendors/logos/belleza-dominicana-logo.webp'
    },
    covers: {
      beautyStudio: '/vendors/covers/beauty-studio-cover.png',
      glamourHouse: '/vendors/covers/glamour-house-cover.png',
      spaParadise: '/vendors/covers/spa-paradise-cover.png',
      hairSalonElite: '/vendors/covers/hair-salon-elite-cover.png',
      lashStudio: '/vendors/covers/lash-studio-cover.png',
      nailsExpress: '/vendors/covers/nails-express-cover.png',
      luxuryNails: '/vendors/covers/luxury-nails-cover.png',
      makeupStudio: '/vendors/covers/makeup-studio-cover.png',
      bellezaNatural: '/vendors/covers/belleza-natural-cover.png',
      zenWellness: '/vendors/covers/zen-wellness-cover.png',
      royalSpa: '/vendors/covers/royal-spa-cover.png',
      trendyHair: '/vendors/covers/trendy-hair-cover.png',
      cabelloEstilo: '/vendors/covers/cabello-estilo-cover.png',
      lashesBrows: '/vendors/covers/lashes-brows-cover.png',
      bellaMirada: '/vendors/covers/bella-mirada-cover.png',
      bellezaDominicana: '/vendors/covers/belleza-dominicana-cover.webp'
    }
  },

  // Service images
  services: {
    hair: {
      balayage: '/services/hair/balayage-treatment.png',
      dominicanBlowout: '/services/hair/dominican-blowout.png',
      hairColoring: '/services/hair/hair-coloring.png',
      haircutStyling: '/services/hair/haircut-styling.png',
      hairTreatment: '/services/hair/hair-treatment.png',
      eventHairstyle: '/services/hair/event-hairstyle.png',
      modernHaircut: '/services/hair/modern-haircut.png',
      merengueHairstyle: '/services/hair/merengue-hairstyle.webp'
    },
    nails: {
      gelManicure: '/services/nails/gel-manicure.png',
      tropicalNailArt: '/services/nails/tropical-nail-art.png',
      spaPedicure: '/services/nails/spa-pedicure.png',
      acrylicExtensions: '/services/nails/acrylic-extensions.png',
      classicManicure: '/services/nails/classic-manicure.png',
      expressManicure: '/services/nails/express-manicure.png',
      modernNailArt: '/services/nails/modern-nail-art.png',
      luxuryManicure: '/services/nails/luxury-manicure.png',
      porcelainNails: '/services/nails/porcelain-nails.png',
      dominicanManicure: '/services/nails/dominican-manicure.png',
      goldenBeachPedicure: '/services/nails/golden-beach-pedicure.webp'
    },
    makeup: {
      bridalMakeup: '/services/makeup/bridal-makeup.png',
      glamourEvening: '/services/makeup/glamour-evening.png',
      corporateMakeup: '/services/makeup/corporate-makeup.png',
      photographyMakeup: '/services/makeup/photography-makeup.png',
      naturalMakeup: '/services/makeup/natural-makeup.png',
      makeupClass: '/services/makeup/makeup-class.png',
      caribbeanMakeup: '/services/makeup/caribbean-makeup.webp'
    },
    spa: {
      luxuryFacial: '/services/spa/luxury-facial.png',
      aromatherapyMassage: '/services/spa/aromatherapy-massage.png',
      antiAgingTreatment: '/services/spa/anti-aging-treatment.png',
      relaxingMassage: '/services/spa/relaxing-massage.png',
      therapeuticMassage: '/services/spa/therapeutic-massage.png',
      vipTreatment: '/services/spa/vip-treatment.png',
      hotStoneMassage: '/services/spa/hot-stone-massage.webp'
    },
    lashes: {
      lashExtensions: '/services/lashes/lash-extensions.png',
      russianVolume: '/services/lashes/russian-volume.png',
      microblading: '/services/lashes/microblading.png',
      classicLashes: '/services/lashes/classic-lashes.png',
      lashTint: '/services/lashes/lash-tint.webp'
    }
  },

  // Professional portraits
  professionals: {
    portraits: {
      hairStylist1: '/professionals/portraits/hair-stylist-carla.png',
      makeupArtist1: '/professionals/portraits/makeup-artist-alejandra.png',
      spaTherapist1: '/professionals/portraits/spa-therapist-gabriela.png',
      nailTech1: '/professionals/portraits/nail-tech-patricia.png',
      hairStylist2: '/professionals/portraits/hair-stylist-maria.png',
      makeupArtist2: '/professionals/portraits/makeup-artist-carmen.webp'
    },
    portfolios: {
      hair: [
        '/professionals/portfolios/hair-portfolio-1.png',
        '/professionals/portfolios/hair-portfolio-2.png',
        '/professionals/portfolios/hair-portfolio-3.png',
        '/professionals/portfolios/hair-portfolio-4.webp'
      ],
      makeup: [
        '/professionals/portfolios/makeup-portfolio-1.png',
        '/professionals/portfolios/makeup-portfolio-2.png',
        '/professionals/portfolios/makeup-portfolio-3.png',
        '/professionals/portfolios/makeup-portfolio-4.webp'
      ],
      spa: [
        '/professionals/portfolios/spa-portfolio-1.png',
        '/professionals/portfolios/spa-portfolio-2.png',
        '/professionals/portfolios/spa-portfolio-3.png',
        '/professionals/portfolios/spa-portfolio-4.webp'
      ],
      nails: [
        '/professionals/portfolios/nails-portfolio-1.png',
        '/professionals/portfolios/nails-portfolio-2.png',
        '/professionals/portfolios/nails-portfolio-3.png',
        '/professionals/portfolios/nails-portfolio-4.webp'
      ]
    }
  },

  // Transformation images
  transformations: {
    before: {
      hair1: '/transformations/before/hair-transformation-1-before.png',
      hair2: '/transformations/before/hair-transformation-2-before.png',
      hair3: '/transformations/before/hair-transformation-3-before.png',
      makeup1: '/transformations/before/makeup-transformation-1-before.png',
      makeup2: '/transformations/before/makeup-transformation-2-before.png',
      makeup3: '/transformations/before/makeup-transformation-3-before.webp'
    },
    after: {
      hair1: '/transformations/after/hair-transformation-1-after.png',
      hair2: '/transformations/after/hair-transformation-2-after.png',
      hair3: '/transformations/after/hair-transformation-3-after.png',
      makeup1: '/transformations/after/makeup-transformation-1-after.png',
      makeup2: '/transformations/after/makeup-transformation-2-after.png',
      makeup3: '/transformations/after/makeup-transformation-3-after.webp'
    }
  },

  // Product images
  products: {
    skincare: {
      ceraveCleanser: '/products/skincare/cerave-cleanser.png',
      ordinaryNiacinamide: '/products/skincare/ordinary-niacinamide.webp'
    },
    makeup: {
      fentyFoundation: '/products/makeup/fenty-foundation.png',
      rareBlush: '/products/makeup/rare-blush.webp'
    },
    haircare: {
      olaplexNo3: '/products/haircare/olaplex-no3.webp'
    },
    tools: {
      rtSponge: '/products/tools/rt-sponge.webp'
    }
  },

  // Location images
  locations: {
    beautyStudioExterior: '/locations/beauty-studio-exterior.png',
    glamourHouseExterior: '/locations/glamour-house-exterior.png',
    spaParadiseExterior: '/locations/spa-paradise-exterior.png',
    hairSalonEliteExterior: '/locations/hair-salon-elite-exterior.png',
    relaxNailsExterior: '/locations/relax-nails-exterior.png',
    lashStudioExterior: '/locations/lash-studio-exterior.webp'
  },

  // Fallback images
  fallbacks: {
    logo: '/placeholder-logo.png',
    service: '/placeholder.png',
    professional: '/placeholder-user.png',
    product: '/placeholder.png',
    vendor: '/placeholder.png'
  }
}

// Generate vendor-specific image paths
export const getVendorImages = (vendorId: string) => {
  return {
    logo: `/vendors/logos/${vendorId}-logo.png`,
    cover: `/vendors/covers/${vendorId}-cover.png`,
    gallery: Array.from({ length: 3 }, (_, i) => 
      `/vendors/galleries/${vendorId}-gallery-${i + 1}.png`
    )
  }
}

// Generate service-specific image paths
export const getServiceImage = (category: string, serviceName: string) => {
  const slug = serviceName.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
  return `/services/${category}/${slug}.png`
}

// Get professional avatar path
export const getProfessionalAvatar = (professionalId: string) => {
  return `/professionals/portraits/${professionalId}-avatar.png`
}

// Get customer avatar path  
export const getCustomerAvatar = (customerId: string) => {
  return `/customers/avatars/${customerId}-avatar.png`
}

// Image optimization helper
export const optimizeImageProps = (config: ImageConfig) => {
  return {
    src: config.src,
    alt: config.alt,
    width: config.width,
    height: config.height,
    loading: config.priority ? 'eager' : 'lazy'
  }
}

// Create placeholder image URL
export const createPlaceholder = (width: number, height: number, text?: string) => {
  const query = text ? `&text=${encodeURIComponent(text)}` : ''
  return `/placeholder.svg?height=${height}&width=${width}${query}`
}

// Check if image exists (for development)
export const imageExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}