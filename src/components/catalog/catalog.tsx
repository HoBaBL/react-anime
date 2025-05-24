import { useEffect, useState } from 'react'
import style from './catalog.module.css'
import type { Anime } from '../../types/types'
import { Link } from 'react-router-dom';
import { getPopularCatalog } from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component';

const Catalog = () => {
    const [popularAnime, setPopularAnime] = useState<Anime[]>([]) 
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        createPopular()
        window.scrollTo(0, 0)
    },[])

    const createPopular = async () => {
        if (page !== 1) {
            const timeoutPopular = await getPopularCatalog(page)
            setPopularAnime(prevItems => [...prevItems, ...timeoutPopular])
            if (timeoutPopular.length === 0) {
                setHasMore(false);
            }
        } else {
            const timeoutPopular = await getPopularCatalog(page)
            setPopularAnime(timeoutPopular)
        }
            setPage(prevPage => prevPage + 1)
        }
    
    

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Популярное</h1>
            {/* <div className={style.popularFlex}> */}
                <InfiniteScroll
                style={{overflow:'hidden'}}
                    className={style.popularFlex}
                    dataLength={popularAnime.length}
                    next={createPopular}
                    hasMore={hasMore}
                    loader={<h4>Загрузка...</h4>}
                    endMessage={<p>Больше данных нет</p>}
                    >
                    { popularAnime && popularAnime.map((item) => 
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
                </InfiniteScroll>
            {/* </div> */}
        </div>
    )
}

export default Catalog