import axios from "axios";
import type { IAnime, IPopularArray } from "../types/types";

// const $api = axios.create({
//     baseURL: 'https://api.anilibria.tv/v3/'
// })

const $api = axios.create({
    baseURL: 'https://anilibria.wtf/api/v1/'
})

export const getLast = async () => {
    const last: IAnime = ((await $api.get('anime/catalog/releases?page=1&limit=6&f[types]&f[genres]&f[search]&f[sorting]=RATING_DESC&f[seasons]&f[age_ratings]&f[years][to_year]=2026&f[years][from_year]=1995&f[publish_statuses]&f[production_statuses]')).data)
    return last
}