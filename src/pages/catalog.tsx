import Catalog from "../components/catalog/catalog"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { getPopularCatalog } from "../api"
import { useEffect, useRef, useState } from "react"
import type { Anime } from "../types/types"

function CatalogPages() {
    const [popularAnime, setPopularAnime] = useState<Anime[]>([]) 
    const [hasMore, setHasMore] = useState(true);
    const page = useRef(1)
        useEffect(() => {
            createPopular()
            window.scrollTo(0, 0)
            document.title = "Популярные релизы"
        },[])
    
        const createPopular = async () => {
            if (page.current !== 1) {
                const timeoutPopular = await getPopularCatalog(page.current)
                setPopularAnime(prevItems => [...prevItems, ...timeoutPopular])
                if (timeoutPopular.length === 0) {
                    setHasMore(false);
                }
            } else if (popularAnime.length === 0){
                const timeoutPopular = await getPopularCatalog(page.current)
                setPopularAnime(timeoutPopular)
            }
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