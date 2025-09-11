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

// Vendor Users (24 vendors)
const vendorUsers: User[] = Array.from({ length: 24 }, (_, i) => ({
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
  { name: 'Trendy Hair', categories: ['hair'], specialties: ['Curly Hair Cuts', 'Deep Conditioning'] },
  { name: 'Zen Wellness Spa', categories: ['spa'], specialties: ['Aromatherapy', 'Body Wraps'] },
  { name: 'Lashes & Brows', categories: ['lashes'], specialties: ['Brow Lamination', 'Lash Lifts'] },
  { name: 'Belleza Natural', categories: ['makeup', 'nails'], specialties: ['Tropical Themes', 'Beach Looks'] },
  { name: 'Hair Revolution', categories: ['hair'], specialties: ['Hair Extensions', 'Color Transformations'] },
  { name: 'Luxury Nails Studio', categories: ['nails'], specialties: ['Luxury Treatments', 'Nail Jewelry'] },
  { name: 'Glow Spa & Beauty', categories: ['spa', 'makeup'], specialties: ['Skin Rejuvenation', 'Glowing Makeup'] },
  { name: 'Modern Hair Co.', categories: ['hair'], specialties: ['Modern Cuts', 'Hair Styling'] },
  { name: 'Blissful Beauty', categories: ['spa', 'nails'], specialties: ['Relaxation Treatments', 'Spa Manicures'] },
  { name: 'Chic Makeup Studio', categories: ['makeup'], specialties: ['Fashion Makeup', 'Photo Shoots'] },
  { name: 'Hair & Soul', categories: ['hair'], specialties: ['Spiritual Hair Care', 'Natural Products'] },
  { name: 'Crystal Clear Spa', categories: ['spa'], specialties: ['Crystal Healing', 'Clear Skin Facials'] },
  { name: 'Lash Extensions Pro', categories: ['lashes'], specialties: ['Mega Volume', 'Colored Lashes'] },
  { name: 'Dominican Beauty House', categories: ['hair', 'makeup', 'nails'], specialties: ['Full Service', 'Dominican Techniques'] }
]

// Generate Vendor Profiles (24 vendors)
export const vendorProfiles: VendorProfile[] = vendorUsers.slice(0, 24).map((user, i) => ({
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
// Realistic marketplace services - Multiple vendors offering same services with price competition

const curatedServices = [
  // HAIR SERVICES - 8 hair vendors: 001, 003, 007, 011, 015, 018, 021, 024
  
  // Corte de Cabello (offered by all hair vendors - most basic service)
  { vendorId: 'vendor-profile-001', name: 'Corte de Cabello', category: 'hair', price: 1800, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-003', name: 'Corte de Cabello', category: 'hair', price: 2500, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-007', name: 'Corte de Cabello', category: 'hair', price: 1500, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-011', name: 'Corte de Cabello', category: 'hair', price: 2200, duration: 65, isPopular: true },
  { vendorId: 'vendor-profile-015', name: 'Corte de Cabello', category: 'hair', price: 1400, duration: 55, isPopular: true },
  { vendorId: 'vendor-profile-018', name: 'Corte de Cabello', category: 'hair', price: 2000, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-021', name: 'Corte de Cabello', category: 'hair', price: 1600, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Corte de Cabello', category: 'hair', price: 2800, duration: 75, isPopular: true },

  // Tinte de Cabello (offered by 6 vendors)
  { vendorId: 'vendor-profile-001', name: 'Tinte de Cabello', category: 'hair', price: 3000, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-003', name: 'Tinte de Cabello', category: 'hair', price: 4000, duration: 150, isPopular: true },
  { vendorId: 'vendor-profile-011', name: 'Tinte de Cabello', category: 'hair', price: 3500, duration: 130, isPopular: true },
  { vendorId: 'vendor-profile-015', name: 'Tinte de Cabello', category: 'hair', price: 2800, duration: 110, isPopular: true },
  { vendorId: 'vendor-profile-018', name: 'Tinte de Cabello', category: 'hair', price: 3200, duration: 125, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Tinte de Cabello', category: 'hair', price: 4200, duration: 160, isPopular: true },

  // Alisado Dominicano (premium service - 4 vendors)
  { vendorId: 'vendor-profile-001', name: 'Alisado Dominicano', category: 'hair', price: 1500, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-007', name: 'Alisado Dominicano', category: 'hair', price: 1800, duration: 100, isPopular: true },
  { vendorId: 'vendor-profile-015', name: 'Alisado Dominicano', category: 'hair', price: 1400, duration: 85, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Alisado Dominicano', category: 'hair', price: 2200, duration: 120, isPopular: true },

  // Balayage (premium service - 3 vendors)
  { vendorId: 'vendor-profile-003', name: 'Balayage', category: 'hair', price: 4500, duration: 180, isPopular: true },
  { vendorId: 'vendor-profile-011', name: 'Balayage', category: 'hair', price: 5200, duration: 200, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Balayage', category: 'hair', price: 5800, duration: 220, isPopular: true },

  // Tratamiento de Keratina (premium - 3 vendors)
  { vendorId: 'vendor-profile-003', name: 'Tratamiento de Keratina', category: 'hair', price: 5500, duration: 180, isPopular: true },
  { vendorId: 'vendor-profile-011', name: 'Tratamiento de Keratina', category: 'hair', price: 6000, duration: 180, isPopular: true },
  { vendorId: 'vendor-profile-018', name: 'Tratamiento de Keratina', category: 'hair', price: 4800, duration: 160, isPopular: true },

  // Additional Hair Services
  { vendorId: 'vendor-profile-015', name: 'Corte de Cabello Rizado', category: 'hair', price: 2200, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-021', name: 'Corte de Cabello Rizado', category: 'hair', price: 1900, duration: 70, isPopular: false },
  { vendorId: 'vendor-profile-015', name: 'Tratamiento Capilar', category: 'hair', price: 2800, duration: 90, isPopular: false },
  { vendorId: 'vendor-profile-018', name: 'Tratamiento Capilar', category: 'hair', price: 3200, duration: 100, isPopular: false },
  { vendorId: 'vendor-profile-021', name: 'Tratamiento Capilar', category: 'hair', price: 2500, duration: 85, isPopular: false },

  // NAIL SERVICES - 6 nail vendors: 002, 006, 009, 014, 016, 019, 024
  
  // Manicure de Gel (offered by all nail vendors)
  { vendorId: 'vendor-profile-002', name: 'Manicure de Gel', category: 'nails', price: 1200, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-006', name: 'Manicure de Gel', category: 'nails', price: 1400, duration: 65, isPopular: true },
  { vendorId: 'vendor-profile-009', name: 'Manicure de Gel', category: 'nails', price: 1100, duration: 55, isPopular: true },
  { vendorId: 'vendor-profile-014', name: 'Manicure de Gel', category: 'nails', price: 1600, duration: 70, isPopular: true },
  { vendorId: 'vendor-profile-016', name: 'Manicure de Gel', category: 'nails', price: 1300, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Manicure de Gel', category: 'nails', price: 1800, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Manicure de Gel', category: 'nails', price: 1500, duration: 65, isPopular: true },

  // Manicure Clásico (offered by 5 vendors)
  { vendorId: 'vendor-profile-002', name: 'Manicure Clásico', category: 'nails', price: 800, duration: 45, isPopular: true },
  { vendorId: 'vendor-profile-006', name: 'Manicure Clásico', category: 'nails', price: 900, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-009', name: 'Manicure Clásico', category: 'nails', price: 700, duration: 40, isPopular: true },
  { vendorId: 'vendor-profile-014', name: 'Manicure Clásico', category: 'nails', price: 1000, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Manicure Clásico', category: 'nails', price: 1100, duration: 55, isPopular: true },

  // Pedicure Spa (offered by 4 vendors)
  { vendorId: 'vendor-profile-006', name: 'Pedicure Spa', category: 'nails', price: 1200, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-009', name: 'Pedicure Spa', category: 'nails', price: 1400, duration: 70, isPopular: true },
  { vendorId: 'vendor-profile-016', name: 'Pedicure Spa', category: 'nails', price: 1600, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Pedicure Spa', category: 'nails', price: 1800, duration: 80, isPopular: true },

  // Premium Nail Services
  { vendorId: 'vendor-profile-002', name: 'Arte de Uñas Tropical', category: 'nails', price: 1800, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-014', name: 'Arte de Uñas Tropical', category: 'nails', price: 2200, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Arte de Uñas Tropical', category: 'nails', price: 2500, duration: 95, isPopular: true },
  { vendorId: 'vendor-profile-002', name: 'Extensiones de Acrílico', category: 'nails', price: 2000, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-016', name: 'Extensiones de Acrílico', category: 'nails', price: 2400, duration: 100, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Extensiones de Acrílico', category: 'nails', price: 2800, duration: 110, isPopular: true },

  // MAKEUP SERVICES - 5 makeup vendors: 001, 006, 010, 014, 017, 020, 024
  
  // Maquillaje Natural (offered by all makeup vendors)
  { vendorId: 'vendor-profile-001', name: 'Maquillaje Natural', category: 'makeup', price: 2500, duration: 45, isPopular: true },
  { vendorId: 'vendor-profile-006', name: 'Maquillaje Natural', category: 'makeup', price: 2000, duration: 40, isPopular: true },
  { vendorId: 'vendor-profile-010', name: 'Maquillaje Natural', category: 'makeup', price: 2200, duration: 45, isPopular: true },
  { vendorId: 'vendor-profile-014', name: 'Maquillaje Natural', category: 'makeup', price: 2800, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Maquillaje Natural', category: 'makeup', price: 3000, duration: 55, isPopular: true },
  { vendorId: 'vendor-profile-020', name: 'Maquillaje Natural', category: 'makeup', price: 1800, duration: 40, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Maquillaje Natural', category: 'makeup', price: 3200, duration: 60, isPopular: true },

  // Maquillaje Ejecutivo (offered by 5 vendors)
  { vendorId: 'vendor-profile-001', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 3000, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-010', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 2800, duration: 55, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 3500, duration: 65, isPopular: true },
  { vendorId: 'vendor-profile-020', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 2600, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Maquillaje Ejecutivo', category: 'makeup', price: 3800, duration: 70, isPopular: true },

  // Premium Makeup Services
  { vendorId: 'vendor-profile-001', name: 'Maquillaje de Novia', category: 'makeup', price: 5000, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Maquillaje de Novia', category: 'makeup', price: 6500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-024', name: 'Maquillaje de Novia', category: 'makeup', price: 7000, duration: 130, isPopular: true },
  { vendorId: 'vendor-profile-001', name: 'Maquillaje de Gala', category: 'makeup', price: 3500, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-014', name: 'Maquillaje de Gala', category: 'makeup', price: 4200, duration: 85, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Maquillaje de Gala', category: 'makeup', price: 4800, duration: 90, isPopular: true },

  // SPA SERVICES - 5 spa vendors: 004, 008, 012, 017, 019, 022
  
  // Masaje Relajante (offered by all spa vendors)
  { vendorId: 'vendor-profile-004', name: 'Masaje Relajante', category: 'spa', price: 3500, duration: 60, isPopular: true },
  { vendorId: 'vendor-profile-008', name: 'Masaje Relajante', category: 'spa', price: 3200, duration: 55, isPopular: true },
  { vendorId: 'vendor-profile-012', name: 'Masaje Relajante', category: 'spa', price: 3800, duration: 65, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Masaje Relajante', category: 'spa', price: 4000, duration: 70, isPopular: true },
  { vendorId: 'vendor-profile-019', name: 'Masaje Relajante', category: 'spa', price: 2900, duration: 50, isPopular: true },
  { vendorId: 'vendor-profile-022', name: 'Masaje Relajante', category: 'spa', price: 3600, duration: 60, isPopular: true },

  // Limpieza Facial Profunda (offered by 4 vendors)
  { vendorId: 'vendor-profile-004', name: 'Limpieza Facial Profunda', category: 'spa', price: 3000, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-008', name: 'Limpieza Facial Profunda', category: 'spa', price: 2800, duration: 70, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Limpieza Facial Profunda', category: 'spa', price: 3500, duration: 80, isPopular: true },
  { vendorId: 'vendor-profile-022', name: 'Limpieza Facial Profunda', category: 'spa', price: 3200, duration: 75, isPopular: true },

  // Premium Spa Services
  { vendorId: 'vendor-profile-004', name: 'Facial de Lujo', category: 'spa', price: 4200, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-017', name: 'Facial de Lujo', category: 'spa', price: 5000, duration: 100, isPopular: true },
  { vendorId: 'vendor-profile-022', name: 'Facial de Lujo', category: 'spa', price: 4800, duration: 95, isPopular: true },
  { vendorId: 'vendor-profile-012', name: 'Masaje con Piedras Calientes', category: 'spa', price: 4000, duration: 75, isPopular: false },
  { vendorId: 'vendor-profile-017', name: 'Masaje con Piedras Calientes', category: 'spa', price: 4500, duration: 80, isPopular: false },
  { vendorId: 'vendor-profile-022', name: 'Masaje con Piedras Calientes', category: 'spa', price: 4200, duration: 75, isPopular: false },

  // LASH & BROW SERVICES - 3 lash vendors: 005, 013, 023
  
  // Extensiones de Pestañas (offered by all lash vendors)
  { vendorId: 'vendor-profile-005', name: 'Extensiones de Pestañas', category: 'lashes', price: 2800, duration: 90, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Extensiones de Pestañas', category: 'lashes', price: 3200, duration: 100, isPopular: true },
  { vendorId: 'vendor-profile-023', name: 'Extensiones de Pestañas', category: 'lashes', price: 3600, duration: 110, isPopular: true },

  // Pestañas Clásicas (offered by all lash vendors)
  { vendorId: 'vendor-profile-005', name: 'Pestañas Clásicas', category: 'lashes', price: 2200, duration: 75, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Pestañas Clásicas', category: 'lashes', price: 2600, duration: 80, isPopular: true },
  { vendorId: 'vendor-profile-023', name: 'Pestañas Clásicas', category: 'lashes', price: 3000, duration: 85, isPopular: true },

  // Diseño de Cejas (offered by all lash vendors)
  { vendorId: 'vendor-profile-005', name: 'Diseño de Cejas', category: 'lashes', price: 800, duration: 30, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Diseño de Cejas', category: 'lashes', price: 1000, duration: 35, isPopular: true },
  { vendorId: 'vendor-profile-023', name: 'Diseño de Cejas', category: 'lashes', price: 1200, duration: 40, isPopular: true },

  // Premium Lash Services
  { vendorId: 'vendor-profile-013', name: 'Volumen Ruso', category: 'lashes', price: 3500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-023', name: 'Volumen Ruso', category: 'lashes', price: 4200, duration: 140, isPopular: true },
  { vendorId: 'vendor-profile-013', name: 'Microblading de Cejas', category: 'lashes', price: 4500, duration: 120, isPopular: true },
  { vendorId: 'vendor-profile-023', name: 'Microblading de Cejas', category: 'lashes', price: 5200, duration: 140, isPopular: true },
  { vendorId: 'vendor-profile-005', name: 'Tinte de Pestañas', category: 'lashes', price: 600, duration: 25, isPopular: false },
  { vendorId: 'vendor-profile-013', name: 'Tinte de Pestañas', category: 'lashes', price: 800, duration: 30, isPopular: false },
  { vendorId: 'vendor-profile-005', name: 'Lifting de Pestañas', category: 'lashes', price: 1800, duration: 60, isPopular: false },
  { vendorId: 'vendor-profile-013', name: 'Lifting de Pestañas', category: 'lashes', price: 2200, duration: 70, isPopular: false }
]

// Comprehensive transformation data with customer testimonials
const serviceTransformations: Record<string, {
  imageKey: string
  testimonial: string
  customerName: string
  rating: number
}> = {
  'Alisado Dominicano': {
    imageKey: 'dominican-blowout',
    testimonial: 'Mi cabello nunca se había visto tan liso y brillante. El alisado dominicano es increíble!',
    customerName: 'Carmen Delgado',
    rating: 4.8
  },
  'Balayage': {
    imageKey: 'balayage',
    testimonial: '¡Increíble! Me siento como una nueva persona. El balayage quedó perfecto y el corte me favorece muchísimo.',
    customerName: 'Isabella Martínez',
    rating: 5.0
  },
  'Tratamiento de Keratina': {
    imageKey: 'tratamiento-de-keratina',
    testimonial: 'Mi cabello está súper suave y manejable. La keratina ha cambiado completamente mi rutina diaria.',
    customerName: 'Sofía Ramírez',
    rating: 4.9
  },
  'Corte de Cabello': {
    imageKey: 'corte-cabello',
    testimonial: 'Exactamente el corte que quería. La estilista entendió perfectamente mi estilo.',
    customerName: 'Andrea Morales',
    rating: 4.7
  },
  'Tinte de Cabello': {
    imageKey: 'tinte-cabello',
    testimonial: 'El color quedó hermoso y natural. Duró mucho más tiempo de lo esperado.',
    customerName: 'Valentina Cruz',
    rating: 4.8
  },
  'Corte de Cabello Rizado': {
    imageKey: 'corte-rizado',
    testimonial: 'Finalmente encontré a alguien que entiende mi cabello rizado. ¡Perfecto!',
    customerName: 'Camila Herrera',
    rating: 5.0
  },
  'Manicure de Gel': {
    imageKey: 'manicure-gel',
    testimonial: 'Duró más de 3 semanas sin descascararse. La mejor manicura que me he hecho.',
    customerName: 'María José Peña',
    rating: 4.9
  },
  'Manicure Clásico': {
    imageKey: 'manicure-clasico',
    testimonial: 'Clásico pero perfecto. Mis manos se ven elegantes y cuidadas.',
    customerName: 'Patricia López',
    rating: 4.6
  },
  'Pedicure Spa': {
    imageKey: 'pedicure-spa',
    testimonial: 'Una experiencia súper relajante. Mis pies quedaron como nuevos.',
    customerName: 'Alejandra Santos',
    rating: 4.8
  },
  'Arte de Uñas Tropical': {
    imageKey: 'arte-unas-tropical',
    testimonial: 'Las uñas más hermosas que he tenido. El arte tropical es perfecto para el verano caribeño!',
    customerName: 'Sophia Ramírez',
    rating: 5.0
  },
  'Extensiones de Acrílico': {
    imageKey: 'extensiones-acrilico',
    testimonial: 'Mis uñas se ven largas y naturales. La técnica es impecable.',
    customerName: 'Daniela Morales',
    rating: 4.7
  },
  'Maquillaje Natural': {
    imageKey: 'makeup-transformation-3',
    testimonial: 'Perfecto para el día a día. Se ve natural pero me hace lucir radiante. Exactamente lo que buscaba.',
    customerName: 'Alejandra Santos',
    rating: 4.9
  },
  'Maquillaje Ejecutivo': {
    imageKey: 'maquillaje-ejecutivo',
    testimonial: 'Perfecto para mis reuniones de trabajo. Se ve profesional pero elegante.',
    customerName: 'Carmen Jiménez',
    rating: 4.8
  },
  'Maquillaje de Novia': {
    imageKey: 'maquillaje-novia',
    testimonial: 'Me sentí como una princesa en mi boda. Duró toda la celebración.',
    customerName: 'Rosa Martínez',
    rating: 5.0
  },
  'Maquillaje de Gala': {
    imageKey: 'maquillaje-gala',
    testimonial: 'Un look sofisticado y elegante. Me sentí como una modelo profesional en mi evento especial.',
    customerName: 'Daniela Morales',
    rating: 4.9
  },
  'Masaje Relajante': {
    imageKey: 'masaje-relajante',
    testimonial: 'Exactamente lo que necesitaba. Salí completamente relajada y renovada.',
    customerName: 'Lucía González',
    rating: 4.8
  },
  'Limpieza Facial Profunda': {
    imageKey: 'limpieza-facial',
    testimonial: 'Mi piel se ve limpia y radiante. Los resultados se notan desde el primer día.',
    customerName: 'Mónica Flores',
    rating: 4.7
  },
  'Facial de Lujo': {
    imageKey: 'facial-oro',
    testimonial: 'Mi piel se ve completamente renovada. Los resultados son visibles desde la primera sesión.',
    customerName: 'Valentina Cruz',
    rating: 5.0
  },
  'Extensiones de Pestañas': {
    imageKey: 'extensiones-pestanas',
    testimonial: 'Mis pestañas se ven increíbles! Duran mucho tiempo y me ahorro maquillaje todos los días.',
    customerName: 'Camila Herrera',
    rating: 4.8
  },
  'Pestañas Clásicas': {
    imageKey: 'lash-transformation-1',
    testimonial: 'Naturales pero definidas. Exactamente el look que buscaba.',
    customerName: 'Andrea Ruiz',
    rating: 4.6
  },
  'Diseño de Cejas': {
    imageKey: 'diseno-cejas',
    testimonial: 'Mis cejas nunca se habían visto tan definidas y naturales a la vez.',
    customerName: 'Sofía González',
    rating: 4.7
  },
  'Microblading de Cejas': {
    imageKey: 'microblading',
    testimonial: 'Despertar con cejas perfectas todos los días no tiene precio. ¡Increíble resultado!',
    customerName: 'Paola Ramos',
    rating: 5.0
  },
  'Volumen Ruso': {
    imageKey: 'lash-transformation-1',
    testimonial: 'El volumen es espectacular. Mis ojos se ven mucho más grandes y expresivos.',
    customerName: 'Diana Silva',
    rating: 4.9
  },
  'Tratamiento Capilar': {
    imageKey: 'hair-transformation-1',
    testimonial: 'Mi cabello está más fuerte y saludable. Se nota la diferencia inmediatamente.',
    customerName: 'Fernanda Guerrero',
    rating: 4.6
  },
  'Masaje con Piedras Calientes': {
    imageKey: 'spa-transformation-1',
    testimonial: 'Una experiencia única y súper relajante. Las piedras calientes fueron increíbles.',
    customerName: 'Natalia Mendoza',
    rating: 4.8
  }
}

// Services with multiple transformation images
const multipleTransformationServices: Record<string, Array<{
  imageKey: string
  testimonial: string
  customerName: string
  rating: number
}>> = {
  'Alisado Dominicano': [
    {
      imageKey: 'dominican-blowout',
      testimonial: 'Mi cabello nunca se había visto tan liso y brillante. El alisado dominicano es increíble!',
      customerName: 'Carmen Delgado',
      rating: 4.8
    },
    {
      imageKey: 'dominican-blowout-1',
      testimonial: 'El resultado es espectacular. Mi cabello se ve súper natural y saludable.',
      customerName: 'María José Guerrero',
      rating: 5.0
    }
  ]
}

// Hair services can use multiple hair transformation images
const hairCategoryServices = ['Corte y Estilo', 'Tratamiento Capilar', 'Peinado para Evento']
hairCategoryServices.forEach(serviceName => {
  if (!multipleTransformationServices[serviceName]) {
    multipleTransformationServices[serviceName] = [
      {
        imageKey: 'hair-transformation-1',
        testimonial: 'Mi cabello está más fuerte y saludable. Se nota la diferencia inmediatamente.',
        customerName: 'Ana Cristina López',
        rating: 4.7
      },
      {
        imageKey: 'hair-transformation-2',
        testimonial: 'El corte me queda perfecto y el tratamiento dejó mi cabello súper sedoso.',
        customerName: 'Gabriela Moreno',
        rating: 4.9
      }
    ]
  }
})

// Makeup services can use multiple makeup transformation images
const makeupCategoryServices = ['Maquillaje Natural', 'Maquillaje para Eventos']
makeupCategoryServices.forEach(serviceName => {
  if (!multipleTransformationServices[serviceName]) {
    multipleTransformationServices[serviceName] = [
      {
        imageKey: 'makeup-transformation-3',
        testimonial: 'El maquillaje resaltó mis mejores rasgos de forma muy natural.',
        customerName: 'Sofía Herrera',
        rating: 4.7
      },
      {
        imageKey: 'makeup-transformation-1',
        testimonial: 'Me veo radiante y natural. El maquillaje duró toda la noche.',
        customerName: 'Valentina Rodríguez',
        rating: 4.8
      },
      {
        imageKey: 'makeup-transformation-2',
        testimonial: 'Perfecta para mi evento especial. Todos me preguntaron quién me maquilló.',
        customerName: 'Carolina Martínez',
        rating: 5.0
      }
    ]
  }
})

export const services: Service[] = []
let serviceCounter = 1

curatedServices.forEach(serviceData => {
  const vendor = vendorProfiles.find(v => v.id === serviceData.vendorId)
  if (!vendor) return
  
  // Check if service has transformation data
  const singleTransformation = serviceTransformations[serviceData.name]
  
  let beforeAfter = undefined
  
  if (singleTransformation) {
    beforeAfter = {
      before: `/transformations/before/${singleTransformation.imageKey}-before.png`,
      after: `/transformations/after/${singleTransformation.imageKey}-after.png`,
      title: serviceData.name,
      testimonial: singleTransformation.testimonial,
      customerName: singleTransformation.customerName,
      rating: singleTransformation.rating
    }
  }
  
  const serviceObject: Service = {
    id: `service-${String(serviceCounter).padStart(3, '0')}`,
    vendorId: serviceData.vendorId,
    vendor,
    name: serviceData.name,
    description: serviceData.name === 'Alisado Dominicano' 
      ? `Servicio profesional de alisado dominicano en ${vendor.businessName}. Cuidado experto con atención al detalle.`
      : `Professional ${serviceData.name.toLowerCase()} service at ${vendor.businessName}. Expert care with attention to detail.`,
    category: serviceData.category,
    price: serviceData.price,
    duration: serviceData.duration,
    images: Array.from({ length: 3 }, (_, j) => ({
      id: `service-media-${serviceCounter}-${j}`,
      url: `/services/${serviceData.category}/${serviceData.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}.png`,
      alt: `${serviceData.name} at ${vendor.businessName}`,
      type: 'image' as const
    })),
    beforeAfter,
    isPopular: serviceData.isPopular,
    isActive: true,
    createdAt: vendor.createdAt,
    updatedAt: vendor.updatedAt
  }
  
  services.push(serviceObject)
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