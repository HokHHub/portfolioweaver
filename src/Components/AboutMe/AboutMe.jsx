import s from './AboutMe.module.css';
import {data} from '../../Data/data'
import { useEffect, useState, useRef } from 'react';
import Gist from 'react-gist'
import FolderContacts from '../FolderContacts/FolderContacts';
import Snippet from '../Snippet/Snippet';

export default function AboutMe(){
    const url = 'https://gist.github.com/e56a4581410c807c9b96431c860b0625.js';

    // const gistId = 'e56a4581410c807c9b96431c860b0625';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.github.com/gists/e56a4581410c807c9b96431c860b0625`;
    const user = 'Timur1607'

    const [gitData, setGitData] = useState([])// массив с сниппетами
    const [check, setCheck] = useState(false)

    const windowEl = useRef(null);
    const tabEl = useRef(null);
    const codeEl = useRef(null);
    const gitEl = useRef(null);
    
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

    useEffect(()=>{
        async function UserGist() {
            const response = await fetch(`https://api.github.com/users/${user}/gists`, {
                headers: {
                    'Authorization': 'token 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',
                    'accept': 'application/vnd.github+json',
                    'User-Agent': 'My-App-test'
                }
            });
            const tdata = await response.json();
            setGitData(tdata)
            setCheck(!check)
        }
        UserGist()
    }, [])
    

    const openchapter = (el) => {
        let chapter = el.parentElement
        chapter.classList.toggle(s.chapter_close)
        chapter.children[1].classList.toggle(s.chapterContent_close)
        chapter.children[0].children[0].classList.toggle(s.chapter_open)
    }

    const openfolder = (el) => {
        let folder = el.currentTarget.parentElement
        let arrow = folder.children[0].children[0].children[0]
        let folderChild = folder.children[1]
        if(folder.children[1].children[0] === undefined){
            arrow.classList.toggle(s.folder__open)
        } else if(folder.children[1].children[0] !== undefined){
            arrow.classList.toggle(s.folder__open)
            folderChild.classList.toggle(s.folder__child_close)
        }
    }
    const openContent = (el) =>{
        let name = el.currentTarget.textContent
        let windows = windowEl.current.children
        // console.log(codeEl.current.style.display);
        tabEl.current.children[0].textContent = name
        if(codeEl.current.style.display === 'none'){
            codeEl.current.style.display = 'block'
            gitEl.current.style.width = '50%'
        }
        
        for(let element of windows){
            if(element.getAttribute('id') === name){
                element.classList.remove(s.closeWindow)
                element.classList.add(s.showWindow)
            } else if(element.getAttribute('id') !== name){
                element.classList.remove(s.showWindow)
                element.classList.add(s.closeWindow)
            }
        }
    }
    const closeWindow = (el) => {
        // let tabs = tabEl.current.children[0]
        let section = codeEl.current
        let snippet = section.parentElement.children[1]
        // console.log(codeEl.current, section);
        
        section.style.display = 'none'
        snippet.style.width = '100%'
    }
    useEffect(()=>{
        let title = document.getElementsByClassName(s.chapter)
        if(window.innerWidth <= 945){
            for(let i = 0; i < title.length; i++){
                openchapter(title[i])
            }
        }
    }, [])

    return(
        <>
            <main className={s.main}>
                <p className={s.title__amedia}>_about-me</p>
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
                        <div className={s.chapter} onClick={(el)=> openchapter(el.currentTarget)}>
                            <svg className={s.chapter_arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white"/>
                            </svg>
                            <h2 className={`${s.chapter_title} ${s.titles}`}>{data.personal.title}</h2>
                        </div>
                        <div className={s.folders}>
                            {data.personal.section.map((el,i)=>{
                                return(
                                    <article key={i} className={s.folder}>
                                        <div className={`${s.folder__content} ${el.content.length !== 0 ? s.folder__content_wC : ''}`} onClick={(el)=> openfolder(el)}>
                                            <div className={s.folder__content_arrow}>
                                                <svg className={`${s.folder__arrow} ${i === 2 ? s.folder__open : ''}`} xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                                    <path d="M5.69658 7.18971L0.746582 2.23971L2.16058 0.82571L8.52458 7.18971L2.16058 13.5537L0.746582 12.1397L5.69658 7.18971Z" fill="#607B96"/>
                                                </svg>
                                            </div>
                                            <svg className={s.folder__icon} xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                <path d="M15.0802 4.30056V12.9672C15.0802 13.1588 15.0041 13.3425 14.8687 13.4779C14.7332 13.6134 14.5495 13.6895 14.358 13.6895H1.35796C1.16642 13.6895 0.982719 13.6134 0.847276 13.4779C0.711833 13.3425 0.635742 13.1588 0.635742 12.9672V3.57834H14.358C14.5495 3.57834 14.7332 3.65443 14.8687 3.78988C15.0041 3.92532 15.0802 4.10902 15.0802 4.30056ZM8.15696 2.1339H0.635742V1.41168C0.635742 1.22013 0.711833 1.03643 0.847276 0.900987C0.982719 0.765544 1.16642 0.689453 1.35796 0.689453H6.71252L8.15696 2.1339Z" fill={el.iconColor}/>
                                            </svg>
                                            <h3 className={s.folder__text} onClick={(el)=> openContent(el)}>{el.title}</h3>
                                        </div>
                                        <div className={s.folder__child}>
                                            { el.content.length !== 0 ? 
                                            el.content.map((el, i)=> {
                                                return(
                                                    <article className={s.folder__child__content} key={i} >
                                                        <svg className={s.folder__child__content_icon} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path d="M1.44684 0.844727H16.0466C16.2617 0.844727 16.468 0.930181 16.6201 1.08229C16.7722 1.2344 16.8577 1.44071 16.8577 1.65582V14.6334C16.8577 14.8485 16.7722 15.0548 16.6201 15.2069C16.468 15.359 16.2617 15.4445 16.0466 15.4445H1.44684C1.23172 15.4445 1.02542 15.359 0.873307 15.2069C0.721197 15.0548 0.635742 14.8485 0.635742 14.6334V1.65582C0.635742 1.44071 0.721197 1.2344 0.873307 1.08229C1.02542 0.930181 1.23172 0.844727 1.44684 0.844727ZM4.69122 10.9834V7.73904L6.31342 9.36124L7.93561 7.73904V10.9834H9.5578V5.30576H7.93561L6.31342 6.92795L4.69122 5.30576H3.06903V10.9834H4.69122ZM13.6133 8.55014V5.30576H11.9911V8.55014H10.3689L12.8022 10.9834L15.2355 8.55014H13.6133Z" fill="#81A1C1"/>
                                                        </svg>
                                                        <h4 className={s.folder__child__content_title} onClick={(el)=> openContent(el)}>{el.title}</h4>
                                                    </article>
                                                )
                                            }) : ''}
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                    <FolderContacts/>
                </div>
                <div className={s.second_amedia}>
                    <div className={s.second_amedia__firstPage}>
                        <p className={s.second_amedia__firstPage_title}>// personal-info / bio</p>
                        <p className={s.second_amedia__firstPage_content}>I have 5 years of experience in web development lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className={s.second_amedia__firstPage}>
                        <p className={s.second_amedia__firstPage_title}>// Code snippet showcase:</p>
                        <div className={s.snippet__articles}>
                                {gitData.length !== 0 ? 
                                    (gitData.message !== undefined ? <></>:
                                        gitData.map((el, i)=>{
                                            return(
                                                <Snippet check={gitData} key={i} id={el.id} />
                                            )
                                        })
                                    ): <></>}
                        </div>
                    </div>
                </div>
                <div className={s.second}>
                    <div className={s.code} ref={codeEl}>
                        <div className={s.codeTabs}>
                            <div className={s.codeTabs__tabs} ref={tabEl}>
                                <p className={`${s.codeTabs__tabs_text} ${s.titles}`}>bio</p>
                                <svg onClick={(el)=> closeWindow(el)} className={s.codeTabs__tabs_img} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <g clipPath="url(#clip0_64_2737)">
                                    <path d="M9.34722 8.71879L13.0597 5.00629L14.1202 6.06679L10.4077 9.77929L14.1202 13.4918L13.0597 14.5523L9.34722 10.8398L5.63472 14.5523L4.57422 13.4918L8.28672 9.77929L4.57422 6.06679L5.63472 5.00629L9.34722 8.71879Z" fill="#607B96"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_64_2737">
                                    <rect width="18" height="18" fill="white" transform="translate(0.347656 0.779297)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className={s.codeWindow} ref={windowEl}>
                            {data.personal.section.map((el, i)=>{
                                if(el.title !== 'bio'){
                                    return(
                                        <div className={`${el.title} ${s.windows}`} id={el.title} key={el.title}>
    
                                        </div>
                                    )
                                }
                                
                            })}
                            {data.personal.section.map((el, i)=>{
                                return(
                                    el.content.length !== 0 ? el.content.map((element)=>{
                                        return(
                                            <div className={`${element.title} ${s.windows}`} id={element.title} key={element.title}>
                                        
                                            </div>
                                        )
                                    }): ''
                                    
                                )
                            })}
                            <pre className={`${s.codeWindow__pre} ${s.bio}`} id={'bio'}>
                                {text.split('\n').map((el, i)=>{
                                    const elementRef = useRef(null)
                                    const divRef = useRef(null)
                                    if(elementRef.current){
                                        const height = elementRef.current.offsetHeight

                                        const style = window.getComputedStyle(elementRef.current)
                                        const lineHeight = parseFloat(style.lineHeight)

                                        const lines = height / lineHeight
                                        divRef.current.innerHTML = ''
                                        for(let i = 0; i < lines; i++){
                                            let star = document.createElement('p')
                                            star.classList.add(s.code__stroke_star)
                                            star.textContent = '* '
                                            divRef.current.appendChild(star)
                                        }
                                    }
                                    return(
                                        <div className={s.code__stroke} key={i}>
                                            <div className={s.code__stroke_ls}>
                                                <p className={s.code__stroke_number}>{i}</p>
                                                <div ref={divRef} className={s.code__strokeDiv}>
                                                    <p className={s.code__stroke_star}>* </p>
                                                </div>
                                            </div>
                                            <p ref={elementRef} className={s.code__stroke_el}>{el}</p>
                                        </div>
                                    )
                                })}
                            </pre>
                        </div>
                    </div>
                    <div className={s.git} ref={gitEl}>
                        <div className={s.gitTabs}>

                        </div>
                        <div className={s.gitWindow}>
                            <p className={s.gitWindow__title}>// Code snippet showcase:</p>
                            <div className={s.snippet__articles}>
                                {gitData.length !== 0 ? 
                                    (gitData.message !== undefined ? <></>:
                                        gitData.map((el, i)=>{
                                            return(
                                                <Snippet check={gitData} key={i} id={el.id} />
                                            )
                                        })
                                    ): <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}