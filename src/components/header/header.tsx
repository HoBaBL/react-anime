import style from './header.module.css'
import { Button, Flex, ConfigProvider,Input, Drawer } from 'antd';
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getSearch } from '../../api';
import type { Anime } from '../../types/types';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

function Header() {
    const [query, updateQuery] = useState('');
    const [releases, setReleases] = useState<Anime[]>([])
    const refTask = useRef<any>('');
    const [searchActive, setSearchActive] = useState(false)
    const [searchActiveDrawer, setSearchActiveDrawer] = useState(false)
    const [burger, setBurger] = useState(false)

    const createPopular = async () => {
        const timeoutPopular = await getSearch(query)
        setReleases(timeoutPopular)
    }

    useEffect(() => {
        if (query.length > 2)
        createPopular()
    },[query])

    useEffect(() => {
        document.addEventListener("mousedown", MimoClick)
        return () => {
            document.removeEventListener("mousedown", MimoClick)
        }
    },[])

    const MimoClick = (event:any) => {
        if (refTask.current && refTask.current.contains(event.target)) {
            setSearchActiveDrawer(true)
            setSearchActive(true)
        } else {
            setSearchActive(false)
            setSearchActiveDrawer(false)
        }
    }

    const onClose = () => {
        setBurger(false);
    };

    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.headerFlex}>
                    <Link to={'/'}>
                        <h2 className={style.title}>Anime Home</h2>
                    </Link>
                    
                    <Flex gap="large" wrap className={style.menuHeader}>
                        <ConfigProvider
                            theme={{
                                components: {
                                Button: {
                                    colorLink: '#e4e4e4',
                                    colorLinkHover: '#d56f1a',
                                    colorLinkActive: '#d56f1a'
                                },
                                },
                            }}
                            >
                            <Link to={'/catalog'}><Button className={style.headerMenuHref} type="link">Популярные</Button></Link> 
                            <Link to={'/catalog/new'}><Button className={style.headerMenuHref} type="link">Новое</Button></Link>
                            <Link to={'/catalog/genres'}><Button className={style.headerMenuHref} type="link">Жанры</Button></Link>
                            <Link to={'/favourites'}><Button className={style.headerMenuHref} type="link">Избранное</Button></Link>
                        </ConfigProvider>
                        
                    </Flex>
                    <Flex align='center' style={{ position:"relative"}} gap="middle">
                        <ConfigProvider
                            theme={{
                                components: {
                                Input: {
                                    hoverBorderColor:'none',
                                    activeBorderColor:'#d56f1a',
                                    hoverBg: '#2e2e2e',
                                    colorBorder: "transparent",
                                    activeBg: '#2e2e2e',
                                    inputFontSize: 16,
                                    colorTextPlaceholder: '#703a2e'
                                },
                                },
                            }}
                            >
                            <Input style={{width:"280px"}} onClick={() => setSearchActive(true)} size="large" className={style.input} value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Поиск" prefix={<IoSearch size={20} color='#d56f1a'/>} />
                        </ConfigProvider>
                        <Button className={style.headerMenuHrefAcc} type="link"><FaRegUser size={22} color='#d56f1a'/></Button>
                        { burger ? <Button onClick={() => setBurger(false)} className={style.headerMenuBurger} type="link"><RxCross2 color='#d56f1a' size={28}/></Button> : 
                            <Button onClick={() => setBurger(true)} className={style.headerMenuBurger} type="link"><RxHamburgerMenu color='#d56f1a' size={28}/></Button>
                        }
                        <Drawer
                            title={
                                <div className={style.flexDrawer}>
                                    <Link to={'/'}>
                                        <h2 className={style.title}>Anime Home</h2>
                                    </Link>
                                    <Button onClick={() => setBurger(false)} className={style.headerMenuBurger} type="link"><RxCross2 color='#d56f1a' size={28}/></Button>
                                </div>
                                }
                            placement={'right'}
                            closable={false}
                            onClose={onClose}
                            open={burger}
                            key={'right'}
                            className={style.drawer}
                            style={{backgroundColor:'#242424'}}
                            >
                            <ConfigProvider
                                theme={{
                                    components: {
                                    Button: {
                                        colorLink: '#e4e4e4',
                                        colorLinkHover: '#d56f1a',
                                        colorLinkActive: '#d56f1a'
                                    },
                                    },
                                }}
                                >
                                    <div className={style.flexColumn}>
                                        <div>
                                            <ConfigProvider
                                            theme={{
                                                components: {
                                                Input: {
                                                    hoverBorderColor:'none',
                                                    activeBorderColor:'#d56f1a',
                                                    hoverBg: '#2e2e2e',
                                                    colorBorder: "transparent",
                                                    activeBg: '#2e2e2e',
                                                    inputFontSize: 16,
                                                    colorTextPlaceholder: '#703a2e'
                                                },
                                                },
                                            }}
                                            >
                                                <Input style={{width:"280px"}} onClick={() => setSearchActiveDrawer(true)} size="large" className={style.inputDrawer} value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Поиск" prefix={<IoSearch size={20} color='#d56f1a'/>} />
                                            </ConfigProvider>
                                            <div className={searchActiveDrawer && query.length > 0 ? style.searchActiveDrawer : style.searchActiveNoneDrawer} ref={refTask}>
                                                { query.length > 2 ? 
                                                    releases.slice(0, 4).map((item) => 
                                                        <Link onClick={() => setSearchActiveDrawer(false)} key={item.id} to={`/${item.alias}`} className={style.flexSearch}>
                                                            <div>
                                                                <img className={style.img} src={`https://anilibria.top/${item.poster.thumbnail}`} alt="" />
                                                            </div>
                                                            <p className={style.searchText}>{item.name.main}</p>
                                                        </Link>
                                                )
                                                : <p className={style.searchTextNone}>Ничего не найдено</p>
                                                }
                                                
                                            </div>
                                        </div>
                                        
                                        <Link className={style.drawerLink}  to={'/catalog'}><Button className={style.headerMenuHref} type="link">Популярные</Button></Link> 
                                        <Link className={style.drawerLink} to={'/catalog/new'}><Button className={style.headerMenuHref} type="link">Новое</Button></Link>
                                        <Link className={style.drawerLink} to={'/catalog/genres'}><Button className={style.headerMenuHref} type="link">Жанры</Button></Link>
                                        <Link className={style.drawerLink} to={'/favourites'}><Button className={style.headerMenuHref} type="link">Избранное</Button></Link>
                                    </div>

                            </ConfigProvider>
                        </Drawer>
                        <div className={searchActive && query.length > 0 ? style.searchActive : style.searchActiveNone} ref={refTask}>
                            { query.length > 2 ? 
                                releases.slice(0, 4).map((item) => 
                                    <Link onClick={() => setSearchActive(false)} key={item.id} to={`/${item.alias}`} className={style.flexSearch}>
                                        <div>
                                            <img className={style.img} src={`https://anilibria.top/${item.poster.thumbnail}`} alt="" />
                                        </div>
                                        <p className={style.searchText}>{item.name.main}</p>
                                    </Link>
                            )
                            : <p className={style.searchTextNone}>Ничего не найдено</p>
                            }
                            
                        </div>
                    </Flex>
                    
                </div>
                
            </div>
            
        </header>
    )
}

export default Header