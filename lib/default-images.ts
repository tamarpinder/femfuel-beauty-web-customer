// Default fallback images for different contexts
export const defaultImages = {
  // User/Profile defaults
  userAvatar: '/professionals/portraits/hair-stylist-maria.png',
  
  // Service category defaults
  hair: '/femfuel-logo.png',
  nails: '/femfuel-logo.png',
  makeup: '/femfuel-logo.png',
  spa: '/femfuel-logo.png',
  lashes: '/femfuel-logo.png',
  body: '/femfuel-logo.png',
  
  // Vendor defaults
  vendorLogo: '/vendors/logos/beauty-studio-logo.png',
  vendorCover: '/vendors/covers/modern-beauty-salon-interior.png',
  
  // Product defaults
  productImage: '/femfuel-logo.png',
  
  // General fallback
  placeholder: '/femfuel-logo.png'
}

export function getDefaultImage(context: string = 'general'): string {
  const contextLower = context.toLowerCase()
  
  // Check for specific context matches
  if (contextLower.includes('user') || contextLower.includes('avatar')) {
    return defaultImages.userAvatar
  }
  if (contextLower.includes('vendor') && contextLower.includes('logo')) {
    return defaultImages.vendorLogo
  }
  if (contextLower.includes('vendor') && contextLower.includes('cover')) {
    return defaultImages.vendorCover
  }
  if (contextLower.includes('product')) {
    return defaultImages.productImage
  }
  
  // Check for service categories
  if (contextLower.includes('hair') || contextLower.includes('cabello')) {
    return defaultImages.hair
  }
  if (contextLower.includes('nail') || contextLower.includes('uña')) {
    return defaultImages.nails
  }
  if (contextLower.includes('makeup') || contextLower.includes('maquillaje')) {
    return defaultImages.makeup
  }
  if (contextLower.includes('spa') || contextLower.includes('facial')) {
    return defaultImages.spa
  }
  if (contextLower.includes('lash') || contextLower.includes('pestaña')) {
    return defaultImages.lashes
  }
  if (contextLower.includes('body') || contextLower.includes('cuerpo')) {
    return defaultImages.body
  }
  
  // General fallback
  return defaultImages.placeholder
}