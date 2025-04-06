import s from './Footer.module.css'
export default function Footer(){
    return(
        <>
            <footer className={s.footer}>
                <div className={s.footerLinks}>
                    <p className={s.footerLinks__text}>find me in:</p>
                    <div className={s.footerLinks__media}>
                        <img className={s.footerLinks__media_img} src="../../../public/img/facebook.svg" alt="icon" />
                    </div>
                    <div className={s.footerLinks__media}>
                        <img className={s.footerLinks__media_img} src="../../../public/img/twitter.svg" alt="icon" />
                    </div>
                </div>
                <div className={s.footerGit}>
                    <p className={s.footerGit__text}>@username</p>
                    <img className={s.footerGit__img} src="../../../public/img/Git.svg" alt="icon" />
                </div>
            </footer>
        </>
    )
}