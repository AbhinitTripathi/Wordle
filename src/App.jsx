import { useState } from "react";
import Header from "./components/Header.jsx";
import Status from "./components/Status.jsx";
import LanguagesChips from "./components/LanguagesChips.jsx";
import Word from "./components/Word.jsx";
import Keyboard from "./components/Keyboard.jsx";
import { languages } from "./languages.js";
import getRandomWord from "./wordsToGuess.js";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import newGamePress from "./assets/press/BACKSPACE.mp3";
import newGameRelease from "./assets/release/BACKSPACE.mp3";

export default function App() {
    // Shared with WORD & KEYBOARD component
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
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
    const isLastGuessedIncorrect =
        lastGuessedLetter &&
        !currentWord.includes(lastGuessedLetter.toLowerCase());

    const { width, height } = useWindowSize();

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
            <LanguagesChips wrongGuessCount={wrongGuessCount} />
            <Word
                currentWord={currentWord}
                letterElements={letterElements}
                guessedLetters={guessedLetters}
                guessesLeft={guessesLeft}
                isGameOver={isGameOver}
            />
            <Keyboard
                guessedLetters={guessedLetters}
                setGuessedLetters={setGuessedLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
            />

            {isGameOver ? (
                <button
                    onClick={() => {
                        setCurrentWord(getRandomWord());
                        setGuessedLetters([]);

                        // Play sound when new game button is pressed
                        const audioPress = new Audio(newGamePress);
                        audioPress.play();
                        audioPress.addEventListener("ended", (e) => {
                            e.stopPropagation();
                            const audioRelease = new Audio(newGameRelease);
                            audioRelease.play();
                        });
                    }}
                    className="mt-9 w-[225px] h-10 block mx-auto px-4 py-2 bg-[#3498db] text-[#F9F4DA] font-bold border-none rounded cursor-pointer transition-colors duration-200 hover:bg-[#2980b9] hover:-translate-y-0.5 active:bg-[#2471a3] active:translate-y-0"
                >
                    New Game
                </button>
            ) : null}

            {isGameWon ? (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={500}
                    gravity={0.4}
                    initialVelocityY={20}
                    initialVelocityX={15}
                    recycle={false}
                    confettiSource={{ x: 0, y: 0, w: width, h: height }}
                />
            ) : null}
        </main>
    );
}
