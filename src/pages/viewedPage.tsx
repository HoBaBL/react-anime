import { useEffect } from "react"
import Viewed from "../components/viewed/viewed"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

const ViewedPages = () => {
    useEffect(() => {
            document.title = "Просмотренные релизы"
    },[])

    return (
        <>
            <Header/>
            <Viewed/>
            <Footer/>
        </>
    )
}

export default ViewedPages