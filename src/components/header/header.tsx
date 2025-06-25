import style from './header.module.css'
import { Button, Flex, ConfigProvider,Input, Drawer, type MenuProps } from 'antd';
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getSearch, supabase } from '../../api';
import type { Anime } from '../../types/types';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Dropdown } from 'antd';
import { IoIosStar } from "react-icons/io";
import { FaListUl, FaRegClock } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";

function Header() {
    const [query, updateQuery] = useState('');
    const [releases, setReleases] = useState<Anime[]>([])
    const refTask = useRef<any>('');
    const [searchActive, setSearchActive] = useState(false)
    const [searchActiveDrawer, setSearchActiveDrawer] = useState(false)
    const [burger, setBurger] = useState(false)
    const [user, setUser] = useState('')

    const createPopular = async () => {
        const timeoutPopular = await getSearch(query)
        setReleases(timeoutPopular)
    }

    useEffect(() => {
        User()
        window.scrollTo(0, 0)
    },[])

    async function User() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setUser(user.user_metadata.first_name)
        }
    }

    async function exitUser() {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error)
        setUser('')
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

    const items: MenuProps['items'] = [
        {
            label: (
            <div className={style.headerMenuDropdownText}><div style={{width:"20px", height:"100%", display:'flex', alignItems:"center"}}><FaUserAstronaut size={18}/></div> {user}</div>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
            <Link to={'/favourites'}><Button className={style.headerMenuDropdown} type="link"><div style={{width:"20px", height:"100%", display:'flex', alignItems:"center"}}><IoIosStar size={18}/></div> Избранное</Button></Link>
            ),
            key: '1',
        },
        {
            label: (
            <Link to={'/favourites'}><Button className={style.headerMenuDropdown} type="link"><div style={{width:"20px", height:"100%", display:'flex', alignItems:"center"}}><FaListUl size={18}/></div> Просмотрено</Button></Link>
            ),
            key: '2',
        },
        {
            label: (
            <Link to={'/favourites'}><Button className={style.headerMenuDropdown} type="link"><div style={{width:"20px", height:"100%", display:'flex', alignItems:"center"}}><FaRegClock size={18}/></div> История просмотра</Button></Link>
            ),
            key: '4',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a onClick={() => exitUser()}>
                    <Button className={style.headerMenuDropdown} type="link"><div style={{width:"20px", height:"100%", display:'flex', alignItems:"center"}}><IoExitOutline size={22}/></div> Выход</Button>
                </a>
            ),
            key: '3',
        }
    ];

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
                            <Link to={'/catalog'}><Button className={style.headerMenuHref} type="link">Популярное</Button></Link> 
                            <Link to={'/catalog/new'}><Button className={style.headerMenuHref} type="link">Новое</Button></Link>
                            <Link to={'/catalog/genres'}><Button className={style.headerMenuHref} type="link">Жанры</Button></Link>
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
                        <ConfigProvider
                            theme={{
                                token: {
                                   colorBgElevated:"#0c0c0c",
                                   controlItemBgHover: "#1f1f1f"
                                },
                                components: {
                                Button: {
                                    colorLink: '#e4e4e4',
                                    colorLinkHover: '#e4e4e4',
                                    colorLinkActive: '#e4e4e4'
                                },
                                
                                },
                            }}
                            >
                            {!user ?
                               <Link to={'/login'}><Button className={style.headerMenuHrefAcc} type="link"><FaRegUser size={22} color='#d56f1a'/></Button></Link> 
                               :
                                <Dropdown  placement="bottomRight" overlayClassName={style.dropdownStyle} menu={{ items }} trigger={['click']}>
                                    <Button className={style.headerMenuHrefAcc} type="link"><FaRegUser size={22} color='#d56f1a'/></Button>
                                </Dropdown>
                            }
                            
                        </ConfigProvider>
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
                                        <div style={{color:'#e4e4e4'}} className={style.headerMenuHref}>{user}</div>
                                        <div></div>
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
                                                { query.length > 2  ? 
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
                                        <div></div>
                                        <Link className={style.drawerLink}  to={'/catalog'}><Button className={style.headerMenuHref} type="link">Популярное</Button></Link> 
                                        <Link className={style.drawerLink} to={'/catalog/new'}><Button className={style.headerMenuHref} type="link">Новое</Button></Link>
                                        <Link className={style.drawerLink} to={'/catalog/genres'}><Button className={style.headerMenuHref} type="link">Жанры</Button></Link>
                                        <div></div>
                                        <Link className={style.drawerLink} to={'/favourites'}><Button className={style.headerMenuHref} type="link">Избранное</Button></Link>
                                        <Link className={style.drawerLink} to={'/favourites'}><Button className={style.headerMenuHref} type="link">Просмотрено</Button></Link>
                                        <Link className={style.drawerLink} to={'/favourites'}><Button className={style.headerMenuHref} type="link">История просмотра</Button></Link>
                                        <div></div>
                                        <div><Button className={style.headerMenuHref} type="link">Выход</Button></div>
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