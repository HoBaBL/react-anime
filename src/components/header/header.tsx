import style from './header.module.css'
import { Button, Flex, ConfigProvider,Input } from 'antd';
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

function Header() {


    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.headerFlex}>
                    <h2 className={style.title}>Anime Home</h2>
                    <Flex gap="large" wrap>
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
                            <Button className={style.headerMenuHref} type="link">Главная</Button>
                            <Button className={style.headerMenuHref} type="link">Популярные</Button>
                            <Button className={style.headerMenuHref} type="link">Новые</Button>
                            <Button className={style.headerMenuHref} type="link">Избранные</Button>
                        </ConfigProvider>
                        
                    </Flex>
                    <Flex align='center' style={{width:"320px"}} gap="middle">
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
                            <Input size="large" className={style.input} placeholder="Поиск" prefix={<IoSearch size={20} color='#d56f1a'/>} />
                        </ConfigProvider>
                        <Button className={style.headerMenuHref} type="link"><FaRegUser size={22} color='#d56f1a'/></Button>
                            
                    </Flex>

                </div>
                
            </div>
            
        </header>
    )
}

export default Header