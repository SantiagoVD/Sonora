import { ArrowUpRight, Heart } from 'lucide-react'
import type { Artist } from '../types'

interface ArtistCardProps { artist: Artist; favorite: boolean; onFavorite: (artist: Artist) => void; onProfile: (artist: Artist) => void }
export default function ArtistCard({ artist, favorite, onFavorite, onProfile }: ArtistCardProps) {
  return <article className="artist-card">
    <button className="artist-photo" style={{ backgroundImage: `url("${artist.image}")` }} onClick={() => onProfile(artist)} aria-label={`Ver perfil de ${artist.name}`}>
      <span className="artist-photo-shade" />
      <span className="artist-index">ARTISTA / 0{['nautragos', 'luna-clara', 'aurora'].indexOf(artist.id) + 1}</span>
      <span className="artist-open"><ArrowUpRight size={18} /></span>
    </button>
    <div className="artist-card-content">
      <div className="artist-name-row"><div><span className="artist-genre">{artist.genre}</span><h3>{artist.name}</h3></div><button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(artist)} aria-label={favorite ? `Quitar ${artist.name} de favoritos` : `Agregar ${artist.name} a favoritos`} aria-pressed={favorite}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button></div>
      <p>{artist.description}</p>
      <button className="text-button artist-profile-link" onClick={() => onProfile(artist)}>Conocer artista <ArrowUpRight size={15} /></button>
    </div>
  </article>
}
