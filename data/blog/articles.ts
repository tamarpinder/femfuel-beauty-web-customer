export interface BlogArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  author: Author
  publishedAt: string
  readTime: number
  featuredImage: string
  tags: string[]
  isFeatured: boolean
  views: number
  likes: number
}

export interface Author {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  socialLinks?: {
    instagram?: string
    whatsapp?: string
  }
  isProfessional: boolean
  professionalId?: string
}

export type BlogCategory =
  | 'tendencias-dr'
  | 'transformaciones'
  | 'tips-expertos'
  | 'cuidado-caribeno'
  | 'productos'
  | 'eventos'

export const blogCategories: Record<BlogCategory, { name: string; description: string; icon: string }> = {
  'tendencias-dr': {
    name: 'Tendencias DR',
    description: 'Las últimas tendencias de belleza en República Dominicana',
    icon: '🇩🇴'
  },
  'transformaciones': {
    name: 'Transformaciones Reales',
    description: 'Historias de transformación de nuestras clientas',
    icon: '✨'
  },
  'tips-expertos': {
    name: 'Tips de Expertos',
    description: 'Consejos profesionales de nuestros especialistas',
    icon: '👩‍🎨'
  },
  'cuidado-caribeno': {
    name: 'Cuidado Caribeño',
    description: 'Rutinas adaptadas al clima tropical dominicano',
    icon: '🌺'
  },
  'productos': {
    name: 'Productos Recomendados',
    description: 'Reviews y recomendaciones de productos',
    icon: '🛍️'
  },
  'eventos': {
    name: 'Eventos y Workshops',
    description: 'Eventos de belleza en Santo Domingo',
    icon: '📅'
  }
}

export const blogAuthors: Author[] = [
  {
    id: 'carla-rodriguez',
    name: 'Carla Rodríguez',
    title: 'Especialista en Color',
    bio: 'Colorista profesional con 8 años de experiencia en balayage y técnicas avanzadas de color.',
    avatar: '/professionals/portraits/hair-colorist-lucia.png',
    socialLinks: {
      instagram: '@carla_color_expert'
    },
    isProfessional: true,
    professionalId: 'vendor-profile-003-prof-1'
  },
  {
    id: 'alejandra-santos',
    name: 'Alejandra Santos',
    title: 'Maquilladora Profesional',
    bio: 'Maquilladora especializada en novias y eventos especiales con más de 6 años de experiencia.',
    avatar: '/professionals/portraits/bridal-makeup-artist-valentina.png',
    socialLinks: {
      instagram: '@ale_makeup_artist'
    },
    isProfessional: true,
    professionalId: 'vendor-profile-001-prof-2'
  },
  {
    id: 'gabriel-mendez',
    name: 'Gabriel Méndez',
    title: 'Hair Designer',
    bio: 'Estilista creativo especializado en cortes modernos y tendencias urbanas.',
    avatar: '/professionals/portraits/hair-designer-diego.png',
    socialLinks: {
      instagram: '@gabriel_hair_design'
    },
    isProfessional: true,
    professionalId: 'vendor-profile-003-prof-3'
  },
  {
    id: 'femfuel-team',
    name: 'Equipo FemFuel',
    title: 'Editores de Belleza',
    bio: 'Nuestro equipo editorial especializado en tendencias y cuidado de belleza.',
    avatar: '/femfuel-logo.png',
    isProfessional: false
  }
]

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'guia-completa-alisado-dominicano',
    title: 'Guía Completa del Alisado Dominicano: Todo lo que Necesitas Saber',
    excerpt: 'Descubre los secretos del famoso alisado dominicano, desde la técnica hasta el cuidado posterior. Una guía completa para obtener el cabello liso perfecto.',
    content: `
# Guía Completa del Alisado Dominicano

El alisado dominicano es una técnica tradicional que ha conquistado al mundo por sus resultados excepcionales. En esta guía completa, te contamos todo lo que necesitas saber.

## ¿Qué es el Alisado Dominicano?

El alisado dominicano es una técnica que combina champú, acondicionador, y un secado específico con cepillo y secadora para lograr un cabello completamente liso y brillante.

## Beneficios del Alisado Dominicano

- **Brillo natural**: Obtén un cabello con brillo espectacular
- **Duración**: Los resultados pueden durar hasta una semana
- **Sin químicos**: Técnica 100% natural
- **Volumen controlado**: Perfecto para cabellos rebeldes

## El Proceso Paso a Paso

### 1. Preparación
- Lavado profundo con champú clarificante
- Aplicación de mascarilla nutritiva

### 2. Secado Técnico
- Secado con cepillo redondo
- Técnica específica de tensión
- Temperatura controlada

### 3. Acabado
- Planchado final para sellar
- Aplicación de sérum protector

## Cuidados Posteriores

Para mantener tu alisado dominicano:
- Usa fundas de seda para dormir
- Evita la humedad las primeras 24 horas
- Aplica productos sin sulfatos

## ¿Dónde Hacerlo?

En FemFuel Beauty contamos con especialistas certificados en alisado dominicano. ¡Reserva tu cita hoy!
    `,
    category: 'tips-expertos',
    author: blogAuthors[0],
    publishedAt: '2024-09-20',
    readTime: 8,
    featuredImage: '/blog/alisado-dominicano-hero.jpg',
    tags: ['alisado', 'cabello', 'dominicano', 'técnicas'],
    isFeatured: true,
    views: 2847,
    likes: 156
  },
  {
    id: '2',
    slug: 'maquillaje-clima-tropical',
    title: '5 Looks de Maquillaje Perfectos para el Clima Tropical',
    excerpt: 'Aprende a crear maquillajes que resistan el calor y la humedad del Caribe. Tips profesionales para lucir perfecta todo el día.',
    content: `
# 5 Looks de Maquillaje Perfectos para el Clima Tropical

El clima tropical presenta desafíos únicos para el maquillaje. Aquí te compartimos 5 looks probados que resistirán el calor caribeño.

## 1. Look Natural de Día

Perfecto para el día a día en el trópico:
- Base ligera con FPS
- Corrector waterproof
- Máscara de pestañas a prueba de agua
- Lip tint natural

## 2. Glam Tropical para la Noche

Para esas noches especiales:
- Primer mattificante
- Base de larga duración
- Sombras en tonos dorados
- Delineador gel

## 3. Beach Ready

Ideal para la playa:
- Tinte facial
- Bronzer cremoso
- Lip balm con color
- Cejas definidas

## 4. Look de Oficina Fresco

Profesional pero cómodo:
- Base mineral
- Rubor duradero
- Labial mate
- Polvo traslúcido

## 5. Tropical Glam

Para eventos especiales:
- Full coverage base
- Contorno completo
- Smokey eyes tropicales
- Labios statement

## Tips para el Clima Húmedo

- Usa siempre primer
- Fija con polvo traslúcido
- Lleva productos para retoques
- Invierte en cosméticos waterproof
    `,
    category: 'tips-expertos',
    author: blogAuthors[1],
    publishedAt: '2024-09-18',
    readTime: 6,
    featuredImage: '/blog/maquillaje-tropical-hero.jpg',
    tags: ['maquillaje', 'tropical', 'humidity', 'looks'],
    isFeatured: true,
    views: 1923,
    likes: 89
  },
  {
    id: '3',
    slug: 'transformacion-isabella-natural-glamour',
    title: 'Transformación del Mes: Isabella - De Natural a Glamour',
    excerpt: 'Conoce la increíble transformación de Isabella, que pasó de un look natural a un glamour espectacular para su boda.',
    content: `
# Transformación del Mes: Isabella - De Natural a Glamour

Este mes te presentamos la increíble transformación de Isabella, una novia que confió en nuestro equipo para su día especial.

## La Historia de Isabella

Isabella llegó a nosotros buscando un cambio completo para su boda. Quería mantener su esencia natural pero con un toque glamoroso.

## El Plan de Transformación

### Cabello
- Balayage dorado caribeño
- Corte en capas para dar movimiento
- Tratamiento de keratina

### Maquillaje
- Maquillaje de novia tropical
- Técnica de contouring sutil
- Pestañas voluminosas

### Uñas
- Manicure francesa moderna
- Nail art delicado

## El Resultado

Isabella quedó radiante. Su transformación no solo cambió su apariencia, sino que aumentó su confianza para el día más importante de su vida.

## Testimonial

"Nunca pensé que podría verme tan glamorosa manteniendo mi esencia. El equipo de FemFuel hizo realidad mi sueño" - Isabella M.

## ¿Quieres tu Propia Transformación?

Reserva una consulta con nuestros expertos y descubre tu potencial de belleza.
    `,
    category: 'transformaciones',
    author: blogAuthors[3],
    publishedAt: '2024-09-15',
    readTime: 5,
    featuredImage: '/blog/transformacion-isabella-hero.jpg',
    tags: ['transformación', 'novia', 'antes-después', 'glamour'],
    isFeatured: false,
    views: 3241,
    likes: 234
  },
  {
    id: '4',
    slug: 'cuidado-capilar-verano-caribeno',
    title: 'Cuidado Capilar en Verano Caribeño: Rutina Completa',
    excerpt: 'Protege tu cabello del sol, la sal y la humedad con esta rutina específica para el clima tropical dominicano.',
    content: `
# Cuidado Capilar en Verano Caribeño

El verano caribeño puede ser especialmente duro con nuestro cabello. Aquí te damos una rutina completa de cuidado.

## Desafíos del Clima Tropical

- Sol intenso
- Alta humedad
- Sal del mar
- Cloro de piscinas

## Rutina de Cuidado Diario

### Mañana
1. Aplicar protector solar capilar
2. Usar leave-in hidratante
3. Peinar con productos anti-frizz

### Noche
1. Champú suave
2. Mascarilla nutritiva
3. Sérum reparador

## Productos Esenciales

- **Champú clarificante**: Una vez por semana
- **Acondicionador profundo**: Dos veces por semana
- **Protector solar capilar**: Diario
- **Aceite nutritivo**: Según necesidad

## Tips Especiales

- Usa sombreros en la playa
- Enjuaga después de la piscina
- Hidrata intensivamente los fines de semana
- Evita herramientas de calor cuando sea posible

## Tratamientos Recomendados

Para cabellos muy dañados, considera:
- Keratina tropical
- Botox capilar
- Tratamientos con ozono
    `,
    category: 'cuidado-caribeno',
    author: blogAuthors[0],
    publishedAt: '2024-09-12',
    readTime: 7,
    featuredImage: '/blog/cuidado-capilar-verano-hero.jpg',
    tags: ['cabello', 'verano', 'cuidado', 'tropical'],
    isFeatured: false,
    views: 1567,
    likes: 92
  },
  {
    id: '5',
    slug: 'tendencias-unas-2024-rd',
    title: 'Tendencias de Uñas 2024 en República Dominicana',
    excerpt: 'Descubre las tendencias de nail art que están dominando en RD este año. Desde diseños tropicales hasta técnicas minimalistas.',
    content: `
# Tendencias de Uñas 2024 en República Dominicana

Este año trae tendencias frescas y tropicales perfectas para nuestro clima caribeño.

## Tendencia #1: Tropical Paradise

Diseños inspirados en la flora dominicana:
- Palmeras minimalistas
- Flores de hibisco
- Degradados de atardecer
- Azules marinos y turquesas

## Tendencia #2: French Moderna

La manicure francesa reinventada:
- Tips de colores
- Formas geométricas
- Acabados mate
- French reversa

## Tendencia #3: Nail Art Minimalista

Menos es más:
- Líneas finas
- Puntos delicados
- Geometría simple
- Colores nude

## Tendencia #4: Chrome y Metálicos

Brillos que deslumbran:
- Chrome espejo
- Holográficos
- Dorados tropicales
- Platas futuristas

## Tendencia #5: Uñas Texturizadas

Nuevas texturas:
- Efecto arena
- Matte granulado
- Terciopelo
- Caviar beads

## Colores del Año

Los colores que están dominando:
- Coral vibrante
- Verde esmeralda
- Azul Caribe
- Dorado sunset

## Cómo Mantener tus Uñas

- Base fortalecedora
- Top coat duradero
- Aceite de cutículas
- Protección solar
    `,
    category: 'tendencias-dr',
    author: blogAuthors[3],
    publishedAt: '2024-09-10',
    readTime: 4,
    featuredImage: '/blog/tendencias-unas-2024-hero.jpg',
    tags: ['uñas', 'tendencias', '2024', 'nail-art'],
    isFeatured: false,
    views: 2156,
    likes: 178
  },
  {
    id: '6',
    slug: 'profesionales-destacados-conoce-expertos',
    title: 'Profesionales Destacados: Conoce a Nuestros Expertos',
    excerpt: 'Conoce a los talentosos profesionales que hacen posible las transformaciones en FemFuel Beauty.',
    content: `
# Profesionales Destacados: Conoce a Nuestros Expertos

En FemFuel Beauty, nuestro éxito se debe al increíble talento de nuestros profesionales.

## Carla Rodríguez - Especialista en Color

Con 8 años de experiencia, Carla es nuestra experta en:
- Balayage avanzado
- Coloración fantasía
- Corrección de color
- Técnicas de degradado

### Su Filosofía
"Cada cabello cuenta una historia única. Mi trabajo es realzar esa historia con el color perfecto."

## Alejandra Santos - Maquilladora Profesional

Especialista en maquillaje para:
- Novias y eventos
- Sesiones fotográficas
- Maquillaje editorial
- Looks de día y noche

### Su Especialidad
"Creo que el maquillaje debe realzar la belleza natural, no ocultarla."

## Gabriel Méndez - Hair Designer

Creativo y vanguardista:
- Cortes modernos
- Estilos urbanos
- Tendencias internacionales
- Asesoría de imagen

### Su Visión
"El cabello es tu accesorio más importante. Debe reflejar tu personalidad."

## Patricia López - Nail Artist

Artista del nail art:
- Diseños únicos
- Técnicas 3D
- Nail art tropical
- Manicures de lujo

### Su Arte
"Las uñas son pequeños lienzos donde puedo crear obras de arte únicas."

## ¿Quieres Trabajar con Ellos?

Reserva tu cita y experimenta la diferencia de trabajar con verdaderos profesionales.
    `,
    category: 'tips-expertos',
    author: blogAuthors[3],
    publishedAt: '2024-09-08',
    readTime: 6,
    featuredImage: '/blog/profesionales-destacados-hero.jpg',
    tags: ['profesionales', 'equipo', 'expertos', 'staff'],
    isFeatured: false,
    views: 1834,
    likes: 145
  }
]

export const getFeaturedArticles = (): BlogArticle[] => {
  return blogArticles.filter(article => article.isFeatured)
}

export const getArticlesByCategory = (category: BlogCategory): BlogArticle[] => {
  return blogArticles.filter(article => article.category === category)
}

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug)
}

export const getRelatedArticles = (currentArticle: BlogArticle, limit: number = 3): BlogArticle[] => {
  return blogArticles
    .filter(article =>
      article.id !== currentArticle.id &&
      (article.category === currentArticle.category ||
       article.tags.some(tag => currentArticle.tags.includes(tag)))
    )
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

export const searchArticles = (query: string): BlogArticle[] => {
  const searchTerm = query.toLowerCase()
  return blogArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}