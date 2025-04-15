import BurgerWindow from '../BurgerWindow/BurgerWindow'
import s from './Header.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header(props) {
    const navigate = useNavigate()
    const location = useLocation()

    const ChangeBurgerMenu = () => {
        let top = document.getElementById('1')
        let mid = document.getElementById('2')
        let bot = document.getElementById('3')
        if (top.style.transform == '') {
            top.style.transform = 'translateY(7px) rotateZ(-45deg)'
            mid.style.transform = 'rotateZ(45deg)'
            bot.style.transform = 'translateY(-7px) rotateZ(-45deg)'

            props.setBurgerWindow('flex')
        } else {
            top.style.transform = ''
            mid.style.transform = ''
            bot.style.transform = ''
            props.setBurgerWindow('none')

        }
    }

    return (
        <>
            <header className={s.header}>
                <div className={s.header__all}>
                    <div className={s.header__main}>
                        <div className={s.header__section}>
                            <p className={s.header__textName}>micheal-weaver</p>
                        </div>
                        <div className={s.header__section}>
                            <p style={{ borderBottom: location.pathname == '/' ? '2px solid #FEA55F' : '' }} onClick={() => navigate('/')} className={s.header__text}>_hello</p>
                        </div>
                        <div className={s.header__section}>
                            <p style={{ borderBottom: location.pathname == '/About' ? '2px solid #FEA55F' : '' }} onClick={() => navigate('/About')} className={s.header__text}>_about-me</p>
                        </div>
                        <div className={s.header__section}>
                            <p style={{ borderBottom: location.pathname == '/Projects' ? '2px solid #FEA55F' : '' }} onClick={() => navigate('/Projects')} className={s.header__text}>_projects</p>
                        </div>
                    </div>
                    <div className={s.header__lastsection}>
                        <p style={{ borderBottom: location.pathname == '/Contact' ? '2px solid #FEA55F' : '' }} onClick={() => navigate('/Contact')} className={s.header__text}>_contact-me</p>
                    </div>
                    <div onClick={ChangeBurgerMenu} className={s.header__burgerMenu}>
                        <span id='1' className={s.header__burgerMenuTop}></span>
                        <span id='2' className={s.header__burgerMenuMid}></span>
                        <span id='3' className={s.header__burgerMenuBot}></span>
                    </div>
                </div>
            </header>
        </>
    )
}