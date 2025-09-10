// Service-focused descriptions for marketplace model
export const serviceDescriptions: Record<string, string> = {
  // Hair Services
  "Alisado Dominicano": "Técnica tradicional dominicana que suaviza y alisa el cabello de forma natural, reduciendo el volumen y dando un acabado sedoso que dura semanas.",
  "Balayage": "Técnica de coloración a mano alzada que crea reflejos naturales y degradados, perfecta para un look luminoso y con movimiento.",
  "Tratamiento de Keratina": "Tratamiento intensivo que reconstruye la fibra capilar, elimina el frizz y aporta brillo y suavidad duradera al cabello.",
  "Corte de Cabello": "Corte personalizado según tu tipo de rostro y estilo de vida, creando la forma perfecta para realzar tu belleza natural.",
  "Tinte de Cabello": "Coloración profesional con productos de alta calidad que garantiza color uniforme, brillo y cuidado del cabello.",
  "Peinado de Boda": "Peinado elegante y duradero diseñado especialmente para tu día especial, con técnicas que aseguran que se mantenga perfecto todo el día.",
  "Corte de Cabello Rizado": "Corte especializado para cabello rizado que define los rizos naturales y facilita el peinado diario.",
  "Tratamiento Capilar": "Tratamiento reparador profundo que nutre y fortalece el cabello desde la raíz hasta las puntas.",
  "Extensiones de Cabello": "Aplicación de extensiones de alta calidad que agregan longitud y volumen de forma natural e imperceptible.",
  "Mechas Californianas": "Técnica de iluminación que crea reflejos dorados y naturales, perfecta para un look soleado y juvenil.",
  "Alisado Químico": "Proceso químico profesional que alisa permanentemente el cabello, eliminando ondas y rizos no deseados.",
  "Mascarilla Capilar": "Tratamiento nutritivo intensivo que hidrata profundamente y repara el cabello dañado, devolviéndole vida y brillo.",

  // Nail Services
  "Manicure de Gel": "Manicure con esmalte en gel de larga duración que mantiene el color y brillo perfecto hasta por 3 semanas.",
  "Arte de Uñas Tropical": "Diseños únicos inspirados en la cultura caribeña con colores vibrantes y motivos tropicales.",
  "Manicure Clásico": "Manicure tradicional con esmaltado clásico, incluye limado, cutícula y hidratación de manos.",
  "Extensiones de Acrílico": "Extensiones de uñas en acrílico que permiten lograr la longitud deseada con acabado resistente y duradero.",
  "Pedicure Spa": "Tratamiento completo de pies con exfoliación, hidratación y esmaltado en ambiente relajante tipo spa.",
  "Manicure Exprés": "Servicio rápido de manicure ideal para retoques y mantenimiento, perfecto para horarios ocupados.",
  "Manicure de Lujo": "Experiencia premium de manicure con productos de alta gama y tratamientos adicionales de hidratación.",
  "Pedicure Spa Deluxe": "Pedicure de lujo con masaje extendido, exfoliación profunda y tratamientos especiales para pies.",
  "Manicure Francés Moderno": "Versión actualizada del clásico francés con variaciones de color y diseños contemporáneos.",
  "Reparación de Uñas": "Servicio especializado para reparar uñas rotas o dañadas, devolviendo su forma y resistencia.",

  // Makeup Services
  "Maquillaje de Novia": "Maquillaje especializado para novias que garantiza un look perfecto y duradero durante toda la celebración.",
  "Maquillaje Natural": "Maquillaje sutil que realza la belleza natural sin sobrecargar, perfecto para el día a día.",
  "Maquillaje de Gala": "Maquillaje sofisticado y elegante para eventos especiales, con técnicas de alta definición.",
  "Maquillaje Ejecutivo": "Maquillaje profesional y pulido ideal para el ambiente corporativo y reuniones de negocios.",
  "Maquillaje para Fotografía": "Maquillaje especializado para sesiones fotográficas, con técnicas que lucen perfectas en cámara.",
  "Maquillaje Caribeño": "Maquillaje vibrante inspirado en los colores del Caribe, perfecto para celebraciones tropicales.",
  "Maquillaje con Aerógrafo": "Técnica de aplicación con aerógrafo que logra un acabado impecable y de larga duración.",
  "Maquillaje de Ocasión Especial": "Maquillaje personalizado para eventos importantes, adaptado al estilo y preferencias de cada cliente.",

  // Spa Services
  "Facial de Lujo": "Tratamiento facial premium con productos de alta gama que limpia, nutre y rejuvenece la piel profundamente.",
  "Masaje Relajante": "Masaje terapéutico que alivia tensiones musculares y proporciona relajación total del cuerpo y mente.",
  "Limpieza Facial Profunda": "Tratamiento intensivo que elimina impurezas, puntos negros y células muertas, purificando la piel.",
  "Aromaterapia": "Terapia con aceites esenciales que combina relajación física y mental a través del poder de los aromas.",
  "Masaje con Piedras Calientes": "Técnica ancestral que utiliza piedras volcánicas calientes para liberar tensiones profundas.",
  "Masaje Terapéutico": "Masaje especializado que trata dolencias específicas y mejora la circulación y movilidad.",
  "Microdermoabrasión": "Exfoliación profunda que renueva la piel, reduce líneas finas y mejora la textura cutánea.",
  "Masaje de Pareja": "Experiencia romántica de masaje simultáneo en ambiente íntimo, perfecta para compartir momentos especiales.",

  // Lash & Brow Services
  "Extensiones de Pestañas": "Aplicación individual de extensiones que agregan longitud y volumen natural a las pestañas.",
  "Volumen Ruso": "Técnica avanzada que crea pestañas súper voluminosas mediante la aplicación de múltiples extensiones por pestaña natural.",
  "Pestañas Clásicas": "Extensiones uno a uno que crean un look natural y elegante, perfectas para uso diario.",
  "Tinte de Pestañas": "Coloración de pestañas que las oscurece y define, eliminando la necesidad de rímel diario.",
  "Microblading de Cejas": "Técnica de micropigmentación que dibuja cejas pelo por pelo con resultados naturales y duraderos.",
  "Lifting de Pestañas": "Tratamiento que curva y levanta las pestañas naturales, creando un efecto de máscara permanente.",
  "Diseño de Cejas": "Perfilado y diseño profesional de cejas que enmarca perfectamente el rostro según su forma natural."
}

export function getServiceDescription(serviceName: string): string {
  return serviceDescriptions[serviceName] || `Servicio profesional de ${serviceName.toLowerCase()} con atención experta y productos de calidad.`
}