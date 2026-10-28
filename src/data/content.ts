import type { Artist, Concert } from '../types'

const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const concerts: Concert[] = [
  {
    id: 'nuevas-voces', name: 'Nuevas Voces', genre: 'Indie / Alternativo', venue: 'Centro Cultural de Barranco, Lima',
    date: 'Por anunciar', time: 'Por confirmar', price: 35,
    description: 'Una noche para descubrir las propuestas que están dando forma al sonido independiente peruano. Nuevas Voces reúne distintas miradas, historias y sonidos en un mismo escenario.',
    artists: ['Los Náufragos', 'Luna Clara', 'Aurora'], image: photo('photo-1501386761578-eac5c94b800a'), featured: true, demo: true,
  },
  {
    id: 'pulso-solar', name: 'Pulso Solar', genre: 'Indie pop', venue: 'Espacio de muestra · Barranco',
    date: 'Ejemplo · fecha por definir', time: '20:00', price: 28,
    description: 'Un encuentro de sonidos luminosos, guitarras abiertas y nuevas canciones para cantar en comunidad.',
    artists: ['Luna Clara', 'Marea Alta'], image: photo('photo-1470229722913-7c0e2dbbafd3'), demo: true,
  },
  {
    id: 'ruido-de-fondo', name: 'Ruido de Fondo', genre: 'Rock alternativo', venue: 'Espacio de muestra · Lima',
    date: 'Ejemplo · fecha por definir', time: '19:30', price: 30,
    description: 'Guitarras al frente y una nueva generación que encuentra su propio volumen.',
    artists: ['Los Náufragos', 'Satélite Gris'], image: photo('photo-1459749411175-04bf5292ceea'), demo: true,
  },
]

export const artists: Artist[] = [
  {
    id: 'nautragos', name: 'Los Náufragos', genre: 'Rock alternativo',
    description: 'Guitarras inquietas y canciones para perderse un rato.',
    bio: 'Los Náufragos exploran los bordes del rock alternativo con letras íntimas y una energía que crece sobre el escenario. Proyecto musical de referencia para esta demostración.',
    image: photo('photo-1524368535928-5b5e00ddc76b'), color: '#ed795f',
  },
  {
    id: 'luna-clara', name: 'Luna Clara', genre: 'Indie pop',
    description: 'Pop sensible, atmósferas suaves y melodías que se quedan.',
    bio: 'Luna Clara construye paisajes de indie pop desde lo cotidiano: letras cercanas, sintetizadores sutiles y una voz que invita a escuchar con calma. Artista de referencia para esta demostración.',
    image: photo('photo-1506157786151-b8491531f063'), color: '#b9a1ee',
  },
  {
    id: 'aurora', name: 'Aurora', genre: 'R&B / Soul',
    description: 'Una voz luminosa entre el R&B alternativo y el soul.',
    bio: 'Aurora combina texturas cálidas, ritmos contemporáneos y una interpretación cargada de matices. Proyecto de referencia para esta demostración académica.',
    image: photo('photo-1516280440614-37939bbacd81'), color: '#df9bbb',
  },
]

export const heroImage = photo('photo-1501386761578-eac5c94b800a', 1800)

export const benefits = [
  { number: '01', title: 'Descubre nueva música', text: 'Encuentra artistas independientes y propuestas que todavía no están en todas partes.', icon: 'sparkles' },
  { number: '02', title: 'Todo más claro', text: 'Fechas, lugares, precios y condiciones reunidos en un solo lugar.', icon: 'calendar' },
  { number: '03', title: 'Vive la escena', text: 'Haz espacio para nuevas experiencias y momentos compartidos.', icon: 'heart' },
  { number: '04', title: 'Impulsa talento', text: 'Ayuda a que más proyectos emergentes lleguen a nuevos oídos.', icon: 'mic' },
]

export const faqs = [
  { question: '¿Qué es SONORA?', answer: 'SONORA es una propuesta de productora de conciertos y hub digital para descubrir talento emergente. Conectamos público, artistas y nuevas experiencias musicales.' },
  { question: '¿Cómo puedo descubrir nuevos conciertos?', answer: 'Explora la sección de conciertos, busca por nombre o filtra por género. Cada ficha reúne la información disponible del evento.' },
  { question: '¿Cómo puedo conocer a los artistas?', answer: 'En cada perfil encontrarás una breve biografía, su estilo y una opción para guardarlo entre tus favoritos.' },
  { question: '¿Cómo funciona la reserva?', answer: 'El flujo permite hacer una reserva de demostración y guardarla en este navegador. No se procesa ningún pago ni se emiten entradas válidas.' },
  { question: '¿Puedo postular como artista?', answer: 'Sí. El formulario de convocatoria permite registrar una postulación demostrativa local con información básica de tu proyecto musical.' },
  { question: '¿SONORA realiza conciertos reales actualmente?', answer: 'Este sitio es un prototipo académico. Los conciertos y artistas que aparecen aquí son demostrativos y no representan eventos confirmados.' },
]
