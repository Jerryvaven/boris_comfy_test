export interface Character {
  id: string
  name: string
  gender: string
  age: number
  description: string
  avatar?: string
  referenceImage?: string
}

export interface Panel {
  id: string
  number: number
  description: string
  characters: CharacterDialogue[]
  soundEffects?: string[]
  narration?: string
  illustration?: string
}

export interface CharacterDialogue {
  characterId: string
  characterName: string
  action?: string
  emotion?: string
  dialogue?: string
}

export interface ComicPage {
  id: string
  pageNumber: number
  panels: Panel[]
}

export interface Comic {
  id: string
  title: string
  type: 'standalone' | 'series_episode'
  seriesTitle?: string
  episodeNumber?: number
  author: string
  description?: string
  genre: string
  style: string
  pages: ComicPage[]
  characters: Character[]
  pageCount: number
  currentPage: number
  lastModified: Date
  published: boolean
  price?: number
  rating?: number
  coverImage?: string
}

export interface Tab {
  id: string
  title: string
  type: 'standalone' | 'series_episode'
  comicId: string
  isActive?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  credits: number
  subscription: 'free' | 'reader' | 'reader_plus' | 'pro'
}

export interface CartItem {
  id: string
  comicId: string
  title: string
  author: string
  price: number
  coverImage?: string
}

export type ArtStyle = 
  | 'anime'
  | 'bronze-age'
  | 'chibi'
  | 'dark-age'
  | 'golden-age'
  | 'modern-age'
  | 'photorealistic'
  | 'sunday-morning'
  | 'silver-age'
  | 'noir'
  | 'watercolor'
  | 'manga'
  | 'european'
  | 'underground'
  | 'digital-paint'
  | 'retro-futuristic'

export type Genre = 
  | 'popular'
  | 'superhero'
  | 'fantasy'
  | 'scifi'
  | 'romance'
  | 'mystery'
  | 'horror'
  | 'comedy'

export interface StyleInfo {
  name: string
  description: string
  features: string[]
  examples: string[]
  isPro: boolean
}

export interface ViewMode {
  quickMenu: boolean
  illustrated: boolean
  theme: 'dark' | 'light'
}

export interface WriterSettings {
  fontSize: string
  viewMode: ViewMode
  autoSave: boolean
}