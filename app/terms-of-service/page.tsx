'use client'

import { Shield, Heart, Users, CheckCircle, AlertTriangle, Calendar, Mail } from "lucide-react"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Términos de Servicio</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-6 leading-tight">
            Términos y Condiciones de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
              FemFuel Beauty
            </span>
          </h1>

          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Última actualización: 22 de septiembre, 2025
          </p>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="font-semibold text-femfuel-dark">Nuestra Promesa</span>
            </div>
            <p className="text-femfuel-medium text-sm">
              En FemFuel Beauty, creemos en relaciones transparentes y justas. Estos términos protegen
              tanto a nuestras clientas como a nuestros profesionales de belleza.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl shadow-xl p-8 lg:p-12 space-y-12">

            {/* Section 1: Acceptance of Terms */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">1. Aceptación de Términos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  Al acceder y usar FemFuel Beauty, aceptas cumplir con estos términos de servicio.
                  Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.
                </p>
                <p>
                  FemFuel Beauty es una plataforma que conecta clientas con profesionales de belleza
                  verificados en República Dominicana. Facilitamos las reservas pero no prestamos
                  directamente los servicios de belleza.
                </p>
              </div>
            </div>

            {/* Section 2: User Accounts */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg shadow-md flex items-center justify-center">
                  <Users className="h-5 w-5 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">2. Cuentas de Usuario</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Elegibilidad:</strong> Debes tener al menos 18 años para crear una cuenta.
                  Si tienes entre 16-17 años, necesitas autorización de un padre o tutor.
                </p>
                <p>
                  <strong>Información Precisa:</strong> Debes proporcionar información verdadera y
                  actualizada al registrarte. Eres responsable de mantener la confidencialidad de tu cuenta.
                </p>
                <p>
                  <strong>Una Cuenta por Persona:</strong> Solo puedes tener una cuenta activa.
                  Las cuentas duplicadas serán suspendidas.
                </p>
              </div>
            </div>

            {/* Section 3: Booking and Payments */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-md flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">3. Reservas y Pagos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Reservas:</strong> Las citas están sujetas a disponibilidad del profesional.
                  La confirmación se envía por email y notificación en la app.
                </p>
                <p>
                  <strong>Pagos:</strong> Los pagos se procesan de forma segura. FemFuel retiene un
                  pequeño porcentaje como comisión de plataforma. El resto va directamente al profesional.
                </p>
                <p>
                  <strong>Cancelaciones:</strong> Puedes cancelar hasta 24 horas antes sin penalización.
                  Cancelaciones tardías pueden incurrir en cargos del 25% del servicio.
                </p>
                <p>
                  <strong>No-Shows:</strong> Si no asistes sin avisar, se cobrará el 50% del servicio
                  como compensación al profesional.
                </p>
              </div>
            </div>

            {/* Section 4: Professional Standards */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-md flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">4. Estándares Profesionales</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Profesionales Verificados:</strong> Todos nuestros profesionales pasan por
                  un proceso de verificación que incluye licencias, referencias y evaluación de habilidades.
                </p>
                <p>
                  <strong>Calidad de Servicio:</strong> Esperamos que todos los servicios se realicen
                  con los más altos estándares de calidad, higiene y profesionalismo.
                </p>
                <p>
                  <strong>Resolución de Problemas:</strong> Si no estás satisfecha con un servicio,
                  contacta nuestro equipo de soporte dentro de 48 horas para una resolución justa.
                </p>
              </div>
            </div>

            {/* Section 5: User Conduct */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">5. Conducta del Usuario</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Comportamiento Respetuoso:</strong> Trata a todos los profesionales con respeto
                  y cortesía. No toleramos discriminación, acoso o comportamiento abusivo.
                </p>
                <p>
                  <strong>Reseñas Honestas:</strong> Las reseñas deben ser honestas y basadas en tu
                  experiencia real. Las reseñas falsas resultarán en suspensión de cuenta.
                </p>
                <p>
                  <strong>Uso Apropiado:</strong> No uses la plataforma para propósitos ilegales,
                  spam o cualquier actividad que pueda dañar nuestra comunidad.
                </p>
              </div>
            </div>

            {/* Section 6: Privacy and Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg shadow-md flex items-center justify-center">
                  <Shield className="h-5 w-5 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">6. Privacidad y Datos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  Protegemos tu información personal según nuestra Política de Privacidad.
                  Solo compartimos datos necesarios con profesionales para completar tus servicios.
                </p>
                <p>
                  Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento
                  contactando nuestro equipo de soporte.
                </p>
              </div>
            </div>

            {/* Section 7: Liability and Disclaimers */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-md flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">7. Responsabilidad</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  FemFuel Beauty actúa como intermediario entre clientas y profesionales.
                  No somos responsables por la calidad de los servicios prestados por terceros.
                </p>
                <p>
                  Los profesionales son contratistas independientes responsables de sus propios
                  servicios, seguros y licencias profesionales.
                </p>
                <p>
                  Nuestra responsabilidad se limita al monto pagado por el servicio específico
                  en cuestión.
                </p>
              </div>
            </div>

            {/* Section 8: Modifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">8. Modificaciones</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento.
                  Los cambios importantes se notificarán con al menos 30 días de anticipación.
                </p>
                <p>
                  El uso continuado de la plataforma después de los cambios constituye
                  aceptación de los nuevos términos.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-rose-100 shadow-md flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-femfuel-dark">¿Preguntas sobre estos términos?</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Nuestro equipo está aquí para ayudarte a entender cualquier aspecto de nuestros términos de servicio.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:legal@femfuelbeauty.com"
                  className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center text-center"
                >
                  <Mail className="h-4 w-4" />
                  Contactar Equipo Legal
                </a>
                <a
                  href="/help"
                  className="bg-white border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:bg-purple-50 text-femfuel-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center"
                >
                  Centro de Ayuda
                </a>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-femfuel-medium text-center">
                Estos términos de servicio rigen el uso de FemFuel Beauty.
                Al usar nuestra plataforma, confirmas que has leído, entendido y aceptado estos términos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}