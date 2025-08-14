import { clsx } from "clsx";
import getFarewellText from "../farewell.js";
import { languages } from "../languages.js";

export default function Status(props) {
    const className = clsx({
        won: props.isGameWon,
        lost: props.isGameLost,
        "farewell-message": !props.isGameOver && props.isLastGuessedIncorrect,
        "game-status": true,
    });

    const lastDead = languages.slice(0, props.wrongGuessCount).length - 1;

    function renderGameStatus() {
        if (!props.isGameOver && props.isLastGuessedIncorrect) {
            return <p>{getFarewellText(languages[lastDead].name)}</p>;
        } else if (props.isGameWon) {
            return (
                <>
                    <h2>You won!</h2>
                    <p>Well Done! 🎉</p>
                </>
            );
        } else if (props.isGameLost) {
            return (
                <>
                    <h2>You lost!</h2>
                    <p>Better luck next time! 😔</p>
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
