import { useEffect, useState } from 'react'
import style from './randomGenresHome.module.css'
import { getRandomGenres } from '../../api'
import type { Genre } from '../../types/types'
import { Button, ConfigProvider } from 'antd'
import { Link } from 'react-router'

const RandomGenres = () => {
    const [genres, setGenres] = useState<Genre[]>() 
    
    const createGenres = async () => {
        const timeoutGenres = await getRandomGenres()
        setGenres(timeoutGenres)
    }

    useEffect(() => {
        createGenres()
    },[])

    return (
        <div className={style.container}>
            <div className={style.flexHeader}>
                <h2 className={style.h2}>Жанры</h2>
                <ConfigProvider
                    theme={{
                        components: {
                        Button: {
                            colorLink: '#e4e4e4',
                            colorLinkHover: '#d56f1a',
                            colorLinkActive: '#d56f1a'
                        },
                        },
                    }}
                    >
                        <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/catalog/genres`}>
                            <Button className={style.more} type="link">Больше</Button>
                        </Link>
                    
                </ConfigProvider>
            </div>
            <div className={style.grid}>
                {
                    genres && genres.map((item) => 
                        <a className={style.box} key={item.id}>
                            <img className={style.img} src={`https://anilibria.wtf/${item.image.preview}`} alt="" />
                            <h3 className={style.text}>{item.name}</h3>
                        </a>
                    )
                }

            </div>

        </div>
    )
}

export default RandomGenres