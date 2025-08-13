export default function Word(props) {
    return (
        <section className='word'>
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
    )
}