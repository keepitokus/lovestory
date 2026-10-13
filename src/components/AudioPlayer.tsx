import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import type { AudioMemory } from '../data/types'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

interface AudioPlayerProps {
  item: AudioMemory
}

export function AudioPlayer({ item }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const hasAudio = Boolean(item.src)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => setCurrent(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [item.src])

  const toggle = async () => {
    if (!hasAudio || !audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      return
    }
    await audioRef.current.play()
    setPlaying(true)
  }

  const seek = (value: number) => {
    if (!audioRef.current || !hasAudio) return
    audioRef.current.currentTime = value
    setCurrent(value)
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <article className={`audio-card reveal-up ${playing ? 'is-playing' : ''} ${hasAudio ? '' : 'is-demo'}`}>
      {hasAudio ? <audio ref={audioRef} src={item.src} preload="metadata" /> : null}

      <button
        type="button"
        className="audio-card__play"
        onClick={toggle}
        disabled={!hasAudio}
        aria-label={
          hasAudio
            ? playing
              ? 'Пауза'
              : 'Слушать'
            : 'Аудиофайл ещё не добавлен'
        }
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className="audio-card__body">
        <p className="audio-card__speaker">{item.speaker}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="audio-card__wave" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>

        <div className="audio-card__controls">
          <span>{hasAudio ? formatTime(current) : '0:00'}</span>
          <input
            type="range"
            min={0}
            max={hasAudio ? duration || 0 : 100}
            step={0.1}
            value={hasAudio ? current : 0}
            disabled={!hasAudio}
            aria-label="Перемотка"
            onChange={(e) => seek(Number(e.target.value))}
            style={{ ['--progress' as string]: `${progress}%` }}
          />
          <span>{hasAudio ? formatTime(duration) : item.durationHint ?? '—'}</span>
        </div>

        {!hasAudio ? (
          <p className="audio-card__demo">Демо-состояние: добавьте локальный аудиофайл в данные книги</p>
        ) : null}
      </div>
    </article>
  )
}

interface VoicesSectionProps {
  title: string
  subtitle: string
  items: AudioMemory[]
}

export function VoicesSection({ title, subtitle, items }: VoicesSectionProps) {
  return (
    <section id="voices" className="voices-section" aria-labelledby="voices-title">
      <div className="section-shell">
        <p className="section-kicker reveal-up">Голоса</p>
        <h2 id="voices-title" className="section-title reveal-up">
          {title}
        </h2>
        <p className="section-lead reveal-up">{subtitle}</p>
        <div className="voices-grid">
          {items.map((item) => (
            <AudioPlayer key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
