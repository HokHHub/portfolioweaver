import BurgerWindow from '../BurgerWindow/BurgerWindow';
import s from './Hello.module.css'
import React, { useState, useEffect, useRef } from 'react';

const GRID_WIDTH = 21.6;  // ширина (клеток)
const GRID_HEIGHT = 36.8; // высота (клеток)
const CELL_SIZE = 11;
const INITIAL_SPEED = 150;
const INITIAL_FOOD = 20;
const INITIAL_SNAKE_LENGTH = 18;


export default function Hello(props) {
    const generateInitialSnake = () => {
        const snake = [];
        const startX = 8;
        const startY = 12;

        for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
            if (i == 7) {
                snake.push({ x: startX + 1, y: startY + i - 1 });
            } else if (i == 8) {
                snake.push({ x: startX + 2, y: startY + i - 2 });
            } else if (i == 9) {
                snake.push({ x: startX + 3, y: startY + i - 3 });
            } else if (i == 10) {
                snake.push({ x: startX + 4, y: startY + i - 4 });
            } else if (i == 11) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 12) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 13) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 14) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 15) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 16) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 17) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else if (i == 18) {
                snake.push({ x: startX + 5, y: startY + i - 5 });
            } else {
                snake.push({ x: startX, y: startY + i });
            }
        }

        return snake;
    };

    const [snake, setSnake] = useState(generateInitialSnake());
    const [food, setFood] = useState({ x: 8, y: 8 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [foodLeft, setFoodLeft] = useState(INITIAL_FOOD);
    const [gameStarted, setGameStarted] = useState(false); // Новое состояние
    const [snakeTurn, setSnakeTurn] = useState('0px, -10px')

    const gameLoopRef = useRef();
    const directionRef = useRef(direction);

    // ... (остальные функции остаются без изменений)

    const startGame = () => {
        setIsPaused(false);
        setGameStarted(true); // Устанавливаем, что игра началась
        setFoodLeft(INITIAL_FOOD);
        setScore(0);
        setSnake(generateInitialSnake());
        setFood(generateFood());
        setDirection('UP');
        directionRef.current = 'UP';
        setGameOver(false);
    };

    // Генерация новой еды
    const generateFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };

        const isOnSnake = snake.some(segment =>
            segment.x === newFood.x && segment.y === newFood.y
        );

        if (isOnSnake) return generateFood();
        return newFood;
    };


    // Обработка нажатий клавиш
    const visualKeyClick = (key) => {
        if (key == 'up') {
            if (directionRef.current !== 'DOWN') {
                setDirection('UP');
                setSnakeTurn('0px, -10px')
                directionRef.current = 'UP';
            }
        }
        if (key == 'right') {
            if (directionRef.current !== 'LEFT') {
                setDirection('RIGHT');
                setSnakeTurn('5px, -5px')
                directionRef.current = 'RIGHT';
            }
        }
        if (key == 'down') {
            if (directionRef.current !== 'UP') {
                setDirection('DOWN');
                setSnakeTurn('0px, 0px')
                directionRef.current = 'DOWN';
            }
        }
        if (key == 'left') {
            if (directionRef.current !== 'RIGHT') {
                setDirection('LEFT');
                setSnakeTurn('-5px, -5px')
                directionRef.current = 'LEFT';
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current !== 'DOWN') {
                        setDirection('UP');
                        setSnakeTurn('0px, -10px')
                        directionRef.current = 'UP';
                    }
                    break;
                case 'ArrowDown':
                    if (directionRef.current !== 'UP') {
                        setDirection('DOWN');
                        setSnakeTurn('0px, 0px')
                        directionRef.current = 'DOWN';
                    }
                    break;
                case 'ArrowLeft':
                    if (directionRef.current !== 'RIGHT') {
                        setDirection('LEFT');
                        setSnakeTurn('-5px, -5px')
                        directionRef.current = 'LEFT';
                    }
                    break;
                case 'ArrowRight':
                    if (directionRef.current !== 'LEFT') {
                        setDirection('RIGHT');
                        setSnakeTurn('5px, -5px')
                        directionRef.current = 'RIGHT';
                    }
                    break;
                case ' ':
                    setIsPaused(prev => !prev);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Основной игровой цикл
    useEffect(() => {
        if (gameOver || isPaused) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = { ...prevSnake[0] };

                switch (directionRef.current) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                    default: break;
                }

                // Проверка на столкновения с границами
                if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Проверка на столкновение с собой
                if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [head, ...prevSnake];

                // Проверка на съедание еды
                if (head.x === food.x && head.y === food.y) {
                    if (foodLeft >= 2) {
                        setFood(generateFood());
                    }
                    setScore(prev => prev + 1);
                    setFoodLeft(prev => prev - 1);

                    if (foodLeft <= 2) {
                        setGameOver(true);
                    }
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
        return () => clearInterval(gameLoopRef.current);
    }, [food, gameOver, isPaused, foodLeft]);

    const restartGame = () => {
        setGameOver(false);
        startGame();
    };

    function rendRemain(remain) {
        remain = remain / 2

        let tempArray = []
        for (let index = 10; index > 0; index--) {
            tempArray.push(remain >= index ? false : true)
        }
        return tempArray
    }

    return (
        <>
        
            <section className={s.hello}>
                {/* <BurgerWindow bWindow={props.bWindow} setBurgerWindow={props.setBurgerWindow} /> */}
                <div className={s.mobileLights}>
                    <svg className={s.mobileLightGreen} xmlns="http://www.w3.org/2000/svg" width="375" height="593" viewBox="0 0 375 593" fill="none">
                        <g opacity="0.4" filter="url(#filter0_f_56_2418)">
                            <path d="M266.255 221.259L275.554 344.793L256.282 403.843L160.292 418.975L119.585 328.299L54.5936 350.132L-9.3357 251.04L-14.9998 175.796L141.863 174.153L181.58 236.668L266.255 221.259Z" fill="#43D9AD" />
                        </g>
                        <defs>
                            <filter id="filter0_f_56_2418" x="-189" y="0.152924" width="638.554" height="592.822" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="87" result="effect1_foregroundBlur_56_2418" />
                            </filter>
                        </defs>
                    </svg>
                    <svg className={s.mobileLightPurple} xmlns="http://www.w3.org/2000/svg" width="375" height="609" viewBox="0 0 375 609" fill="none">
                        <g opacity="0.4" filter="url(#filter0_f_56_2417)">
                            <path d="M294.68 446.455L174.223 417.518L123.899 381.106L138.857 285.09L237.639 274.072L236.733 205.517L350.631 174.966L424.001 192.591L377.58 342.436L305.912 361.126L294.68 446.455Z" fill="#4D5BCE" />
                        </g>
                        <defs>
                            <filter id="filter0_f_56_2417" x="-50.1006" y="0.965652" width="648.102" height="619.489" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="87" result="effect1_foregroundBlur_56_2417" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className={s.container} style={{height: '100%'}}>
                    <div className={s.hello__all}>
                        <div className={s.hello__main}>
                            <div className={s.hello__titles}>
                                <p className={s.hello__subtitle}>Hi all. I am</p>
                                <h1 className={s.hello__title}>Micheal Weaver</h1>
                                <p className={s.hello__specialty}>{'>'} Front-end developer</p>
                            </div>

                            <div className={s.hello__about}>
                                <p className={s.hello__comment}>// complete the game to continue</p>
                                <p className={s.hello__comment}>// you can also see it on my Github page</p>
                                <p className={s.hello__commentLAST}>// find my profile on Github:</p>
                                <p className={s.hello__codeLink}>const <span className={s.hello__codeLink_name}>githubLink</span> <span className={s.hello__codeLink_equal}>=</span> <span className={s.hello__codeLink_quotes}>“</span><span /><span><a className={s.hello__codeLink_link} href="#">https://github.com/example/url</a></span><span className={s.hello__codeLink_quotes}>”</span></p>
                            </div>
                        </div>
                        <div className={s.hello__snake}>
                            <svg className={s.hello__snakeBoltST} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g filter="url(#filter0_di_64_2641)">
                                    <circle cx="8.73047" cy="9.27106" r="6.5" fill="url(#paint0_radial_64_2641)" />
                                </g>
                                <path d="M5.96094 11.5657L11.4995 6.97635M5.96094 6.97635L11.4995 11.5657" stroke="#114944" />
                                <defs>
                                    <filter id="filter0_di_64_2641" x="0.230469" y="0.771057" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2641" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2641" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.12184 0 0 0 0 0.504167 0 0 0 0 0.464752 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2641" />
                                    </filter>
                                    <radialGradient id="paint0_radial_64_2641" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.73047 6.27106) rotate(90) scale(9.5)">
                                        <stop offset="0.151042" stopColor="#217D7A" />
                                        <stop offset="1" stopColor="#114B4A" />
                                    </radialGradient>
                                </defs>
                            </svg>
                            <svg className={s.hello__snakeBoltND} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g filter="url(#filter0_di_64_2635)">
                                    <circle cx="9.23047" cy="9.27106" r="6.5" fill="url(#paint0_radial_64_2635)" />
                                </g>
                                <path d="M6.46094 11.5657L11.9995 6.97635M6.46094 6.97635L11.9995 11.5657" stroke="#114944" />
                                <defs>
                                    <filter id="filter0_di_64_2635" x="0.730469" y="0.771057" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2635" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2635" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.101667 0 0 0 0 0.508333 0 0 0 0 0.466409 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2635" />
                                    </filter>
                                    <radialGradient id="paint0_radial_64_2635" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.23047 6.27106) rotate(90) scale(9.5)">
                                        <stop offset="0.151042" stopColor="#196C6A" />
                                        <stop offset="1" stopColor="#114B4A" />
                                    </radialGradient>
                                </defs>
                            </svg>
                            <svg className={s.hello__snakeBoltRD} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g filter="url(#filter0_di_64_2638)">
                                    <circle cx="9.23047" cy="9.43109" r="6.5" fill="url(#paint0_radial_64_2638)" />
                                </g>
                                <path d="M6.46094 11.7258L11.9995 7.13638M6.46094 7.13638L11.9995 11.7258" stroke="#093430" />
                                <defs>
                                    <filter id="filter0_di_64_2638" x="0.730469" y="0.931091" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0359028 0 0 0 0 0.177018 0 0 0 0 0.195833 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2638" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2638" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.088125 0 0 0 0 0.391667 0 0 0 0 0.360374 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2638" />
                                    </filter>
                                    <radialGradient id="paint0_radial_64_2638" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.23047 6.43109) rotate(90) scale(9.5)">
                                        <stop offset="0.151042" stopColor="#164C51" />
                                        <stop offset="1" stopColor="#0D3A40" />
                                    </radialGradient>
                                </defs>
                            </svg>
                            <svg className={s.hello__snakeBoltFOUR} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g filter="url(#filter0_di_64_2644)">
                                    <circle cx="8.73047" cy="9.43109" r="6.5" fill="url(#paint0_radial_64_2644)" />
                                </g>
                                <path d="M5.96094 11.7258L11.4995 7.13638M5.96094 7.13638L11.4995 11.7258" stroke="#163355" />
                                <defs>
                                    <filter id="filter0_di_64_2644" x="0.230469" y="0.931091" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0709722 0 0 0 0 0.174244 0 0 0 0 0.304167 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_2644" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_64_2644" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="1" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.170868 0 0 0 0 0.343622 0 0 0 0 0.554167 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_64_2644" />
                                    </filter>
                                    <radialGradient id="paint0_radial_64_2644" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.73047 6.43109) rotate(90) scale(9.5)">
                                        <stop offset="0.151042" stopColor="#234B7C" />
                                        <stop offset="1" stopColor="#122E4F" />
                                    </radialGradient>
                                </defs>
                            </svg>

                            <div className={s.hello__lightGreen}>
                                <svg className={s.hello__lightGreenSVG} xmlns="http://www.w3.org/2000/svg" width="864" height="784" viewBox="0 0 864 784" fill="none">
                                    <g opacity="0.7" filter="url(#filter0_f_64_1236)">
                                        <path d="M673.469 258.482L689.984 477.861L655.759 582.726L485.295 609.598L413.003 448.57L297.588 487.343L184.059 311.368L174 177.746L452.567 174.828L523.099 285.846L673.469 258.482Z" fill="#43D9AD" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_f_64_1236" x="0" y="0.827728" width="863.983" height="782.77" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                            <feGaussianBlur stdDeviation="87" result="effect1_foregroundBlur_64_1236" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <div className={s.hello__lightPurple}>
                                <svg className={s.hello__lightPurpleSVG} xmlns="http://www.w3.org/2000/svg" width="868" height="831" viewBox="0 0 868 831" fill="none">
                                    <g opacity="0.7" filter="url(#filter0_f_64_1235)">
                                        <path d="M477.946 656.519L264.032 605.132L174.663 540.469L201.226 369.957L376.649 350.391L375.041 228.647L577.309 174.392L707.602 205.691L625.165 471.797L497.892 504.987L477.946 656.519Z" fill="#4D5BCE" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_f_64_1235" x="0.663574" y="0.391769" width="880.938" height="830.128" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                            <feGaussianBlur stdDeviation="87" result="effect1_foregroundBlur_64_1235" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <div className={s.hello__snakeMain}>
                                <div style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                </div>

                                <div style={{
                                    marginBottom: '10px',
                                    textAlign: 'left'
                                }}>
                                </div>

                                <div className={s.hello__snakebox} style={{
                                    width: GRID_WIDTH * CELL_SIZE,
                                    height: GRID_HEIGHT * CELL_SIZE,
                                }}>
                                    {!gameStarted &&
                                        <button onClick={startGame} className={s.snake__start}>
                                            start-game
                                        </button>}
                                    {/* Еда */}
                                    <img
                                        src='/img/SnakesFood.svg'
                                        style={{
                                            position: 'absolute',
                                            left: (food.x * CELL_SIZE) - 1.8,
                                            top: (food.y * CELL_SIZE) - 1.8,
                                            width: 17,
                                            height: 17,
                                        }}
                                    />

                                    {/* Змейка */}
                                    {snake.map((segment, index) => (
                                        <div className={s.snake}
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: segment.x * CELL_SIZE,
                                                top: segment.y * CELL_SIZE,
                                                width: CELL_SIZE,
                                                height: CELL_SIZE,
                                                backgroundColor: '#43D9AD',
                                            }}
                                        />
                                    ))}
                                    {snake.map((segment, index) => (
                                        <div className={s.snake}
                                            key={index}
                                            style={{
                                                position: 'absolute',
                                                left: segment.x * CELL_SIZE,
                                                top: index === 0 ? (segment.y * CELL_SIZE) + 5 : segment.y * CELL_SIZE,
                                                transform: index === 0 ? `translate(${snakeTurn})` : '',
                                                width: CELL_SIZE,
                                                height: CELL_SIZE,
                                                backgroundColor: '#43D9AD',
                                                borderRadius: index === 0 ? '15px' : '0px',
                                            }}
                                        />
                                    ))}

                                    {/* Game Over */}
                                    {gameOver && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '93px',
                                            left: '50%',
                                            width: '100%',
                                            height: '48px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#43D9AD',
                                            textAlign: 'center',
                                            fontFamily: "Fira Code",
                                            fontSize: '24px',
                                            fontStyle: 'normal',
                                            fontWeight: '450',
                                            lineHeight: '100%',
                                            bordeRadius: '8px',
                                            backgroundColor: 'rgba(1, 22, 39, 0.84)',
                                            boxShadow: '1px 5px 11px 0px rgba(2, 18, 27, 0.71) inset',
                                            transform: 'translate(-50%, -50%)',
                                            padding: '10px 20px',
                                        }}>
                                            {foodLeft > 0 ? 'GAME OVER!' : 'WELL DONE!'}
                                            <button onClick={restartGame} style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                bottom: '-55px',
                                                color: '#607B96',
                                                textAlign: 'center',
                                                fontFamily: "Fira Code",
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: '450',
                                                lineHeight: 'normal',
                                                backgroundColor: 'transparent',
                                                border: '0',
                                            }}>start-again</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={s.hello__snakeAdditionally}>
                                <div className={s.hello__snakeGuide}>
                                    <p className={s.hello__snakeText}>// use keyboard<br />// arrows to play</p>
                                    <svg style={{ cursor: 'pointer' }} onClick={() => visualKeyClick('up')} className={s.hello__snakeTopArrow} xmlns="http://www.w3.org/2000/svg" width="51" height="29" viewBox="0 0 51 29" fill="none">
                                        <rect x="1.46094" y="0.772522" width="48.0787" height="27.6912" rx="7.5" fill="#010C15" stroke="#1E2D3D" />
                                        <path d="M25.5 11.6181L29.75 17.6181H21.25L25.5 11.6181Z" fill="white" />
                                    </svg>
                                    <div className={s.hello__snakeMainArrows}>
                                        <svg style={{ cursor: 'pointer' }} onClick={() => visualKeyClick('left')} xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 50 30" fill="none">
                                            <rect x="49.0786" y="28.9637" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.0786 28.9637)" fill="#010C15" stroke="#1E2D3D" />
                                            <path d="M22.0391 15.1181L28.0391 10.8681L28.0391 19.3681L22.0391 15.1181Z" fill="white" />
                                        </svg>
                                        <svg style={{ cursor: 'pointer' }} onClick={() => visualKeyClick('down')} xmlns="http://www.w3.org/2000/svg" width="51" height="30" viewBox="0 0 51 30" fill="none">
                                            <rect x="49.5391" y="28.9637" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.5391 28.9637)" fill="#010C15" stroke="#1E2D3D" />
                                            <path d="M25.5 18.1181L21.25 12.1181L29.75 12.1181L25.5 18.1181Z" fill="white" />
                                        </svg>
                                        <svg style={{ cursor: 'pointer' }} onClick={() => visualKeyClick('right')} xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 50 30" fill="none">
                                            <rect x="49" y="28.9637" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49 28.9637)" fill="#010C15" stroke="#1E2D3D" />
                                            <path d="M27.9604 15.1181L21.9604 19.3681L21.9604 10.8681L27.9604 15.1181Z" fill="white" />
                                        </svg>
                                    </div>
                                </div>
                                <p className={s.hello__snakeLeft}>// food left</p>
                                <div className={s.hello__snakeRemain}>
                                    {rendRemain(foodLeft).map((el, index) => (
                                        el ? <svg key={index} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <circle opacity="0.1" cx="10.8456" cy="10.8467" r="10.3456" fill="#43D9AD" />
                                            <circle opacity="0.2" cx="10.8456" cy="10.8467" r="7.34558" fill="#43D9AD" />
                                            <circle cx="10.8457" cy="10.8467" r="4" fill="#43D9AD" />
                                        </svg>
                                            : <svg key={index} xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                <g opacity="0.3">
                                                    <circle opacity="0.1" cx="11.2303" cy="10.3469" r="10.3456" fill="#43D9AD" />
                                                    <circle opacity="0.2" cx="11.2303" cy="10.3469" r="7.34558" fill="#43D9AD" />
                                                    <circle cx="11.2305" cy="10.3469" r="4" fill="#43D9AD" />
                                                </g>
                                            </svg>
                                    ))}
                                </div>
                                <button
                                    style={{
                                        display: 'inlineFlex',
                                        padding: '10px 14px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #FFF',
                                        color: '#FFF',
                                        textAlign: 'right',
                                        fontFamily: "Fira Code",
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: '450',
                                        lineHeight: 'normal',
                                        backgroundColor: 'transparent',
                                        marginTop: '126px',
                                        marginLeft: '119px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    skip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}