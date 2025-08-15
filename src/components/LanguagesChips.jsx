import { languages } from "../languages.js";
import { clsx } from "clsx";

export default function LanguagesChips(props) {
    const languageElements = languages.map((language, i) => {
        // Dynamic colors still use inline styles (Tailwind can’t know these at build time)
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color,
        };

        const className = clsx(
            "p-[4.5px] rounded", // .language base
            {
                "relative pointer-events-none after:content-['💀'] after:text-[0.85rem] after:absolute after:flex after:justify-center after:items-center after:top-0 after:left-0 after:h-full after:w-full after:bg-[rgba(0,0,0,0.8)] after:rounded-[3.5px]":
                    i < props.wrongGuessCount, // .isDead replacement
            },
        );

        return (
            <span key={language.name} className={className} style={styles}>
                {language.name}
            </span>
        );
    });

    return (
        <section className=" m-auto flex flex-wrap gap-[5px] justify-center items-center max-w-[350px] mb-[36px]">
            {languageElements}
        </section>
    );
}
