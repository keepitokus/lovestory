import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { BookData } from '../data/types'

interface HeroCoverProps {
  book: BookData
}

export function HeroCover({ book }: HeroCoverProps) {
  const reduced = useReducedMotion()
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (reduced || !imgRef.current) return
    imgRef.current.classList.add('is-loaded')
  }, [reduced])

  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
      }

  return (
    <section id="cover" className="hero-cover" aria-label="Обложка книги">
      <div className="hero-cover__media">
        <img
          ref={imgRef}
          className={`hero-cover__image parallax-img ${reduced ? 'is-loaded' : ''}`}
          src={book.cover.image}
          alt={`${book.meta.partners[0]} и ${book.meta.partners[1]}`}
          fetchPriority="high"
          onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
        />
        <div className="hero-cover__scrim" aria-hidden="true" />
      </div>

      <div className="hero-cover__content">
        <motion.p
          className="hero-cover__eyebrow"
          {...fade}
          transition={{ duration: 1, delay: 0.15 }}
        >
          {book.meta.project}
        </motion.p>
        <motion.h1
          className="hero-cover__title"
          {...fade}
          transition={{ duration: 1.1, delay: 0.28 }}
        >
          {book.meta.title}
        </motion.h1>
        <motion.p
          className="hero-cover__names"
          {...fade}
          transition={{ duration: 1, delay: 0.42 }}
        >
          {book.meta.partners[0]} & {book.meta.partners[1]}
        </motion.p>
        <motion.p
          className="hero-cover__years"
          {...fade}
          transition={{ duration: 1, delay: 0.52 }}
        >
          {book.meta.years}
        </motion.p>
        <motion.p
          className="hero-cover__subtitle"
          {...fade}
          transition={{ duration: 1, delay: 0.64 }}
        >
          {book.meta.subtitle}
        </motion.p>
      </div>

      <a href="#prologue" className="hero-cover__scroll">
        <span>{book.cover.scrollHint}</span>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  )
}
