"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  Shield,
  Smartphone
} from "lucide-react"
import { toast } from "sonner"
import type { PaymentMethod } from "@/contexts/auth-context"

export function PaymentMethodsSettings() {
  const { user, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useAuth()
  const [showAddCard, setShowAddCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    brand: "visa" as const
  })

  const handleAddCard = async () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardHolderName) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newPaymentMethod: Omit<PaymentMethod, "id"> = {
        type: "card",
        cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
        expiryDate: formData.expiryDate,
        cardHolderName: formData.cardHolderName,
        brand: formData.brand,
        isDefault: !user?.paymentMethods || user.paymentMethods.length === 0
      }

      addPaymentMethod(newPaymentMethod)
      setShowAddCard(false)
      setFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
        brand: "visa"
      })
      toast.success("Tarjeta agregada exitosamente")
    } catch (error) {
      toast.error("Error al agregar la tarjeta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCard = (paymentMethodId: string) => {
    removePaymentMethod(paymentMethodId)
    toast.success("Tarjeta eliminada")
  }

  const handleSetDefault = (paymentMethodId: string) => {
    setDefaultPaymentMethod(paymentMethodId)
    toast.success("Tarjeta predeterminada actualizada")
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setFormData(prev => ({ ...prev, expiryDate: value }))
  }

  const getCardIcon = (brand: string) => {
    switch (brand) {
      case 'visa':
        return '💳'
      case 'mastercard':
        return '💳'
      case 'amex':
        return '💳'
      case 'discover':
        return '💳'
      default:
        return '💳'
    }
  }

  const getCardBrandName = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'Visa'
      case 'mastercard':
        return 'Mastercard'
      case 'amex':
        return 'American Express'
      case 'discover':
        return 'Discover'
      default:
        return 'Tarjeta'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago
            </CardTitle>
            <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-femfuel-rose hover:bg-femfuel-rose/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Tarjeta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
                  <DialogDescription>
                    Agrega una nueva tarjeta de crédito o débito para usar en tus reservas
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardHolderName">Nombre del Titular</Label>
                    <Input
                      id="cardHolderName"
                      placeholder="Nombre como aparece en la tarjeta"
                      value={formData.cardHolderName}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardHolderName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Tipo de Tarjeta</Label>
                    <Select value={formData.brand} onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">American Express</SelectItem>
                        <SelectItem value="discover">Discover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddCard(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCard} disabled={isLoading}>
                    {isLoading ? "Agregando..." : "Agregar Tarjeta"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {!user?.paymentMethods || user.paymentMethods.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-femfuel-medium/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                No tienes métodos de pago guardados
              </h3>
              <p className="text-femfuel-medium mb-4">
                Agrega una tarjeta para hacer tus reservas más rápido
              </p>
              <Button onClick={() => setShowAddCard(true)} className="bg-femfuel-rose hover:bg-femfuel-rose/90">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primera Tarjeta
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {user.paymentMethods.map((paymentMethod) => (
                <div
                  key={paymentMethod.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-femfuel-purple/20 to-femfuel-rose/20 rounded flex items-center justify-center text-lg">
                      {getCardIcon(paymentMethod.brand || 'visa')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {getCardBrandName(paymentMethod.brand || 'visa')} ••••{paymentMethod.cardNumber}
                        </span>
                        {paymentMethod.isDefault && (
                          <Badge variant="secondary" className="bg-femfuel-rose/10 text-femfuel-rose text-xs">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Predeterminada
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-femfuel-medium">
                        {paymentMethod.cardHolderName} • Vence {paymentMethod.expiryDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!paymentMethod.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(paymentMethod.id)}
                      >
                        Hacer Principal
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveCard(paymentMethod.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Opciones de Pago Rápido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">
                📱
              </div>
              <div>
                <p className="font-medium">Apple Pay</p>
                <p className="text-sm text-femfuel-medium">Pago rápido y seguro con Touch ID</p>
              </div>
            </div>
            <Badge variant="outline" className="text-femfuel-medium">
              Próximamente
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              <div>
                <p className="font-medium">Google Pay</p>
                <p className="text-sm text-femfuel-medium">Pago con tu cuenta de Google</p>
              </div>
            </div>
            <Badge variant="outline" className="text-femfuel-medium">
              Próximamente
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                💰
              </div>
              <div>
                <p className="font-medium">Pago en Efectivo</p>
                <p className="text-sm text-femfuel-medium">Paga directamente en el establecimiento</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Disponible
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 mb-1">Seguridad Garantizada</h4>
              <p className="text-sm text-green-700">
                Tus datos de pago están encriptados y protegidos con la máxima seguridad.
                Nunca almacenamos información completa de tarjetas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}