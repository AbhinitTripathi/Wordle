export default function Header(props) {
    return (
        <header>
            <h1>Assembly</h1>
            <p>Guess the word within {props.guessesLeft} attempts to keep the world safe from Assembly</p>
        </header>
    )
}