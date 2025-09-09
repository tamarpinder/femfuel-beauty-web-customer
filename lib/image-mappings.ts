// Image name mappings for vendor logos and covers
// Maps vendor business names to actual image file names

export const vendorLogoMap: Record<string, string> = {
  'Glamour Studio RD': '/vendors/logos/glamour-house-logo.png',
  'Nails Paradise': '/vendors/logos/nails-express-logo.png',
  'Hair Salon Elite': '/vendors/logos/hair-salon-elite-logo.png',
  'Spa Serenity': '/vendors/logos/spa-paradise-logo.png',
  'Lash Boutique DR': '/vendors/logos/lash-studio-logo.png',
  'Beauty Corner': '/vendors/logos/beauty-studio-logo.png',
  'Dominican Hair Studio': '/vendors/logos/cabello-estilo-logo.png',
  'Radiant Skin Spa': '/vendors/logos/zen-wellness-logo.png',
  'Perfect Nails Salon': '/vendors/logos/luxury-nails-logo.png',
  'Makeup Artistry RD': '/vendors/logos/makeup-studio-logo.png',
  'Curly Hair Haven': '/vendors/logos/trendy-hair-logo.png',
  'Zen Wellness Spa': '/vendors/logos/royal-spa-logo.png',
  'Brow & Lash Bar': '/vendors/logos/lashes-brows-logo.png',
  'Tropical Beauty': '/vendors/logos/belleza-natural-logo.png',
  'Elite Beauty Salon': '/vendors/logos/bella-mirada-logo.png',
  'Caribbean Glow': '/vendors/logos/belleza-dominicana-logo.png',
  // Add more mappings as needed
}

export const vendorCoverMap: Record<string, string> = {
  'Glamour Studio RD': '/vendors/covers/makeup-studio-workspace.png',
  'Nails Paradise': '/vendors/covers/nail-express-salon.png',
  'Hair Salon Elite': '/vendors/covers/hair-styling-studio.png',
  'Spa Serenity': '/vendors/covers/spa-treatment-room.png',
  'Lash Boutique DR': '/vendors/covers/lash-studio-interior.png',
  'Beauty Corner': '/vendors/covers/modern-beauty-salon-interior.png',
  'Dominican Hair Studio': '/vendors/covers/cabello-estilo-salon.png',
  'Radiant Skin Spa': '/vendors/covers/zen-wellness-center.png',
  'Perfect Nails Salon': '/vendors/covers/luxury-nail-salon.png',
  'Makeup Artistry RD': '/vendors/covers/makeup-studio-workspace.png',
  'Curly Hair Haven': '/vendors/covers/trendy-hair-salon.png',
  'Zen Wellness Spa': '/vendors/covers/royal-spa-interior.png',
  'Brow & Lash Bar': '/vendors/covers/lashes-brows-studio.png',
  'Tropical Beauty': '/vendors/covers/belleza-natural-spa.png',
  'Elite Beauty Salon': '/vendors/covers/bella-mirada-eye-studio.png',
  'Caribbean Glow': '/vendors/covers/belleza-dominicana-salon.png',
  // Add more mappings as needed
}

// Service image mappings for 45 curated services
export const serviceImageMap: Record<string, string> = {
  // Hair services (12 services) - Spanish names
  'alisado dominicano': '/services/hair/stylist-with-blower.png',
  'balayage': '/services/hair/balayage-treatment.png',
  'tratamiento de keratina': '/services/hair/keratin-treatment-service-after.png',
  'corte de cabello': '/services/hair/modern-haircut.png',
  'tinte de cabello': '/services/hair/hair-coloring-session.png',
  'peinado de boda': '/services/hair/wedding-hairstyle-service.png',
  'corte de cabello rizado': '/services/hair/curly-hair-cut-service.png',
  'tratamiento capilar': '/services/hair/hair-treatment-session.png',
  'extensiones de cabello': '/services/hair/hair-extensions-service.png',
  'mechas californianas': '/services/hair/hair-highlights-service.png',
  'alisado químico': '/services/hair/hair-straightening-service.png',
  'mascarilla capilar': '/services/hair/hair-mask-treatment-service.png',
  
  // Nail services (10 services) - Spanish names
  'manicure de gel': '/services/nails/premium-gel-manicure.png',
  'arte de uñas tropical': '/services/nails/tropical-nail-art.png',
  'manicure clásico': '/services/nails/classic-manicure.png',
  'extensiones de acrílico': '/services/nails/acrylic-extensions.png',
  'pedicure spa': '/services/nails/spa-pedicure-treatment.png',
  'manicure exprés': '/services/nails/express-manicure.png',
  'manicure de lujo': '/services/nails/luxury-manicure.png',
  'pedicure spa deluxe': '/services/nails/deluxe-spa-pedicure-service.png',
  'manicure francés moderno': '/services/nails/modern-french-manicure-service.png',
  'reparación de uñas': '/services/nails/nail-repair-service.png',
  
  // Makeup services (8 services) - Spanish names
  'maquillaje de novia': '/services/makeup/bridal-makeup-application.png',
  'maquillaje natural': '/services/makeup/natural-makeup.png',
  'maquillaje de gala': '/services/makeup/glamour-evening-look.png',
  'maquillaje ejecutivo': '/services/makeup/corporate-makeup-service.png',
  'maquillaje para fotografía': '/services/makeup/photography-makeup-service.png',
  'maquillaje caribeño': '/services/makeup/caribbean-makeup.png',
  'maquillaje con aerógrafo': '/services/makeup/airbrush-makeup-service.png',
  'maquillaje de ocasión especial': '/services/makeup/special-occasion-makeup-service.png',
  
  // Spa services (8 services) - Spanish names
  'facial de lujo': '/services/spa/luxury-facial-treatment.png',
  'masaje relajante': '/services/spa/massage.png',
  'limpieza facial profunda': '/services/spa/deep-cleansing-facial-service.png',
  'aromaterapia': '/services/spa/aromatherapy-massage-service.png',
  'masaje con piedras calientes': '/services/spa/hot-stone-massage.png',
  'masaje terapéutico': '/services/spa/massage3.png',
  'microdermoabrasión': '/services/spa/microdermabrasion-service.png',
  'masaje de pareja': '/services/spa/couples-massage-service.png',
  
  // Lash & Brow services (7 services) - Spanish names
  'extensiones de pestañas': '/services/lashes/lash-extensions.png',
  'volumen ruso': '/services/lashes/russian-volume-lashes.png',
  'pestañas clásicas': '/services/lashes/classic-lashes.png',
  'tinte de pestañas': '/services/lashes/lash-tint.png',
  'microblading de cejas': '/services/lashes/skilled-eyebrow-artist.png',
  'lifting de pestañas': '/services/lashes/lash-extensions.png', // Reuse similar image
  'diseño de cejas': '/services/lashes/skilled-eyebrow-artist.png', // Reuse eyebrow image
}

// Professional portrait mappings
export const professionalPortraitMap: Record<string, string> = {
  'carla': '/professionals/portraits/hair-stylist-carla.png',
  'maria': '/professionals/portraits/hair-stylist-maria.png',
  'ricardo': '/professionals/portraits/hair-stylist-ricardo.png',
  'lucia': '/professionals/portraits/hair-colorist-lucia.png',
  'diego': '/professionals/portraits/hair-designer-diego.png',
  'esperanza': '/professionals/portraits/hair-stylist-esperanza.png',
  'alejandra': '/professionals/portraits/makeup-artist-alejandra.png',
  'carmen': '/professionals/portraits/makeup-artist-carmen.png',
  'valentina': '/professionals/portraits/bridal-makeup-artist-valentina.png',
  'natalia': '/professionals/portraits/makeup-artist-natalia.png',
  'gabriela': '/professionals/portraits/spa-therapist-gabriela.png',
  'isabella': '/professionals/portraits/wellness-therapist-isabella.png',
  'raquel': '/professionals/portraits/massage-therapist-raquel.png',
  'yolanda': '/professionals/portraits/facial-specialist-yolanda.png',
  'patricia': '/professionals/portraits/nail-artist-patricia.png',
  'sofia': '/professionals/portraits/nail-artist-sofia.png',
  'ana': '/professionals/portraits/aesthetician-ana.png',
  'minerva': '/professionals/portraits/anti-aging-specialist-minerva.png',
  'rosa': '/professionals/portraits/holistic-skin-therapist-rosa.png',
  'camila': '/professionals/portraits/lash-specialist-camila.png',
  'andrea': '/professionals/portraits/microblade-artist-andrea.png',
  'liliana': '/professionals/portraits/lash-brow-liliana.png',
  'marisol': '/professionals/portraits/pedicure-specialist-marisol.png',
  'skin-specialist': '/professionals/portraits/skin-specialist-valentina.png',
  'nail-carmen': '/professionals/portraits/nail-artist-carmen.png',
}

// Helper function to get vendor logo
export function getVendorLogo(vendorName: string): string {
  return vendorLogoMap[vendorName] || '/vendors/logos/beauty-studio-logo.png'
}

// Helper function to get vendor cover
export function getVendorCover(vendorName: string): string {
  return vendorCoverMap[vendorName] || '/vendors/covers/modern-beauty-salon-interior.png'
}

// Helper function to get service image
export function getServiceImage(serviceName: string): string {
  const normalized = serviceName.toLowerCase()
  
  // Check for exact match first
  if (serviceImageMap[normalized]) {
    return serviceImageMap[normalized]
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(serviceImageMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value
    }
  }
  
  // Return category default
  if (normalized.includes('hair')) return '/services/hair/modern-haircut.png'
  if (normalized.includes('nail')) return '/services/nails/classic-manicure.png'
  if (normalized.includes('makeup')) return '/services/makeup/natural-makeup.png'
  if (normalized.includes('spa') || normalized.includes('massage')) return '/services/spa/massage.png'
  if (normalized.includes('lash') || normalized.includes('brow')) return '/services/lashes/lash-extensions.png'
  
  return '/services/hair/modern-haircut.png' // Default fallback
}

// Array of all available professional portraits for variety
const allProfessionalPortraits = [
  '/professionals/portraits/hair-stylist-carla.png',
  '/professionals/portraits/hair-stylist-maria.png',
  '/professionals/portraits/hair-stylist-ricardo.png',
  '/professionals/portraits/hair-colorist-lucia.png',
  '/professionals/portraits/hair-designer-diego.png',
  '/professionals/portraits/hair-stylist-esperanza.png',
  '/professionals/portraits/makeup-artist-alejandra.png',
  '/professionals/portraits/makeup-artist-carmen.png',
  '/professionals/portraits/bridal-makeup-artist-valentina.png',
  '/professionals/portraits/makeup-artist-natalia.png',
  '/professionals/portraits/spa-therapist-gabriela.png',
  '/professionals/portraits/wellness-therapist-isabella.png',
  '/professionals/portraits/massage-therapist-raquel.png',
  '/professionals/portraits/facial-specialist-yolanda.png',
  '/professionals/portraits/nail-artist-patricia.png',
  '/professionals/portraits/nail-artist-sofia.png',
  '/professionals/portraits/nail-artist-carmen.png',
  '/professionals/portraits/pedicure-specialist-marisol.png',
  '/professionals/portraits/aesthetician-ana.png',
  '/professionals/portraits/skin-specialist-valentina.png',
  '/professionals/portraits/anti-aging-specialist-minerva.png',
  '/professionals/portraits/holistic-skin-therapist-rosa.png',
  '/professionals/portraits/lash-specialist-camila.png',
  '/professionals/portraits/microblade-artist-andrea.png',
  '/professionals/portraits/lash-brow-liliana.png'
]

// Helper function to get professional portrait
export function getProfessionalPortrait(name: string, index?: number): string {
  const normalized = name.toLowerCase().split(' ')[0] // Get first name
  
  // Check exact match first
  if (professionalPortraitMap[normalized]) {
    return professionalPortraitMap[normalized]
  }
  
  // If index provided, use it for variety across the app
  if (typeof index === 'number') {
    return allProfessionalPortraits[index % allProfessionalPortraits.length]
  }
  
  // Use name as seed for consistent variety
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  const portraitIndex = Math.abs(hash) % allProfessionalPortraits.length
  return allProfessionalPortraits[portraitIndex]
}

// Function to get random professional portrait
export function getRandomProfessionalPortrait(): string {
  const randomIndex = Math.floor(Math.random() * allProfessionalPortraits.length)
  return allProfessionalPortraits[randomIndex]
}