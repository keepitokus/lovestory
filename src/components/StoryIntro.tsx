import type { BookData } from '../data/types'

interface StoryIntroProps {
  prologue: BookData['prologue']
}

export function StoryIntro({ prologue }: StoryIntroProps) {
  return (
    <section id="prologue" className="story-intro" aria-labelledby="prologue-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Пролог</p>
        <h2 id="prologue-title" className="story-intro__title reveal-up">
          {prologue.title}
        </h2>

        <p className="story-intro__key reveal-up">{prologue.keyPhrase}</p>

        <div className="story-intro__paths">
          <article className="path-card reveal-up">
            <h3>{prologue.leftPath.name}</h3>
            {prologue.leftPath.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>

          <div className="path-join reveal-fade" aria-hidden="true">
            <span />
          </div>

          <article className="path-card reveal-up">
            <h3>{prologue.rightPath.name}</h3>
            {prologue.rightPath.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        </div>

        <p className="story-intro__closing reveal-up">{prologue.closing}</p>
      </div>
    </section>
  )
}
