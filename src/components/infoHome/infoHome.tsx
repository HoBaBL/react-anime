import style from './infoHome.module.css'
import { Button, Flex, ConfigProvider } from 'antd';
import { IoPlayOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import type { FC } from 'react';
import { Link } from 'react-router';

type InfoType = {
    img: string,
    name: string, 
    text: string,
    alias:string
}

const InfoHome:FC<InfoType> = ({img, name, text, alias}) => {

    return (
        <div className={style.container}>
            <div>
                <img className={style.img} src={img} alt="black clover" />
            </div>
            <div className={style.textBox}>
                <h2 className={style.h2}>{name}</h2>
                <p className={style.text}>
                    {text}
                </p>
            
                <Flex style={{marginTop:'16px'}} align='center' gap="middle" wrap>
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
                        <Button className={style.btn}>
                            <Link style={{display:'flex', alignItems:"center", gap:"5px"}} to={`/${alias}`}>
                                <IoPlayOutline size={28} color='#d56f1a'/>
                                Смотреть
                            </Link>
                        </Button>
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
    )
}

export default InfoHome