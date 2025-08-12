import { languages } from '../languages.js'
export default function LanguagesChips() {
    const languageElements = languages.map(language => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span key={language.name} className='language' style={styles}>
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