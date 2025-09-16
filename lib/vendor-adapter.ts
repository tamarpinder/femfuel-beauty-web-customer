import { mockVendors } from "@/data/vendors"
import { mockData } from "@/data/shared/mock-data"
import { getRandomProfessionalPortrait, getVendorLogo, getVendorCover, getServiceImage } from "@/lib/image-mappings"
import type { Vendor, Professional } from "@/types/vendor"

// Unified vendor adapter to handle both data sources
export class VendorAdapter {
  
  // Get vendor from either data source with fallback
  static findVendor(vendorId: string): Vendor | null {
    // First try vendors.ts (full vendor objects)
    let vendor = mockVendors.find(v => 
      v.id === vendorId || 
      String(v.id) === String(vendorId) ||
      v.id.toLowerCase() === vendorId.toLowerCase()
    )
    
    if (vendor) {
      return vendor
    }
    
    // Fallback to mock-data.ts (vendor profiles)
    const vendorProfile = mockData.vendorProfiles.find(v => 
      v.id === vendorId ||
      String(v.id) === String(vendorId) ||
      v.id.toLowerCase() === vendorId.toLowerCase()
    )
    
    if (vendorProfile) {
      // Transform mock-data vendor to full vendor format
      return this.transformVendorProfile(vendorProfile)
    }
    
    return null
  }
  
  // Transform mock-data vendor profile to full vendor format
  static transformVendorProfile(vendorProfile: any): Vendor {
    const vendorServices = mockData.services
      .filter(s => s.vendorId === vendorProfile.id)
      .map(service => ({
        id: service.name.toLowerCase().replace(/\s+/g, '-'),
        name: service.name,
        description: `${service.name} profesional con productos premium`,
        price: service.price,
        duration: service.duration,
        category: service.category,
        isPopular: service.isPopular,
        image: getServiceImage(service.name),
        addons: []
      }))
    
    // Generate professionals for this vendor
    const professionals = this.generateProfessionals(vendorProfile, vendorServices)
    
    return {
      id: vendorProfile.id,
      name: vendorProfile.businessName,
      slug: vendorProfile.id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      logo: getVendorLogo(vendorProfile.businessName),
      coverImage: getVendorCover(vendorProfile.businessName),
      description: vendorProfile.description,
      rating: vendorProfile.rating,
      reviewCount: vendorProfile.reviewCount,
      serviceCount: vendorServices.length,
      location: {
        address: vendorProfile.location.address,
        district: vendorProfile.location.district,
        city: vendorProfile.location.city,
        distance: "2.5km"
      },
      contact: {
        phone: vendorProfile.user.phone || "+1 809-555-0000",
        email: vendorProfile.user.email,
        whatsapp: vendorProfile.user.phone || "+1 809-555-0000"
      },
      categories: vendorProfile.categories,
      popularServices: vendorServices
        .filter(s => s.isPopular)
        .slice(0, 3)
        .map(s => s.name),
      badges: vendorProfile.isVerified ? ['Verificado'] : [],
      availability: {
        isOpen: true,
        nextSlot: "Hoy 3:00 PM",
        todayAvailable: true
      },
      professionalCount: professionals.length,
      priceRange: {
        min: Math.min(...vendorServices.map(s => s.price)),
        max: Math.max(...vendorServices.map(s => s.price))
      },
      businessHours: vendorProfile.businessHours,
      services: vendorServices,
      professionals: professionals
    }
  }
  
  // Simple deterministic random number generator based on seed
  static seededRandom(seed: string): () => number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return function() {
      hash = ((hash * 1103515245) + 12345) & 0x7fffffff;
      return hash / 0x7fffffff;
    }
  }

  // Generate professionals for vendor based on services
  static generateProfessionals(vendorProfile: any, services: any[]): Professional[] {
    const serviceCategories = [...new Set(services.map(s => s.category))]
    const professionalCount = Math.min(Math.max(2, Math.ceil(services.length / 3)), 4)
    
    const professionals: Professional[] = []
    
    for (let i = 0; i < professionalCount; i++) {
      const professionalId = `${vendorProfile.id}-prof-${i + 1}`
      
      // Create deterministic random generator for this specific professional
      const random = this.seededRandom(professionalId)
      
      const baseNames = [
        'María', 'Carmen', 'Ana', 'Rosa', 'Lucía', 'Patricia', 'Sofia', 'Gabriela',
        'Ricardo', 'Carlos', 'Diego', 'Eduardo', 'Andrés', 'Gabriel', 'Jean Carlos'
      ]
      const lastNames = [
        'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Torres',
        'Flores', 'Rivera', 'Morales', 'Jiménez', 'Cruz', 'Valdez', 'Herrera'
      ]
      
      const firstName = baseNames[Math.floor(random() * baseNames.length)]
      const lastName = lastNames[Math.floor(random() * lastNames.length)]
      const name = `${firstName} ${lastName}`
      
      // Generate specialties based on service categories
      const specialties = this.generateSpecialties(serviceCategories, services)
      
      // Generate deterministic professional portrait based on ID
      const portraitIndex = Math.abs(professionalId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 32 + 1
      const image = `/professionals/professional-${portraitIndex.toString().padStart(2, '0')}.png`
      
      const rating = +(4.2 + random() * 0.7).toFixed(1)
      const reviewCount = Math.floor(random() * 150) + 50
      const yearsExperience = Math.floor(random() * 10) + 3
      const monthlyBookings = Math.floor(random() * 80) + 40
      const isTopRated = random() > 0.6
      const bioExperience = Math.floor(random() * 10) + 3
      
      professionals.push({
        id: professionalId,
        name,
        image,
        rating,
        reviewCount,
        yearsExperience,
        monthlyBookings,
        specialties,
        isTopRated,
        nextAvailable: "Hoy 3:15 PM",
        bio: `${specialties[0]} especialista con ${bioExperience} años de experiencia.`,
        recommendedAddons: this.generateRecommendedAddons(specialties, professionalId, random)
      })
    }
    
    return professionals
  }
  
  // Generate specialties based on service categories
  static generateSpecialties(categories: string[], services: any[]): string[] {
    const specialtyMap: Record<string, string[]> = {
      'hair': ['Cortes Modernos', 'Coloración', 'Tratamientos Capilares', 'Keratina', 'Alisados', 'Balayage'],
      'nails': ['Nail Art', 'Gel Premium', 'Manicure Francesa', 'Diseños 3D', 'Pedicure Spa'],
      'makeup': ['Maquillaje de Novias', 'Eventos Sociales', 'Maquillaje Natural', 'Editorial'],
      'lashes': ['Extensiones Clásicas', 'Volumen Ruso', 'Diseño de Cejas', 'Microblading'],
      'spa': ['Masajes Relajantes', 'Tratamientos Faciales', 'Aromaterapia', 'Terapia Holística']
    }
    
    const allSpecialties: string[] = []
    categories.forEach(category => {
      const categorySpecialties = specialtyMap[category] || ['Servicio Profesional']
      allSpecialties.push(...categorySpecialties)
    })
    
    // Add service-specific specialties
    services.forEach(service => {
      if (service.name.includes('Keratina')) allSpecialties.push('Tratamiento de Keratina')
      if (service.name.includes('Alisado')) allSpecialties.push('Alisados Profesionales')
      if (service.name.includes('Novia')) allSpecialties.push('Maquillaje de Novias')
    })
    
    // Return 2-4 unique specialties
    const uniqueSpecialties = [...new Set(allSpecialties)]
    const count = Math.min(Math.max(2, Math.ceil(categories.length * 1.5)), 4)
    return uniqueSpecialties.slice(0, count)
  }
  
  // Generate recommended add-ons based on professional specialties
  static generateRecommendedAddons(specialties: string[], professionalId: string, random: () => number): any[] {
    const addonsByCategory: Record<string, any[]> = {
      'hair': [
        { id: 'hair-treatment-premium', name: 'Tratamiento Capilar Premium', price: 800, duration: 30 },
        { id: 'deep-conditioning', name: 'Acondicionamiento Profundo', price: 600, duration: 20 },
        { id: 'scalp-massage', name: 'Masaje del Cuero Cabelludo', price: 400, duration: 15 },
        { id: 'hair-glossing', name: 'Brillo Capilar', price: 500, duration: 25 },
        { id: 'split-ends-treatment', name: 'Tratamiento de Puntas', price: 350, duration: 15 }
      ],
      'nails': [
        { id: 'nail-art-premium', name: 'Nail Art Premium', price: 500, duration: 25 },
        { id: 'gel-overlay', name: 'Capa de Gel Protector', price: 300, duration: 15 },
        { id: 'cuticle-treatment', name: 'Tratamiento de Cutículas', price: 200, duration: 10 },
        { id: 'nail-strengthening', name: 'Fortalecimiento de Uñas', price: 400, duration: 20 },
        { id: 'french-manicure', name: 'Manicure Francesa', price: 350, duration: 20 }
      ],
      'makeup': [
        { id: 'lash-extensions', name: 'Extensión de Pestañas', price: 700, duration: 45 },
        { id: 'brow-shaping', name: 'Diseño de Cejas', price: 400, duration: 20 },
        { id: 'makeup-touch-up', name: 'Retoque de Maquillaje', price: 300, duration: 15 },
        { id: 'lip-treatment', name: 'Tratamiento de Labios', price: 250, duration: 10 },
        { id: 'primer-application', name: 'Aplicación de Primer', price: 200, duration: 10 }
      ],
      'spa': [
        { id: 'aromatherapy-upgrade', name: 'Aromaterapia Premium', price: 600, duration: 30 },
        { id: 'hot-stone-addition', name: 'Piedras Calientes Adicionales', price: 500, duration: 20 },
        { id: 'facial-mask', name: 'Mascarilla Facial Premium', price: 450, duration: 25 },
        { id: 'scalp-treatment', name: 'Tratamiento del Cuero Cabelludo', price: 350, duration: 15 },
        { id: 'relaxation-music', name: 'Sesión de Música Relajante', price: 150, duration: 0 }
      ],
      'general': [
        { id: 'consultation-extended', name: 'Consulta Extendida', price: 200, duration: 15 },
        { id: 'product-recommendation', name: 'Recomendación de Productos', price: 100, duration: 5 },
        { id: 'aftercare-kit', name: 'Kit de Cuidado Post-Servicio', price: 300, duration: 5 },
        { id: 'photo-session', name: 'Sesión de Fotos del Resultado', price: 250, duration: 10 }
      ]
    }
    
    const allAddons: any[] = []
    
    // Add category-specific addons based on specialties
    specialties.forEach(specialty => {
      const specialtyLower = specialty.toLowerCase()
      
      if (specialtyLower.includes('corte') || specialtyLower.includes('color') || specialtyLower.includes('keratina') || specialtyLower.includes('alisado')) {
        allAddons.push(...addonsByCategory.hair)
      }
      if (specialtyLower.includes('nail') || specialtyLower.includes('manicure') || specialtyLower.includes('pedicure')) {
        allAddons.push(...addonsByCategory.nails)
      }
      if (specialtyLower.includes('maquillaje') || specialtyLower.includes('makeup') || specialtyLower.includes('pestañas')) {
        allAddons.push(...addonsByCategory.makeup)
      }
      if (specialtyLower.includes('masaje') || specialtyLower.includes('facial') || specialtyLower.includes('spa')) {
        allAddons.push(...addonsByCategory.spa)
      }
    })
    
    // Always add some general addons
    allAddons.push(...addonsByCategory.general)
    
    // Remove duplicates and select 2-4 addons deterministically
    const uniqueAddons = allAddons.filter((addon, index, self) => 
      index === self.findIndex(a => a.id === addon.id)
    )
    
    // Use random function to select 2-4 addons consistently
    const addonCount = Math.floor(random() * 3) + 2 // 2-4 addons
    const selectedAddons: any[] = []
    
    for (let i = 0; i < Math.min(addonCount, uniqueAddons.length); i++) {
      const randomIndex = Math.floor(random() * uniqueAddons.length)
      const selectedAddon = uniqueAddons[randomIndex]
      if (!selectedAddons.find(a => a.id === selectedAddon.id)) {
        selectedAddons.push({
          ...selectedAddon,
          id: `${professionalId}-${selectedAddon.id}-${i}`
        })
      }
    }
    
    return selectedAddons
  }
  
  // Get all vendors from both sources
  static getAllVendors(): Vendor[] {
    const allVendors: Vendor[] = [...mockVendors]
    
    // Add transformed vendors from mock-data that aren't already in vendors.ts
    mockData.vendorProfiles.forEach(vendorProfile => {
      const existsInVendors = mockVendors.some(v => 
        v.id === vendorProfile.id || 
        v.name === vendorProfile.businessName
      )
      
      if (!existsInVendors) {
        allVendors.push(this.transformVendorProfile(vendorProfile))
      }
    })
    
    return allVendors
  }
}