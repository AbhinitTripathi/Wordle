import { useEffect, useRef } from "react";
export default function Keyboard(props) {
    const layout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    // useRef so the the useEffect knows the latest guessedLetters for duplicate checks
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

        props.setGuessedLetters(prev => [...prev, letter]);
    }

    // Add event listener for keydown when the component mounts
    useEffect(() => {
        window.addEventListener("keydown", addGuessedLetters);
        return () => window.removeEventListener("keydown", addGuessedLetters);
    }, []);
    // Update guessedLetters from keydown event
    useEffect(() => {
        console.log(props.guessedLetters);
    }, [props.guessedLetters]);

    useEffect(() => {
        window.addEventListener("keydown", addGuessedLetters);
        return () => window.removeEventListener("keydown", addGuessedLetters);
    }, []);

    return (
        <section className="keyboard">
            {layout.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.split("").map((alphabet, i) => (
                        <button
                            key={i}
                            onClick={addGuessedLetters}
                            className="key"
                        >
                            {alphabet}
                        </button>
                    ))}
                </div>
            ))}
        </section>
    );
}
