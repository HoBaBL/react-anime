import { useEffect } from 'react'
import style from './favourites.module.css'
import type { Anime } from '../../types/types'
import { Link } from 'react-router'


type lastType = {
    epID: string | undefined, 
    relID: number | undefined,
    playerSeek: number,
    played: number
}


const Favourites = () => {
    const favourites: Anime[] = JSON.parse(localStorage.getItem('favourites')!) || []
    const lastEpisodesLocal:lastType[] = JSON.parse(localStorage.getItem('last_episodes')!) || []

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Избранное</h1>
            { favourites.length > 0 ?
                <div className={style.popularFlex}>
                    { favourites && favourites.reverse().map((item) => 
                        <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                            <div className={style.imgBox}>
                                <img className={style.img} src={`https://anilibria.top/${item.poster.src}`} alt={item.name.english} />
                            </div>
                            <div className={style.absolute}>
                                <div className={style.padding}>
                                    <h3 className={style.absoluteText}>{item.name.main}</h3>
                                    <p className={style.genres}>{item.name.english}</p>
                                    <p style={{fontSize:'14px'}} className={style.series}>Просмотрено {lastEpisodesLocal.filter((e) => e.relID === item?.id && e.played > 0.8).length} из {item?.episodes_total}</p>
                                    {item.genres !== undefined ? <p className={style.genres}>{item.genres.slice(0,3).map((i) => i.name).join(' • ')}</p> : ''} 
                                    <p className={style.genres}>{item.year} • {item.age_rating.label}</p>
                                    <p className={style.series}>{item.description}</p>
                                    

                                </div>
                                
                            </div>
                            
                        </Link>
                    )}
                </div>
                : 
                <div className={style.noneContent}>
                    <p className={style.noneText}>Ничего не добавлено</p>
                </div>
            }
        </div>
    )
}

export default Favourites