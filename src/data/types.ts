export type PhotoTheme =
  | 'meeting'
  | 'dates'
  | 'travel'
  | 'everyday'
  | 'proposal'

export type ChapterLayout =
  | 'cinematic'
  | 'split'
  | 'quote-led'
  | 'collage'
  | 'gallery-flow'
  | 'intimate'
  | 'proposal'
  | 'epilogue'

export interface NavItem {
  id: string
  label: string
}

export interface MediaImage {
  src: string
  alt: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  image: string
  chapterId: string
}

export interface ChapterBlock {
  type: 'text' | 'quote' | 'note' | 'image' | 'images'
  text?: string
  attribution?: string
  image?: string
  images?: string[]
  alt?: string
  caption?: string
}

export interface Chapter {
  id: string
  number: string
  title: string
  period: string
  place?: string
  layout: ChapterLayout
  lead: string
  blocks: ChapterBlock[]
  heroImage?: string
  accentNote?: string
}

export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  caption: string
  date: string
  theme: PhotoTheme
}

export interface VideoMemory {
  id: string
  title: string
  description: string
  poster: string
  /** Local MP4/WebM path when available */
  src?: string
  sources?: { src: string; type: string }[]
  durationHint?: string
}

export interface AudioMemory {
  id: string
  title: string
  speaker: string
  description: string
  /** Local audio path when available */
  src?: string
  durationHint?: string
}

export interface LoveLetter {
  id: string
  from: string
  to: string
  preview: string
  body: string[]
  signature: string
  date: string
}

export interface BookData {
  meta: {
    project: string
    title: string
    subtitle: string
    partners: [string, string]
    years: string
    seoTitle: string
    seoDescription: string
  }
  cover: {
    image: string
    scrollHint: string
  }
  prologue: {
    title: string
    keyPhrase: string
    leftPath: { name: string; lines: string[] }
    rightPath: { name: string; lines: string[] }
    closing: string
  }
  nav: NavItem[]
  timeline: TimelineEvent[]
  chapters: Chapter[]
  gallery: {
    title: string
    subtitle: string
    photos: GalleryPhoto[]
  }
  videos: {
    title: string
    subtitle: string
    items: VideoMemory[]
  }
  voices: {
    title: string
    subtitle: string
    items: AudioMemory[]
  }
  letters: {
    title: string
    subtitle: string
    items: LoveLetter[]
  }
  finale: {
    image: string
    quote: string
    names: string
    continuation: string
    credit: string
    projectLink: {
      label: string
      href: string
    }
  }
  mediaNotes: string[]
}
