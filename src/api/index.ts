import axios from "axios";
import type { IAnime, Genre } from "../types/types";
import type { EpisodeType } from "../types/typesEpisode";
import type { FranchisesType } from "../types/typesFranchises";

// const $api = axios.create({
//     baseURL: 'https://api.anilibria.tv/v3/'
// })

const $api = axios.create({
    baseURL: 'https://anilibria.wtf/api/v1/'
})

//// получение популярных релизов
export const getPopular = async () => {
    const popular: IAnime = ((await $api.get('anime/catalog/releases?page=1&limit=6&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]')).data)   
    return popular
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

//// получение епизода по id
// export const getEpisodes = async () => {
//     const episodes: EpisodeType = ((await $api.get('anime/releases/episodes/9b5e26ee-598f-4b8b-b77e-188d3e456318')).data)
//     console.log(episodes)
//     return episodes
// }

//// получение релиза по id или alias
export const getReleasesId = async (alias: string) => {
    const ReleasesId: EpisodeType = ((await $api.get(`anime/releases/${alias}`)).data)
    // console.log(ReleasesId)
    return ReleasesId
}

//// получение франшиз по id релиза
export const getFranchises = async (id: number) => {
    const Franchises: FranchisesType = ((await $api.get(`/anime/franchises/release/${id}`)))
    console.log(Franchises)
    return Franchises
}