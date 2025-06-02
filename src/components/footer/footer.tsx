import { Link } from 'react-router';
import style from './footer.module.css'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Footer = () => {

    return (
        <footer className={style.container}>
            <div className={style.flex}>
                <div className={style.box}>
                    <h3 className={style.h3}>Навигация</h3>
                    <ul className={style.ul}>
                        <li className={style.li}><Link className={style.li} to={'/'}>Главная</Link></li>
                        <li className={style.li}><Link to={'/catalog'} className={style.li}>Популярные</Link></li>
                        <li className={style.li}><Link to={'/catalog/new'} className={style.li}>Новые</Link></li>
                        <li className={style.li}>Избранные</li>
                    </ul>
                </div>
                <div className={style.box}>
                    <h3 className={style.h3}>О сайте</h3>
                    <ul className={style.ul}>
                        <li className={style.li}> Политика конфиденциальности</li>
                        <li className={style.li}>Дисклеймер</li>
                        <li className={style.li}>Помощь</li>
                        <li className={style.li}>FAQ</li>
                    </ul>
                </div>
                <div className={style.box}>
                    <h3 className={style.h3}>Контакты</h3>
                    <div className={style.flexIcon}>
                        <a href=""><FaFacebook color='#106ee0' size={34}/></a>
                        <a href=""><FaInstagram color='#98412d' size={34}/></a>
                        <a href=""><FaTwitter color='#23abf5' size={34}/></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer