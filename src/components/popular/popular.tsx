import { useEffect, useState, type FC } from 'react'
import style from './popular.module.css'
import type { Anime, IAnime } from '../../types/types'
import { Button, ConfigProvider } from 'antd'
import { Link } from 'react-router-dom';


type PopularType = {
    text:string,
    api: () => Promise<IAnime>,
    url: string
}

const Popular:FC<PopularType> = ({text, api, url}) => {
    const [popularAnime, setPopularAnime] = useState<IAnime>() 

    const createPopular = async () => {
        const timeoutPopular = await api()
        setPopularAnime(timeoutPopular)
    }

    useEffect(() => {
        createPopular()
    },[])

    function num_word(item:Anime){  
        let value = item.episodes_total
        let words = ['серия', 'серии', 'серий']
        value = Math.abs(value!) % 100; 
        let num = value % 10;
        if(value > 10 && value < 20) return words[2]; 
        if(num > 1 && num < 5) return words[1];
        if(num == 1) return words[0]; 
        return words[2];
    }   

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
                        : 
                        <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/${url}`}>
                            <Button className={style.more} type="link">
                                Больше
                            </Button>
                        </Link>
                    }
                    
                </ConfigProvider>
            </div>
            <div className={style.popularFlex}>
                { popularAnime && popularAnime.data.map((item) => 
                    <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                        <div className={style.absolute}>
                            <div className={style.padding}>
                                <h3 className={style.absoluteText}>{item.name.main}</h3>
                                { !item.is_ongoing && item.episodes_total !== null ?  <p className={style.series}>{item.episodes_total} {num_word(item)}</p> : ''}
                                {item.genres !== undefined ? <p className={style.genres}>{item.genres.slice(0,3).map((i) => i.name).join(' • ')}</p> : ''} 
                            </div>
                            
                        </div>
                        <img className={style.img} src={`https://anilibria.top/${item.poster.src}`} alt={item.name.english} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Popular