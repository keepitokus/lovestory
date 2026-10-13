import { book } from './data/book'
import { Header } from './components/Header'
import { ReadingProgress } from './components/ReadingProgress'
import { HeroCover } from './components/HeroCover'
import { StoryIntro } from './components/StoryIntro'
import { Timeline } from './components/Timeline'
import { StoryChapter } from './components/StoryChapter'
import { PhotoGallery } from './components/PhotoGallery'
import { VideoGallery } from './components/VideoGallery'
import { VoicesSection } from './components/AudioPlayer'
import { LoveLetters } from './components/LoveLetter'
import { FinalScreen } from './components/FinalScreen'
import { useGsapReveal } from './hooks/useGsapReveal'

export default function App() {
  useGsapReveal('.book-root')

  return (
    <div className="book-root">
      <ReadingProgress />
      <Header items={book.nav} brand={book.meta.project} />
      <main>
        <HeroCover book={book} />
        <StoryIntro prologue={book.prologue} />
        <Timeline events={book.timeline} />
        {book.chapters.map((chapter) => (
          <StoryChapter key={chapter.id} chapter={chapter} />
        ))}
        <PhotoGallery
          title={book.gallery.title}
          subtitle={book.gallery.subtitle}
          photos={book.gallery.photos}
        />
        <VideoGallery
          title={book.videos.title}
          subtitle={book.videos.subtitle}
          items={book.videos.items}
        />
        <VoicesSection
          title={book.voices.title}
          subtitle={book.voices.subtitle}
          items={book.voices.items}
        />
        <LoveLetters
          title={book.letters.title}
          subtitle={book.letters.subtitle}
          items={book.letters.items}
        />
        <FinalScreen finale={book.finale} />
      </main>
    </div>
  )
}
