import { clsx } from 'clsx'
export default function Status(props) {
    const className = clsx({
        won : props.isGameWon,
        lost : props.isGameLost,
        "game-status": true
    })

    
    return (
        <section className={className}>
            {props.isGameWon ? 
                <>
                    <h2>You won!</h2>
                    <p>Well Done! 🎉</p>
                </>
            : null}
            
            {props.isGameLost ? 
                <>
                    <h2>You lost!</h2>
                    <p>Better luck next time! 😔</p>
                </>
            : null}
        </section>
    )
}