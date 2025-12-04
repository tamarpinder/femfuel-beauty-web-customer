'use client'

import { Shield, Eye, Lock, Database, Users, Mail, CheckCircle, Heart, Globe, Settings } from "lucide-react"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Eye className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Política de Privacidad</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-6 leading-tight">
            Tu Privacidad es{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
              Nuestra Prioridad
            </span>
          </h1>

          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Última actualización: 22 de septiembre, 2025
          </p>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="font-semibold text-femfuel-dark">Nuestro Compromiso</span>
            </div>
            <p className="text-femfuel-medium text-sm">
              En FemFuel Beauty, protegemos tu información personal con el mismo cuidado que ponemos
              en conectarte con los mejores profesionales de belleza de República Dominicana.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl shadow-xl p-8 lg:p-12 space-y-12">

            {/* Section 1: Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">1. Información que Recopilamos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Información de Cuenta:</strong> Nombre, email, teléfono, foto de perfil y preferencias
                  de belleza que nos proporcionas al registrarte.
                </p>
                <p>
                  <strong>Información de Reservas:</strong> Detalles de tus citas, servicios solicitados,
                  ubicación del salón y comentarios sobre tu experiencia.
                </p>
                <p>
                  <strong>Información de Pago:</strong> Procesamos pagos de forma segura a través de proveedores
                  certificados. No almacenamos información completa de tarjetas de crédito.
                </p>
                <p>
                  <strong>Información de Uso:</strong> Cómo usas la app, qué servicios buscas y preferencias
                  para mejorar tu experiencia personalizada.
                </p>
              </div>
            </div>

            {/* Section 2: How We Use Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg shadow-md flex items-center justify-center">
                  <Settings className="h-5 w-5 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">2. Cómo Usamos tu Información</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Facilitar Reservas:</strong> Conectarte con profesionales de belleza verificados
                  y procesar tus citas de forma eficiente.
                </p>
                <p>
                  <strong>Personalización:</strong> Recomendarte servicios y profesionales basados en tus
                  preferencias, ubicación y historial de reservas.
                </p>
                <p>
                  <strong>Comunicación:</strong> Enviarte confirmaciones de citas, recordatorios, actualizaciones
                  de servicios y ofertas especiales relevantes.
                </p>
                <p>
                  <strong>Mejora de Servicios:</strong> Analizar tendencias de uso para mejorar nuestra plataforma
                  y expandir a nuevas áreas de República Dominicana.
                </p>
                <p>
                  <strong>Seguridad:</strong> Proteger tu cuenta, prevenir fraudes y mantener un ambiente
                  seguro para toda nuestra comunidad.
                </p>
              </div>
            </div>

            {/* Section 3: Information Sharing */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-md flex items-center justify-center">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">3. Compartir Información</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Con Profesionales:</strong> Compartimos tu nombre, teléfono y detalles de la cita
                  solo con el profesional que selecciones para tu servicio.
                </p>
                <p>
                  <strong>Proveedores de Servicios:</strong> Trabajamos con proveedores certificados para
                  procesamiento de pagos, envío de notificaciones y análisis de datos.
                </p>
                <p>
                  <strong>Nunca Vendemos Datos:</strong> No vendemos tu información personal a terceros
                  para marketing o publicidad externa.
                </p>
                <p>
                  <strong>Requerimientos Legales:</strong> Solo compartimos información cuando lo requiere
                  la ley dominicana o para proteger la seguridad de nuestros usuarios.
                </p>
              </div>
            </div>

            {/* Section 4: Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-md flex items-center justify-center">
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">4. Seguridad de Datos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Encriptación:</strong> Toda la información se transmite usando encriptación SSL/TLS
                  de grado bancario para proteger tus datos en tránsito.
                </p>
                <p>
                  <strong>Almacenamiento Seguro:</strong> Utilizamos servidores seguros con acceso restringido
                  y monitoreo 24/7 para proteger tu información almacenada.
                </p>
                <p>
                  <strong>Acceso Limitado:</strong> Solo empleados autorizados tienen acceso a datos de usuarios,
                  y únicamente para propósitos de soporte técnico específicos.
                </p>
                <p>
                  <strong>Auditorías Regulares:</strong> Realizamos evaluaciones de seguridad periódicas
                  para mantener los más altos estándares de protección.
                </p>
              </div>
            </div>

            {/* Section 5: Your Rights */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">5. Tus Derechos</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Acceso a tus Datos:</strong> Puedes solicitar una copia de toda la información
                  personal que tenemos sobre ti en cualquier momento.
                </p>
                <p>
                  <strong>Corrección de Datos:</strong> Actualiza tu información personal directamente
                  en la app o contacta soporte para correcciones.
                </p>
                <p>
                  <strong>Eliminación de Cuenta:</strong> Puedes eliminar tu cuenta permanentemente,
                  y borraremos toda tu información personal dentro de 30 días.
                </p>
                <p>
                  <strong>Exportación de Datos:</strong> Solicita una copia de tus datos en formato
                  legible para transferir a otra plataforma si lo deseas.
                </p>
                <p>
                  <strong>Control de Comunicaciones:</strong> Ajusta qué notificaciones quieres recibir
                  directamente en la configuración de tu cuenta.
                </p>
              </div>
            </div>

            {/* Section 6: Cookies and Tracking */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg shadow-md flex items-center justify-center">
                  <Globe className="h-5 w-5 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">6. Cookies y Seguimiento</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  <strong>Cookies Esenciales:</strong> Utilizamos cookies necesarias para el funcionamiento
                  básico de la plataforma, como mantener tu sesión activa.
                </p>
                <p>
                  <strong>Cookies de Preferencias:</strong> Recordamos tus configuraciones y preferencias
                  para personalizar tu experiencia en futuras visitas.
                </p>
                <p>
                  <strong>Análisis de Uso:</strong> Utilizamos herramientas de análisis para entender
                  cómo se usa la plataforma y mejorar nuestros servicios.
                </p>
                <p>
                  <strong>Control Total:</strong> Puedes gestionar las preferencias de cookies en
                  la configuración de tu navegador en cualquier momento.
                </p>
              </div>
            </div>

            {/* Section 7: Children's Privacy */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-md flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">7. Privacidad de Menores</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  FemFuel Beauty está diseñado para usuarios de 18 años en adelante. No recopilamos
                  intencionalmente información de menores de 18 años.
                </p>
                <p>
                  Los usuarios entre 16-17 años pueden usar la plataforma con autorización de padre
                  o tutor, quien será responsable de la gestión de la privacidad.
                </p>
                <p>
                  Si descubrimos que hemos recopilado información de un menor sin autorización,
                  eliminaremos esa información inmediatamente.
                </p>
              </div>
            </div>

            {/* Section 8: International Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-md flex items-center justify-center">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">8. Datos Internacionales</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  Aunque FemFuel Beauty opera principalmente en República Dominicana, algunos de nuestros
                  proveedores de servicios pueden procesar datos en otros países.
                </p>
                <p>
                  Garantizamos que cualquier transferencia internacional de datos cumple con estándares
                  de protección equivalentes a los establecidos en la legislación dominicana.
                </p>
                <p>
                  Todos los proveedores internacionales firman acuerdos estrictos de protección de datos
                  antes de procesar cualquier información de nuestros usuarios.
                </p>
              </div>
            </div>

            {/* Section 9: Policy Updates */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-femfuel-dark">9. Actualizaciones de Política</h2>
              </div>
              <div className="space-y-4 text-femfuel-medium">
                <p>
                  Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios
                  en nuestros servicios o requerimientos legales.
                </p>
                <p>
                  Te notificaremos sobre cambios importantes por email y a través de la app con al menos
                  30 días de anticipación.
                </p>
                <p>
                  El uso continuado de FemFuel Beauty después de los cambios constituye aceptación
                  de la nueva política de privacidad.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-rose-100 shadow-md flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-femfuel-dark">Contacto sobre Privacidad</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos,
                contáctanos directamente.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="text-sm">
                  <div className="font-medium text-femfuel-dark mb-1">Email de Privacidad</div>
                  <div className="text-purple-600">privacy@femfuelbeauty.com</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-femfuel-dark mb-1">Delegado de Protección</div>
                  <div className="text-purple-600">dpo@femfuelbeauty.com</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href="mailto:privacy@femfuelbeauty.com"
                  className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-2 justify-center text-center"
                >
                  <Mail className="h-4 w-4" />
                  Contactar Privacidad
                </a>
                <a
                  href="/help"
                  className="bg-white border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:bg-purple-50 text-femfuel-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-center"
                >
                  Centro de Ayuda
                </a>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-femfuel-medium text-center">
                Esta política de privacidad describe cómo FemFuel Beauty protege y utiliza tu información personal.
                Al usar nuestra plataforma, confirmas que has leído y entendido estas prácticas de privacidad.
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