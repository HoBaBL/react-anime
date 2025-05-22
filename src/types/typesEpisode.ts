export interface EpisodeType {
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
  genres: Genre[]
  members: Member[]
  episodes: Episode[]
  torrents: Torrent[]
  sponsor: Sponsor
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

export interface Member {
  id: string
  user: User
  role: Role
  nickname: string
}

export interface User {
  id: number
  nickname: string
  avatar: Avatar
}

export interface Avatar {
  preview: string
  thumbnail: string
  optimized: Optimized3
}

export interface Optimized3 {
  preview: string
  thumbnail: string
}

export interface Role {
  value: string
  description: string
}

export interface Episode {
  id: string
  name: string
  ordinal: number
  opening: Opening
  ending: Ending
  preview: Preview
  hls_480: string
  hls_720: string
  hls_1080: string
  duration: number
  rutube_id: string
  youtube_id: string
  updated_at: string
  sort_order: number
  name_english: string
}

export interface Opening {
  start: number
  stop: number
}

export interface Ending {
  start: number
  stop: number
}

export interface Preview {
  src: string
  thumbnail: string
  optimized: Optimized4
}

export interface Optimized4 {
  src: string
  thumbnail: string
}

export interface Torrent {
  id: number
  hash: string
  size: number
  type: Type2
  color: Color
  codec: Codec
  label: string
  quality: Quality
  magnet: string
  filename: string
  seeders: number
  bitrate: number
  leechers: number
  sort_order: number
  updated_at: string
  is_hardsub: boolean
  description: string
  created_at: string
  completed_times: number
}

export interface Type2 {
  value: string
  description: string
}

export interface Color {
  value: string
  description: string
}

export interface Codec {
  value: string
  label: string
  description: string
  label_color: string
  label_is_visible: boolean
}

export interface Quality {
  value: string
  description: string
}

export interface Sponsor {
  id: string
  title: string
  description: string
  url_title: string
  url: string
}