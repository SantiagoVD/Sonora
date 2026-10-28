import { useState } from 'react'
import { Menu, X, Bookmark } from 'lucide-react'
import Logo from './Logo'

interface NavbarProps { onReservations: () => void }
const links = [['Inicio', '#inicio'], ['Conciertos', '#conciertos'], ['Artistas', '#artistas'], ['Convocatorias', '#convocatoria'], ['Nosotros', '#nosotros']]

export default function Navbar({ onReservations }: NavbarProps) {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="nav-wrap container">
      <Logo />
      <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Navegación principal">
        {links.map(([label, href], index) => <a key={label} className={index === 0 ? 'nav-active' : ''} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <button className="nav-mobile-reservations" onClick={() => { setOpen(false); onReservations() }}><Bookmark size={15} /> Mis reservas</button>
      </nav>
      <div className="nav-actions">
        <button className="my-reservations" onClick={onReservations}><Bookmark size={15} /><span>Mis reservas</span></button>
        <a className="button button-small button-primary nav-cta" href="#conciertos">Explorar conciertos <span>↗</span></a>
      </div>
      <button className="icon-button menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>
}
