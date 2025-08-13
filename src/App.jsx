import { useState } from "react";
import Header from "./components/Header.jsx";
import Status from "./components/Status.jsx";
import LanguagesChips from "./components/LanguagesChips.jsx";
import Word from "./components/Word.jsx";
import Keyboard from "./components/Keyboard.jsx";
import { languages } from './languages.js'

export default function App() {
    // Shared with WORD & KEYBOARD component
    const [currentWord, setCurrentWord] = useState("react");
    const letterElements = currentWord.split("").map((letter, i) => (
        <span key={i}>
            {letter.toLocaleUpperCase()}
        </span>
    ));

    // Shared with WORD & KEYBOARD component
    const [guessedLetters, setGuessedLetters] = useState([]);
    
    // Shared with LANGUAGESCHIPS component
    const wrongGuessCount = guessedLetters.filter(
        letter => !currentWord.includes(letter.toLowerCase())
    ).length;

    // Shared with STATUS, KEYBOARD & NEW GAME BUTTON component
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter.toUpperCase()));
    const isGameLost = wrongGuessCount >= languages.length;
    const isGameOver = isGameWon || isGameLost;
    
    return (
        <main>
            <Header />
            <Status />
            <LanguagesChips wrongGuessCount={wrongGuessCount}/>
            <Word
                currentWord={currentWord}
                letterElements={letterElements}
                guessedLetters={guessedLetters}
            />
            <Keyboard
                guessedLetters={guessedLetters}
                setGuessedLetters={setGuessedLetters}
                currentWord={currentWord}
            />

            {isGameOver ? <button className="new-game">New Game</button> : null}
        </main>
    );
}
