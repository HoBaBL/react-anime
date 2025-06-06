import { type FC } from 'react'
import style from './catalog.module.css'
import type { Anime } from '../../types/types'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

type CatalogType = {
    popularAnime: Anime[],
    createPopular: () => Promise<void>,
    hasMore: boolean,
    text: string
}

const Catalog:FC<CatalogType> = ({popularAnime, createPopular, hasMore, text}) => {
    

    return (
        <div className={style.container}>
            <h1 className={style.h1}>{text}</h1>
            {/* <div className={style.popularFlex}> */}
                <InfiniteScroll
                style={{overflow:'hidden'}}
                    className={style.popularFlex}
                    dataLength={popularAnime.length}
                    next={createPopular}
                    hasMore={hasMore}
                    loader={<h4>Загрузка...</h4>}
                    >
                    { popularAnime && popularAnime.map((item) => 
                        <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                            <div className={style.imgBox}>
                                <img className={style.img} src={`https://anilibria.top/${item.poster.src}`} alt={item.name.english} />
                            </div>
                            <div className={style.absolute}>
                                <div className={style.padding}>
                                    <h3 className={style.absoluteText}>{item.name.main}</h3>
                                    <p className={style.genres}>{item.name.english}</p>
                                    { !item.is_ongoing && item.episodes_total !== null ?  <p className={style.genres}>{item.episodes_total} серий</p> : ''}
                                    {item.genres !== undefined ? <p className={style.genres}>{item.genres.slice(0,3).map((i) => i.name).join(' • ')}</p> : ''} 
                                    <p className={style.genres}>{item.year} • {item.age_rating.label}</p>
                                    <p className={style.series}>{item.description}</p>
                                </div>
                                
                            </div>
                            
                        </Link>
                    )}
                </InfiniteScroll>
            {/* </div> */}
        </div>
    )
}

export default Catalog