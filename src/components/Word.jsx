export default function Word(props) {
    return (
        <>
            <section className="flex flex-wrap justify-center items-center gap-[2px] mb-[36px]">
                {props.letterElements.map((divElement, i) => {
                    const letter = divElement.props.children;
                    const isGuessed = props.guessedLetters.includes(letter);

                    return (
                        <span
                            key={i}
                            className="h-10 w-10 bg-[#323232] flex justify-center items-center text-[1.125rem] border-b border-[#F9F4DA]"
                            style={
                                !isGuessed && props.isGameOver
                                    ? { color: "#D92929" }
                                    : null
                            }
                        >
                            {(isGuessed || props.isGameOver) ? letter : null}
                        </span>
                    );
                })}
            </section>

            {/* Accessibility */}
            <section className="sr-only">
                <p>
                    {props.currentWord.includes(
                        props.guessedLetters[props.guessedLetters.length - 1]
                    )
                        ? `Correct! ${
                              props.guessedLetters[
                                  props.guessedLetters.length - 1
                              ]
                          } is in the word.`
                        : `Incorrect! ${
                              props.guessedLetters[
                                  props.guessedLetters.length - 1
                              ]
                          } is not in the word.`}
                    You have {props.guessesLeft} lives left.
                </p>
                <p>
                    Guessed Letters:{" "}
                    {props.currentWord
                        .split("")
                        .map((letter) =>
                            props.guessedLetters.includes(letter.toUpperCase())
                                ? letter + "."
                                : "blank."
                        )
                        .join(" ")}
                </p>
            </section>
        </>
    );
}
