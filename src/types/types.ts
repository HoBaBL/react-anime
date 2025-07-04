export type IPopularArray = IAnime[]

export interface IAnime {
  data: Anime[]
  meta: Meta
}

export interface Account {
  url: string,
  state: string
}

export interface Anime {
  id: number
  type: Type
  year: number
  name: Name
  alias: string
  season: Season
  poster: Poster
  fresh_at: string
  created_at: string
  updated_at: string
  is_ongoing: boolean
  age_rating: AgeRating
  publish_day: PublishDay
  description: string
  notification: any
  episodes_total: number
  external_player?: string
  is_in_production: boolean
  is_blocked_by_geo: boolean
  is_blocked_by_copyrights: boolean
  added_in_users_favorites: number
  average_duration_of_episode: number
  added_in_planned_collection: number
  added_in_watched_collection: number
  added_in_watching_collection: number
  added_in_postponed_collection: number
  added_in_abandoned_collection: number
  genres: Genre[]
}

export interface Type {
  value: string
  description: string
}

export interface Name {
  main: string
  english: string
  alternative: string
}

export interface Season {
  value: string
  description: string
}

export interface Poster {
  src: string
  thumbnail: string
  optimized: Optimized
}

export interface Optimized {
  src: string
  thumbnail: string
}

export interface AgeRating {
  value: string
  label: string
  is_adult: boolean
  description: string
}

export interface PublishDay {
  value: number
  description: string
}

export interface Genre {
  id: number
  name: string
  image: Image
  total_releases: number
}

export interface Image {
  preview: string
  thumbnail: string
  optimized: Optimized2
}

export interface Optimized2 {
  preview: string
  thumbnail: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  links: Links
}

export interface Links {
  next: string
}
