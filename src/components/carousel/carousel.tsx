import { Carousel, Button, Flex, ConfigProvider } from 'antd';
import style from './carousel.module.css'
import { IoPlayOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router';

function CarouselComp() {
    
    return(
        <div className={style.container}>
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            arrowSize: 40,
                            arrowOffset: 16,
                            dotHeight: 8,
                            dotWidth: 32,
                            dotActiveWidth: 42
                        },
                    },
                }}
                >
                <Carousel arrows={true} autoplay={{ dotDuration: true }} autoplaySpeed={80000}>
                    <div className={style.carouselDemonSlayer}>
                        <div className={style.carouselBlockText}>
                            <h2 className={style.h2}>Клинок, рассекающий демонов</h2>
                            <p className={style.p}>
                                Эпоха Тайсё. Ещё с древних времён ходят слухи, что в лесу обитают человекоподобные демоны, которые питаются людьми и выискивают по ночам новых жертв. 
                                Тандзиро Камадо — старший сын в семье, потерявший отца и взявший на себя заботу о родных. 
                                Однажды он уходит в соседний город, чтобы продать древесный уголь... 
                                {/* Вернувшись утром, парень обнаруживает перед собой страшную картину: вся родня зверски убита, а единственная выжившая — младшая сестра Нэдзуко, обращённая в демона, но пока не потерявшая человечность. 
                                С этого момента начинается долгое и опасное путешествие Тандзиро и Нэдзуко, в котором мальчик намерен разыскать убийцу и узнать способ исцеления сестры. */}
                            </p>
                            <Flex style={{marginTop:'30px'}} align='center' gap="middle" wrap>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/kimetsu-no-yaiba`}>
                                        <Button className={style.btn}>
                                                <IoPlayOutline size={28} color='#d56f1a'/>
                                                Смотреть
                                        </Button>
                                    </Link>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Button className={style.btnNoneBorder}>
                                        <FiPlus size={24} color='#d56f1a'/>
                                        В избранное
                                    </Button>
                                </ConfigProvider>
                                
                            </Flex>
                        </div>
                    </div>
                    <div className={style.carouselAttackOnTitan}>
                        <div className={style.carouselBlockText}>
                            <h2 className={style.h2}>Поднятие уровня в одиночку</h2>
                            <p className={style.p}>
                                10 лет назад открылись врата в другой мир, где людям дозволено убивать монстров. 
                                Так появились охотники, преследующие и уничтожающие тварей. Но не каждому из них суждено повысить свой уровень и стать сильнее. 
                                Сон Джин-у был охотником низшего E-ранга, у которого не было ни единого шанса продвинуться по ранговой лестнице, пока однажды он случайно не очутился в подземелье D-ранга. 
                                
                            </p>
                            <Flex style={{marginTop:'30px'}} align='center' gap="middle" wrap>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/ore-dake-level-up-na-ken`}>
                                        <Button className={style.btn}>
                                            
                                                <IoPlayOutline size={28} color='#d56f1a'/>
                                                Смотреть
                                            
                                        </Button>
                                    </Link>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Button className={style.btnNoneBorder}>
                                        <FiPlus size={24} color='#d56f1a'/>
                                        В избранное
                                    </Button>
                                </ConfigProvider>
                                
                            </Flex>
                        </div>
                    </div>
                    <div className={style.carouselJujutsuKaisen}>
                        <div className={style.carouselBlockText}>
                            <h2 className={style.h2}>Магическая битва</h2>
                            <p className={style.p}>
                                Мир, в котором демоны питаются людьми, а те об этом даже не догадываются. Когда-то давно самый могущественный демон был повержен, а части его тела разбросаны по свету. 
                                Тот, кто сможет их собрать и поглотить, получит безграничную власть и даже сможет уничтожить человечество...
                            </p>
                            <Flex style={{marginTop:'30px'}} align='center' gap="middle" wrap>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/jujutsu-kaisen`}>
                                        <Button className={style.btn}>
                                            
                                                <IoPlayOutline size={28} color='#d56f1a'/>
                                                Смотреть
                                            
                                        </Button>
                                    </Link>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Button className={style.btnNoneBorder}>
                                        <FiPlus size={24} color='#d56f1a'/>
                                        В избранное
                                    </Button>
                                </ConfigProvider>
                                
                            </Flex>
                        </div>
                    </div>
                    <div className={style.carouselBleach}>
                        <div className={style.carouselBlockText}>
                            <h2 className={style.h2}>Блич</h2>
                            <p className={style.p}>
                                Старшеклассник Ичиго Куросаки видит другую сторону этого мира, в том числе и духов. 
                                Однажды он встречает девушку, которая умеет отправлять души умерших туда, где им положено быть.
                                Случайно он получает её способности и начинает истреблять злых духов...
                            </p>
                            <Flex style={{marginTop:'30px'}} align='center' gap="middle" wrap>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/bleach`}>
                                        <Button className={style.btn}>
                                            
                                                <IoPlayOutline size={28} color='#d56f1a'/>
                                                Смотреть
                                            
                                        </Button>
                                    </Link>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                        Button: {
                                            defaultBg: 'transparent',
                                            defaultBorderColor:'#d56f1a',
                                            defaultColor:'#e4e4e4',
                                            contentFontSize: 20,
                                            defaultActiveBg: 'transparent',
                                            defaultHoverBg: 'transparent',
                                            defaultHoverColor: '#d56f1a',
                                            defaultActiveColor:'#e4e4e4' ,
                                            defaultActiveBorderColor:'#d56f1a',
                                            defaultHoverBorderColor: '#d56f1a'
                                        },
                                        },
                                    }}
                                >
                                    <Button className={style.btnNoneBorder}>
                                        <FiPlus size={24} color='#d56f1a'/>
                                        В избранное
                                    </Button>
                                </ConfigProvider>
                                
                            </Flex>
                        </div>
                    </div>
                </Carousel>
            </ConfigProvider>
        </div>
        
    )
}

export default CarouselComp