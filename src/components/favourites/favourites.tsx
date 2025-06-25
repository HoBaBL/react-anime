import { useEffect, useState } from 'react'
import style from './favourites.module.css'
import type { Anime } from '../../types/types'
import { Link, useNavigate } from 'react-router'
import { getListId, supabase } from '../../api'


type lastType = {
    epID: string | undefined, 
    relID: number | undefined,
    playerSeek: number,
    played: number
}


const Favourites = () => {
    const [favourites, setFavourites] = useState<Anime[]>([])
    const lastEpisodesLocal:lastType[] = JSON.parse(localStorage.getItem('last_episodes')!) || []
    const navigate = useNavigate();

    async function User() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session?.user.id === undefined) {
          navigate("/login")
        }
        if (error !== null) {
            console.log(error)
        }
        Favourites(data.session?.user.id!)
    }

    async function Favourites(user:string) {
        const { data, error } = await supabase
            .from('anime_favorites')
            .select('id_title')
            .eq('id_user', user)
        const arrayID = data!.map((i) => i.id_title)
        if (error) console.log(error)
        const timeoutListId = await getListId(arrayID)
        setFavourites(timeoutListId)
    }

    useEffect(() => {
        User()
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