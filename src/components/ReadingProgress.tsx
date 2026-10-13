import { useScrollProgress } from '../hooks/useScrollProgress'

export function ReadingProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Прогресс чтения"
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}
