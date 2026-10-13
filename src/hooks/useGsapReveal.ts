import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal(rootSelector = '.book-root') {
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = document.querySelector(rootSelector)
    if (!root) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.reveal, .reveal-up, .reveal-fade, .parallax-img', {
          clearProps: 'all',
          opacity: 1,
          y: 0,
        })
        return
      }

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.reveal-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -24 : 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    }, root)

    return () => {
      ctx.revert()
    }
  }, [reduced, rootSelector])
}
