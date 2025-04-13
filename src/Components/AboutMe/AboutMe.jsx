import s from './AboutMe.module.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {data} from '../../Data/data'
import Contacts from '../Contacts/Contacts';
import { useEffect, useState } from 'react';

export default function AboutMe(){

    const text = (`/**
About me
I have 5 years of еxperience in web
development lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in
 
Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat 
nulla pariatur. Excepteur sint occaecat 
officia deserunt mollit anim id est laborum.
/`)

    function Check(){
        let text = document.getElementsByClassName(s.code__stroke_el)
        for(let i = 0; i < text.length; i++){
            const style = window.getComputedStyle(text[i])
            const height = text[i].clientHeight;
            let lines = height / parseFloat(style.lineHeight);

            let div = text[i].parentElement.children[0].children[1]
            div.innerHTML = ''
            for(let n = 0; n < lines; n++){
                let star = document.createElement('p')
                star.classList.add(s.code__stroke_star)
                star.textContent = '* '
                div.appendChild(star)
            }
        }
    }
    useEffect(()=>{
        Check()
        window.addEventListener('resize', ()=> Check());
        
    }, [])

    const openchapter = (el, event) => {
        let chapter = el.currentTarget.parentElement
        chapter.classList.toggle(s.chapter_close)
        chapter.children[1].classList.toggle(s.chapterContent_close)
    }

    return(
        <>
            <Header/>
            <main className={s.main}>
                <div className={s.menu}>
                    <div className={s.menu__section}>
                        <img className={s.menu__section_img} src="/img/professional-info-icon.svg" alt="icon" />
                    </div>
                    <div className={s.menu__section}>
                        <img className={s.menu__section_img} src="/img/personal-info-icon.svg" alt="icon" />
                    </div>
                    <div className={s.menu__section}>
                        <img className={s.menu__section_img} src="/img/hobbies-icon.svg" alt="icon" />
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.infoPersonal}>
                        <div className={s.chapter} onClick={(el)=> openchapter(el, event)}>
                            {data.personal.iconArrow}
                            <h2 className={s.chapter_title}>{data.personal.title}</h2>
                        </div>
                        {data.personal.section.map((el,i)=>{
                            return(
                                <article key={i}>
                                    {data.personal.sectionArrow}
                                    {data.personal.sectionIcon}
                                    <h3>{el.title}</h3>
                                </article>
                            )
                        })}
                    </div>
                    <Contacts/>
                </div>
                <div className={s.second}>
                    <div className={s.code}>
                        <div className={s.codeTabs}>
                        </div>
                        <div className={s.codeWindow}>
                            <pre>
                                {text.split('\n').map((el, i)=>{
                                    return(
                                        <div className={s.code__stroke} key={i}>
                                            <div className={s.code__stroke_ls}>
                                                <p className={s.code__stroke_number}>{i}</p>
                                                <div className={s.code__strokeDiv}>
                                                </div>
                                            </div>
                                            <p className={s.code__stroke_el}>{el}</p>
                                        </div>
                                    )
                                })}
                            </pre>
                        </div>
                    </div>
                    <div className={s.git}>
                        <div className={s.gitTabs}>

                        </div>
                        <div className={s.gitWindow}>
                            <h3 className={s.git__title}>// Code snippet showcase:</h3>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}