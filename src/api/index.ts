import axios from "axios";
import type { IAnime, Genre, Anime } from "../types/types";
import type { EpisodeType } from "../types/typesEpisode";
import type { FranchisesType } from "../types/typesFranchises";
import { createClient } from "@supabase/supabase-js";


// https://anilibria.wtf/api/v1/
const $api = axios.create({
    baseURL: 'https://anilibria.top/api/v1/'
})

export const supabase = createClient("https://xjwphjgkoukcnlqthfbk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqd3Boamdrb3VrY25scXRoZmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTk5NTEsImV4cCI6MjA2NjI3NTk1MX0.1_QB6hpuB2fB_3wceXcbDD69B9AT39AF0ooEpIKf09k");

//// получение популярных релизов
export const getPopular = async () => {
    const popular: IAnime = ((await $api.get('anime/catalog/releases?page=1&limit=6&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]')).data)   
    return popular
}

//// популярные релизы в каталог
export const getPopularCatalog = async (page:number) => {
    const popular: Anime[] = ((await $api.get(`anime/catalog/releases?page=${page}&limit=8&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]`)).data.data)   
    // console.log(popular)
    return popular
}


//// получение новых релизов в каталог
export const getLastCatalog = async (page:number) => {
    const last: Anime[] = ((await $api.get(`anime/catalog/releases?page=${page}&limit=8&f[types]&f[genres]&f[search]&f[sorting]=FRESH_AT_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]`)).data.data)
    return last
}

//// получение данных по списку релизов
export const getListId = async (array:number[]) => {
    const list: Anime[] = ((await $api.get(`anime/releases/list?ids=${array}&page=1&limit=50`)).data.data)
    return list
}

//// получение последних релизов
export const getLast = async () => {
    const last: IAnime = ((await $api.get('anime/releases/latest?page=1&limit=6')))
    return last
}

//// получение случайных релизов
export const getRandom = async () => {
    const random: IAnime = ((await $api.get('anime/releases/random?page=1&limit=6')))
    return random
}

//// получение случайных жанров
export const getRandomGenres = async () => {
    const randomGenres: Genre[] = ((await $api.get('anime/genres/random?page=1&limit=6')).data)
    return randomGenres
}

//// получение всех жанров
export const getGenres = async () => {
    const Genres: Genre[] = ((await $api.get('anime/genres/')).data)
    return Genres
}

//// получение релиза по id или alias
export const getReleasesId = async (alias: string) => {
    const ReleasesId: EpisodeType = ((await $api.get(`anime/releases/${alias}`)).data)
    return ReleasesId
}

//// получение франшиз по id релиза
export const getFranchises = async (id: number) => {
    const Franchises: FranchisesType = ((await $api.get(`/anime/franchises/release/${id}`)))
    return Franchises
}

//// получение релизов по жанру id
export const getGenresReleases = async (id: string, page:number) => {
    const GenresReleases: Anime[] = ((await $api.get(`/anime/genres/${id}/releases?page=${page}&limit=18`)).data.data)
    return GenresReleases
}

//// получение данных о жанре id
export const getGenresId = async (id: string ) => {
    const Genres: Genre = ((await $api.get(`/anime/genres/${id}`)).data)
    return Genres
}

//// поиск
export const getSearch = async (query: string ) => {
    const search: Anime[] = ((await $api.get(`/app/search/releases?query=${query}`)).data)
    return search
}