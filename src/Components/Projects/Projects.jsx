import s from './Projects.module.css'
import { data } from '../../Data/data'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
let randIMGS = []

function interactFolder(el) {
    if (el.currentTarget.parentElement.parentElement.children[1].style.display == '' || el.currentTarget.parentElement.parentElement.children[1].style.display == 'flex') {
        el.currentTarget.parentElement.parentElement.children[1].style.display = 'none'
        el.currentTarget.style.transform = 'rotateZ(-90deg)'
    } else {
        el.currentTarget.parentElement.parentElement.children[1].style.display = 'flex'
        el.currentTarget.style.transform = 'rotateZ(0deg)'
    }
}

async function checkFileInRepo(repoName) {
    const baseURL = `https://api.github.com/repos/HokHHub/${repoName}/contents`;
    const filePath = 'src/App.jsx';

    try {
        const response = await fetch(`${baseURL}/${filePath}`, {
            headers: {
                Authorization: `token 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`,
            },
        });

        if (response.ok) {
            return true;
        } else if (response.status === 404) {
            return false;
        } else {
            console.error(`Неожиданный статус ${response.status} для репозитория: ${repoName}`);
            return false;
        }
    } catch (error) {
        console.error(`Ошибка при запросе для репозитория ${repoName}: ${error.message}`);
        return false;
    }
}

export default function Projects() {
    const [filter, setFilter] = useState([false, false, false, false]);
    const [projects, setProjects] = useState([]);
    const [repoStatuses, setRepoStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    let [randImages, setRandImages] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/HokHHub/repos', {
                    headers: {
                        Authorization: `token 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`,
                    },
                });
                const repos = await response.json();
                setProjects(repos);

                const statuses = {};
                for (const repo of repos) {
                    const isReact = await checkFileInRepo(repo.name);
                    statuses[repo.name] = isReact;
                }
                setRepoStatuses(statuses);
                const randomImages = repos.map(() => Math.floor(Math.random() * 6)); // 12/2=6
                setRandImages(randomImages);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке проектов:', error);
            }
        };

        fetchProjects();
    }, []);

    const updateFilterByIndex = (index, status) => {
        let newArray = [...filter]
        console.log(filter, newArray, status, index);
        newArray[index] = status
        setFilter(newArray)

        let textInHeader = []
        let header = document.getElementsByClassName(s.projects__windowText)[0]
        let headerMobile = document.getElementsByClassName(s.mobileHeaderTextSpan)[0]
        if (newArray[0]) {
            textInHeader.push('React')
        }
        if (newArray[1]) {
            textInHeader.push('HTML')
        }
        if (newArray[2]) {
            textInHeader.push('CSS')
        }
        if (newArray[3]) {
            textInHeader.push('JS')
        }
        if (!newArray[0] && !newArray[1] && !newArray[2] && !newArray[3]) {
            textInHeader = ['projects']
        }
        if (textInHeader.length > 2) {
            let plusNumb = textInHeader.length - 2
            textInHeader = textInHeader.slice(0, 2)
            textInHeader = textInHeader.join('; ')
            textInHeader = textInHeader.split('')
            textInHeader.push(`+${plusNumb}`)

            textInHeader = textInHeader.join('')
            header.innerText = textInHeader
            headerMobile.innerText = textInHeader
        } else {
            textInHeader = textInHeader.join('; ')
            header.innerText = textInHeader
            headerMobile.innerText = textInHeader
        }
    }

    const filteredProjects = projects.filter((repo) => {
        if (filter[0] == false) return true;
        if (filter[0] == true) return repoStatuses[repo.name];
        return !repoStatuses[repo.name];
    });

    return (
        <>
            <section className={s.projects}>
                <p className={s.mobileTitle}>_projects</p>
                <div className={s.infoProjects}>
                    <div className={s.projects__section}>
                        <div className={s.chapter}>
                            <svg onClick={(el) => interactFolder(el)} className={s.chapter__arrow} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z" fill="white" />
                            </svg>
                            <h2 className={s.chapter__title}>{data.projects.title}</h2>
                        </div>
                        <div className={s.folders} style={{ paddingBottom: '27px' }}>
                            {data.projects.section.map((el, i) => {
                                return (
                                    <article className={s.folder__projects} key={i}>
                                        <input onClick={() => !filter[i] ? updateFilterByIndex(i, true) : updateFilterByIndex(i, false)} name={i} id={i} className={s.folder__checkbox} type="checkbox" />
                                        <img className={s.folder__projects_icon} src={el.icon} alt="" />
                                        <label onClick={() => !filter[i] ? updateFilterByIndex(i, true) : updateFilterByIndex(i, false)} htmlFor={i} className={s.folder__text}>{el.filter}</label>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={s.projects__all}>
                    <div className={s.projects__windows}>
                        <div className={s.projects__window}>
                            <p className={s.projects__windowText}>projects</p>
                            <svg onClick={(el) => navigate('/')} className={s.projects__windowClose} xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                <path d="M5.00005 4.65244L8.71255 0.939941L9.77305 2.00044L6.06055 5.71294L9.77305 9.42544L8.71255 10.4859L5.00005 6.77344L1.28755 10.4859L0.227051 9.42544L3.93955 5.71294L0.227051 2.00044L1.28755 0.939941L5.00005 4.65244Z" fill="#607B96" />
                            </svg>
                        </div>
                    </div>

                    <div className={s.projects__cards}>
                        {loading ? (
                            <h1>Loading...</h1>
                        ) : (
                            filteredProjects.map((repo, i) => (
                                <div key={i} className={s.allCard}>
                                    {i == 0 && <p className={s.mobileHeaderText}>// projects / <span className={s.mobileHeaderTextSpan}>all</span></p>}
                                    <p className={s.card__title}><span className={s.card__titleSPAN}>Project {i}</span> // {repo.name}</p>
                                    <article className={s.card}>
                                        {console.log(randImages)}
                                        <img className={s.card__img} src={`/img/rand${randImages[i]}.jpg`} alt="" />
                                        <div className={s.card__container}>
                                            <p className={s.card__text}>Duis aute irure dolor in velit esse cillum dolore.</p>
                                            <button className={s.card__button}>
                                                <a target="_blank" href={repo.html_url}>view-project</a>
                                            </button>
                                            {repoStatuses[repo.name] ? (
                                                <svg className={s.reactLogoCard} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                    <g clipPath="url(#clip0_5920_49)">
                                                        <path d="M10.6523 11.9733C10.3134 11.9733 9.98844 11.8387 9.74885 11.5991C9.50925 11.3595 9.37464 11.0345 9.37464 10.6957C9.37464 10.3568 9.50925 10.0318 9.74885 9.79225C9.98844 9.55265 10.3134 9.41804 10.6523 9.41804C10.9911 9.41804 11.3161 9.55265 11.5557 9.79225C11.7953 10.0318 11.9299 10.3568 11.9299 10.6957C11.9299 11.0345 11.7953 11.3595 11.5557 11.5991C11.3161 11.8387 10.9911 11.9733 10.6523 11.9733ZM10.2025 14.5234C10.3516 14.7022 10.5015 14.876 10.6523 15.0421C10.803 14.876 10.9529 14.7031 11.102 14.5234C10.8022 14.5297 10.5023 14.5297 10.2025 14.5234ZM8.50331 14.4169C7.84923 14.3488 7.19947 14.2442 6.55709 14.1035C6.49321 14.4016 6.44466 14.6912 6.41229 14.9688C6.25046 16.3171 6.47617 17.1365 6.81942 17.3341C7.16267 17.5326 7.9846 17.3179 9.07228 16.5045C9.29628 16.3367 9.52199 16.1502 9.74856 15.9466C9.30523 15.4604 8.88949 14.9497 8.50331 14.4169ZM14.7474 14.1035C14.1367 14.2397 13.4843 14.3454 12.8012 14.4169C12.415 14.9497 11.9993 15.4604 11.5559 15.9466C11.7825 16.151 12.0082 16.3367 12.2322 16.5045C13.3199 17.3179 14.1418 17.5326 14.4851 17.3341C14.8283 17.1365 15.0532 16.3171 14.8931 14.9688C14.8579 14.6783 14.8096 14.3896 14.7483 14.1035H14.7474ZM15.9824 13.7738C16.4739 16.0216 16.2158 17.8111 15.1239 18.4414C14.032 19.0717 12.3532 18.4005 10.6523 16.8512C8.95133 18.4005 7.27255 19.0708 6.18062 18.4405C5.08869 17.8102 4.83061 16.0216 5.32121 13.773C3.12883 13.0754 1.70898 11.9562 1.70898 10.6957C1.70898 9.43508 3.12883 8.31674 5.32121 7.61746C4.83061 5.36972 5.08869 3.58022 6.18062 2.94993C7.27255 2.31964 8.95133 2.99081 10.6523 4.54013C12.3532 2.99081 14.032 2.32049 15.1239 2.95078C16.2158 3.58107 16.4739 5.36972 15.9833 7.61832C18.1757 8.31589 19.5955 9.43508 19.5955 10.6957C19.5955 11.9562 18.1757 13.0746 15.9833 13.7738H15.9824ZM9.74771 5.44468C9.5311 5.24861 9.30573 5.06246 9.07228 4.88679C7.9846 4.07337 7.16267 3.85874 6.81942 4.05719C6.47617 4.25479 6.25131 5.07417 6.41144 6.42247C6.44551 6.70099 6.49321 6.98973 6.55624 7.28784C7.1989 7.14708 7.84894 7.04243 8.50331 6.9744C8.90789 6.41821 9.32524 5.90632 9.74856 5.44468H9.74771ZM12.8012 6.9744C13.4843 7.04595 14.1367 7.15241 14.7474 7.28784C14.8113 6.98973 14.8598 6.70014 14.8922 6.42247C15.054 5.07417 14.8283 4.25479 14.4851 4.05719C14.1418 3.85874 13.3199 4.07337 12.2322 4.88679C11.9985 5.06244 11.7728 5.24859 11.5559 5.44468C11.9793 5.90632 12.3966 6.41821 12.8012 6.9744ZM11.102 6.86793C10.9529 6.68907 10.803 6.51531 10.6523 6.34922C10.5015 6.51531 10.3516 6.68822 10.2025 6.86793C10.5023 6.86157 10.8022 6.86157 11.102 6.86793ZM7.56214 12.9988C7.40675 12.7425 7.25681 12.4829 7.11242 12.2203C7.03151 12.4392 6.95655 12.6547 6.88841 12.8684C7.10731 12.9161 7.33217 12.9596 7.56129 12.9988H7.56214ZM9.2077 13.1981C10.1694 13.2695 11.1351 13.2695 12.0968 13.1981C12.6395 12.4008 13.1224 11.5644 13.5414 10.6957C13.1224 9.82694 12.6395 8.99051 12.0968 8.19324C11.1351 8.12181 10.1694 8.12181 9.2077 8.19324C8.66497 8.99051 8.18213 9.82694 7.76315 10.6957C8.18213 11.5644 8.66497 12.4008 9.2077 13.1981ZM14.1921 9.17104C14.273 8.95214 14.348 8.73665 14.4161 8.52286C14.1928 8.47441 13.9685 8.43096 13.7432 8.39255C13.8983 8.64884 14.048 8.9084 14.1921 9.17104ZM5.65254 8.85334C5.36295 8.94703 5.08869 9.04924 4.83146 9.15996C3.58366 9.69486 2.98659 10.2996 2.98659 10.6957C2.98659 11.0917 3.58281 11.6964 4.83146 12.2313C5.08869 12.3421 5.36295 12.4443 5.65254 12.538C5.84163 11.9417 6.07585 11.3234 6.35523 10.6957C6.08678 10.0952 5.85218 9.48008 5.65254 8.85334ZM6.88756 8.52286C6.95655 8.7358 7.03151 8.95214 7.11242 9.17019C7.25682 8.90782 7.40676 8.64855 7.56214 8.39255C7.33217 8.43173 7.10731 8.47517 6.88841 8.52286H6.88756ZM15.652 12.538C15.9416 12.4443 16.2158 12.3421 16.473 12.2313C17.7208 11.6964 18.3179 11.0917 18.3179 10.6957C18.3179 10.2996 17.7217 9.69486 16.473 9.15996C16.2041 9.04541 15.9302 8.94309 15.652 8.85334C15.4629 9.44956 15.2287 10.0679 14.9493 10.6957C15.2287 11.3234 15.4629 11.9409 15.652 12.538ZM14.4169 12.8684C14.348 12.6555 14.273 12.4392 14.1921 12.2211C14.0477 12.4835 13.8977 12.7428 13.7424 12.9988C13.9723 12.9596 14.1972 12.9161 14.4161 12.8684H14.4169Z" fill="#011221" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5920_49">
                                                            <rect width="20.4418" height="20.4418" fill="white" transform="translate(0.431641 0.474854)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            ) : (
                                                <>
                                                    <svg className={s.jslogo} xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                                        <g clipPath="url(#clip0_5930_969)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.334351 0.549011L1.6181 15.771L8.05787 17.5269L14.3082 15.771L15.6657 0.579601L0.334351 0.549011ZM5.7127 3.66776H7.38183V15.2437L2.86898 14.1041V11.2851L4.41448 11.525V12.7846L5.7127 13.0245V3.66776ZM13.2547 3.66776H8.63393V10.4274L11.4945 10.0255L11.3383 12.4847L8.63393 13.3844V15.2437L12.6365 14.344L12.9456 8.40406H10.3979V5.46113H12.9456L13.2547 3.66776Z" fill="#607B96" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_5930_969">
                                                                <rect width="15.3313" height="17.0348" fill="white" transform="translate(0.334351 0.520401)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg className={s.csslogo} xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                        <g clipPath="url(#clip0_33_251)">
                                                            <path d="M5.03781 2.58934L4.48418 5.43415H16.0593L15.6846 7.27391H4.11793L3.55578 10.1102H15.1309L14.4836 13.3553L9.81607 14.897L5.7703 13.3553L6.05138 11.9585H3.20657L2.53369 15.3654L9.21985 17.9207L16.9281 15.3654L17.9502 10.2294L18.1546 9.19884L19.4663 2.58934H5.03781Z" fill="#011221" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_33_251">
                                                                <rect width="20.4418" height="20.4418" fill="white" transform="translate(0.779114 0.0341187)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                    </article>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section >
        </>
    )
}