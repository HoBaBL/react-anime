import Header from "../components/header/header"
import CarouselComp from "../components/carousel/carousel"
import Popular from "../components/popular/popular"
import { getPopular, getLast, getRandom } from "../api"
import InfoHome from "../components/infoHome/infoHome"
import RandomGenres from "../components/randomGenresHome/randomGenresHome"
import Footer from "../components/footer/footer"
import { useEffect } from "react"

function HomePages() {
    const infoArray = [
        {
            name: "Чёрный клевер" ,
            text: "Ещё младенцами в один и тот же день Аста с Юно были подброшены под двери церкви одной отдалённой деревни. Годы шли, мальчики росли, а миром вокруг них правила магия. Юно оказался по-настоящему одарённым чародеем, а Аста не мог освоить и простейшее заклинание. На пятнадцатый день рождения юноши получат свою собственную книгу заклинаний — гримуар. Лучшие друзья в прошлом, а ныне — соперники, они делят одну мечту на двоих. Каждый из них хочет стать Королём-чародеем.",
            img: "https://i.pinimg.com/originals/00/aa/bb/00aabb2f6b9ca17270a1517547a5e619.jpg",
            alias: "black-clover"
        },
        {
            name: "Мастера меча онлайн" ,
            text: "Опытному геймеру Кирито повезло поучаствовать в бета-тестировании самой ожидаемой компьютерной игры нового поколения - Sword Art Online. Когда наконец на прилавках появились диски с финальной версией, тысячи геймеров устремились в совершенный виртуальный мир MMORPG. Там их ждал неприятный сюрприз - гейм-мастер объявил, что выйти из игры по собственной воле невозможно. Единственный шанс это сделать - пройти все сто уровней до конца. А смерть в игре означает смерть и в реальной жизни.",
            img: "https://steamuserimages-a.akamaihd.net/ugc/397833649933333300/AEB458F7033FA90DB05A1F37582BE71C5E2353D3/?imw=512&amp;imh=307&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true",
            alias: "sword-art-online-i"
        }
    ]

    useEffect(() => {
        document.title = "Anime Home"
    },[])


    return (
        <>
            <Header/>
            <div style={{paddingTop: '70px'}}>
                <CarouselComp/>
                <Popular text={'Популярное'} api={getPopular} url={'catalog'}/>
                <Popular text={'Новые эпизоды'} api={getLast} url={'catalog/new'}/>
                <InfoHome alias={infoArray[0].alias} name={infoArray[0].name} text={infoArray[0].text} img={infoArray[0].img}/>
                <Popular url={'catalog'} text={'Случайные релизы'} api={getRandom}/>
                <InfoHome alias={infoArray[1].alias} name={infoArray[1].name} text={infoArray[1].text} img={infoArray[1].img}/>
                <RandomGenres/>
                <Footer/>
            </div>
        </>
    )
}

export default HomePages