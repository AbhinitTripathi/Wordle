import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Status from "./components/Status.jsx";
import LanguagesChips from "./components/LanguagesChips.jsx";
import Word from "./components/Word.jsx";
import Keyboard from "./components/Keyboard.jsx";
import { languages } from "./languages.js";
import getRandomWord from "./wordsToGuess.js";

export default function App() {
    // Shared with WORD & KEYBOARD component
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const letterElements = currentWord
        .split("")
        .map((letter, i) => <span key={i}>{letter.toUpperCase()}</span>);

    // Shared with WORD & KEYBOARD component
    const [guessedLetters, setGuessedLetters] = useState([]);

    // Shared with LANGUAGESCHIPS component
    const wrongGuessCount = guessedLetters.filter(
        (letter) => !currentWord.includes(letter.toLowerCase()),
    ).length;
    const guessesLeft = languages.length - wrongGuessCount;

    // Shared with STATUS, KEYBOARD & NEW GAME BUTTON component
    const isGameWon = currentWord
        .split("")
        .every((letter) => guessedLetters.includes(letter.toUpperCase()));
    const isGameLost = wrongGuessCount >= languages.length;
    const isGameOver = isGameWon || isGameLost;

    // Check if last guessed letter in correct or not for farewell message
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessedIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter.toLowerCase());
    

    return (
        <main>
            <Header guessesLeft={guessesLeft} />
            <Status
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                isLastGuessedIncorrect={isLastGuessedIncorrect}
                wrongGuessCount={wrongGuessCount}
            />
            <LanguagesChips
                wrongGuessCount={wrongGuessCount}
            />
            <Word
                currentWord={currentWord}
                letterElements={letterElements}
                guessedLetters={guessedLetters}
                guessesLeft={guessesLeft}
            />
            <Keyboard
                guessedLetters={guessedLetters}
                setGuessedLetters={setGuessedLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
            />

            {isGameOver ? <button className="new-game">New Game</button> : null}
        </main>
    );
}
