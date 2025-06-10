import Catalog from "../components/catalog/catalog"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { getPopularCatalog } from "../api"
import { useEffect, useRef, useState } from "react"
import type { Anime } from "../types/types"

function CatalogPages() {
    const [popularAnime, setPopularAnime] = useState<Anime[]>([]) 
    const [hasMore, setHasMore] = useState(true);
    // const [page, setPage] = useState(1);
    const page = useRef(1)
// JSON.parse(sessionStorage.getItem('animeCatalog')!)
        useEffect(() => {
            createPopular()
            window.scrollTo(0, 0)
        },[])
    
        const createPopular = async () => {
            if (page.current !== 1) {
                const timeoutPopular = await getPopularCatalog(page.current)
                setPopularAnime(prevItems => [...prevItems, ...timeoutPopular])
                if (timeoutPopular.length === 0) {
                    setHasMore(false);
                }
                // sessionStorage.setItem('animeCatalog', JSON.stringify(popularAnime));
            } else if (popularAnime.length === 0){
                const timeoutPopular = await getPopularCatalog(page.current)
                setPopularAnime(timeoutPopular)
            }
                // setPage(prevPage => prevPage + 1)
                page.current = page.current + 1
            }

    return (
        <>
            <Header/>
            <Catalog text={"Популярное"} hasMore={hasMore} createPopular={createPopular} popularAnime={popularAnime}/>
            <Footer/>
        </>
    )
}

export default CatalogPages