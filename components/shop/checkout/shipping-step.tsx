"use client"

import { useState, useEffect } from "react"
import { MapPin, User, Phone, Mail, MessageSquare, Check, RefreshCw, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  deliveryInstructions: string
  shippingMethod: string
  shippingCost: number
}

interface ShippingStepProps {
  initialData?: ShippingInfo
  onNext: (data: ShippingInfo) => void
  onBack?: () => void
}

export function ShippingStep({ initialData, onNext, onBack }: ShippingStepProps) {
  const { user } = useAuth()
  const [usingSavedAddress, setUsingSavedAddress] = useState(false)
  const [formData, setFormData] = useState<ShippingInfo>(
    initialData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      deliveryInstructions: "",
      shippingMethod: "moto",
      shippingCost: 300
    }
  )

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({})

  // Auto-populate form with saved user data on mount
  useEffect(() => {
    if (!initialData && user && user.address) {
      const nameParts = user.name?.split(" ") || ["", ""]
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        province: user.province || "",
        postalCode: user.postalCode || "",
        deliveryInstructions: user.deliveryInstructions || "",
        shippingMethod: "moto",
        shippingCost: 300
      })
      setUsingSavedAddress(true)
    }
  }, [user, initialData])

  const loadSavedAddress = () => {
    if (user && user.address) {
      const nameParts = user.name?.split(" ") || ["", ""]
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        province: user.province || "",
        postalCode: user.postalCode || "",
        deliveryInstructions: user.deliveryInstructions || "",
        shippingMethod: "moto",
        shippingCost: 300
      })
      setUsingSavedAddress(true)
    }
  }

  const useDifferentAddress = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      deliveryInstructions: "",
      shippingMethod: "moto",
      shippingCost: 300
    })
    setUsingSavedAddress(false)
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "Requerido"
    if (!formData.email.trim()) {
      newErrors.email = "Requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Requerido"
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Teléfono inválido"
    }
    if (!formData.address.trim()) newErrors.address = "Requerido"
    if (!formData.city.trim()) newErrors.city = "Requerido"
    if (!formData.province.trim()) newErrors.province = "Requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-femfuel-rose/10">
        <div className="p-3 bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 rounded-full">
          <MapPin className="h-6 w-6 text-femfuel-rose" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-femfuel-dark font-serif">
            Información de Envío
          </h2>
          <p className="text-sm text-femfuel-medium">
            ¿A dónde enviamos tu pedido?
          </p>
        </div>
      </div>

      {/* Saved Address Indicator */}
      {user && user.address && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            {usingSavedAddress ? (
              <>
                <div className="p-2 bg-green-500 rounded-full">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    Usando dirección guardada
                  </p>
                  <p className="text-xs text-green-700">
                    {user.address}, {user.city}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 bg-femfuel-rose rounded-full">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-femfuel-dark">
                    Tienes una dirección guardada
                  </p>
                  <p className="text-xs text-femfuel-medium">
                    {user.address}, {user.city}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {usingSavedAddress ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={useDifferentAddress}
                className="text-femfuel-rose border-femfuel-rose hover:bg-femfuel-rose/10"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Usar otra dirección
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={loadSavedAddress}
                className="text-green-700 border-green-600 hover:bg-green-50"
              >
                <Check className="h-3 w-3 mr-1" />
                Usar esta dirección
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-femfuel-rose" />
            Nombre *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Tu nombre"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-femfuel-rose" />
            Apellido *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Tu apellido"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-femfuel-rose" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="tu@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-femfuel-rose" />
            Teléfono *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(809) 123-4567"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-femfuel-rose" />
          Dirección de Entrega *
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Calle, número, apartamento, etc."
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>

      {/* City, Province, Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Santo Domingo"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* Province */}
        <div className="space-y-2">
          <Label htmlFor="province">Provincia *</Label>
          <Input
            id="province"
            value={formData.province}
            onChange={(e) => handleChange("province", e.target.value)}
            placeholder="Distrito Nacional"
            className={errors.province ? "border-red-500" : ""}
          />
          {errors.province && (
            <p className="text-xs text-red-500">{errors.province}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">Código Postal</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            placeholder="10100"
          />
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="space-y-2">
        <Label htmlFor="deliveryInstructions" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-femfuel-rose" />
          Instrucciones de Entrega (Opcional)
        </Label>
        <Textarea
          id="deliveryInstructions"
          value={formData.deliveryInstructions}
          onChange={(e) => handleChange("deliveryInstructions", e.target.value)}
          placeholder="Ej: Llamar al llegar, dejar con el portero, etc."
          rows={3}
          className="resize-none"
        />
        <p className="text-xs text-femfuel-medium">
          Ayúdanos a entregar tu pedido más fácilmente
        </p>
      </div>

      {/* Shipping Method */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base">
          <Truck className="h-5 w-5 text-femfuel-rose" />
          Método de Envío
        </Label>

        <div className="bg-gradient-to-r from-femfuel-rose/5 to-pink-500/5 rounded-xl border-2 border-femfuel-rose/20 p-5">
          <div className="flex items-start gap-4">
            {/* Selected Indicator */}
            <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500 mt-1 flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-white" />
            </div>

            {/* Icon */}
            <div className="p-3 rounded-lg bg-femfuel-rose text-white">
              <Truck className="h-5 w-5" />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-femfuel-dark">
                  Entrega por Moto
                </span>
                <span className="text-lg font-bold text-femfuel-rose">
                  RD$300
                </span>
              </div>
              <p className="text-sm text-femfuel-medium">
                Pedidos realizados antes de las 4:00PM serán entregados el mismo día
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-femfuel-medium italic">
          Más opciones de envío estarán disponibles próximamente
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light/30"
          >
            Volver
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold shadow-lg"
        >
          Continuar a Pago
        </Button>
      </div>
    </form>
  )
}
