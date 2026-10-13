import type { Chapter } from '../data/types'

interface StoryChapterProps {
  chapter: Chapter
}

export function StoryChapter({ chapter }: StoryChapterProps) {
  return (
    <section
      id={chapter.id}
      className={`story-chapter layout-${chapter.layout}`}
      aria-labelledby={`${chapter.id}-title`}
    >
      {chapter.heroImage ? (
        <div className="story-chapter__hero">
          <img
            src={chapter.heroImage}
            alt=""
            className="parallax-img"
            loading="lazy"
          />
          <div className="story-chapter__hero-scrim" aria-hidden="true" />
          <div className="story-chapter__hero-copy reveal-up">
            <span className="story-chapter__number">{chapter.number}</span>
            <p className="story-chapter__period">
              {chapter.period}
              {chapter.place ? ` · ${chapter.place}` : ''}
            </p>
            <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          </div>
        </div>
      ) : (
        <div className="section-shell story-chapter__header reveal-up">
          <span className="story-chapter__number">{chapter.number}</span>
          <p className="story-chapter__period">{chapter.period}</p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </div>
      )}

      <div className="section-shell story-chapter__body">
        <p className="story-chapter__lead reveal-up">{chapter.lead}</p>
        {chapter.accentNote ? (
          <p className="handwritten reveal-up">{chapter.accentNote}</p>
        ) : null}

        <div className="story-chapter__blocks">
          {chapter.blocks.map((block, index) => {
            const key = `${chapter.id}-${index}`
            if (block.type === 'text') {
              return (
                <p key={key} className="chapter-text reveal-up">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={key} className="chapter-quote reveal-up">
                  <p>{block.text}</p>
                  {block.attribution ? <cite>{block.attribution}</cite> : null}
                </blockquote>
              )
            }
            if (block.type === 'note') {
              return (
                <p key={key} className="chapter-note handwritten reveal-up">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'image' && block.image) {
              return (
                <figure key={key} className="chapter-figure reveal-up">
                  <div className="chapter-figure__frame">
                    <img
                      src={block.image}
                      alt={block.alt ?? ''}
                      loading="lazy"
                      className="parallax-img"
                    />
                  </div>
                  {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                </figure>
              )
            }
            if (block.type === 'images' && block.images?.length) {
              return (
                <div
                  key={key}
                  className={`chapter-collage count-${Math.min(block.images.length, 6)} reveal-up`}
                >
                  {block.images.map((src) => (
                    <div key={src} className="chapter-collage__item">
                      <img src={src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}
