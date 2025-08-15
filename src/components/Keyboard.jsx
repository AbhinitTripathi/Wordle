import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import keyPressSound from "../assets/press/GENERIC_R3.mp3";

export default function Keyboard(props) {
    const layout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    // useRef so that the useEffect knows the latest guessedLetters for duplicate checks
    // By default, useEffect only knows the initial guessedLetters i.e. []
    const guessedLettersRef = useRef(props.guessedLetters);
    useEffect(() => {
        guessedLettersRef.current = props.guessedLetters;
    }, [props.guessedLetters]);

    // function for both click and keydown events
    function addGuessedLetters(e) {
        e.stopPropagation();
        const letter = e.key ? e.key.toUpperCase() : e.target.innerText;

        // Play sound when a letter is guessed
        const audio = new Audio(keyPressSound);
        audio.play();

        if (
            guessedLettersRef.current.includes(letter) ||
            letter.charCodeAt(0) < 65 ||
            letter.charCodeAt(0) > 90 ||
            letter.length > 1
        )
            return;

        props.setGuessedLetters((prev) => [...prev, letter]);
    }

    // Add event listener for keydown when the component mounts
    useEffect(() => {
        if (!props.isGameOver) {
            window.addEventListener("keydown", addGuessedLetters);
        }

        return () => {
            window.removeEventListener("keydown", addGuessedLetters);
        };
    }, [props.isGameOver, addGuessedLetters]);

    return (
        <section className="keyboard">
            {layout.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.split("").map((alphabet, i) => {
                        // We need class names on key to be added based on the guessed letters
                        // This is where clsx helps us, otherwise we would use nested ternary operators
                        const isGuessed =
                            props.guessedLetters.includes(alphabet);
                        const isCorrect =
                            isGuessed &&
                            props.currentWord.includes(alphabet.toLowerCase());
                        const isWrong =
                            isGuessed &&
                            !props.currentWord.includes(alphabet.toLowerCase());

                        const className = clsx({
                            correct: isCorrect,
                            wrong: isWrong,
                            guessed: isGuessed,
                            "game-over": props.isGameOver,
                        });

                        return (
                            <button
                                key={i}
                                onClick={addGuessedLetters}
                                className={className}
                                disabled={!!className}
                                aria-disabled={!!className}
                                aria-label={`Letter ${alphabet}`}
                            >
                                {alphabet}
                            </button>
                        );
                    })}
                </div>
            ))}
        </section>
    );
}
