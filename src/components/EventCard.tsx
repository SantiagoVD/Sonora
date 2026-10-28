import { ArrowUpRight, MapPin, Ticket } from 'lucide-react'
import type { Concert } from '../types'

interface EventCardProps { concert: Concert; onDetails: (concert: Concert) => void; onReserve: (concert: Concert) => void }
export default function EventCard({ concert, onDetails, onReserve }: EventCardProps) {
  return <article className={`event-card ${concert.featured ? 'event-featured' : ''}`}>
    <button className="event-image" onClick={() => onDetails(concert)} aria-label={`Ver detalles de ${concert.name}`} style={{ backgroundImage: `url("${concert.image}")` }}>
      <span className="event-image-shade" />
      <span className="genre-pill">{concert.genre}</span>
      {concert.featured && <span className="featured-tag">SESIÓN DESTACADA</span>}
      <span className="event-arrow"><ArrowUpRight size={18} /></span>
    </button>
    <div className="event-card-content">
      <div className="event-title-row"><h3>{concert.name}</h3><span className="event-date">{concert.date === 'Por anunciar' ? 'TBA' : 'DEMO'}</span></div>
      <p className="event-venue"><MapPin size={14} />{concert.venue}</p>
      <div className="event-card-bottom"><span className="event-price"><small>Desde</small> S/ {concert.price}</span><button className="text-button" onClick={() => onDetails(concert)}>Ver detalles <ArrowUpRight size={15} /></button></div>
      <button className="button button-outline reserve-card-button" onClick={() => onReserve(concert)}><Ticket size={16} /> Reservar entrada</button>
    </div>
  </article>
}
