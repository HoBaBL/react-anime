import { useEffect, useState } from 'react'
import style from './genres.module.css'
import type { Genre } from '../../types/types'
import { getGenres } from '../../api'
import { Link } from 'react-router'


const Genres = () => {
    const [genres, setGenres] = useState<Genre[]>() 
    
        const createPopular = async () => {
            const timeoutPopular = await getGenres()
            setGenres(timeoutPopular)
        }
    
        useEffect(() => {
            createPopular()
            window.scrollTo(0, 0)
        },[])

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Жанры</h1>
            <div className={style.grid}>
                {  genres && genres.map((item) => 
                    <Link to={`/genres/${item.id}`} className={style.box} key={item.id}>
                        <img className={style.img} src={`https://anilibria.top/${item.image.preview}`} alt="" />
                        <h3 className={style.text}>{item.name}</h3>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Genres