import s from '../AboutMe/AboutMe.module.css'
import {data} from '../../Data/data'
export default function Contacts(){
    
    return(
        <>
            <div className={s.infoContacts}>
                <div className={s.chapter}>
                    {data.contacts.iconArrow}
                    <h2 className={`${s.chapter_title}`}>{data.contacts.title}</h2>
                </div>
                <div className={s.infoContacts__main}>
                    {data.contacts.section.map((el, i)=> {
                        return(
                            <article className={s.infoContacts__mainInfo} key={i}>
                                {el.icon}
                                <p className={s.infoContacts__mainInfo_p}>{el.contact}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </>
    )
}