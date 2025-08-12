export default function Keyboard() {
    const layout = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ];

    return (
        <section className="keyboard">
            {layout.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.split('').map((alphabet, i) => (
                        <button key={i} className="key">{alphabet}</button>
                    ))}
                </div>
            ))}
        </section>
    );
}