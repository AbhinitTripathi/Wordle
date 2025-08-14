export default function Word(props) {
    return (
        <>
            <section className='word' >
                {props.letterElements.map(divElement => {
                    const letter = divElement.props.children;
                    const isGuessed = props.guessedLetters.includes(letter);
                    return (
                        <span key={letter}>
                            {isGuessed ? letter : null}
                        </span>
                    )
                })}
            </section>

            {/* a11y */}
            <section className="sr-only">
                <p>
                    {props.currentWord.includes(props.guessedLetters[props.guessedLetters.length - 1]) ? 
                        `Correct! ${props.guessedLetters[props.guessedLetters.length - 1]} is in the word.` :
                        `Incorrect! ${props.guessedLetters[props.guessedLetters.length - 1]} is not in the word.`
                    }
                    You Have {props.guessesLeft} lives left.
                </p>
                <p>Guessed Letters: {
                    props.currentWord.split('').map(letter => 
                        props.guessedLetters.includes(letter.toUpperCase()) ? letter+"." : 'blank.'
                    ).join(" ")
                }</p>
            </section>
        </>
    )
}