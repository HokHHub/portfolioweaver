import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Hello from './Components/Hello/Hello'

function App() {
  let [burgerWindow, setBurgerWindow] = useState('none')
  return (
    <>
      <Header bWindow={burgerWindow} setBurgerWindow={setBurgerWindow}/>
      <Hello bWindow={burgerWindow} setBurgerWindow={setBurgerWindow}/>
      <Footer/>
    </>
  )
}

export default App
