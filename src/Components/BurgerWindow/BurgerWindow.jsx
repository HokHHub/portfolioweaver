import s from './BurgerWindow.module.css'
import { useNavigate } from 'react-router-dom'

export default function BurgerWindow(props) {
    const navigate = useNavigate()

    return (
        <div style={{ display: props.bWindow }} className={s.burgerWindow}>
            <ul className={s.burgerWindow__list}>
                <li onClick={() => {navigate('/'), props.setBurgerWindow('none')}} className={s.burgerWindow__link}>_hello</li>
                <hr className={s.burgerWindow__hr} />
                <li onClick={() => {navigate('/About'), props.setBurgerWindow('none')}} className={s.burgerWindow__link}>_about-me</li>
                <hr className={s.burgerWindow__hr} />
                <li onClick={() => {navigate('/Projects'), props.setBurgerWindow('none')}} className={s.burgerWindow__link}>_projects</li>
                <hr className={s.burgerWindow__hr} />
                <li onClick={() => {navigate('/Contacts'), props.setBurgerWindow('none')}} className={s.burgerWindow__link}>_contact-me</li>
                <hr className={s.burgerWindow__hr} />
            </ul>
        </div>
    )
}