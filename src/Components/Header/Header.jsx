import s from './Header.module.css'

export default function Header() {
    return (
        <>
            <header className={s.header}>
                <div className={s.header__all}>
                    <div className={s.header__main}>
                        <div className={s.header__section}>
                            <p className={s.header__textName}>micheal-weaver</p>
                        </div>
                        <div className={s.header__section}>
                            <p className={s.header__text}>_hello</p>
                        </div>
                        <div className={s.header__section}>
                            <p className={s.header__text}>_about-me</p>
                        </div>
                        <div className={s.header__section}>
                            <p className={s.header__text}>_projects</p>
                        </div>
                    </div>
                    <div className={s.header__lastsection}>
                        <p className={s.header__text}>_contact-me</p>
                    </div>
                </div>
            </header>
        </>
    )
}