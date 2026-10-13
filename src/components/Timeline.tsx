import { useEffect, useState } from 'react'
import type { TimelineEvent } from '../data/types'

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const [activeId, setActiveId] = useState(events[0]?.chapterId ?? '')

  useEffect(() => {
    const chapterIds = events.map((e) => e.chapterId)
    const els = chapterIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit?.target.id) setActiveId(hit.target.id)
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.15, 0.4] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [events])

  return (
    <section id="story" className="timeline-section" aria-labelledby="timeline-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Хронология</p>
        <h2 id="timeline-title" className="section-title reveal-up">
          Нить нашей истории
        </h2>
        <p className="section-lead reveal-up">
          От случайной встречи до решения, которое изменило всё.
        </p>

        <ol className="timeline">
          {events.map((event, index) => {
            const isActive = activeId === event.chapterId
            return (
              <li
                key={event.id}
                className={`timeline-item ${index % 2 === 0 ? 'is-left' : 'is-right'} ${isActive ? 'is-active' : ''}`}
              >
                <button
                  type="button"
                  className="timeline-card"
                  onClick={() =>
                    document
                      .getElementById(event.chapterId)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                >
                  <div className="timeline-card__media">
                    <img
                      src={event.image}
                      alt=""
                      loading="lazy"
                      className="parallax-img"
                    />
                  </div>
                  <div className="timeline-card__body">
                    <span className="timeline-card__date">{event.date}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <span className="timeline-card__link">К главе</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
