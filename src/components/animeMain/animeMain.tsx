import style from './animeMain.module.css'
import { getReleasesId } from '../../api'
import type { EpisodeType } from '../../types/typesEpisode'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const AnimeMain = () => {
    const [release, setRelease] = useState<EpisodeType>() 
    const { id } = useParams()

    const createPopular = async () => {
            const timeoutPopular = await getReleasesId(id!)
            setRelease(timeoutPopular)
    }

    useEffect(() => {
        createPopular()
    },[])

    return (
        <div className={style.container}>
            <div className={style.flexHeader}>
                <img className={style.img} src={`https://anilibria.wtf/${release?.poster.src}`} alt="" />
                <div>
                    <h1 className={style.h1}>{release?.name.main}</h1>
                    <p className={style.text}>{release?.name.english}</p>
                    <div className={style.flex}>
                        <p className={style.textMain}>{release?.age_rating.label}</p>
                        { !release?.is_ongoing ? 
                            <div className={style.ongoing}>
                                <p className={style.ongoingText}>Завершён</p>
                            </div>
                            : 
                            <div className={style.ongoing}>
                                <p className={style.ongoingText}>Выходит</p>
                            </div>
                        }

                    </div>
                    <div>
                        <p className={style.textMenuGray}>Жанр: <span className={style.textMenu}>{release?.genres.map((item) => item.name).join(' • ')}</span></p>
                        <p className={style.textMenuGray}>Год выхода: <span className={style.textMenu}>{release?.year}</span></p>
                        <p className={style.textMenuGray}>Количество серий: <span className={style.textMenu}>{release?.episodes_total}</span></p>
                        <p className={style.textMenuGray}>Время серии: <span className={style.textMenu}>{release?.average_duration_of_episode} мин</span></p>
                    </div>
                </div>
            </div>
            <div>
                <p className={style.textDescription}>{release?.description}</p>
            </div>
            <div className={style.line}></div>
            <h2 className={style.h2}>Эпизоды</h2>
            <div className={style.episodesGrid}>
                {
                    release?.episodes.map((item) => 
                        <div className={style.preview} key={item.id}>
                            <div className={style.previewAbsolute}>
                                <div style={{padding:'10px'}}>
                                    <p className={style.previewTextMax}>{item.ordinal} эпизод</p>
                                    <p className={style.previewText}>{item.name}</p>
                                </div>
                            </div>
                            <img className={style.imgPreview} src={`https://anilibria.wtf/${item.preview.src}`} alt="" />
                        </div>
                    )
                }
            </div>
            <div className={style.line}></div>
            <h2 className={style.h2}>Связанное</h2>
            {/* height={"300px"} width={"500px"}  */}
            <iframe className={style.iframe} src="https://www.m3u8player.online/embed/m3u8?url=https%3A%2F%2Fcache-rfn.libria.fun%2Fvideos%2Fmedia%2Fts%2F9600%2F1%2F1080%2F5dfc6533a7d9072b55429627aa3945c9.m3u8%3FcountryIso%3DRU%26isAuthorized%3D0%26isWithVideoAds%3D1%26isWithVideoAdsAlways%3D1" width="100%" height="100%"  allowFullScreen></iframe>
            {/* <iframe scrolling="no" seamless className={style.iframe} allowFullScreen src="https://hlsplayer.net/embed?type=m3u8&src=https://cache-rfn.libria.fun/videos/media/ts/9600/2/1080/14a857c59df1aed6ce0fd6cac1d58262.m3u8?countryIso=RU&isAuthorized=0&isWithVideoAds=1&isWithVideoAdsAlways=1" /> */}
        </div>
    )
}

export default AnimeMain