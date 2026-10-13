import { useEffect, useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { NavItem } from '../data/types'
import { useActiveSection } from '../hooks/useActiveSection'

interface HeaderProps {
  items: NavItem[]
  brand: string
}

export function Header({ items, brand }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  const goTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="site-header__inner">
        <button
          type="button"
          className="site-brand"
          onClick={() => goTo('cover')}
          aria-label={brand}
        >
          <img
            className="site-brand__logo"
            src={`${import.meta.env.BASE_URL}ya-zdes-logo.jpg`}
            alt=""
            width={48}
            height={48}
          />
        </button>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Разделы книги">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? 'is-active' : ''}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  )
}
