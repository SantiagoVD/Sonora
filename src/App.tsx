import { useMemo, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Heart, MapPin, Music2, Search, Ticket, Trash2, X } from 'lucide-react'
import Navbar from './components/Navbar'
import EventCard from './components/EventCard'
import ArtistCard from './components/ArtistCard'
import Modal from './components/Modal'
import { About, Benefits, FAQ, Footer, Hero, ProjectVideo } from './components/Sections'
import { artists, concerts } from './data/content'
import { getApplications, getFavorites, getReservations, saveApplications, saveFavorites, saveReservations } from './utils/storage'
import type { Application, Artist, Concert, Reservation } from './types'

type Dialog = { type: 'details'; concert: Concert } | { type: 'reserve'; concert: Concert } | { type: 'artist'; artist: Artist } | { type: 'apply' } | { type: 'reservations' } | { type: 'success'; reservation: Reservation } | { type: 'application-success'; application: Application } | null

const money = (value: number) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(value)

export default function App() {
  const [dialog, setDialog] = useState<Dialog>(null)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Todos los géneros')
  const [favorites, setFavorites] = useState<string[]>(getFavorites)
  const [reservations, setReservations] = useState<Reservation[]>(getReservations)
  const [applications, setApplications] = useState<Application[]>(getApplications)

  const genres = ['Todos los géneros', ...Array.from(new Set(concerts.map((concert) => concert.genre)))]
  const filteredConcerts = useMemo(() => concerts.filter((concert) => {
    const matchesSearch = concert.name.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es'))
    const matchesGenre = genre === 'Todos los géneros' || concert.genre === genre
    return matchesSearch && matchesGenre
  }), [search, genre])

  const toggleFavorite = (artist: Artist) => {
    const next = favorites.includes(artist.id) ? favorites.filter((id) => id !== artist.id) : [...favorites, artist.id]
    setFavorites(next)
    saveFavorites(next)
  }

  const openReservation = (concert: Concert) => setDialog({ type: 'reserve', concert })
  const removeReservation = (id: string) => {
    const next = reservations.filter((reservation) => reservation.id !== id)
    setReservations(next)
    saveReservations(next)
  }

  const submitReservation = (event: FormEvent<HTMLFormElement>, concert: Concert) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const quantity = Number(form.get('quantity'))
    const attendee = String(form.get('attendee') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const reservation: Reservation = {
      id: `SNR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      concertId: concert.id, concertName: concert.name, attendee, email, quantity,
      total: concert.price * quantity, createdAt: new Date().toISOString(),
    }
    const next = [reservation, ...reservations]
    setReservations(next)
    saveReservations(next)
    setDialog({ type: 'success', reservation })
  }

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const application: Application = {
      id: `POST-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      artistName: String(form.get('artistName') ?? '').trim(), contactName: String(form.get('contactName') ?? '').trim(),
      email: String(form.get('applicationEmail') ?? '').trim(), genre: String(form.get('applicationGenre') ?? ''),
      city: String(form.get('city') ?? '').trim(), portfolio: String(form.get('portfolio') ?? '').trim(),
      description: String(form.get('projectDescription') ?? '').trim(), createdAt: new Date().toISOString(),
    }
    const next = [application, ...applications]
    setApplications(next)
    saveApplications(next)
    setDialog({ type: 'application-success', application })
  }

  return <>
    <Navbar onReservations={() => setDialog({ type: 'reservations' })} />
    <main>
      <Hero />
      <ProjectVideo />

      <section className="events-section section-padding" id="conciertos">
        <div className="container">
          <div className="section-heading events-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> PRÓXIMAMENTE EN TU CIUDAD</span><h2>Próximos <em>conciertos</em></h2><p>Encuentros para escuchar distinto y sentirlo de cerca.</p></div><a className="button button-outline heading-link" href="#artistas">Explorar artistas <ArrowUpRight size={16}/></a></div>
          <div className="event-controls"><label className="search-control"><Search size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar conciertos..." aria-label="Buscar conciertos por nombre" />{search && <button aria-label="Limpiar búsqueda" onClick={() => setSearch('')}><X size={15}/></button>}</label><label className="filter-control"><span>Género</span><select value={genre} onChange={(event) => setGenre(event.target.value)} aria-label="Filtrar por género">{genres.map((value) => <option key={value}>{value}</option>)}</select></label><span className="event-count">{filteredConcerts.length} EXPERIENCIA{filteredConcerts.length === 1 ? '' : 'S'}</span></div>
          {filteredConcerts.length ? <div className="event-grid">{filteredConcerts.map((concert) => <EventCard key={concert.id} concert={concert} onDetails={(selected) => setDialog({ type: 'details', concert: selected })} onReserve={openReservation} />)}</div> : <div className="empty-state"><Search size={25}/><h3>No encontramos conciertos</h3><p>Prueba otra búsqueda o cambia el género seleccionado.</p><button className="text-button" onClick={() => { setSearch(''); setGenre('Todos los géneros') }}>Limpiar filtros <ArrowUpRight size={15}/></button></div>}
          <p className="demo-disclaimer"><span>✳</span> Prototipo académico. Fechas, artistas y eventos son demostrativos y no están confirmados.</p>
        </div>
      </section>

      <Benefits />

      <section className="artists-section section-padding" id="artistas">
        <div className="container"><div className="section-heading artists-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> NUEVOS NOMBRES. NUEVOS SONIDOS.</span><h2>La escena tiene<br /><em>algo que decir.</em></h2></div><div className="artists-heading-note"><span className="artist-count-big">0{artists.length}</span><p>proyectos de referencia<br/>para esta demostración</p></div></div>
          <div className="artist-grid">{artists.map((artist) => <ArtistCard key={artist.id} artist={artist} favorite={favorites.includes(artist.id)} onFavorite={toggleFavorite} onProfile={(selected) => setDialog({ type: 'artist', artist: selected })} />)}</div>
          <div className="favorite-note"><Heart size={14} /> Tus favoritos quedan guardados en este navegador.</div>
        </div>
      </section>

      <section className="callout-section" id="convocatoria"><div className="callout-image"/><div className="callout-overlay"/><div className="container callout-inner"><div className="callout-kicker"><span className="live-dot"/> LLAMADO ABIERTO · DEMOSTRACIÓN</div><h2>Tu música<br />merece un <em>escenario.</em></h2><p>Creemos en el talento emergente. Hagamos que tu proyecto conecte con nuevas audiencias y nuevas oportunidades.</p><button className="button button-light" onClick={() => setDialog({ type: 'apply' })}>Postula como artista <ArrowUpRight size={17}/></button><span className="callout-mark">SNR<br/>✳</span></div></section>

      <About />
      <FAQ />
    </main>
    <Footer />

    {dialog?.type === 'details' && <Modal title={`Detalles de ${dialog.concert.name}`} onClose={() => setDialog(null)} wide><div className="details-layout"><div className="details-image" style={{ backgroundImage: `url("${dialog.concert.image}")` }}><button className="back-link" onClick={() => setDialog(null)}><ArrowLeft size={15}/> Volver</button><span className="genre-pill">{dialog.concert.genre}</span></div><div className="details-copy"><span className="eyebrow"><span className="eyebrow-line"/> SESIÓN SONORA</span><h2>{dialog.concert.name}</h2><p className="details-description">{dialog.concert.description}</p><div className="details-info"><div><small>FECHA Y HORA</small><strong>{dialog.concert.date} · {dialog.concert.time}</strong></div><div><small>UBICACIÓN</small><strong><MapPin size={15}/>{dialog.concert.venue}</strong></div><div><small>ARTISTAS</small><strong>{dialog.concert.artists.join(' · ')}</strong></div><div><small>ENTRADA REFERENCIAL</small><strong>{money(dialog.concert.price)} <span>por persona</span></strong></div></div><p className="policy-note">Actividad de demostración. El acceso, las fechas y las condiciones no corresponden a un evento confirmado.</p><button className="button button-primary full-button" onClick={() => openReservation(dialog.concert)}><Ticket size={16}/> Reservar entrada <ArrowUpRight size={16}/></button></div></div></Modal>}

    {dialog?.type === 'reserve' && <Modal title={`Reservar para ${dialog.concert.name}`} onClose={() => setDialog(null)}><div className="modal-heading"><span className="eyebrow"><span className="eyebrow-line"/> RESERVA DE DEMOSTRACIÓN</span><h2>Guarda tu<br/><em>lugar.</em></h2><p>Completa tus datos para generar una reserva de prueba.</p></div><form className="form-stack" onSubmit={(event) => submitReservation(event, dialog.concert)}><div className="form-event-summary"><span className="mini-event-thumb" style={{ backgroundImage: `url("${dialog.concert.image}")`}}/><div><small>CONCIERTO</small><strong>{dialog.concert.name}</strong><span>{dialog.concert.date}</span></div><strong className="summary-price">{money(dialog.concert.price)}<small>/ persona</small></strong></div><label className="field-label">Nombre completo<input name="attendee" required autoComplete="name" placeholder="Tu nombre" maxLength={80}/></label><label className="field-label">Correo electrónico<input name="email" type="email" required autoComplete="email" placeholder="nombre@correo.com" maxLength={120}/></label><div className="form-quantity-row"><label className="field-label">Tipo de entrada<select name="ticketType"><option>General</option></select></label><label className="field-label quantity-label">Cantidad<input name="quantity" type="number" min="1" max="6" defaultValue="1" required onChange={(event) => { const total = document.getElementById('booking-total'); if (total) total.textContent = money(dialog.concert.price * Number(event.target.value || 1)) }}/></label></div><div className="total-row"><span>Total referencial</span><strong id="booking-total">{money(dialog.concert.price)}</strong></div><button className="button button-primary full-button" type="submit">Confirmar reserva de demostración <ArrowUpRight size={16}/></button><p className="form-disclaimer">No se ha realizado ningún pago ni se emitirá una entrada válida.</p></form></Modal>}

    {dialog?.type === 'success' && <Modal title="Reserva guardada" onClose={() => setDialog(null)}><div className="confirmation-content"><div className="confirmation-icon"><Check size={28}/></div><span className="eyebrow"><span className="eyebrow-line"/> RESERVA REGISTRADA</span><h2>Listo para<br/><em>descubrir.</em></h2><p>Tu reserva de demostración se guardó en este navegador.</p><div className="reservation-ticket"><span>RESERVA DE MUESTRA</span><strong>{dialog.reservation.concertName}</strong><div><small>CÓDIGO</small><b>{dialog.reservation.id}</b></div><div><small>ASISTENTE</small><b>{dialog.reservation.attendee}</b></div><div><small>TOTAL REFERENCIAL</small><b>{money(dialog.reservation.total)} · {dialog.reservation.quantity} entrada(s)</b></div></div><p className="form-disclaimer">No se realizó ningún pago. Esta reserva no es una entrada válida.</p><button className="button button-primary full-button" onClick={() => setDialog({ type: 'reservations' })}>Ver mis reservas <ArrowUpRight size={16}/></button></div></Modal>}

    {dialog?.type === 'application-success' && <Modal title="Postulación guardada" onClose={() => setDialog(null)}><div className="confirmation-content"><div className="confirmation-icon"><Check size={28}/></div><span className="eyebrow"><span className="eyebrow-line"/> POSTULACIÓN REGISTRADA</span><h2>Que siga<br/><em>sonando.</em></h2><p>La postulación de <strong>{dialog.application.artistName}</strong> quedó guardada en este navegador.</p><div className="reservation-ticket"><span>POSTULACIÓN DE MUESTRA</span><strong>{dialog.application.artistName}</strong><div><small>CÓDIGO</small><b>{dialog.application.id}</b></div><div><small>GÉNERO</small><b>{dialog.application.genre}</b></div><div><small>CIUDAD</small><b>{dialog.application.city}</b></div></div><p className="form-disclaimer">No se envió a ninguna organización real. Este formulario es demostrativo.</p><button className="button button-primary full-button" onClick={() => setDialog(null)}>Volver a SONORA <ArrowUpRight size={16}/></button></div></Modal>}

    {dialog?.type === 'reservations' && <Modal title="Mis reservas de demostración" onClose={() => setDialog(null)}><div className="modal-heading"><span className="eyebrow"><span className="eyebrow-line"/> TU ACTIVIDAD</span><h2>Mis <em>reservas.</em></h2><p>Guardadas localmente en este navegador.</p></div>{reservations.length ? <div className="saved-list">{reservations.map((reservation) => <article className="saved-item" key={reservation.id}><div className="saved-icon"><Ticket size={17}/></div><div className="saved-details"><strong>{reservation.concertName}</strong><span>{reservation.attendee} · {reservation.quantity} entrada(s)</span><small>{reservation.id} · {money(reservation.total)}</small></div><button className="icon-button delete-button" onClick={() => removeReservation(reservation.id)} aria-label={`Eliminar reserva ${reservation.id}`}><Trash2 size={17}/></button></article>)}</div> : <div className="empty-saved"><Ticket size={25}/><strong>Aún no tienes reservas</strong><p>Cuando reserves para un concierto, aparecerá aquí.</p><button className="text-button" onClick={() => { setDialog(null); document.getElementById('conciertos')?.scrollIntoView({ behavior: 'smooth' }) }}>Explorar conciertos <ArrowUpRight size={15}/></button></div>}<p className="form-disclaimer">Reservas de demostración. No se procesan pagos ni se emiten entradas válidas.</p></Modal>}

    {dialog?.type === 'artist' && <Modal title={`Perfil de ${dialog.artist.name}`} onClose={() => setDialog(null)} wide><div className="artist-profile"><div className="profile-image" style={{ backgroundImage: `url("${dialog.artist.image}")` }}><span className="genre-pill">{dialog.artist.genre}</span></div><div className="profile-copy"><span className="eyebrow"><span className="eyebrow-line"/> PROYECTO DE REFERENCIA</span><h2>{dialog.artist.name}</h2><p className="profile-lead">{dialog.artist.description}</p><p>{dialog.artist.bio}</p><div className="profile-placeholder"><Music2 size={19}/><span><strong>Próximas presentaciones</strong><small>Por anunciar en este prototipo.</small></span></div><button className={`button ${favorites.includes(dialog.artist.id) ? 'button-outline' : 'button-primary'} full-button`} onClick={() => toggleFavorite(dialog.artist)}><Heart size={16} fill={favorites.includes(dialog.artist.id) ? 'currentColor' : 'none'}/>{favorites.includes(dialog.artist.id) ? 'Siguiendo en favoritos' : 'Seguir artista'}<ArrowUpRight size={16}/></button><p className="form-disclaimer">Perfil demostrativo. No se muestran enlaces de redes no verificados.</p></div></div></Modal>}

    {dialog?.type === 'apply' && <Modal title="Postula como artista" onClose={() => setDialog(null)}><div className="modal-heading"><span className="eyebrow"><span className="eyebrow-line"/> CONVOCATORIA ABIERTA</span><h2>Hagamos<br/><em>que suene.</em></h2><p>Cuéntanos sobre tu proyecto musical.</p></div><form className="form-stack application-form" onSubmit={submitApplication}><label className="field-label">Nombre artístico<input name="artistName" required maxLength={80} placeholder="¿Cómo se llama tu proyecto?"/></label><label className="field-label">Nombre de contacto<input name="contactName" required autoComplete="name" maxLength={80} placeholder="Tu nombre"/></label><label className="field-label">Correo electrónico<input name="applicationEmail" type="email" required autoComplete="email" maxLength={120} placeholder="nombre@correo.com"/></label><div className="form-quantity-row"><label className="field-label">Género musical<select name="applicationGenre" required defaultValue=""><option value="" disabled>Selecciona un género</option>{['Indie / Alternativo', 'Rock', 'Pop', 'R&B / Soul', 'Electrónica', 'Fusión', 'Otro'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-label">Ciudad<input name="city" required maxLength={60} placeholder="Lima"/></label></div><label className="field-label">Enlace a redes o portafolio<input name="portfolio" type="url" required placeholder="https://..."/></label><label className="field-label">Cuéntanos de tu proyecto<textarea name="projectDescription" required minLength={20} maxLength={600} rows={3} placeholder="Tu sonido, tu historia, lo que te gustaría compartir…"/></label><button className="button button-primary full-button" type="submit">Enviar postulación de demostración <ArrowUpRight size={16}/></button><p className="form-disclaimer">Tus datos se guardan solo en este navegador. No se envía a ninguna organización real.</p>{applications.length > 0 && <small className="saved-postulation-note">En este navegador hay {applications.length} postulación(es) de demostración guardada(s).</small>}</form></Modal>}
  </>
}
