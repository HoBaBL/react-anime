import { useEffect } from "react"
import Favourites from "../components/favourites/favourites"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

const FavouritesPages = () => {
    useEffect(() => {
            document.title = "Избранные релизы"
    },[])

    return (
        <>
            <Header/>
            <Favourites/>
            <Footer/>
        </>
    )
}

export default FavouritesPages