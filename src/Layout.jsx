import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import BurgerWindow from './Components/BurgerWindow/BurgerWindow'

function Layout() {
    const [burgerWindow, setBurgerWindow] = useState('none')

    return (
        <>
            <Header bWindow={burgerWindow} setBurgerWindow={setBurgerWindow} />
            <main>
                <BurgerWindow bWindow={burgerWindow} setBurgerWindow={setBurgerWindow} />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout
