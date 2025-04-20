import s from './AboutMe.module.css';
import st from './Snippet.module.css'
import {data} from '../../Data/data'
import Contacts from '../Contacts/Contacts';
import { useEffect, useState, useRef } from 'react';
import Gist from 'react-gist'

export default function AboutMe(){
    const url = 'https://gist.github.com/e56a4581410c807c9b96431c860b0625.js';

    const gistId = 'e56a4581410c807c9b96431c860b0625';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.github.com/gists/e56a4581410c807c9b96431c860b0625`;
    const user = 'Timur1607'

    const [gitData, setGitData] = useState([])
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

    // function Check(){
    //     let text = document.getElementsByClassName(s.code__stroke_el)
    //     for(let i = 0; i < text.length; i++){
    //         const style = window.getComputedStyle(text[i])
    //         const height = text[i].clientHeight;
    //         // console.log(text.clientHeight);
            
            
    //         let lines = height / parseFloat(style.lineHeight);

    //         let div = text[i].parentElement.children[0].children[1]
    //         // div.innerHTML = ''
    //         // for(let n = 0; n < lines; n++){
    //         //     let star = document.createElement('p')
    //         //     star.classList.add(s.code__stroke_star)
    //         //     star.textContent = '* '
    //         //     div.appendChild(star)
    //         // }
    //     }
    // }
    useEffect(()=>{
        // Check()
        // window.addEventListener('resize', ()=> Check());

        // async function fetchGist(){
        //     const response = await fetch(proxyUrl + apiUrl, {
        //       headers: {
        //         'User-Agent': 'My-App-test'
        //     }});
        //     const tdata = await response.json();
        //     // setGitData(tdata)
        //     // console.log(gitData);
        //     console.log(tdata);
        //     // setCode(data.files.gistfile1.content)
        // }
        // fetchGist()

        async function UserGist() {
            const response = await fetch(`https://api.github.com/users/${user}/gists`, {
                headers: {
                    'accept': 'application/vnd.github+json',
                    'User-Agent': 'My-App-test'
                }
            });
            const tdata = await response.json();
            setGitData(tdata)
            console.log(tdata);
            
        }
        UserGist()
    }, [])

    const openchapter = (el) => {
        let chapter = el.currentTarget.parentElement
        chapter.classList.toggle(s.chapter_close)
        chapter.children[1].classList.toggle(s.chapterContent_close)
        chapter.children[0].children[0].classList.toggle(s.chapter_open)
    }

    const openfolder = (el) => {
        let folder = el.currentTarget.parentElement
        let arrow = folder.children[0].children[0].children[0]
        let folderChild = folder.children[1]
        if(folder.children[1].children[0] === undefined){
            console.log('нет элементов');
        } else if(folder.children[1].children[0] !== undefined){
            console.log(folder);
            arrow.classList.toggle(s.folder__open)
            folderChild.classList.toggle(s.folder__child_close)
        }
    }

    return(
        <>
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
                        <div className={s.chapter} onClick={(el)=> openchapter(el)}>
                            <svg className={s.chapter_arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white"/>
                            </svg>
                            <h2 className={s.chapter_title}>{data.personal.title}</h2>
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
                                            <h3 className={s.folder__text}>{el.title}</h3>
                                        </div>
                                        <div className={s.folder__child}>
                                            { el.content.length !== 0 ? 
                                            el.content.map((el, i)=> {
                                                return(
                                                    <article className={s.folder__child__content} key={i}>
                                                        <svg className={s.folder__child__content_icon} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path d="M1.44684 0.844727H16.0466C16.2617 0.844727 16.468 0.930181 16.6201 1.08229C16.7722 1.2344 16.8577 1.44071 16.8577 1.65582V14.6334C16.8577 14.8485 16.7722 15.0548 16.6201 15.2069C16.468 15.359 16.2617 15.4445 16.0466 15.4445H1.44684C1.23172 15.4445 1.02542 15.359 0.873307 15.2069C0.721197 15.0548 0.635742 14.8485 0.635742 14.6334V1.65582C0.635742 1.44071 0.721197 1.2344 0.873307 1.08229C1.02542 0.930181 1.23172 0.844727 1.44684 0.844727ZM4.69122 10.9834V7.73904L6.31342 9.36124L7.93561 7.73904V10.9834H9.5578V5.30576H7.93561L6.31342 6.92795L4.69122 5.30576H3.06903V10.9834H4.69122ZM13.6133 8.55014V5.30576H11.9911V8.55014H10.3689L12.8022 10.9834L15.2355 8.55014H13.6133Z" fill="#81A1C1"/>
                                                        </svg>
                                                        <h4 className={s.folder__child__content_title}>{el.title}</h4>
                                                    </article>
                                                )
                                            }) : ''}
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
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
                                    const elementRef = useRef(null)
                                    const divRef = useRef(null)
                                    if(elementRef.current){
                                        const height = elementRef.current.offsetHeight
                                        const lines = height / 18
                                        console.log(elementRef.current.style.lineHeight);
                                        
                                        for(let i = 0; i < Math.floor(lines)-1; i++){
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
                    <div className={s.git}>
                        <div className={s.gitTabs}>

                        </div>
                        <div className={s.gitWindow}>
                            <h3 className={s.git__title}>// Code snippet showcase:</h3>
                            {gitData.length !== 0 ? gitData.map((el, i)=>{
                                return(
                                    <article className={st.snippet} key={i}>
                                        <div className={st.snippet__info}>
                                            <div className={st.snippet__info_profile}>
                                                <div className={st.snippet__info_profile_picture}>
                                                    <img className={st.snippet__info_profile_img} src={el.owner.avatar_url} alt="profile icon" />
                                                </div>
                                                <div className={st.snippet__info_profile_info}>
                                                    <h4 className={st.snippet__info_profile_info_nickName}>{`@${el.owner.login}`}</h4>
                                                    <p className={st.snippet__info_profile_info_data}>{el.created_at}</p>
                                                </div>
                                            </div>
                                            <div className={st.snippet__info_about}>
                                                <div className={st.snippet__info_about_div}>
                                                    {/* <img  src="" alt="details icon" /> */}
                                                    <svg className={st.snippet__info_about_div_img} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <g clipPath="url(#clip0_64_2763)">
                                                            <path d="M4.19676 15.1709C3.49928 14.4753 2.94616 13.6486 2.56917 12.7385C2.19218 11.8284 1.99875 10.8528 2.00001 9.86768C2.00001 5.72543 5.35776 2.36768 9.50001 2.36768C13.6423 2.36768 17 5.72543 17 9.86768C17 14.0099 13.6423 17.3677 9.50001 17.3677H2.00001L4.19676 15.1709ZM6.50001 10.6177C6.50001 11.4133 6.81608 12.1764 7.37869 12.739C7.94129 13.3016 8.70436 13.6177 9.50001 13.6177C10.2957 13.6177 11.0587 13.3016 11.6213 12.739C12.1839 12.1764 12.5 11.4133 12.5 10.6177H6.50001Z" fill="#607B96"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_64_2763">
                                                            <rect width="18" height="18" fill="white" transform="translate(0.5 0.867676)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p className={st.snippet__info_about_div_p}>details</p>
                                                </div>
                                                <div className={st.snippet__info_about_div}>
                                                    <svg className={st.snippet__info_about_div_img} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <g clipPath="url(#clip0_64_2766)">
                                                            <path d="M9.06073 14.5627L3.77098 17.5237L4.95223 11.5777L0.500977 7.46168L6.52123 6.74768L9.06073 1.24268L11.6002 6.74768L17.6205 7.46168L13.1692 11.5777L14.3505 17.5237L9.06073 14.5627Z" fill="#607B96"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_64_2766">
                                                            <rect width="18" height="18" fill="white" transform="translate(0.0605469 0.867676)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    {/* <img  src="" alt="details icon" /> */}
                                                    <p className={st.snippet__info_about_div_p}>stars</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={st.snippet__code}>
                                            <Gist 
                                                id={el.id}
                                                wrapperStyles={{}}
                                            />
                                        </div>
                                    </article>
                                )
                            }): <></>}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}