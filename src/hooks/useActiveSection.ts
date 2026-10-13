import { useEffect, useState } from 'react'

/** Maps page section ids to nav item ids */
const SECTION_TO_NAV: Record<string, string> = {
  cover: 'cover',
  prologue: 'story',
  story: 'story',
  'chapter-1': 'story',
  'chapter-2': 'story',
  'chapter-3': 'story',
  'chapter-4': 'story',
  'chapter-5': 'story',
  'chapter-6': 'story',
  epilogue: 'story',
  moments: 'moments',
  videos: 'videos',
  voices: 'voices',
  letters: 'letters',
  finale: 'letters',
}

const OBSERVED_IDS = Object.keys(SECTION_TO_NAV)

/**
 * Scroll-spy: picks the last section whose top has crossed the header line,
 * then maps it to a nav item. Chapters count as «История».
 */
export function useActiveSection(navIds: string[]) {
  const [activeId, setActiveId] = useState(navIds[0] ?? 'cover')

  useEffect(() => {
    const elements = OBSERVED_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const update = () => {
      const marker = window.innerHeight * 0.28
      let currentNav = navIds[0] ?? 'cover'

      for (const el of elements) {
        const top = el.getBoundingClientRect().top
        if (top <= marker) {
          const nav = SECTION_TO_NAV[el.id]
          if (nav && navIds.includes(nav)) currentNav = nav
        }
      }

      setActiveId((prev) => (prev === currentNav ? prev : currentNav))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [navIds])

  return activeId
}
