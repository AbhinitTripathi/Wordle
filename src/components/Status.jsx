import { clsx } from "clsx";
import getFarewellText from "../farewell.js";
import { languages } from "../languages.js";

export default function Status(props) {
    const className = clsx(
        // base styles
        "flex flex-col items-center justify-center text-[#F9F4DA] rounded min-h-[76px] m-[30px]",
        {
            "bg-[#10A95B]": props.isGameWon, // won
            "bg-[#D92929]": props.isGameLost, // lost
            "bg-[#7A5EA7] border border-dashed border-[#d87ef1]":
                !props.isGameOver && props.isLastGuessedIncorrect, // farewell-message
        },
    );

    const lastDead = languages.slice(0, props.wrongGuessCount).length - 1;

    function renderGameStatus() {
        if (!props.isGameOver && props.isLastGuessedIncorrect) {
            return (
                <p className="m-[5px]">
                    {getFarewellText(languages[lastDead].name)}
                </p>
            );
        } else if (props.isGameWon) {
            return (
                <>
                    <h2 className="text-[1.25rem] m-[5px]">You won!</h2>
                    <p className="m-[5px]">Well Done! 🎉</p>
                </>
            );
        } else if (props.isGameLost) {
            return (
                <>
                    <h2 className="text-[1.25rem] m-[5px]">You lost!</h2>
                    <p className="m-[5px]">Better luck next time! 😔</p>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <section aria-live="polite" role="status" className={className}>
            {renderGameStatus()}
        </section>
    );
}
