"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Send, Paperclip, Phone, MoreVertical, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  senderId: string
  senderType: "customer" | "vendor"
  content: string
  timestamp: Date
  type: "text" | "image" | "booking_action"
  metadata?: any
}

interface ChatVendor {
  id: string
  name: string
  rating: number
  reviewCount: number
  professionalName: string
  professionalImage?: string
  isOnline: boolean
  responseTime: string
  lastSeen?: Date
}

interface BookingContext {
  id: string
  serviceName: string
  date: Date
  time: string
  status: string
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()
  
  const vendorId = params.vendorId as string
  const bookingId = searchParams.get("booking")
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [vendor, setVendor] = useState<ChatVendor | null>(null)
  const [bookingContext, setBookingContext] = useState<BookingContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Mock data - replace with Supabase queries
    const mockVendor: ChatVendor = {
      id: vendorId,
      name: "Beauty Studio RD",
      rating: 4.8,
      reviewCount: 156,
      professionalName: "Patricia López",
      professionalImage: "/professionals/portraits/nail-artist-patricia.png",
      isOnline: true,
      responseTime: "Responde en 15 min",
      lastSeen: new Date()
    }

    const mockBooking: BookingContext = {
      id: bookingId || "1",
      serviceName: "Manicure Gel Premium",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: "14:30",
      status: "upcoming"
    }

    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: vendorId,
        senderType: "vendor",
        content: "¡Hola! Gracias por reservar con nosotros. ¿Hay algo específico que te gustaría para tu manicure?",
        timestamp: new Date(Date.now() - 3600000),
        type: "text"
      },
      {
        id: "2", 
        senderId: user?.id || "user-1",
        senderType: "customer",
        content: "Hola! Me gustaría algo elegante, prefiero colores neutros.",
        timestamp: new Date(Date.now() - 1800000),
        type: "text"
      }
    ]

    setVendor(mockVendor)
    setBookingContext(mockBooking)
    setMessages(mockMessages)
    setIsLoading(false)
  }, [isAuthenticated, vendorId, bookingId, user, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !vendor) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderType: "customer",
      content: newMessage,
      timestamp: new Date(),
      type: "text"
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    // TODO: Send to Supabase and trigger real-time update
    // Simulate vendor response (remove in production)
    setTimeout(() => {
      const vendorResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: vendor.id,
        senderType: "vendor",
        content: "Perfecto, tengo algunas opciones neutros muy elegantes. Te las mostraré cuando llegues.",
        timestamp: new Date(),
        type: "text"
      }
      setMessages(prev => [...prev, vendorResponse])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    let message = ""
    switch (action) {
      case "confirm":
        message = "Confirmo mi cita para mañana"
        break
      case "reschedule":
        message = "Me gustaría reprogramar mi cita"
        break
      case "cancel":
        message = "Necesito cancelar mi cita"
        break
    }
    setNewMessage(message)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-DO", { 
      hour: "2-digit", 
      minute: "2-digit" 
    })
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-femfuel-light rounded-full mb-4 shadow-lg">
            <div className="w-8 h-8 border-4 border-femfuel-rose border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-femfuel-medium font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-femfuel-dark mb-2">Vendedor no encontrado</h3>
          <p className="text-femfuel-medium">No pudimos encontrar esta conversación</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 flex flex-col pt-20">{/* Chat page content relies on SmartHeader from layout */}

      {/* Booking Context */}
      {bookingContext && (
        <div className="px-4 py-4 bg-white/80 backdrop-blur-md border-b border-femfuel-rose/10 shadow-sm">
          <Card className="bg-gradient-to-br from-femfuel-light to-pink-50 border-2 border-femfuel-rose/20 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-femfuel-dark mb-1">{bookingContext.serviceName}</h3>
                  <p className="text-sm text-femfuel-medium font-medium flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    {bookingContext.date.toLocaleDateString("es-DO")} a las {bookingContext.time}
                  </p>
                </div>
                <Badge variant="outline" className="bg-femfuel-rose text-white border-0 px-3 py-1 shadow-sm">
                  {bookingContext.status === "upcoming" ? "Próxima" : bookingContext.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white/60 backdrop-blur-sm border-b border-femfuel-rose/10">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button
            variant="outline"
            className="min-h-[44px] whitespace-nowrap border-2 border-green-200 text-green-700 hover:bg-green-50 active:bg-green-50 hover:border-green-300 font-semibold rounded-full transition-all duration-300 shadow-sm"
            onClick={() => handleQuickAction("confirm")}
          >
            ✅ Confirmar cita
          </Button>
          <Button
            variant="outline"
            className="min-h-[44px] whitespace-nowrap border-2 border-blue-200 text-blue-700 hover:bg-blue-50 active:bg-blue-50 hover:border-blue-300 font-semibold rounded-full transition-all duration-300 shadow-sm"
            onClick={() => handleQuickAction("reschedule")}
          >
            📅 Reprogramar
          </Button>
          <Button
            variant="outline"
            className="min-h-[44px] whitespace-nowrap border-2 border-red-200 text-red-700 hover:bg-red-50 active:bg-red-50 hover:border-red-300 font-semibold rounded-full transition-all duration-300 shadow-sm"
            onClick={() => handleQuickAction("cancel")}
          >
            ❌ Cancelar
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === "customer" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                message.senderType === "customer"
                  ? "bg-gradient-to-br from-femfuel-rose to-pink-600 text-white rounded-br-md"
                  : "bg-white/90 backdrop-blur-sm text-femfuel-dark rounded-bl-md border border-femfuel-rose/10"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.senderType === "customer"
                    ? "text-pink-100"
                    : "text-femfuel-medium"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-femfuel-rose/20 px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="min-h-[44px] min-w-[44px] hover:bg-femfuel-light active:bg-femfuel-light rounded-full" aria-label="Adjuntar archivo">
            <Paperclip className="h-5 w-5 text-femfuel-medium" />
          </Button>
          <Input
            placeholder="Escribir mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-h-[48px] rounded-full border-2 border-femfuel-rose/20 focus:border-femfuel-rose focus:ring-2 focus:ring-femfuel-rose/20 px-5 py-3 shadow-sm transition-all duration-300"
          />
          <Button
            className="min-h-[48px] min-w-[48px] rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white px-4 py-3 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            aria-label="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-xs text-femfuel-medium mt-2 text-center font-medium">
          {vendor.responseTime}
        </div>
      </div>
    </div>
  )
}