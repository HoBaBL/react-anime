import axios from "axios";
import type { IAnime, Genre } from "../types/types";

// const $api = axios.create({
//     baseURL: 'https://api.anilibria.tv/v3/'
// })

const $api = axios.create({
    baseURL: 'https://anilibria.wtf/api/v1/'
})

export const getPopular = async () => {
    const popular: IAnime = ((await $api.get('anime/catalog/releases?page=1&limit=6&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]')).data)   
    return popular
}

export const getLast = async () => {
    const last: IAnime = ((await $api.get('anime/releases/latest?page=1&limit=6')))
    return last
}

export const getRandom = async () => {
    const random: IAnime = ((await $api.get('anime/releases/random?page=1&limit=6')))
    return random
}

export const getRandomGenres = async () => {
    const randomGenres: Genre[] = ((await $api.get('anime/genres/random?page=1&limit=6')).data)
    console.log(randomGenres)
    return randomGenres
}