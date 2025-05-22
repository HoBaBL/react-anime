import { useEffect, useState, type FC } from 'react'
import style from './popular.module.css'
import type { IAnime } from '../../types/types'
import { Button, ConfigProvider } from 'antd'
import { Link } from 'react-router-dom';
import { setAnime } from '../../redux/slice/anime';


type PopularType = {
    text:string,
    api: () => Promise<IAnime>
}

const Popular:FC<PopularType> = ({text, api}) => {
    const [popularAnime, setPopularAnime] = useState<IAnime>() 

    const createPopular = async () => {
        const timeoutPopular = await api()
        setPopularAnime(timeoutPopular)
    }

    useEffect(() => {
        createPopular()
    },[])

    return (
        <div className={style.container}>
            <div className={style.flexHeader}>
                <h2 className={style.h2}>{text}</h2>
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
                    { text === "Случайные релизы" ? 
                        ''
                        : <Button className={style.more} type="link">Больше</Button>
                    }
                    
                </ConfigProvider>
            </div>
            <div className={style.popularFlex}>
                { popularAnime && popularAnime.data.map((item) => 
                    <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                        <div className={style.absolute}>
                            <div className={style.padding}>
                                <h3 className={style.absoluteText}>{item.name.main}</h3>
                                { !item.is_ongoing && item.episodes_total !== null ?  <p className={style.series}>{item.episodes_total} серий</p> : ''}
                                {item.genres !== undefined ? <p className={style.genres}>{item.genres.slice(0,3).map((i) => i.name).join(' • ')}</p> : ''} 
                            </div>
                            
                        </div>
                        <img className={style.img} src={`https://anilibria.wtf/${item.poster.src}`} alt={item.name.english} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Popular