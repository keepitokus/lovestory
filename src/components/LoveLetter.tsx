import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { LoveLetter as LoveLetterType } from '../data/types'

interface LoveLetterCardProps {
  letter: LoveLetterType
}

function LoveLetterCard({ letter }: LoveLetterCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`letter-card reveal-up ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="letter-card__envelope"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="letter-card__from">
          {letter.from} — {letter.to}
        </span>
        <span className="letter-card__preview">{letter.preview}</span>
        <span className="letter-card__action">{open ? 'Свернуть' : 'Открыть письмо'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="letter-card__paper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="letter-card__paper-inner">
              <p className="letter-card__date">{letter.date}</p>
              {letter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <span className="letter-card__signature handwritten">{letter.signature}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  )
}

interface LoveLettersProps {
  title: string
  subtitle: string
  items: LoveLetterType[]
}

export function LoveLetters({ title, subtitle, items }: LoveLettersProps) {
  return (
    <section id="letters" className="letters-section" aria-labelledby="letters-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Письма</p>
        <h2 id="letters-title" className="section-title reveal-up">
          {title}
        </h2>
        <p className="section-lead reveal-up">{subtitle}</p>
        <div className="letters-grid">
          {items.map((letter) => (
            <LoveLetterCard key={letter.id} letter={letter} />
          ))}
        </div>
      </div>
    </section>
  )
}
