import { useState } from 'react'
import Header from './components/Header.jsx'
import Status from './components/Status.jsx'
import LanguagesChips from './components/LanguagesChips.jsx'
import Word from './components/Word.jsx'
import Keyboard from './components/Keyboard.jsx'


export default function App() {
    const[currentWord, setCurrentWord] = useState("react");
    const letterElements = currentWord.split('').map((letter, i) => <span key={i}>{letter.toLocaleUpperCase()}</span>)

    
    return (
        <main>
            <Header/>
            <Status/>
            <LanguagesChips/>
            <Word letterElements={letterElements} />
            <Keyboard/>

            <button className="new-game">New Game</button>
        </main>
        
    )
}
