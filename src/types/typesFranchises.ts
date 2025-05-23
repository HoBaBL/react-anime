export interface FranchisesType {
  data: Daum[]
}

export interface Daum {
  id: string
  name: string
  name_english: string
  image: Image
  rating: number
  last_year: number
  first_year: number
  total_releases: number
  total_episodes: number
  total_duration: string
  total_duration_in_seconds: number
  franchise_releases: FranchiseRelease[]
}

export interface Image {
  preview: string
  thumbnail: string
  optimized: Optimized
}

export interface Optimized {
  preview: string
  thumbnail: string
}

export interface FranchiseRelease {
  id: string
  sort_order: number
  release_id: number
  franchise_id: string
  release: Release
}

export interface Release {
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
  notification: string
  episodes_total: number
  external_player: string
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
  preview: string
  thumbnail: string
  optimized: Optimized2
}

export interface Optimized2 {
  preview: string
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
