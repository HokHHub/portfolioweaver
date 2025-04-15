import s from '../AboutMe/AboutMe.module.css'
import {data} from '../../Data/data'
export default function Contacts(){
    
    return(
        <>
            <div className={s.infoContacts}>
                <div className={s.chapter}>
                    <svg className={s.chapter_arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white"/>
                    </svg>
                    <h2 className={s.chapter_title}>{data.contacts.title}</h2>
                </div>
                <div className={s.folders}>
                    {data.contacts.section.map((el, i)=> {
                        return(
                            <article className={s.folder__contacts} key={i}>
                                <svg className={s.folder__contacts_icon} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                                    {el.icon}
                                </svg>
                                <p className={s.folder__text}>{el.contact}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </>
    )
}