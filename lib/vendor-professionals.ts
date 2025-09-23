import { getAllProfessionals, Professional } from "@/lib/getAllProfessionals"

export function getProfessionalsForVendor(vendorName: string): Professional[] {
  const allProfessionals = getAllProfessionals()

  return allProfessionals.filter(professional =>
    professional.vendor.name.toLowerCase() === vendorName.toLowerCase()
  )
}

export function getProfessionalsByVendorSlug(vendorSlug: string): Professional[] {
  const allProfessionals = getAllProfessionals()

  // Direct slug matching - much more reliable
  return allProfessionals.filter(professional =>
    professional.vendor.slug === vendorSlug
  )
}

// Generate sample transformations for a vendor based on their services
export function generateVendorTransformations(vendorName: string, services: any[]) {
  const transformations = [
    {
      id: `${vendorName}-transform-1`,
      before: "/transformations/before-1.jpg",
      after: "/transformations/after-1.jpg",
      title: "Transformación Completa",
      service: services[0]?.name || "Servicio de Belleza",
      professional: "María Fernández",
      testimonial: "¡Increíble resultado! Me siento completamente renovada.",
      customerName: "Ana García",
      rating: 5.0,
      duration: "2 horas"
    },
    {
      id: `${vendorName}-transform-2`,
      before: "/transformations/before-2.jpg",
      after: "/transformations/after-2.jpg",
      title: "Cambio de Look Dramático",
      service: services[1]?.name || "Cambio de Estilo",
      professional: "Carlos Mendoza",
      testimonial: "Superó todas mis expectativas. El equipo es muy profesional.",
      customerName: "Isabel Martínez",
      rating: 4.9,
      duration: "3 horas"
    },
    {
      id: `${vendorName}-transform-3`,
      before: "/transformations/before-3.jpg",
      after: "/transformations/after-3.jpg",
      title: "Renovación Natural",
      service: services[2]?.name || "Tratamiento de Belleza",
      professional: "Sofía Herrera",
      testimonial: "Mantuvo mi estilo natural pero con un toque muy elegante.",
      customerName: "Carmen López",
      rating: 4.8,
      duration: "1.5 horas"
    }
  ]

  return transformations.slice(0, Math.min(services.length, 3))
}