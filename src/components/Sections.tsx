import { useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, ChevronDown, Heart, Mic2, Music2, Sparkles } from 'lucide-react'
import { benefits, faqs } from '../data/content'

const icons = [Sparkles, CalendarDays, Heart, Mic2]

export function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero-backdrop" />
    <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
    <div className="container hero-inner">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> LIMA, PERÚ <span className="eyebrow-dot">✳</span> ESCENA INDEPENDIENTE</div>
        <h1>Hay algo nuevo<br />sonando <em>por aquí.</em></h1>
        <p className="hero-description">Descubre la nueva escena musical peruana. Vive conciertos inolvidables y conoce a quienes están transformando el sonido independiente.</p>
        <div className="hero-actions"><a className="button button-primary" href="#conciertos">Explorar conciertos <ArrowUpRight size={17} /></a><a className="button button-glass" href="#artistas"><Music2 size={16} /> Descubrir artistas</a></div>
        <div className="hero-social-proof"><div className="proof-avatars"><span>L</span><span>A</span><span>+</span></div><div><strong>Una escena por descubrir</strong><small>Creada para sonar más cerca</small></div></div>
      </div>
      <div className="hero-visual" aria-label="Público en una presentación musical">
        <div className="hero-image" />
        <div className="hero-image-grain" />
        <div className="hero-sticker"><span>DESCUBRE</span><span>ALGO</span><b>NUEVO ✳</b></div>
        <div className="hero-caption"><span className="live-dot" /> SONIDO LOCAL. ENERGÍA REAL.</div>
        <div className="hero-vertical-note">SONORA / LIMA 2026</div>
      </div>
      <a className="hero-scroll" href="#conciertos"><span>BAJA Y EXPLORA</span><ArrowDown size={14} /></a>
      <div className="hero-side-label">VOL. 01 — UNA NUEVA ESCENA</div>
    </div>
  </section>
}

export function Benefits() {
  return <section className="benefits-section section-padding">
    <div className="container"><div className="benefits-heading"><span className="eyebrow"><span className="eyebrow-line" /> EL UNIVERSO SONORA</span><p>Más que encontrar un concierto.<br /><strong>Encontrar tu próximo sonido.</strong></p></div>
      <div className="benefit-grid">{benefits.map((benefit, index) => { const Icon = icons[index]; return <article className="benefit-card" key={benefit.number}><div className="benefit-top"><span className="benefit-number">{benefit.number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{benefit.title}</h3><p>{benefit.text}</p></article> })}</div>
    </div>
  </section>
}

export function About() {
  return <section className="about-section section-padding" id="nosotros">
    <div className="container about-grid"><div className="about-art" aria-hidden="true"><div className="about-orbit orbit-a"/><div className="about-orbit orbit-b"/><div className="about-core"><Music2 size={34}/><span>SONORA</span></div><span className="orbit-label orbit-label-one">PÚBLICO</span><span className="orbit-label orbit-label-two">ARTISTAS</span><span className="orbit-label orbit-label-three">COMUNIDAD</span><span className="orbit-label orbit-label-four">CONCIERTOS</span><span className="about-cross cross-one">✳</span><span className="about-cross cross-two">✳</span></div>
      <div className="about-copy"><span className="eyebrow"><span className="eyebrow-line" /> QUIÉNES SOMOS</span><h2>Una escena no se mira desde afuera.<br /><em>Se vive en comunidad.</em></h2><p>SONORA nace como una propuesta para conectar artistas, público y oportunidades dentro de la escena musical independiente peruana. Queremos que descubrir música nueva sea tan emocionante como escucharla en vivo.</p><p>Imaginamos un ecosistema donde cada concierto abre una puerta: para conocer, compartir y darle espacio a nuevas voces.</p><div className="mission-row"><div><small>NUESTRA MISIÓN</small><strong>Conectar talento con nuevas audiencias.</strong></div><div><small>NUESTRO PROPÓSITO</small><strong>Impulsar una escena más visible y cercana.</strong></div></div></div>
    </div>
  </section>
}

export function FAQ() {
  const [active, setActive] = useState<number | null>(0)
  return <section className="faq-section section-padding" id="faq"><div className="container faq-grid"><div className="faq-intro"><span className="eyebrow"><span className="eyebrow-line" /> POR SI TE LO PREGUNTABAS</span><h2>Todo claro.<br /><em>Como debe sonar.</em></h2><p>Lo esencial para que disfrutes la experiencia y conozcas bien este prototipo.</p><a href="#conciertos" className="text-button">Empieza a explorar <ArrowUpRight size={16}/></a></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${active === index ? 'faq-active' : ''}`} key={faq.question}><button className="faq-question" onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index}><span><small>0{index + 1}</small>{faq.question}</span><ChevronDown size={18}/></button>{active === index && <div className="faq-answer"><p>{faq.answer}</p></div>}</div>)}</div></div></section>
}

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><Music2 size={20}/></span><span>SONORA<span className="brand-period">.</span></span></a><p>Descubre. Vive.<br /><em>Impulsa la escena.</em></p><div className="footer-links"><div><small>EXPLORA</small><a href="#conciertos">Conciertos</a><a href="#artistas">Artistas</a><a href="#convocatoria">Convocatorias</a></div><div><small>SONORA</small><a href="#nosotros">Nosotros</a><a href="#faq">Preguntas frecuentes</a><a href="#inicio">Volver arriba ↑</a></div></div><div className="footer-stamp">LIMA<br/><span>✳</span><br/>PERÚ</div></div><div className="footer-bottom"><span>SONORA — Productora de Conciertos & Hub de Talento Emergente.</span><span>Proyecto académico · Lima, Perú · 2026</span></div></div></footer>
}
