import { useMemo, useState } from 'react'
import type { GalleryPhoto, PhotoTheme } from '../data/types'
import { Lightbox } from './Lightbox'

const themes: { id: PhotoTheme | 'all'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'meeting', label: 'Знакомство' },
  { id: 'dates', label: 'Свидания' },
  { id: 'travel', label: 'Путешествия' },
  { id: 'everyday', label: 'Повседневность' },
  { id: 'proposal', label: 'Предложение' },
]

interface PhotoGalleryProps {
  title: string
  subtitle: string
  photos: GalleryPhoto[]
}

export function PhotoGallery({ title, subtitle, photos }: PhotoGalleryProps) {
  const [theme, setTheme] = useState<PhotoTheme | 'all'>('all')
  const [index, setIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (theme === 'all' ? photos : photos.filter((p) => p.theme === theme)),
    [photos, theme],
  )

  return (
    <section id="moments" className="photo-gallery" aria-labelledby="moments-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Галерея</p>
        <h2 id="moments-title" className="section-title reveal-up">
          {title}
        </h2>
        <p className="section-lead reveal-up">{subtitle}</p>

        <div className="gallery-filters reveal-up" role="tablist" aria-label="Темы фотографий">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={theme === item.id}
              className={theme === item.id ? 'is-active' : ''}
              onClick={() => setTheme(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="editorial-grid">
          {visible.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              className={`editorial-grid__item span-${(i % 5) + 1} reveal-up`}
              onClick={() => setIndex(i)}
              aria-label={`${photo.caption}. Открыть фото`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span>
                <em>{photo.date}</em>
                {photo.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={visible}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() =>
          setIndex((current) =>
            current === null
              ? current
              : (current - 1 + visible.length) % visible.length,
          )
        }
        onNext={() =>
          setIndex((current) =>
            current === null ? current : (current + 1) % visible.length,
          )
        }
      />
    </section>
  )
}
