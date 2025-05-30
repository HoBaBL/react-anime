import axios from "axios";
import type { IAnime, Genre, Anime } from "../types/types";
import type { EpisodeType } from "../types/typesEpisode";
import type { FranchisesType } from "../types/typesFranchises";

const $api = axios.create({
    baseURL: 'https://anilibria.wtf/api/v1/'
})

//// получение популярных релизов
export const getPopular = async () => {
    const popular: IAnime = ((await $api.get('anime/catalog/releases?page=1&limit=6&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]')).data)   
    return popular
}

//// популярные релизы в каталог
export const getPopularCatalog = async (page:number) => {
    const popular: Anime[] = ((await $api.get(`anime/catalog/releases?page=${page}&limit=18&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]`)).data.data)   
    console.log(popular)
    return popular
}


//// получение новых релизов в каталог
export const getLastCatalog = async (page:number) => {
    const last: Anime[] = ((await $api.get(`anime/releases/latest?page=${page}&limit=18`)).data)
    return last
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
    console.log(ReleasesId)
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