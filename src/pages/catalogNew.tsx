import Catalog from "../components/catalog/catalog"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { getLastCatalog } from "../api"
import { useEffect, useState } from "react"
import type { Anime } from "../types/types"

function CatalogNewPages() {
    const [popularAnime, setPopularAnime] = useState<Anime[]>([]) 
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    
        useEffect(() => {
            createPopular()
            window.scrollTo(0, 0)
            document.title = "Новые релизы"
        },[])
    
        const createPopular = async () => {
            if (page !== 1) {
                const timeoutPopular = await getLastCatalog(page)
                setPopularAnime(prevItems => [...prevItems, ...timeoutPopular])
                if (timeoutPopular.length === 0) {
                    setHasMore(false);
                }
            } else {
                const timeoutPopular = await getLastCatalog(page)
                setPopularAnime(timeoutPopular)
            }
                setPage(prevPage => prevPage + 1)
            }

    return (
        <>
            <Header/>
            <Catalog text={'Новые релизы'} hasMore={hasMore} createPopular={createPopular} popularAnime={popularAnime}/>
            <Footer/>
        </>
    )
}

export default CatalogNewPages