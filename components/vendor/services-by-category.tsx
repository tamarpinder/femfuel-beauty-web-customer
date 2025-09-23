'use client'

import { useState } from "react"
import { Clock, Star, ChevronRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatButton } from "@/components/ui/chat-button"
import { getServiceImage } from "@/lib/image-mappings"

interface VendorService {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  isPopular?: boolean
  image?: string
}

interface ServicesByCategoryProps {
  services: VendorService[]
  vendorId: string
  vendorName: string
  onServiceBook: (serviceId: string) => void
  onServiceGallery?: (serviceId: string) => void
  formatPrice: (price: number) => string
}

export function ServicesByCategory({
  services,
  vendorId,
  vendorName,
  onServiceBook,
  onServiceGallery,
  formatPrice
}: ServicesByCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, VendorService[]>)

  const categories = Object.keys(servicesByCategory)
  const hasMultipleCategories = categories.length > 1

  const getFilteredServices = () => {
    if (selectedCategory === "all") return services
    return servicesByCategory[selectedCategory] || []
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
            Descubre nuestra amplia gama de servicios de belleza diseñados para realzar tu estilo único
          </p>
        </div>

        {/* Category Filter */}
        {hasMultipleCategories && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? 'bg-white text-femfuel-dark shadow-md'
                    : 'text-femfuel-medium hover:text-femfuel-dark'
                }`}
              >
                Todos los Servicios
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-femfuel-dark shadow-md'
                      : 'text-femfuel-medium hover:text-femfuel-dark'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredServices().map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getServiceImage(service.name)}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Popular Badge */}
                  {service.isPopular && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <span className="font-bold">{formatPrice(service.price)}</span>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-femfuel-dark group-hover:text-femfuel-rose transition-colors line-clamp-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-femfuel-medium line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-sm text-femfuel-medium">{service.duration} min</span>

                    {onServiceGallery && (
                      <>
                        <span className="text-femfuel-medium">•</span>
                        <button
                          onClick={() => onServiceGallery(service.id)}
                          className="text-xs text-femfuel-rose hover:text-femfuel-dark transition-colors underline"
                        >
                          Ver proceso
                        </button>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onServiceBook(service.id)}
                      className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white group-hover:shadow-lg transition-all duration-300"
                    >
                      Reservar
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <ChatButton
                      vendorId={vendorId}
                      vendorName={vendorName}
                      serviceContext={service.name}
                      variant="inline"
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      💬
                    </ChatButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {getFilteredServices().length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-femfuel-dark mb-2">
              No hay servicios en esta categoría
            </h3>
            <p className="text-femfuel-medium">
              Intenta seleccionar otra categoría o explora todos nuestros servicios
            </p>
          </div>
        )}

        {/* View All Services CTA */}
        {selectedCategory !== "all" && getFilteredServices().length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("all")}
              className="text-femfuel-rose border-femfuel-rose hover:bg-femfuel-rose hover:text-white"
            >
              Ver Todos los Servicios
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}