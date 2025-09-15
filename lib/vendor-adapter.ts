import { mockVendors } from "@/data/vendors"
import { mockData } from "@/data/shared/mock-data"
import { getRandomProfessionalPortrait } from "@/lib/image-mappings"
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
        image: `/services/${service.category}/${service.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        addons: []
      }))
    
    // Generate professionals for this vendor
    const professionals = this.generateProfessionals(vendorProfile, vendorServices)
    
    return {
      id: vendorProfile.id,
      name: vendorProfile.businessName,
      slug: vendorProfile.id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      logo: `/vendors/${vendorProfile.businessName.toLowerCase().replace(/\s+/g, '-')}-logo.png`,
      coverImage: `/vendors/${vendorProfile.businessName.toLowerCase().replace(/\s+/g, '-')}-cover.jpg`,
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
  
  // Generate professionals for vendor based on services
  static generateProfessionals(vendorProfile: any, services: any[]): Professional[] {
    const serviceCategories = [...new Set(services.map(s => s.category))]
    const professionalCount = Math.min(Math.max(2, Math.ceil(services.length / 3)), 4)
    
    const professionals: Professional[] = []
    
    for (let i = 0; i < professionalCount; i++) {
      const baseNames = [
        'María', 'Carmen', 'Ana', 'Rosa', 'Lucía', 'Patricia', 'Sofia', 'Gabriela',
        'Ricardo', 'Carlos', 'Diego', 'Eduardo', 'Andrés', 'Gabriel', 'Jean Carlos'
      ]
      const lastNames = [
        'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Torres',
        'Flores', 'Rivera', 'Morales', 'Jiménez', 'Cruz', 'Valdez', 'Herrera'
      ]
      
      const firstName = baseNames[Math.floor(Math.random() * baseNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const name = `${firstName} ${lastName}`
      
      // Generate specialties based on service categories
      const specialties = this.generateSpecialties(serviceCategories, services)
      
      professionals.push({
        id: `${vendorProfile.id}-prof-${i + 1}`,
        name,
        image: getRandomProfessionalPortrait(),
        rating: +(4.2 + Math.random() * 0.7).toFixed(1),
        reviewCount: Math.floor(Math.random() * 150) + 50,
        yearsExperience: Math.floor(Math.random() * 10) + 3,
        monthlyBookings: Math.floor(Math.random() * 80) + 40,
        specialties,
        isTopRated: Math.random() > 0.6,
        nextAvailable: "Hoy 3:15 PM",
        bio: `${specialties[0]} especialista con ${Math.floor(Math.random() * 10) + 3} años de experiencia.`,
        recommendedAddons: []
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