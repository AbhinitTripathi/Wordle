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

        if (
            guessedLettersRef.current.includes(letter) ||
            letter.charCodeAt(0) < 65 ||
            letter.charCodeAt(0) > 90 ||
            letter.length > 1
        )
            return;

        // Play sound when a letter is guessed
        const audio = new Audio(keyPressSound);
        audio.play();

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
    }, [props.isGameOver]);

    return (
        <section className="max-w-[450px]">
            {layout.map((row, rowIndex) => (
                <div
                    className="flex gap-[2px] justify-center mb-[2px]"
                    key={rowIndex}
                >
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

                        const className = clsx(
                            "inline-flex justify-center items-center w-[30px] h-[30px] m-[2px] rounded font-bold cursor-pointer border-none transition-transform",
                            {
                                "bg-[#FCBA29] text-[#1E1E1E] hover:bg-[#e6a824] hover:-translate-y-[2px] hover:shadow-[0_2px_4px_rgba(0,0,0,0.2)] active:bg-[#cc951f] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]":
                                    !isCorrect && !isWrong,
                                "bg-[#10A95B] text-[#F9F4DA]": isCorrect,
                                "bg-[#D92929] text-[#F9F4DA]": isWrong,
                                "relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(0,0,0,0.3)] after:rounded-inherit hover:translate-y-0 active:translate-y-0 pointer-events-none":
                                    isGuessed || props.isGameOver,
                            },
                        );

                        return (
                            <button
                                key={i}
                                onClick={addGuessedLetters}
                                className={className}
                                disabled={props.isGameOver || isGuessed}
                                aria-disabled={props.isGameOver || isGuessed}
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
