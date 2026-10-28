import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps { title: string; onClose: () => void; children: ReactNode; wide?: boolean }

export default function Modal({ title, onClose, children, wide = false }: ModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className={`modal-panel ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Cerrar ventana"><X size={20} /></button>
      {children}
    </section>
  </div>
}
