import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryPhoto } from '../data/types'

interface LightboxProps {
  photos: GalleryPhoto[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const touchX = useRef<number | null>(null)
  const open = index !== null
  const photo = index === null ? null : photos[index]

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="lightbox__backdrop"
            aria-label="Закрыть"
            onClick={onClose}
          />
          <button
            type="button"
            className="lightbox__close"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <X size={22} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="lightbox__nav is-prev"
            aria-label="Предыдущее фото"
            onClick={onPrev}
          >
            <ChevronLeft size={28} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            className="lightbox__nav is-next"
            aria-label="Следующее фото"
            onClick={onNext}
          >
            <ChevronRight size={28} strokeWidth={1.4} />
          </button>

          <motion.figure
            className="lightbox__figure"
            key={photo.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onTouchStart={(e) => {
              touchX.current = e.changedTouches[0]?.clientX ?? null
            }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
              if (dx > 60) onPrev()
              if (dx < -60) onNext()
              touchX.current = null
            }}
          >
            <img src={photo.src} alt={photo.alt} />
            <figcaption>
              <span>{photo.date}</span>
              <strong>{photo.caption}</strong>
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
