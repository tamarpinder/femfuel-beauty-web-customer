// Comprehensive Mock Data for FemFuel Beauty Platform
// 25 Vendors, 50 Customers, 100 Services
// Synchronized across Customer, Vendor, and Admin applications

import { 
  VendorProfile, 
  CustomerProfile, 
  Service, 
  Booking, 
  Review, 
  User, 
  Category,
  BusinessHours 
} from './types'

// Dominican locations for realistic data
const dominicanLocations = [
  { district: 'Piantini', city: 'Santo Domingo' },
  { district: 'Zona Colonial', city: 'Santo Domingo' },
  { district: 'Bella Vista', city: 'Santo Domingo' },
  { district: 'Naco', city: 'Santo Domingo' },
  { district: 'Gazcue', city: 'Santo Domingo' },
  { district: 'Evaristo Morales', city: 'Santo Domingo' },
  { district: 'Los Cacicazgos', city: 'Santo Domingo' },
  { district: 'Serrallés', city: 'Santo Domingo' },
  { district: 'Mirador Sur', city: 'Santo Domingo' },
  { district: 'Arroyo Hondo', city: 'Santo Domingo' }
]

// Service Categories
export const categories: Category[] = [
  { id: 'nails', name: 'Uñas', icon: '💅', description: 'Manicures, pedicures, arte de uñas', serviceCount: 25, isActive: true },
  { id: 'hair', name: 'Cabello', icon: '💇‍♀️', description: 'Cortes, peinados, coloración', serviceCount: 30, isActive: true },
  { id: 'makeup', name: 'Maquillaje', icon: '💄', description: 'Servicios profesionales de maquillaje', serviceCount: 20, isActive: true },
  { id: 'spa', name: 'Spa y Cuerpo', icon: '🧖‍♀️', description: 'Faciales, masajes, tratamientos corporales', serviceCount: 15, isActive: true },
  { id: 'lashes', name: 'Pestañas y Cejas', icon: '👁️', description: 'Extensiones de pestañas, perfilado de cejas', serviceCount: 10, isActive: true }
]

// Generate Users (Admin, Vendors, Customers)
export const users: User[] = [
  // Admin user
  {
    id: 'admin-001',
    email: 'admin@femfuel.com',
    name: 'Admin User',
    avatar: '/admin-avatar.jpg',
    phone: '+1-809-555-0001',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  }
]

// Vendor Users (25 vendors)
const vendorUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: `vendor-${String(i + 1).padStart(3, '0')}`,
  email: `vendor${i + 1}@femfuel.com`,
  name: `Vendor User ${i + 1}`,
  avatar: `/vendors/logos/vendor-${i + 1}-logo.png`,
  phone: `+1-809-555-${String(1000 + i).slice(-4)}`,
  role: 'vendor' as const,
  status: 'active' as const,
  createdAt: new Date(2024, 0, 1 + i).toISOString(),
  updatedAt: new Date(2024, 11, 1).toISOString()
}))

// Customer Users (50 customers)  
const customerUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `customer-${String(i + 1).padStart(3, '0')}`,
  email: `customer${i + 1}@example.com`,
  name: `Customer User ${i + 1}`,
  avatar: `/professionals/portraits/customer-${i + 1}.png`,
  phone: `+1-809-555-${String(2000 + i).slice(-4)}`,
  role: 'customer' as const,
  status: 'active' as const,
  createdAt: new Date(2024, Math.floor(i / 4), 1 + (i % 30)).toISOString(),
  updatedAt: new Date(2024, 11, 1).toISOString()
}))

users.push(...vendorUsers, ...customerUsers)

// Standard business hours
const standardHours: BusinessHours = {
  monday: { open: '09:00', close: '18:00', isOpen: true },
  tuesday: { open: '09:00', close: '18:00', isOpen: true },
  wednesday: { open: '09:00', close: '18:00', isOpen: true },
  thursday: { open: '09:00', close: '18:00', isOpen: true },
  friday: { open: '09:00', close: '19:00', isOpen: true },
  saturday: { open: '08:00', close: '17:00', isOpen: true },
  sunday: { open: '10:00', close: '16:00', isOpen: false }
}

// Vendor business names and specialties
const vendorBusinessData = [
  { name: 'Glamour Studio RD', categories: ['makeup', 'hair'], specialties: ['Bridal Makeup', 'Color Correction'] },
  { name: 'Nails Paradise', categories: ['nails'], specialties: ['Gel Extensions', 'Nail Art'] },
  { name: 'Hair Salon Elite', categories: ['hair'], specialties: ['Balayage', 'Keratin Treatments'] },
  { name: 'Spa Serenity', categories: ['spa'], specialties: ['Hot Stone Massage', 'Anti-aging Facials'] },
  { name: 'Lash Boutique DR', categories: ['lashes'], specialties: ['Volume Lashes', 'Microblading'] },
  { name: 'Beauty Corner', categories: ['nails', 'makeup'], specialties: ['Party Looks', 'Gel Manicures'] },
  { name: 'Dominican Hair Studio', categories: ['hair'], specialties: ['Natural Hair Care', 'Dominican Blowouts'] },
  { name: 'Radiant Skin Spa', categories: ['spa'], specialties: ['Chemical Peels', 'Hydrafacials'] },
  { name: 'Perfect Nails Salon', categories: ['nails'], specialties: ['French Manicures', 'Pedicures'] },
  { name: 'Makeup Artistry RD', categories: ['makeup'], specialties: ['Editorial Makeup', 'Special Effects'] },
  { name: 'Curly Hair Haven', categories: ['hair'], specialties: ['Curly Hair Cuts', 'Deep Conditioning'] },
  { name: 'Zen Wellness Spa', categories: ['spa'], specialties: ['Aromatherapy', 'Body Wraps'] },
  { name: 'Brow & Lash Bar', categories: ['lashes'], specialties: ['Brow Lamination', 'Lash Lifts'] },
  { name: 'Tropical Beauty', categories: ['makeup', 'nails'], specialties: ['Tropical Themes', 'Beach Looks'] },
  { name: 'Hair Revolution', categories: ['hair'], specialties: ['Hair Extensions', 'Color Transformations'] },
  { name: 'Luxury Nails Studio', categories: ['nails'], specialties: ['Luxury Treatments', 'Nail Jewelry'] },
  { name: 'Glow Spa & Beauty', categories: ['spa', 'makeup'], specialties: ['Skin Rejuvenation', 'Glowing Makeup'] },
  { name: 'Modern Hair Co.', categories: ['hair'], specialties: ['Modern Cuts', 'Hair Styling'] },
  { name: 'Blissful Beauty', categories: ['spa', 'nails'], specialties: ['Relaxation Treatments', 'Spa Manicures'] },
  { name: 'Chic Makeup Studio', categories: ['makeup'], specialties: ['Fashion Makeup', 'Photo Shoots'] },
  { name: 'Hair & Soul', categories: ['hair'], specialties: ['Spiritual Hair Care', 'Natural Products'] },
  { name: 'Crystal Clear Spa', categories: ['spa'], specialties: ['Crystal Healing', 'Clear Skin Facials'] },
  { name: 'Lash Extensions Pro', categories: ['lashes'], specialties: ['Mega Volume', 'Colored Lashes'] },
  { name: 'Dominican Beauty House', categories: ['hair', 'makeup', 'nails'], specialties: ['Full Service', 'Dominican Techniques'] },
  { name: 'Serene Beauty Spa', categories: ['spa', 'lashes'], specialties: ['Peaceful Treatments', 'Natural Lashes'] }
]

// Generate Vendor Profiles (25 vendors)
export const vendorProfiles: VendorProfile[] = vendorUsers.map((user, i) => ({
  id: `vendor-profile-${String(i + 1).padStart(3, '0')}`,
  userId: user.id,
  user,
  businessName: vendorBusinessData[i].name,
  description: `Professional beauty services in ${dominicanLocations[i % dominicanLocations.length].district}. Specialized in ${vendorBusinessData[i].specialties.join(', ')}.`,
  categories: vendorBusinessData[i].categories,
  location: {
    address: `${100 + i} Calle Principal`,
    district: dominicanLocations[i % dominicanLocations.length].district,
    city: dominicanLocations[i % dominicanLocations.length].city,
    coordinates: {
      lat: 18.4861 + (Math.random() - 0.5) * 0.1,
      lng: -69.9312 + (Math.random() - 0.5) * 0.1
    }
  },
  businessHours: standardHours,
  rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10,
  reviewCount: Math.floor(Math.random() * 200) + 50,
  isVerified: i === 0 ? true : Math.random() > 0.2, // First vendor always verified
  isActive: true,
  joinedDate: user.createdAt,
  portfolio: Array.from({ length: 6 }, (_, j) => ({
    id: `media-${i}-${j}`,
    url: `/professionals/portfolios/portfolio-${i + 1}-${j + 1}.png`,
    alt: `${vendorBusinessData[i].name} portfolio image ${j + 1}`,
    type: 'image' as const
  })),
  specialties: vendorBusinessData[i].specialties,
  yearsExperience: Math.floor(Math.random() * 15) + 2,
  certifications: ['Licensed Cosmetologist', 'Safety Certified'],
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
}))

// Generate Customer Profiles (50 customers)
const dominicanNames = [
  'María García', 'Ana Rodríguez', 'Carmen López', 'Rosa Martínez', 'Isabel Pérez',
  'Patricia Santos', 'Lucía Hernández', 'Sofía González', 'Valentina Cruz', 'Camila Reyes',
  'Gabriela Jiménez', 'Andrea Ruiz', 'Alejandra Morales', 'Daniela Vargas', 'Carolina Castillo',
  'Fernanda Guerrero', 'Natalia Mendoza', 'Valeria Ortiz', 'Paola Ramos', 'Diana Silva',
  'Adriana Torres', 'Mónica Flores', 'Claudia Aguilar', 'Beatriz Delgado', 'Esperanza Vega',
  'Marisol Campos', 'Yolanda Rivera', 'Celeste Moreno', 'Amparo Sánchez', 'Dolores Herrera',
  'Consuelo Medina', 'Remedios Castro', 'Milagros Román', 'Soledad Núñez', 'Pilar Guzmán',
  'Inmaculada Peña', 'Asunción Morales', 'Concepción Díaz', 'Natividad Luna', 'Presentación Gil',
  'Encarnación Vázquez', 'Purificación Serrano', 'Sacramento Blanco', 'Trinidad Rubio', 'Nieves Prieto',
  'Refugio Ortega', 'Amparo Garrido', 'Remedios Morales', 'Milagros Iglesias', 'Soledad Fernández'
]

export const customerProfiles: CustomerProfile[] = customerUsers.map((user, i) => {
  const locationData = dominicanLocations[i % dominicanLocations.length]
  return {
    id: `customer-profile-${String(i + 1).padStart(3, '0')}`,
    userId: user.id,
    user: { ...user, name: dominicanNames[i] },
    preferences: {
      categories: categories.slice(0, Math.floor(Math.random() * 3) + 1).map(c => c.id),
      priceRange: { 
        min: Math.floor(Math.random() * 1000) + 500, 
        max: Math.floor(Math.random() * 5000) + 2000 
      },
      location: {
        address: `${100 + i} Calle Principal`,
        district: locationData.district,
        city: locationData.city
      }
    },
    loyaltyLevel: ['bronze', 'silver', 'gold', 'platinum'][Math.floor(Math.random() * 4)] as any,
    totalBookings: Math.floor(Math.random() * 20) + 1,
    totalSpent: Math.floor(Math.random() * 10000) + 1000,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
})

// Curated Services (45 unique services with proper vendor assignments)
// Each service is unique and assigned to specific vendors for realistic experience

const curatedServices = [
  // Hair Services (12 services)
  { vendorId: 'vendor-profile-001', name: 'Alisado Dominicano', category: 'hair', price: 1500, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-003', name: 'Balayage', category: 'hair', price: 4500, duration: 180, isPopular: true },
  { vendorId: 'vendor-profile-011', name: 'Tratamiento de Keratina', category: 'hair', price: 6000, duration: 180, isPopular: true },
  { vendorId: 'vendor-profile-001', name: 'Corte de Cabello', category: 'hair', price: 1800, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-003', name: 'Tinte de Cabello', category: 'hair', price: 4000, duration: 150, isPopular: false },
  { vendorId: 'vendor-profile-011', name: 'Peinado de Boda', category: 'hair', price: 3500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-015', name: 'Corte de Cabello Rizado', category: 'hair', price: 2200, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-015', name: 'Tratamiento Capilar', category: 'hair', price: 2800, duration: 90, isPopular: false },
  { vendorId: 'vendor-profile-001', name: 'Extensiones de Cabello', category: 'hair', price: 3200, duration: 120, isPopular: false },
  { vendorId: 'vendor-profile-003', name: 'Mechas Californianas', category: 'hair', price: 3800, duration: 140, isPopular: false },
  { vendorId: 'vendor-profile-011', name: 'Alisado Químico', category: 'hair', price: 3000, duration: 100, isPopular: false },
  { vendorId: 'vendor-profile-015', name: 'Mascarilla Capilar', category: 'hair', price: 1800, duration: 60, isPopular: false },

  // Nail Services (10 services)
  { vendorId: 'vendor-profile-002', name: 'Manicure de Gel', category: 'nails', price: 1200, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-002', name: 'Arte de Uñas Tropical', category: 'nails', price: 1800, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Manicure Clásico', category: 'nails', price: 800, duration: 45, isPopular: false },
  { vendorId: 'vendor-profile-002', name: 'Extensiones de Acrílico', category: 'nails', price: 2000, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Pedicure Spa', category: 'nails', price: 1200, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-002', name: 'Manicure Exprés', category: 'nails', price: 600, duration: 30, isPopular: false },
  { vendorId: 'vendor-profile-013', name: 'Manicure de Lujo', category: 'nails', price: 1600, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-013', name: 'Pedicure Spa Deluxe', category: 'nails', price: 1800, duration: 90, isPopular: false },
  { vendorId: 'vendor-profile-002', name: 'Manicure Francés Moderno', category: 'nails', price: 1400, duration: 65, isPopular: false },
  { vendorId: 'vendor-profile-013', name: 'Reparación de Uñas', category: 'nails', price: 500, duration: 20, isPopular: false },

  // Makeup Services (8 services)
  { vendorId: 'vendor-profile-001', name: 'Maquillaje de Novia', category: 'makeup', price: 5000, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-010', name: 'Maquillaje Natural', category: 'makeup', price: 2000, duration: 45, isPopular: true },
  { vendorId: 'vendor-profile-001', name: 'Maquillaje de Gala', category: 'makeup', price: 3500, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-010', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 2800, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-014', name: 'Maquillaje para Fotografía', category: 'makeup', price: 3200, duration: 70, isPopular: false },
  { vendorId: 'vendor-profile-018', name: 'Maquillaje Caribeño', category: 'makeup', price: 2500, duration: 50, isPopular: false },
  { vendorId: 'vendor-profile-010', name: 'Maquillaje con Aerógrafo', category: 'makeup', price: 4000, duration: 80, isPopular: false },
  { vendorId: 'vendor-profile-014', name: 'Maquillaje de Ocasión Especial', category: 'makeup', price: 3000, duration: 65, isPopular: false },

  // Spa Services (8 services)
  { vendorId: 'vendor-profile-004', name: 'Facial de Lujo', category: 'spa', price: 4200, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-012', name: 'Masaje Relajante', category: 'spa', price: 3500, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-004', name: 'Limpieza Facial Profunda', category: 'spa', price: 3000, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-012', name: 'Aromaterapia', category: 'spa', price: 2800, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-016', name: 'Masaje con Piedras Calientes', category: 'spa', price: 4000, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-012', name: 'Masaje Terapéutico', category: 'spa', price: 3800, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-004', name: 'Microdermoabrasión', category: 'spa', price: 3600, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-016', name: 'Masaje de Pareja', category: 'spa', price: 6000, duration: 90, isPopular: false },

  // Lash & Brow Services (7 services)
  { vendorId: 'vendor-profile-005', name: 'Extensiones de Pestañas', category: 'lashes', price: 2800, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Volumen Ruso', category: 'lashes', price: 3500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-005', name: 'Pestañas Clásicas', category: 'lashes', price: 2200, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-005', name: 'Tinte de Pestañas', category: 'lashes', price: 600, duration: 25, isPopular: false },
  { vendorId: 'vendor-profile-017', name: 'Microblading de Cejas', category: 'lashes', price: 4500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Lifting de Pestañas', category: 'lashes', price: 1800, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-005', name: 'Diseño de Cejas', category: 'lashes', price: 800, duration: 30, isPopular: false }
]

export const services: Service[] = []
let serviceCounter = 1

curatedServices.forEach(serviceData => {
  const vendor = vendorProfiles.find(v => v.id === serviceData.vendorId)
  if (!vendor) return
  
  services.push({
    id: `service-${String(serviceCounter).padStart(3, '0')}`,
    vendorId: serviceData.vendorId,
    vendor,
    name: serviceData.name,
    description: `Professional ${serviceData.name.toLowerCase()} service at ${vendor.businessName}. Expert care with attention to detail.`,
    category: serviceData.category,
    price: serviceData.price,
    duration: serviceData.duration,
    images: Array.from({ length: 3 }, (_, j) => ({
      id: `service-media-${serviceCounter}-${j}`,
      url: `/services/${serviceData.category}/${serviceData.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}.png`,
      alt: `${serviceData.name} at ${vendor.businessName}`,
      type: 'image' as const
    })),
    isPopular: serviceData.isPopular,
    isActive: true,
    createdAt: vendor.createdAt,
    updatedAt: vendor.updatedAt
  })
  serviceCounter++
})

// Generate sample bookings (200 bookings)
export const bookings: Booking[] = []
for (let i = 0; i < 200; i++) {
  const customer = customerProfiles[Math.floor(Math.random() * customerProfiles.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  
  // Skip if service is undefined or doesn't have a vendor
  if (!service || !service.vendor) continue
  
  const vendor = service.vendor
  
  const bookingDate = new Date()
  bookingDate.setDate(bookingDate.getDate() - Math.floor(Math.random() * 30))
  
  const statuses = ['completed', 'confirmed', 'pending', 'cancelled']
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  
  bookings.push({
    id: `booking-${String(i + 1).padStart(3, '0')}`,
    customerId: customer.id,
    customer,
    vendorId: vendor.id,
    vendor,
    serviceId: service.id,
    service,
    scheduledDate: bookingDate.toISOString().split('T')[0],
    scheduledTime: `${Math.floor(Math.random() * 8) + 9}:00`,
    status: status as any,
    totalAmount: service.price,
    notes: Math.random() > 0.7 ? 'Special requests noted' : undefined,
    createdAt: bookingDate.toISOString(),
    updatedAt: bookingDate.toISOString()
  })
}

// Generate Reviews (150 reviews for completed bookings)
export const reviews: Review[] = []
const completedBookings = bookings.filter(b => b.status === 'completed')

completedBookings.forEach((booking, i) => {
  if (i < 150 && Math.random() > 0.3) { // 70% of completed bookings have reviews
    const reviewTexts = [
      'Excellent service! Very professional and the results exceeded my expectations.',
      'Great experience, will definitely book again. The staff was friendly and skilled.',
      'Amazing work! The atmosphere was relaxing and the service was top-notch.',
      'Very satisfied with the results. Clean facility and professional service.',
      'Outstanding! The best beauty service I\'ve had in Santo Domingo.',
      'Wonderful experience from start to finish. Highly recommended!'
    ]
    
    reviews.push({
      id: `review-${String(reviews.length + 1).padStart(3, '0')}`,
      bookingId: booking.id,
      booking,
      customerId: booking.customerId,
      customer: booking.customer,
      vendorId: booking.vendorId,
      vendor: booking.vendor,
      serviceId: booking.serviceId,
      service: booking.service,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 star ratings mostly
      comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      createdAt: new Date(booking.scheduledDate).toISOString(),
      updatedAt: new Date(booking.scheduledDate).toISOString()
    })
  }
})

// Export all data
export const mockData = {
  users,
  vendorProfiles,
  customerProfiles,
  services,
  bookings,
  reviews,
  categories
}

export default mockData