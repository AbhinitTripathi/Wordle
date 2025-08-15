export default function Header(props) {
    return (
        <header className="text-center">
            <h1 className="text-[1.25rem] font-medium text-[#F9F4DA]">
                Assembly
            </h1>
            <p className=" m-auto text-sm max-w-[350px] text-[#8E8E8E]">
                Guess the word within {props.guessesLeft} attempts to keep the
                world safe from Assembly
            </p>
        </header>
    );
}
