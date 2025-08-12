import { languages } from '../languages.js'
export default function LanguagesLives() {
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
        <section className="languages-lives">
            {languageElements}
        </section>
    )
}