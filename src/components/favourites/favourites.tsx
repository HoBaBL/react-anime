import { useEffect, useState } from 'react'
import style from './favourites.module.css'
import type { Genre } from '../../types/types'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../../api'

type animeAPI = {
    id: string,
    id_user: string,
    id_title: string,
    time: string,
    poster: string,
    name: string,
    name_en: string,
    genres: Genre[],
    year: string,
    age_rating: string,
    description: string,
    alias: string
}


const Favourites = () => {
    const [favourites, setFavourites] = useState< animeAPI[]>([])
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
            .select()
            .eq('id_user', user)
        if (error) console.log(error)
        setFavourites(data!.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)))
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
                    { favourites && favourites.map((item) => 
                        <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                            <div className={style.imgBox}>
                                <img className={style.img} src={`https://anilibria.top/${item.poster}`} alt={item.name_en} />
                            </div>
                            <div className={style.absolute}>
                                <div className={style.padding}>
                                    <h3 className={style.absoluteText}>{item.name}</h3>
                                    <p className={style.genres}>{item.name_en}</p>
                                    {item.genres !== undefined ? <p className={style.genres}>{item.genres.slice(0,3).map((i) => i.name).join(' • ')}</p> : ''} 
                                    <p className={style.genres}>{item.year} • {item.age_rating}</p>
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