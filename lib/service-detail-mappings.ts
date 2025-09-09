// Service detail image mappings for process galleries

export const serviceDetailMap: Record<string, string[]> = {
  // Hair services
  'balayage': ['/services/hair/hair-coloring-detail-1.png'],
  'corte': ['/services/hair/hair-cutting-detail-1.png'],
  'peinado': ['/services/hair/hair-styling-detail-1.png'],
  'color': ['/services/hair/hair-coloring-detail-1.png'],
  'blowout': ['/services/hair/hair-styling-detail-1.png'],
  'cabello': ['/services/hair/hair-styling-detail-1.png'],

  // Nail services  
  'manicure': ['/services/nails/gel-manicure-detail-1.png', '/services/nails/nail-shaping-detail-1.png'],
  'uña': ['/services/nails/nail-art-detail-1.png'],
  'nail': ['/services/nails/nail-art-detail-1.png'],
  'arte': ['/services/nails/nail-art-detail-1.png'],
  'gel': ['/services/nails/gel-manicure-detail-1.png'],

  // Makeup services
  'maquillaje': ['/services/makeup/foundation-application-detail-1.png', '/services/makeup/eyeshadow-application-detail-1.png'],
  'makeup': ['/services/makeup/foundation-application-detail-1.png', '/services/makeup/eyeshadow-application-detail-1.png'],
  'labios': ['/services/makeup/lipstick-application-detail-1.png'],
  'ojos': ['/services/makeup/eyeshadow-application-detail-1.png'],
  'base': ['/services/makeup/foundation-application-detail-1.png'],

  // Spa services
  'facial': ['/services/spa/facial-mask-detail-1.png', '/services/spa/facial-massage-detail-1.png'],
  'masaje': ['/services/spa/facial-massage-detail-1.png'],
  'limpieza': ['/services/spa/skin-cleansing-detail-1.png'],
  'tratamiento': ['/services/spa/facial-mask-detail-1.png'],

  // Lash services
  'pestañas': ['/services/lashes/lash-extension-detail-1.png'],
  'extensiones': ['/services/lashes/lash-extension-detail-1.png'],
  'lash': ['/services/lashes/lash-extension-detail-1.png'],
  'lifting': ['/services/lashes/lash-lift-detail-1.png'],
  'tinte': ['/services/lashes/lash-tint-detail-1.png']
}

export function getServiceDetailImages(serviceName: string): string[] {
  const normalized = serviceName.toLowerCase()
  
  // Check for exact match first
  for (const [key, images] of Object.entries(serviceDetailMap)) {
    if (normalized.includes(key)) {
      return images
    }
  }
  
  // Default fallback based on common service patterns
  if (normalized.includes('color') || normalized.includes('tinte') || normalized.includes('balayage')) {
    return ['/services/hair/hair-coloring-detail-1.png']
  }
  if (normalized.includes('corte') || normalized.includes('cut')) {
    return ['/services/hair/hair-cutting-detail-1.png']
  }
  if (normalized.includes('manicure') || normalized.includes('uña')) {
    return ['/services/nails/gel-manicure-detail-1.png']
  }
  if (normalized.includes('makeup') || normalized.includes('maquillaje')) {
    return ['/services/makeup/foundation-application-detail-1.png']
  }
  if (normalized.includes('facial') || normalized.includes('spa')) {
    return ['/services/spa/facial-mask-detail-1.png']
  }
  if (normalized.includes('pestaña') || normalized.includes('lash')) {
    return ['/services/lashes/lash-extension-detail-1.png']
  }
  
  return []
}