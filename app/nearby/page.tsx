'use client'

import { useState } from "react"
import { MapPin, Star, Clock, Phone, Navigation, Filter, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

interface Salon {
  id: number
  name: string
  address: string
  distance: string
  rating: number
  reviews: number
  specialties: string[]
  image: string
  phone: string
  isOpen: boolean
  openHours: string
}

const mockSalons: Salon[] = [
  {
    id: 1,
    name: "Beauty Studio RD",
    address: "Plaza Central, Piantini, Santo Domingo",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 124,
    specialties: ["Manicure", "Pedicure", "Tratamientos Faciales"],
    image: "/beauty-studio-rd.jpg",
    phone: "(809) 555-0123",
    isOpen: true,
    openHours: "9:00 AM - 8:00 PM"
  },
  {
    id: 2,
    name: "Glamour House",
    address: "Av. Churchill, Naco, Santo Domingo",
    distance: "1.2 km",
    rating: 4.9,
    reviews: 89,
    specialties: ["Maquillaje", "Peinados", "Eventos"],
    image: "/glamour-house.jpg",
    phone: "(809) 555-0124",
    isOpen: true,
    openHours: "8:00 AM - 9:00 PM"
  },
  {
    id: 3,
    name: "Spa Paradise",
    address: "Zona Colonial, Santo Domingo",
    distance: "2.1 km",
    rating: 4.7,
    reviews: 156,
    specialties: ["Spa", "Masajes", "Tratamientos Corporales"],
    image: "/spa-paradise.jpg",
    phone: "(809) 555-0125",
    isOpen: false,
    openHours: "10:00 AM - 6:00 PM"
  },
  {
    id: 4,
    name: "Relax Nails",
    address: "Blue Mall, Piantini, Santo Domingo",
    distance: "1.8 km",
    rating: 4.6,
    reviews: 98,
    specialties: ["Uñas", "Nail Art", "Extensiones"],
    image: "/relax-nails.jpg",
    phone: "(809) 555-0126",
    isOpen: true,
    openHours: "10:00 AM - 10:00 PM"
  },
  {
    id: 5,
    name: "Lash Studio DR",
    address: "Bella Vista Mall, Santo Domingo",
    distance: "3.2 km",
    rating: 4.9,
    reviews: 67,
    specialties: ["Pestañas", "Cejas", "Microblading"],
    image: "/lash-studio-dr.jpg",
    phone: "(809) 555-0127",
    isOpen: true,
    openHours: "9:00 AM - 7:00 PM"
  },
  {
    id: 6,
    name: "Hair Salon Elite",
    address: "Gazcue, Santo Domingo",
    distance: "2.8 km",
    rating: 4.5,
    reviews: 203,
    specialties: ["Corte", "Color", "Tratamientos Capilares"],
    image: "/hair-salon-elite.jpg",
    phone: "(809) 555-0128",
    isOpen: true,
    openHours: "8:00 AM - 8:00 PM"
  }
]

export default function NearbySalonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  
  const specialties = [
    "all",
    "Manicure",
    "Pedicure", 
    "Maquillaje",
    "Peinados",
    "Spa",
    "Tratamientos Faciales",
    "Pestañas",
    "Corte"
  ]

  const filteredSalons = mockSalons.filter(salon => {
    const matchesSearch = salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salon.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salon.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSpecialty = selectedSpecialty === "all" || 
                            salon.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()))
    
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-orange-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4 text-rose-600" />
            <span className="text-rose-600 font-medium text-sm">Salones Cercanos</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Salones <span className="text-rose-600">Cercanos</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra tu salón de belleza ideal en segundos. Reserva fácil y accede a expertos verificados en tu área.
          </p>
          
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar salones o servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-femfuel-rose h-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-femfuel-medium">
            <Navigation className="h-4 w-4 text-green-600" />
            <span>Tu ubicación: Santo Domingo</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-femfuel-medium" />
            <span className="text-femfuel-dark font-medium">Filtrar por especialidad:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSpecialty === specialty
                    ? 'bg-femfuel-rose text-white shadow-lg'
                    : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-gray-200'
                }`}
              >
                {specialty === "all" ? "Todos" : specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salons List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
              {filteredSalons.length} Salones Encontrados
            </h2>
            <p className="text-femfuel-medium">Ordenados por distancia</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredSalons.map((salon) => (
              <Card key={salon.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-femfuel-rose">
                        {salon.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                            {salon.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <MapPin className="h-4 w-4" />
                            <span>{salon.address}</span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          salon.isOpen 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {salon.isOpen ? 'Abierto' : 'Cerrado'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-femfuel-dark">{salon.rating}</span>
                          <span className="text-sm text-femfuel-medium">({salon.reviews} reseñas)</span>
                        </div>
                        <div className="text-sm text-femfuel-medium">
                          📍 {salon.distance}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {salon.specialties.slice(0, 3).map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-rose-50 text-rose-700 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {salon.specialties.length > 3 && (
                          <span className="text-xs text-femfuel-medium">
                            +{salon.specialties.length - 3} más
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-femfuel-medium mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{salon.openHours}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{salon.phone}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="glassmorphism-button flex-1">
                          Ver Servicios
                        </button>
                        <button className="femfuel-button-lg">
                          Reservar Ahora
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredSalons.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                No se encontraron salones
              </h3>
              <p className="text-femfuel-medium">
                Intenta cambiar los filtros or buscar con diferentes términos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto text-center">
          <MapPin className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿No encuentras tu salón favorito?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Ayúdanos a crecer nuestra comunidad. Invita a tu salón favorito a unirse a FemFuel Beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              Sugerir un Salón
            </button>
            <button className="femfuel-button-lg">
              Explorar Más Zonas
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}