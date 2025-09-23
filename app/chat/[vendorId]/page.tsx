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
    return <div className="min-h-screen bg-white flex items-center justify-center">Cargando...</div>
  }

  if (!vendor) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Vendedor no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">{/* Chat page content relies on SmartHeader from layout */}

      {/* Booking Context */}
      {bookingContext && (
        <div className="px-4 py-3 bg-femfuel-purple border-b border-gray-100">
          <Card className="bg-white border-femfuel-rose">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-femfuel-dark">{bookingContext.serviceName}</h3>
                  <p className="text-xs text-femfuel-medium">
                    {bookingContext.date.toLocaleDateString("es-DO")} a las {bookingContext.time}
                  </p>
                </div>
                <Badge variant="outline" className="text-femfuel-rose border-femfuel-rose">
                  {bookingContext.status === "upcoming" ? "Próxima" : bookingContext.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => handleQuickAction("confirm")}
          >
            ✅ Confirmar cita
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => handleQuickAction("reschedule")}
          >
            📅 Reprogramar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => handleQuickAction("cancel")}
          >
            ❌ Cancelar
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === "customer" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.senderType === "customer"
                  ? "bg-femfuel-rose text-white rounded-br-md"
                  : "bg-gray-100 text-femfuel-dark rounded-bl-md"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
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
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Escribir mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full border-gray-300 focus:border-femfuel-rose focus:ring-femfuel-rose"
          />
          <Button
            size="sm"
            className="rounded-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-femfuel-medium mt-1 text-center">
          {vendor.responseTime}
        </div>
      </div>
    </div>
  )
}