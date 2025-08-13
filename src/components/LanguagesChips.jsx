import { languages } from '../languages.js'
import { clsx } from 'clsx'

export default function LanguagesChips(props) {
    const languageElements = languages.map((language, i) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        
        const className = clsx({
            language: true,
            isDead: i < props.wrongGuessCount
        })
        
        return (
            <span key={language.name} className={className} style={styles}>
                {language.name}
            </span>
        )
    })

    
    return (
        <section className="languages-chips">
            {languageElements}
        </section>
    )
}