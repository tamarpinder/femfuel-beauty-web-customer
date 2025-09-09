// Default fallback images for different contexts
export const defaultImages = {
  // User/Profile defaults
  userAvatar: '/professionals/portraits/hair-stylist-maria.png',
  
  // Service category defaults
  hair: '/services/hair/modern-haircut.png',
  nails: '/services/nails/classic-manicure.png',
  makeup: '/services/makeup/natural-makeup.png',
  spa: '/services/spa/luxury-facial-treatment.png',
  lashes: '/services/lashes/lash-extensions.png',
  body: '/services/body/body-waxing.png',
  
  // Vendor defaults
  vendorLogo: '/vendors/logos/beauty-studio-logo.png',
  vendorCover: '/vendors/covers/modern-beauty-salon-interior.png',
  
  // Product defaults
  productImage: '/premium-gel-manicure.png',
  
  // General fallback
  placeholder: '/services/hair/modern-haircut.png'
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