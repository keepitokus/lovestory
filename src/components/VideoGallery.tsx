import type { VideoMemory } from '../data/types'

interface VideoGalleryProps {
  title: string
  subtitle: string
  items: VideoMemory[]
}

export function VideoGallery({ title, subtitle, items }: VideoGalleryProps) {
  return (
    <section id="videos" className="video-gallery" aria-labelledby="videos-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Видео</p>
        <h2 id="videos-title" className="section-title reveal-up">
          {title}
        </h2>
        <p className="section-lead reveal-up">{subtitle}</p>

        <div className="video-grid">
          {items.map((item) => {
            const hasVideo = Boolean(item.src || item.sources?.length)
            return (
              <article key={item.id} className="video-card reveal-up">
                <div className="video-card__media">
                  {hasVideo ? (
                    <video
                      controls
                      playsInline
                      poster={item.poster}
                      preload="metadata"
                    >
                      {item.sources?.map((source) => (
                        <source key={source.src} src={source.src} type={source.type} />
                      ))}
                      {item.src ? <source src={item.src} /> : null}
                    </video>
                  ) : (
                    <>
                      <img src={item.poster} alt="" loading="lazy" />
                      <div className="video-card__placeholder">
                        <span>Видео скоро появится</span>
                        {item.durationHint ? <em>{item.durationHint}</em> : null}
                      </div>
                    </>
                  )}
                </div>
                <div className="video-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
