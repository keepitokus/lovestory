import type { BookData } from '../data/types'

interface FinalScreenProps {
  finale: BookData['finale']
}

export function FinalScreen({ finale }: FinalScreenProps) {
  return (
    <section id="finale" className="final-screen" aria-label="Финал">
      <div className="final-screen__media">
        <img
          src={finale.image}
          alt=""
          className="parallax-img"
          loading="lazy"
        />
        <div className="final-screen__scrim" aria-hidden="true" />
      </div>

      <div className="final-screen__content reveal-up">
        <blockquote>
          <p>{finale.quote}</p>
        </blockquote>
        <p className="final-screen__names">{finale.names}</p>
        <p className="final-screen__continuation handwritten">{finale.continuation}</p>
        <p className="final-screen__credit">{finale.credit}</p>
        <a
          className="final-screen__link"
          href={finale.projectLink.href}
          target="_blank"
          rel="noreferrer"
        >
          {finale.projectLink.label}
        </a>
      </div>
    </section>
  )
}
