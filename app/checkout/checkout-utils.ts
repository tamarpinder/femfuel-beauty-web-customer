import { toast } from "sonner"
import type { PaymentMethod } from "@/contexts/auth-context"

export type CheckoutStep = "delivery" | "payment" | "review" | "processing" | "success"

export interface OrderData {
  phone: string
  deliveryNotes: string
  paymentMethod: "cash" | "card" | "apple_pay" | string
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
}

export interface CardFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
  brand: "visa" | "mastercard" | "amex"
}

export const formatPrice = (price: number) =>
  `RD$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

export const formatCardNumber = (value: string) => {
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

export const handleCardNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCardFormData: React.Dispatch<React.SetStateAction<CardFormData>>
) => {
  const formatted = formatCardNumber(e.target.value)
  setCardFormData(prev => ({ ...prev, cardNumber: formatted }))
}

export const handleExpiryChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCardFormData: React.Dispatch<React.SetStateAction<CardFormData>>
) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  setCardFormData(prev => ({ ...prev, expiryDate: value }))
}

export const handleAddCard = async (
  cardFormData: CardFormData,
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, "id">) => void,
  setShowAddCardModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCardFormData: React.Dispatch<React.SetStateAction<CardFormData>>,
  setIsAddingCard: React.Dispatch<React.SetStateAction<boolean>>,
  user: any
) => {
  if (!cardFormData.cardNumber || !cardFormData.expiryDate || !cardFormData.cvv || !cardFormData.cardHolderName) {
    toast.error("Por favor completa todos los campos")
    return
  }

  setIsAddingCard(true)
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newPaymentMethod: Omit<PaymentMethod, "id"> = {
      type: "card",
      cardNumber: cardFormData.cardNumber.slice(-4),
      expiryDate: cardFormData.expiryDate,
      cardHolderName: cardFormData.cardHolderName,
      brand: cardFormData.brand,
      isDefault: !user?.paymentMethods || user.paymentMethods.length === 0
    }

    addPaymentMethod(newPaymentMethod)
    setShowAddCardModal(false)
    setCardFormData({
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
    setIsAddingCard(false)
  }
}

export const getPaymentMethodDisplay = (paymentMethod: string, user: any) => {
  if (paymentMethod === "cash") {
    return "Contra Entrega"
  } else if (paymentMethod === "apple_pay") {
    return "Apple Pay"
  } else if (paymentMethod === "card") {
    return "Tarjeta de Crédito/Débito"
  } else if (paymentMethod.startsWith("saved_card_")) {
    const cardId = paymentMethod.replace("saved_card_", "")
    const savedCard = user?.paymentMethods?.find((card: any) => card.id === cardId)
    if (savedCard) {
      const brandName = savedCard.brand === 'visa' ? 'Visa' :
                       savedCard.brand === 'mastercard' ? 'Mastercard' :
                       savedCard.brand === 'amex' ? 'American Express' : 'Tarjeta'
      return `${brandName} ••••${savedCard.cardNumber}`
    }
    return "Tarjeta"
  }
  return "No especificado"
}

export const handlePlaceOrder = async (
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<CheckoutStep>>,
  setProcessingProgress: React.Dispatch<React.SetStateAction<number>>,
  setProcessingStep: React.Dispatch<React.SetStateAction<string>>,
  setOrderNumber: React.Dispatch<React.SetStateAction<string>>,
  clearCart: () => Promise<void>
) => {
  try {
    setIsProcessing(true)
    setCurrentStep("processing")
    setProcessingProgress(0)

    setProcessingStep("Validando método de pago...")
    setProcessingProgress(20)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setProcessingStep("Procesando pago...")
    setProcessingProgress(45)
    await new Promise(resolve => setTimeout(resolve, 2000))

    setProcessingStep("Creando tu pedido...")
    setProcessingProgress(70)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setProcessingStep("Confirmando entrega...")
    setProcessingProgress(90)
    await new Promise(resolve => setTimeout(resolve, 800))

    setProcessingStep("¡Pedido confirmado!")
    setProcessingProgress(100)

    await new Promise(resolve => setTimeout(resolve, 1200))

    const orderNum = `FF${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)

    setCurrentStep("success")
    setIsProcessing(false)

    await new Promise(resolve => setTimeout(resolve, 100))

    try {
      await clearCart()
    } catch (error) {
      // Don't let cart clearing failure prevent success state
    }
  } catch (error) {
    setIsProcessing(false)
    setCurrentStep("review")
  }
}