import { useEffect, useState } from 'react';
import style from './catalogGenres.module.css'
import { getGenresId, getGenresReleases } from '../../api';
import type { Anime, Genre } from '../../types/types';
import { Link, useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';


const CatalogGenres = () => {
    const [GenresReleases, setGenresReleases] = useState<Anime[]>([]) 
    const [hasMore, setHasMore] = useState(true);
    const [genres, setGenres] = useState<Genre>()
    const [page, setPage] = useState(1);
    const { id } = useParams()

    const createGenres = async () => {
        const timeoutPopular = await getGenresId(id!)
        setGenres(timeoutPopular)
        document.title = `${timeoutPopular?.name}`
    }
    
    useEffect(() => {
        createPopular()
        createGenres()
        window.scrollTo(0, 0)
    },[])

    const createPopular = async () => {
        if (page !== 1) {
            const timeoutPopular = await getGenresReleases(id!, page)
            setGenresReleases(prevItems => [...prevItems, ...timeoutPopular])
            if (timeoutPopular.length === 0) {
                setHasMore(false);
            }
        } else {
            const timeoutPopular = await getGenresReleases(id!, page)
            setGenresReleases(timeoutPopular)
        }
            setPage(prevPage => prevPage + 1)
        }

        function num_word(){  
            let value = genres?.total_releases
            let words = ['релиз', 'релиза', 'релизов']
            value = Math.abs(value!) % 100; 
            let num = value % 10;
            if(value > 10 && value < 20) return words[2]; 
            if(num > 1 && num < 5) return words[1];
            if(num == 1) return words[0]; 
            return words[2];
        }   

    return (
        <div className={style.container}>
            <div className={style.flex}>
                <img className={style.imgGenres} src={`https://anilibria.top/${genres?.image.preview}`} alt="" />
                <div>
                    <h1 className={style.h1}>{genres?.name}</h1>
                    <p className={style.genres}>{genres?.total_releases} {num_word()}</p>
                </div>
            </div>
            <InfiniteScroll
                style={{overflow:'hidden'}}
                    className={style.popularFlex}
                    dataLength={GenresReleases.length}
                    next={createPopular}
                    hasMore={hasMore}
                    loader={<h4>Загрузка...</h4>}
                    >
                    { GenresReleases && GenresReleases.map((item) => 
                        <Link to={`/${item.alias}`} key={item.id} className={style.popularBox}>
                            <div>
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
        </div>
    )
}

export default CatalogGenres