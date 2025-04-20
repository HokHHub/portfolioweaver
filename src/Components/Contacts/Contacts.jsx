import s from './Contacts.module.css'
import { data } from '../../Data/data'

export default function Contacts() {
    function interactFolder(el) {
        if (el.currentTarget.parentElement.parentElement.children[1].style.display == '' || el.currentTarget.parentElement.parentElement.children[1].style.display == 'flex') {
            el.currentTarget.parentElement.parentElement.children[1].style.display = 'none'
            el.currentTarget.style.transform = 'rotateZ(-90deg)'
        } else {
            el.currentTarget.parentElement.parentElement.children[1].style.display = 'flex'
            el.currentTarget.style.transform = 'rotateZ(0deg)'
        }
    }

    function changeForm(index, el) {
        let formEl = document.getElementsByClassName(s.orangeCodeEdit)[index]
        formEl.innerHTML = `"${el.currentTarget.value}",`
    }

    return (
        <>
            <section className={s.contacts}>
                <div className={s.infoContacts}>
                    <div className={s.contacts__section}>
                        {/* contacts */}
                        <div className={s.chapter}>
                            <svg onClick={(el) => interactFolder(el)} className={s.chapter__arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white" />
                            </svg>
                            <h2 className={s.chapter__title}>{data.contacts.title}</h2>
                        </div>
                        <div className={s.folders}>
                            {data.contacts.section.map((el, i) => {
                                return (
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

                    <div className={s.contacts__section}>
                        {/* find me */}
                        <div className={s.chapter}>
                            <svg onClick={(el) => interactFolder(el)} className={s.chapter__arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white" />
                            </svg>
                            <h2 className={s.chapter__title}>{data.findMeAlsoIn.title}</h2>
                        </div>
                        <div className={s.folders}>
                            {data.findMeAlsoIn.section.map((el, i) => {
                                return (
                                    <article className={s.folder__contacts} key={i}>
                                        <svg className={s.folder__contacts_icon} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                                            {el.icon}
                                        </svg>
                                        <p className={s.folder__text}>{el.link}</p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={s.contacts__all}>
                    <div className={s.contacts__windows}>
                        <div className={s.contacts__window}>
                            <p className={s.contacts__windowText}>contacts</p>
                            <svg className={s.contacts__windowClose} xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                <path d="M5.00005 4.65244L8.71255 0.939941L9.77305 2.00044L6.06055 5.71294L9.77305 9.42544L8.71255 10.4859L5.00005 6.77344L1.28755 10.4859L0.227051 9.42544L3.93955 5.71294L0.227051 2.00044L1.28755 0.939941L5.00005 4.65244Z" fill="#607B96" />
                            </svg>
                        </div>
                    </div>
                    <div className={s.contacts__main}>
                        <div className={s.contacts__mainBlocks}>
                            <form className={s.form}>
                                <div className={s.form__block}>
                                    <label className={s.form__label} htmlFor="name">_name:</label>
                                    <input onChange={(el) => {changeForm(0, el)}} className={s.form__standartInput} type="text" name="name" id="name" />
                                </div>
                                <div className={s.form__block}>
                                    <label className={s.form__label} htmlFor="email">_email:</label>
                                    <input onChange={(el) => {changeForm(1, el)}} className={s.form__standartInput} type="text" name="email" id="email" />
                                </div>
                                <div className={s.form__block}>
                                    <label className={s.form__label} htmlFor="message">_message:</label>
                                    <textarea onChange={(el) => {changeForm(2, el)}} rows={7} className={s.form__bigInput} name="message" id="message" />
                                </div>
                            </form>
                            <hr className={s.contacts__hr} />
                            <div className={s.contacts__codeBlock}>
                                <ol className={s.contacts__codeText}>
                                    <li><span className={s.pinkCode}>const</span> button <span className={s.pinkCode}>=</span> document<span className={s.grayCode}>.</span>querySelector<span className={s.grayCode}>(</span><span className={s.orangeCode}>'#sendBtn'</span><span className={s.grayCode}>);</span><br /></li>
                                    <li></li>
                                    <li><span className={s.pinkCode}>const</span> message <span className={s.pinkCode}>=</span> <span className={s.grayCode}>{'{'}</span><br /></li>
                                    <li>&nbsp;&nbsp;name: <span className={s.orangeCodeEdit}>""<span className={s.grayCode}>,</span></span><br /></li>
                                    <li>&nbsp;&nbsp;email: <span className={s.orangeCodeEdit}>""<span className={s.grayCode}>,</span></span><br /></li>
                                    <li>&nbsp;&nbsp;message: <span className={s.orangeCodeEdit}>""<span className={s.grayCode}>,</span></span><br /></li>
                                    <li><span className={s.grayCode}>&nbsp;&nbsp;date:</span> <span className={s.orangeCode}>""</span><br /></li>
                                    <li><span className={s.grayCode}>{'}'}</span><br /></li>
                                    <li></li>
                                    <li>button<span className={s.grayCode}>.</span>addEventListener<span className={s.grayCode}>{'('}</span><span className={s.orangeCode}>'click'</span> <span className={s.grayCode}>{'()'} <span className={s.pinkCode}>{'=>'}</span> {'{'}</span><br /></li>
                                    <li><span className={s.pinkCode}>&nbsp;&nbsp;form</span><span className={s.grayCode}>.</span>send<span className={s.grayCode}>(</span>message<span className={s.grayCode}>);</span><br /></li>
                                    <li><span className={s.grayCode}>{'});'}</span></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
