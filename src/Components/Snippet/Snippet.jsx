import st from './Snippet.module.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
import { useEffect, useState, useRef } from 'react';

export default function Snippet(props){
    const [Content, setContent] = useState([])
    const [snippetDate, setSnippetDate] = useState('')
    const [Comment, setComment] = useState('')
    const commentEl = useRef(null);


    useEffect(()=>{
        async function gistCode() {
            const response = await fetch(`https://api.github.com/gists/${props.id}`,{
                headers: {
                    'Authorization': 'token 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',
                    'accept': 'application/vnd.github+json',
                }
            });
            const tdata = await response.json(); 
            setContent(tdata)
        }
        gistCode()
        // hljs.highlightAll();
    }, [props.check])

    useEffect(()=>{
        async function getComment(link) {
            if(link !== undefined){
                const response = await fetch(`${link}`,{
                    headers: {
                        'Authorization': 'token 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',
                        'accept': 'application/vnd.github+json',
                    }
                });
                const tdata = await response.json(); 
                let comment = tdata[tdata.length-1] !== undefined ? tdata[tdata.length-1].body : ''
                setComment(comment)
            }
        }
        getComment(Content.comments_url)

        if(Content.length !== 0){
            const date = new Date(Content.created_at)
            const now = new Date()
            const past = now - date
            const time = Math.floor(past / 86400000)

            if(time === 1){
                setSnippetDate(`Created ${time} day ago`)
            } else if (time < 31){
                setSnippetDate(`Created ${time} days ago`)
            }else if(time > 31){
                setSnippetDate(`Created ${Math.floor(time / 31)} month ago`)
            } else if(time > 31*2){
                setSnippetDate(`Created ${Math.floor(time / 31)} months ago`)
            }else if(time > 365){
                setSnippetDate(`Created ${Math.floor(time / 365)} year ago`)
            } else if(time > 365*2){
                setSnippetDate(`Created ${Math.floor(time / 365)} years ago`)
            }
        }
    }, [Content])
    const openComment = (el) =>{
        if(commentEl.current !== null){
            commentEl.current.style.display = 'flex'
        }
    }
    const closeComment = (el) => {
        commentEl.current.style.display = 'none'
    }
    return(
        <>
            <article className={st.snippet}>
                <div className={st.snippet__info}>
                    <div className={st.snippet__info_profile}>
                        <div className={st.snippet__info_profile_picture}>
                            <img className={st.snippet__info_profile_img} src={Content.length !== 0 ? Content.owner.avatar_url : '#'} alt="profile icon" />
                        </div>
                        <div className={st.snippet__info_profile_info}>
                            <h4 className={st.snippet__info_profile_info_nickName}>{`@${Content.length !== 0 ? Content.owner.login : 'username'}`}</h4>
                            <p className={st.snippet__info_profile_info_data}>{Content.length !== 0 ? snippetDate : 'create'}</p>
                        </div>
                    </div>
                    <div className={st.snippet__info_about}>
                        <div className={st.snippet__info_about_div} onClick={(el, i)=> openComment(el)}>
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
                        <div className={`${st.snippet__info_about_div} ${st.snippet__info_about_div_amedia}`}>
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
                            <p className={st.snippet__info_about_div_p}>stars</p>
                        </div>
                    </div>
                </div>
                <div className={st.snippet__code}>
                    <pre className={st.snippet__code_parent} >
                        <code className={`language-${javascript}`}>
                            {Content.length !== 0 ?
                                Object.values(Content.files)[0].content.split('\n').map((el, i)=>{
                                    return(
                                        <p key={i} className={st.snippet__code_stroke}>{el}</p>
                                    )
                                }): <></>}
                        </code>
                    </pre>
                </div>
                {
                    Comment !== '' ? <div className={st.snippet__comment} ref={commentEl}>
                    <span className={st.snippet__comment_hr}/>
                    <div className={st.snippet__comment_div}>
                        <p className={st.snippet__comment_div_p}>{Comment}</p>
                        <svg onClick={(el, i)=> closeComment(el)} className={st.snippet__comment_div_img} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clipPath="url(#clip0_64_2740)">
                                <path d="M8.99956 7.93955L12.7121 4.22705L13.7726 5.28755L10.0601 9.00005L13.7726 12.7126L12.7121 13.7731L8.99956 10.0606L5.28706 13.7731L4.22656 12.7126L7.93906 9.00005L4.22656 5.28755L5.28706 4.22705L8.99956 7.93955Z" fill="#607B96"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_64_2740">
                                <rect width="18" height="18" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    </div>: <></>
                }
                
            </article>
        </>
    )
}